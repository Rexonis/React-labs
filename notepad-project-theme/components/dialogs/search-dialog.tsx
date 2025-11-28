"use client"

import { useState, useRef, useEffect } from "react"
import { useNotepad } from "@/contexts/notepad-context"
import { CloseIcon } from "@/components/icons"

export default function SearchDialog() {
  const { state, dispatch, actions } = useNotepad()
  const [searchTerm, setSearchTerm] = useState("")
  const [replaceTerm, setReplaceTerm] = useState("")
  const [matchCase, setMatchCase] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [currentMatch, setCurrentMatch] = useState(0)
  const [totalMatches, setTotalMatches] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const activeTabRef = useRef<any>(null)

  const activeTab = state.tabs.find((t) => t.id === state.activeTabId)
  activeTabRef.current = activeTab

  useEffect(() => {
    if (state.searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [state.searchOpen])

  useEffect(() => {
    const activeTab = activeTabRef.current
    if (!activeTab || !searchTerm) {
      setTotalMatches(0)
      setCurrentMatch(0)
      return
    }

    const content = activeTab.content
    const flags = matchCase ? "g" : "gi"
    const pattern = wholeWord ? `\\b${searchTerm}\\b` : searchTerm
    const regex = new RegExp(pattern, flags)
    const matches = content.match(regex)
    setTotalMatches(matches?.length || 0)
  }, [searchTerm, matchCase, wholeWord])

  const handleFind = (direction: "next" | "prev" = "next") => {
    if (!activeTabRef.current || !searchTerm) return

    const textarea = document.querySelector("textarea")
    if (!textarea) return

    const content = activeTabRef.current.content
    const flags = matchCase ? "g" : "gi"
    const pattern = wholeWord ? `\\b${searchTerm}\\b` : searchTerm
    const regex = new RegExp(pattern, flags)

    const matches = [...content.matchAll(regex)]
    if (matches.length === 0) return

    const currentPos = textarea.selectionStart
    let targetMatch: RegExpMatchArray | undefined

    if (direction === "next") {
      targetMatch = matches.find((m) => m.index! > currentPos) || matches[0]
    } else {
      targetMatch = [...matches].reverse().find((m) => m.index! < currentPos) || matches[matches.length - 1]
    }

    if (targetMatch && targetMatch.index !== undefined) {
      textarea.focus()
      textarea.setSelectionRange(targetMatch.index, targetMatch.index + searchTerm.length)
      setCurrentMatch(matches.indexOf(targetMatch) + 1)
    }
  }

  const handleReplace = () => {
    if (!activeTabRef.current || !searchTerm) return

    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = activeTabRef.current.content.substring(start, end)

    if (selectedText.toLowerCase() === searchTerm.toLowerCase() || (matchCase && selectedText === searchTerm)) {
      const newContent =
        activeTabRef.current.content.substring(0, start) + replaceTerm + activeTabRef.current.content.substring(end)
      actions.updateTab(activeTabRef.current.id, { content: newContent, isDirty: true })
      textarea.setSelectionRange(start, start + replaceTerm.length)
    }

    handleFind("next")
  }

  const handleReplaceAll = () => {
    if (!activeTabRef.current || !searchTerm) return

    const flags = matchCase ? "g" : "gi"
    const pattern = wholeWord ? `\\b${searchTerm}\\b` : searchTerm
    const regex = new RegExp(pattern, flags)
    const newContent = activeTabRef.current.content.replace(regex, replaceTerm)

    actions.updateTab(activeTabRef.current.id, { content: newContent, isDirty: true })
    setTotalMatches(0)
    setCurrentMatch(0)
  }

  if (!state.searchOpen) return null

  return (
    <div className="fixed top-12 right-4 z-50 w-96 rounded-lg border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border p-3">
        <h3 className="font-medium">Find and Replace</h3>
        <button
          className="hover:bg-accent rounded p-1"
          onClick={() => dispatch({ type: "SET_SEARCH_OPEN", payload: false })}
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Find..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.shiftKey ? handleFind("prev") : handleFind("next")
                }
              }}
              className="flex-1 rounded border border-input bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
              onClick={() => handleFind("next")}
            >
              Find
            </button>
          </div>

          {totalMatches > 0 && (
            <div className="text-xs text-muted-foreground">
              {currentMatch} of {totalMatches} matches
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            className="flex-1 rounded border border-input bg-background px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
          <button className="rounded bg-secondary px-3 py-1.5 text-sm hover:bg-secondary/80" onClick={handleReplace}>
            Replace
          </button>
        </div>

        <button
          className="w-full rounded bg-secondary px-3 py-1.5 text-sm hover:bg-secondary/80"
          onClick={handleReplaceAll}
        >
          Replace All
        </button>

        <div className="flex gap-4 pt-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="rounded"
            />
            Match case
          </label>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={wholeWord}
              onChange={(e) => setWholeWord(e.target.checked)}
              className="rounded"
            />
            Whole word
          </label>
        </div>
      </div>
    </div>
  )
}
