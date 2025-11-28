import type { NotepadState } from "@/types/notepad"

export function exportToJSON(state: NotepadState): string {
  const exportData = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    tabs: state.tabs,
    settings: state.settings,
  }

  return JSON.stringify(exportData, null, 2)
}

export function importFromJSON(jsonString: string): Partial<NotepadState> | null {
  try {
    const data = JSON.parse(jsonString)

    if (!data.version || !data.tabs || !data.settings) {
      throw new Error("Invalid import format")
    }

    return {
      tabs: data.tabs,
      settings: data.settings,
    }
  } catch (error) {
    console.error("Failed to import data:", error)
    return null
  }
}

export function downloadJSON(data: string, filename = "notepad-export.json") {
  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
