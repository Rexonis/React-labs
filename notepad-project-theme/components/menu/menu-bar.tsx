"use client"

import { useNotepad } from "@/contexts/notepad-context"
import MenuDropdown from "./menu-dropdown"

export default function MenuBar() {
  const { state, dispatch, actions } = useNotepad()
  const activeTab = state.tabs.find((t) => t.id === state.activeTabId)

  const fileMenuItems = [
    { label: "New", shortcut: "Ctrl+N", action: actions.newFile },
    { label: "Open...", shortcut: "Ctrl+O", action: actions.openFile },
    { label: "Save", shortcut: "Ctrl+S", action: actions.saveFile },
    { label: "Save As...", shortcut: "Ctrl+Shift+S", action: actions.saveFileAs },
    { type: "separator" as const },
    { label: "New Tab", shortcut: "Ctrl+T", action: actions.addTab },
    { label: "Close Tab", shortcut: "Ctrl+W", action: () => activeTab && actions.closeTab(activeTab.id) },
  ]

  const editMenuItems = [
    { label: "Undo", shortcut: "Ctrl+Z", action: () => {} },
    { label: "Redo", shortcut: "Ctrl+Y", action: () => {} },
    { type: "separator" as const },
    { label: "Cut", shortcut: "Ctrl+X", action: () => {} },
    { label: "Copy", shortcut: "Ctrl+C", action: () => {} },
    { label: "Paste", shortcut: "Ctrl+V", action: () => {} },
    { type: "separator" as const },
    { label: "Find", shortcut: "Ctrl+F", action: () => dispatch({ type: "SET_SEARCH_OPEN", payload: true }) },
    { label: "Replace", shortcut: "Ctrl+H", action: () => dispatch({ type: "SET_SEARCH_OPEN", payload: true }) },
  ]

  const viewMenuItems = [
    { label: "Zoom In", shortcut: "Ctrl++", action: () => {} },
    { label: "Zoom Out", shortcut: "Ctrl+-", action: () => {} },
    { label: "Reset Zoom", shortcut: "Ctrl+0", action: () => {} },
    { type: "separator" as const },
    {
      label: "Word Wrap",
      action: () => dispatch({ type: "UPDATE_SETTINGS", payload: { wordWrap: !state.settings.wordWrap } }),
    },
    {
      label: "Line Numbers",
      action: () => dispatch({ type: "UPDATE_SETTINGS", payload: { lineNumbers: !state.settings.lineNumbers } }),
    },
    { type: "separator" as const },
    { label: "Settings", shortcut: "Ctrl+,", action: () => dispatch({ type: "SET_SETTINGS_OPEN", payload: true }) },
  ]

  const helpMenuItems = [
    { label: "About Notepad", action: () => {} },
    { label: "Documentation", action: () => {} },
  ]

  return (
    <div className="flex h-10 items-center border-b border-border bg-card px-2">
      <MenuDropdown label="File" items={fileMenuItems} />
      <MenuDropdown label="Edit" items={editMenuItems} />
      <MenuDropdown label="View" items={viewMenuItems} />
      <MenuDropdown label="Help" items={helpMenuItems} />
    </div>
  )
}
