"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TaskHeader } from "./task-header"
import { TaskList } from "./task-list"
import { StatsOverview } from "./stats-overview"
import { CategoryView } from "./category-view"
import { SearchView } from "./search-view"
import { SettingsView } from "./settings-view"

export type ViewType = "all" | "today" | "upcoming" | "categories" | "stats" | "search" | "settings"

export function TaskDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>("all")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TaskHeader currentView={currentView} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-y-auto p-6">
          {currentView === "stats" && <StatsOverview />}
          {currentView === "categories" && <CategoryView />}
          {currentView === "search" && <SearchView />}
          {currentView === "settings" && <SettingsView />}
          {(currentView === "all" || currentView === "today" || currentView === "upcoming") && (
            <TaskList view={currentView} />
          )}
        </div>
      </div>
    </div>
  )
}
