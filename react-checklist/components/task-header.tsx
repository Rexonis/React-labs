"use client"

import type { ViewType } from "./task-dashboard"
import { Button } from "./ui/button"
import { Menu, Bell, User } from "lucide-react"
import { Badge } from "./ui/badge"

interface TaskHeaderProps {
  currentView: ViewType
  toggleSidebar: () => void
}

const viewTitles: Record<ViewType, string> = {
  all: "All Tasks",
  today: "Today",
  upcoming: "Upcoming",
  categories: "Categories",
  stats: "Statistics",
  search: "Search",
  settings: "Settings",
}

export function TaskHeader({ currentView, toggleSidebar }: TaskHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold text-foreground">{viewTitles[currentView]}</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
            3
          </Badge>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
