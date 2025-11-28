"use client"

import { useState, useEffect } from "react"
import { useNotepad } from "@/contexts/notepad-context"

export default function StatusBar() {
  const { state } = useNotepad()
  const activeTab = state.tabs.find((t) => t.id === state.activeTabId)
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })

  useEffect(() => {
    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const updatePosition = () => {
      const text = textarea.value.substring(0, textarea.selectionStart)
      const lines = text.split("\n")
      const line = lines.length
      const column = lines[lines.length - 1].length + 1
      setCursorPosition({ line, column })
    }

    textarea.addEventListener("click", updatePosition)
    textarea.addEventListener("keyup", updatePosition)

    return () => {
      textarea.removeEventListener("click", updatePosition)
      textarea.removeEventListener("keyup", updatePosition)
    }
  }, [state.activeTabId])

  const wordCount = activeTab?.content.trim().split(/\s+/).filter(Boolean).length || 0
  const charCount = activeTab?.content.length || 0
  const lineCount = activeTab?.content.split("\n").length || 1

  return (
    <div className="flex h-6 items-center justify-between border-t border-border bg-card px-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <span>
          Ln {cursorPosition.line}, Col {cursorPosition.column}
        </span>
        <span>Lines: {lineCount}</span>
        <span>Words: {wordCount}</span>
        <span>Characters: {charCount}</span>
      </div>

      <div className="flex items-center gap-4">
        <span>{activeTab?.language || "plaintext"}</span>
        <span>UTF-8</span>
        <span>{state.settings.fontSize}px</span>
      </div>
    </div>
  )
}
