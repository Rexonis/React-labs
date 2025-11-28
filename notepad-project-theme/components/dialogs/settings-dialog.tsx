"use client"

import { useNotepad } from "@/contexts/notepad-context"
import { CloseIcon } from "@/components/icons"

export default function SettingsDialog() {
  const { state, dispatch } = useNotepad()

  if (!state.settingsOpen) return null

  const updateSetting = <K extends keyof typeof state.settings>(key: K, value: (typeof state.settings)[K]) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: { [key]: value } })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            className="hover:bg-accent rounded p-1"
            onClick={() => dispatch({ type: "SET_SETTINGS_OPEN", payload: false })}
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Theme</label>
            <select
              value={state.settings.theme}
              onChange={(e) => updateSetting("theme", e.target.value as "light" | "dark")}
              className="w-full rounded border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Size</label>
            <select
              value={state.settings.fontSize}
              onChange={(e) => updateSetting("fontSize", Number(e.target.value))}
              className="w-full rounded border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="20">20px</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Font Family</label>
            <select
              value={state.settings.fontFamily}
              onChange={(e) => updateSetting("fontFamily", e.target.value as "sans" | "serif" | "monospace")}
              className="w-full rounded border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="sans">Sans Serif</option>
              <option value="serif">Serif</option>
              <option value="monospace">Monospace</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Tab Size</label>
            <select
              value={state.settings.tabSize}
              onChange={(e) => updateSetting("tabSize", Number(e.target.value))}
              className="w-full rounded border border-input bg-background px-3 py-2 outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="8">8 spaces</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state.settings.wordWrap}
                onChange={(e) => updateSetting("wordWrap", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Word Wrap</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state.settings.lineNumbers}
                onChange={(e) => updateSetting("lineNumbers", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show Line Numbers</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={state.settings.autoSave}
                onChange={(e) => updateSetting("autoSave", e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Auto Save</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border p-4">
          <button
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            onClick={() => dispatch({ type: "SET_SETTINGS_OPEN", payload: false })}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
