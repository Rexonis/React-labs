"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"
import type { NotepadState, NotepadAction, Tab, Settings } from "@/types/notepad"

const defaultSettings: Settings = {
  theme: "dark",
  fontSize: 14,
  fontFamily: "monospace",
  wordWrap: true,
  lineNumbers: false,
  autoSave: false,
  tabSize: 4,
}

const initialState: NotepadState = {
  tabs: [
    {
      id: "1",
      title: "Untitled",
      content: "",
      filePath: null,
      isDirty: false,
      language: "plaintext",
    },
  ],
  activeTabId: "1",
  searchOpen: false,
  settingsOpen: false,
  settings: defaultSettings,
  clipboard: "",
  history: {},
}

function notepadReducer(state: NotepadState, action: NotepadAction): NotepadState {
  switch (action.type) {
    case "ADD_TAB":
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        activeTabId: action.payload.id,
      }

    case "CLOSE_TAB":
      const remainingTabs = state.tabs.filter((tab) => tab.id !== action.payload)
      if (remainingTabs.length === 0) {
        const newTab: Tab = {
          id: Date.now().toString(),
          title: "Untitled",
          content: "",
          filePath: null,
          isDirty: false,
          language: "plaintext",
        }
        return {
          ...state,
          tabs: [newTab],
          activeTabId: newTab.id,
        }
      }

      const newActiveId =
        state.activeTabId === action.payload
          ? remainingTabs[Math.max(0, state.tabs.findIndex((t) => t.id === action.payload) - 1)].id
          : state.activeTabId

      return {
        ...state,
        tabs: remainingTabs,
        activeTabId: newActiveId,
      }

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTabId: action.payload,
      }

    case "UPDATE_TAB":
      return {
        ...state,
        tabs: state.tabs.map((tab) => (tab.id === action.payload.id ? { ...tab, ...action.payload.updates } : tab)),
      }

    case "SET_SEARCH_OPEN":
      return {
        ...state,
        searchOpen: action.payload,
      }

    case "SET_SETTINGS_OPEN":
      return {
        ...state,
        settingsOpen: action.payload,
      }

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      }

    case "SET_CLIPBOARD":
      return {
        ...state,
        clipboard: action.payload,
      }

    case "ADD_TO_HISTORY":
      return {
        ...state,
        history: {
          ...state.history,
          [action.payload.tabId]: [...(state.history[action.payload.tabId] || []), action.payload.entry].slice(-50), // Keep last 50 entries
        },
      }

    default:
      return state
  }
}

const NotepadContext = createContext<{
  state: NotepadState
  dispatch: React.Dispatch<NotepadAction>
  actions: {
    addTab: () => void
    closeTab: (id: string) => void
    setActiveTab: (id: string) => void
    updateTab: (id: string, updates: Partial<Tab>) => void
    newFile: () => void
    openFile: () => void
    saveFile: () => void
    saveFileAs: () => void
  }
} | null>(null)

export function NotepadProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notepadReducer, initialState)

  const addTab = useCallback(() => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: "Untitled",
      content: "",
      filePath: null,
      isDirty: false,
      language: "plaintext",
    }
    dispatch({ type: "ADD_TAB", payload: newTab })
  }, [])

  const closeTab = useCallback((id: string) => {
    dispatch({ type: "CLOSE_TAB", payload: id })
  }, [])

  const setActiveTab = useCallback((id: string) => {
    dispatch({ type: "SET_ACTIVE_TAB", payload: id })
  }, [])

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    dispatch({ type: "UPDATE_TAB", payload: { id, updates } })
  }, [])

  const newFile = useCallback(() => {
    addTab()
  }, [addTab])

  const openFile = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".txt,.js,.ts,.jsx,.tsx,.html,.css,.json,.md"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          const newTab: Tab = {
            id: Date.now().toString(),
            title: file.name,
            content,
            filePath: file.name,
            isDirty: false,
            language: getLanguageFromFilename(file.name),
          }
          dispatch({ type: "ADD_TAB", payload: newTab })
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }, [])

  const saveFile = useCallback(() => {
    const activeTab = state.tabs.find((t) => t.id === state.activeTabId)
    if (!activeTab) return

    const blob = new Blob([activeTab.content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = activeTab.filePath || "untitled.txt"
    a.click()
    URL.revokeObjectURL(url)

    updateTab(activeTab.id, { isDirty: false })
  }, [state.tabs, state.activeTabId, updateTab])

  const saveFileAs = useCallback(() => {
    saveFile()
  }, [saveFile])

  return (
    <NotepadContext.Provider
      value={{
        state,
        dispatch,
        actions: {
          addTab,
          closeTab,
          setActiveTab,
          updateTab,
          newFile,
          openFile,
          saveFile,
          saveFileAs,
        },
      }}
    >
      {children}
    </NotepadContext.Provider>
  )
}

export function useNotepad() {
  const context = useContext(NotepadContext)
  if (!context) {
    throw new Error("useNotepad must be used within NotepadProvider")
  }
  return context
}

function getLanguageFromFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()
  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    txt: "plaintext",
  }
  return languageMap[ext || ""] || "plaintext"
}
