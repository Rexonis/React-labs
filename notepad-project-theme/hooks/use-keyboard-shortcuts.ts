"use client"

import { useEffect } from "react"
import { useNotepad } from "@/contexts/notepad-context"

export function useKeyboardShortcuts() {
  const { state, dispatch, actions } = useNotepad()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // File operations
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault()
        actions.newFile()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "o") {
        e.preventDefault()
        actions.openFile()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        if (e.shiftKey) {
          actions.saveFileAs()
        } else {
          actions.saveFile()
        }
      }

      // Tab operations
      if ((e.ctrlKey || e.metaKey) && e.key === "t") {
        e.preventDefault()
        actions.addTab()
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "w") {
        e.preventDefault()
        const activeTab = state.tabs.find((t) => t.id === state.activeTabId)
        if (activeTab) {
          actions.closeTab(activeTab.id)
        }
      }

      // Search
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        dispatch({ type: "SET_SEARCH_OPEN", payload: true })
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "h") {
        e.preventDefault()
        dispatch({ type: "SET_SEARCH_OPEN", payload: true })
      }

      // Settings
      if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault()
        dispatch({ type: "SET_SETTINGS_OPEN", payload: true })
      }

      // Escape to close dialogs
      if (e.key === "Escape") {
        if (state.searchOpen) {
          dispatch({ type: "SET_SEARCH_OPEN", payload: false })
        }
        if (state.settingsOpen) {
          dispatch({ type: "SET_SETTINGS_OPEN", payload: false })
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [state, dispatch, actions])
}
