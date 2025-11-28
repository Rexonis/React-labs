"use client"
import { NotepadProvider } from "@/contexts/notepad-context"
import MenuBar from "@/components/menu/menu-bar"
import TabBar from "@/components/tabs/tab-bar"
import Editor from "@/components/editor/editor"
import StatusBar from "@/components/status/status-bar"
import SearchDialog from "@/components/dialogs/search-dialog"
import SettingsDialog from "@/components/dialogs/settings-dialog"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export default function NotepadApp() {
  return (
    <NotepadProvider>
      <NotepadContent />
    </NotepadProvider>
  )
}

function NotepadContent() {
  useKeyboardShortcuts()

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <MenuBar />
      <TabBar />
      <Editor />
      <StatusBar />
      <SearchDialog />
      <SettingsDialog />
    </div>
  )
}
