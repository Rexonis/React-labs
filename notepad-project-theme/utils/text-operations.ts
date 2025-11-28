export function getSelectionInfo(textarea: HTMLTextAreaElement) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textarea.value
  const beforeText = text.substring(0, start)
  const selectedText = text.substring(start, end)
  const afterText = text.substring(end)

  return {
    start,
    end,
    beforeText,
    selectedText,
    afterText,
    hasSelection: start !== end,
  }
}

export function insertTextAtCursor(textarea: HTMLTextAreaElement, textToInsert: string): string {
  const { start, end, beforeText, afterText } = getSelectionInfo(textarea)
  const newText = beforeText + textToInsert + afterText
  const newCursorPos = start + textToInsert.length

  setTimeout(() => {
    textarea.setSelectionRange(newCursorPos, newCursorPos)
    textarea.focus()
  }, 0)

  return newText
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function countLines(text: string): number {
  return text.split("\n").length
}

export function getCursorPosition(textarea: HTMLTextAreaElement): { line: number; column: number } {
  const text = textarea.value.substring(0, textarea.selectionStart)
  const lines = text.split("\n")
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  }
}
