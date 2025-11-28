"use client"

import type { Tab as TabType } from "@/types/notepad"
import { CloseIcon } from "@/components/icons"

interface TabProps {
  tab: TabType
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

export default function Tab({ tab, isActive, onSelect, onClose }: TabProps) {
  return (
    <div
      className={`
        group flex items-center gap-2 px-4 py-2 border-r border-border cursor-pointer
        transition-colors min-w-[120px] max-w-[200px]
        ${isActive ? "bg-background" : "bg-card hover:bg-accent"}
      `}
      onClick={onSelect}
    >
      <span className="flex-1 truncate text-sm">
        {tab.title}
        {tab.isDirty && <span className="ml-1">•</span>}
      </span>

      <button
        className="opacity-0 group-hover:opacity-100 hover:bg-muted rounded p-0.5 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        title="Close"
      >
        <CloseIcon className="h-3 w-3" />
      </button>
    </div>
  )
}
