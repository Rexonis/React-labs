"use client"

import { useNotepad } from "@/contexts/notepad-context"
import Tab from "./tab"
import { PlusIcon } from "@/components/icons"

export default function TabBar() {
  const { state, actions } = useNotepad()

  return (
    <div className="flex h-10 items-center border-b border-border bg-card overflow-x-auto">
      <div className="flex items-center">
        {state.tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === state.activeTabId}
            onSelect={() => actions.setActiveTab(tab.id)}
            onClose={() => actions.closeTab(tab.id)}
          />
        ))}
      </div>

      <button className="ml-2 p-2 hover:bg-accent rounded transition-colors" onClick={actions.addTab} title="New Tab">
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
