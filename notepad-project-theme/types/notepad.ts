export interface Tab {
  id: string
  title: string
  content: string
  filePath: string | null
  isDirty: boolean
  language: string
}

export interface Settings {
  theme: "light" | "dark"
  fontSize: number
  fontFamily: "sans" | "serif" | "monospace"
  wordWrap: boolean
  lineNumbers: boolean
  autoSave: boolean
  tabSize: number
}

export interface HistoryEntry {
  content: string
  cursorPosition: number
  timestamp: number
}

export interface NotepadState {
  tabs: Tab[]
  activeTabId: string
  searchOpen: boolean
  settingsOpen: boolean
  settings: Settings
  clipboard: string
  history: Record<string, HistoryEntry[]>
}

export type NotepadAction =
  | { type: "ADD_TAB"; payload: Tab }
  | { type: "CLOSE_TAB"; payload: string }
  | { type: "SET_ACTIVE_TAB"; payload: string }
  | { type: "UPDATE_TAB"; payload: { id: string; updates: Partial<Tab> } }
  | { type: "SET_SEARCH_OPEN"; payload: boolean }
  | { type: "SET_SETTINGS_OPEN"; payload: boolean }
  | { type: "UPDATE_SETTINGS"; payload: Partial<Settings> }
  | { type: "SET_CLIPBOARD"; payload: string }
  | { type: "ADD_TO_HISTORY"; payload: { tabId: string; entry: HistoryEntry } }
