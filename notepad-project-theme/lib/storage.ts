const STORAGE_KEYS = {
  TABS: "notepad_tabs",
  SETTINGS: "notepad_settings",
  ACTIVE_TAB: "notepad_active_tab",
}

export function saveTabs(tabs: any[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.TABS, JSON.stringify(tabs))
  } catch (error) {
    console.error("Failed to save tabs:", error)
  }
}

export function loadTabs() {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TABS)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load tabs:", error)
    return null
  }
}

export function saveSettings(settings: any) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  } catch (error) {
    console.error("Failed to save settings:", error)
  }
}

export function loadSettings() {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error("Failed to load settings:", error)
    return null
  }
}

export function saveActiveTab(tabId: string) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, tabId)
  } catch (error) {
    console.error("Failed to save active tab:", error)
  }
}

export function loadActiveTab() {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB)
  } catch (error) {
    console.error("Failed to load active tab:", error)
    return null
  }
}

export function clearStorage() {
  if (typeof window === "undefined") return
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.error("Failed to clear storage:", error)
  }
}
