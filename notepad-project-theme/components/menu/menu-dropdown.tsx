"use client"

import { useState, useRef, useEffect } from "react"

interface MenuItem {
  label: string
  shortcut?: string
  action: () => void
  type?: never
}

interface MenuSeparator {
  type: "separator"
  label?: never
  shortcut?: never
  action?: never
}

type MenuItemType = MenuItem | MenuSeparator

interface MenuDropdownProps {
  label: string
  items: MenuItemType[]
}

export default function MenuDropdown({ label, items }: MenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="px-3 py-1.5 text-sm hover:bg-accent rounded transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-56 rounded-md border border-border bg-popover shadow-lg">
          {items.map((item, index) =>
            item.type === "separator" ? (
              <div key={index} className="my-1 h-px bg-border" />
            ) : (
              <button
                key={index}
                className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                onClick={() => {
                  item.action()
                  setIsOpen(false)
                }}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="text-xs text-muted-foreground">{item.shortcut}</span>}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  )
}
