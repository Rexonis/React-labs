"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { useNotepad } from "@/contexts/notepad-context"
import { useEditorHistory } from "@/hooks/use-editor-history"

export default function Editor() {
  const { state, actions } = useNotepad()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const activeTab = state.tabs.find((t) => t.id === state.activeTabId)
  const { saveToHistory } = useEditorHistory(state.activeTabId)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [state.activeTabId])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeTab) return

    const newContent = e.target.value
    actions.updateTab(activeTab.id, {
      content: newContent,
      isDirty: true,
    })

    saveToHistory(newContent, e.target.selectionStart)
  }

  const fontSizeClass =
    {
      12: "text-xs",
      14: "text-sm",
      16: "text-base",
      18: "text-lg",
      20: "text-xl",
    }[state.settings.fontSize] || "text-sm"

  const fontFamilyClass = {
    sans: "font-sans",
    serif: "font-serif",
    monospace: "font-mono",
  }[state.settings.fontFamily]

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {state.settings.lineNumbers && (
        <div className="flex flex-col bg-muted text-muted-foreground text-right pr-3 pl-3 py-4 border-r border-border select-none">
          {(activeTab?.content || "").split("\n").map((_, i) => (
            <div key={i} className={`leading-6 ${fontSizeClass}`}>
              {i + 1}
            </div>
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={activeTab?.content || ""}
        onChange={handleChange}
        className={`
          flex-1 w-full p-4 bg-background text-foreground resize-none outline-none
          ${fontSizeClass} ${fontFamilyClass}
          ${state.settings.wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"}
        `}
        style={{ tabSize: state.settings.tabSize }}
        spellCheck={false}
      />
    </div>
  )
}
