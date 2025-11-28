"use client"

import { useCallback, useRef } from "react"
import { useNotepad } from "@/contexts/notepad-context"

export function useEditorHistory(tabId: string) {
  const { dispatch } = useNotepad()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const saveToHistory = useCallback(
    (content: string, cursorPosition: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        dispatch({
          type: "ADD_TO_HISTORY",
          payload: {
            tabId,
            entry: {
              content,
              cursorPosition,
              timestamp: Date.now(),
            },
          },
        })
      }, 500)
    },
    [tabId, dispatch],
  )

  return { saveToHistory }
}
