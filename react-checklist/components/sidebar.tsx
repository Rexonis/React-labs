"use client"

import type { ViewType } from "./task-dashboard"
import { Button } from "./ui/button"
import { CheckSquare, Calendar, CalendarClock, BarChart3, FolderKanban, Search, Settings, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  currentView: ViewType
  setCurrentView: (view: ViewType) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { id: "all" as ViewType, label: "All Tasks", icon: CheckSquare },
    { id: "today" as ViewType, label: "Today", icon: Calendar },
    { id: "upcoming" as ViewType, label: "Upcoming", icon: CalendarClock },
    { id: "categories" as ViewType, label: "Categories", icon: FolderKanban },
    { id: "stats" as ViewType, label: "Statistics", icon: BarChart3 },
  ]

  const utilityItems = [
    { id: "search" as ViewType, label: "Search", icon: Search },
    { id: "settings" as ViewType, label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-sidebar-foreground">TaskFlow</h1>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <Button className="w-full justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
                onClick={() => setCurrentView(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-sidebar-border">
            <nav className="space-y-1">
              {utilityItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    currentView === item.id && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                  onClick={() => setCurrentView(item.id)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-4">
            <p className="text-sm font-medium text-sidebar-accent-foreground mb-1">Pro Tip</p>
            <p className="text-xs text-muted-foreground">
              Use keyboard shortcuts to navigate faster. Press ? to see all shortcuts.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
