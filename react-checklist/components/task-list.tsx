"use client"
import { useTasks } from "@/hooks/use-tasks"
import { TaskItem } from "./task-item"
import { Button } from "./ui/button"
import { Plus, Filter } from "lucide-react"
import { useState } from "react"
import { TaskDialog } from "./task-dialog"
import { FilterDialog } from "./filter-dialog"

interface TaskListProps {
  view: "all" | "today" | "upcoming"
}

export function TaskList({ view }: TaskListProps) {
  const { tasks, toggleTask, deleteTask, updateTask } = useTasks()
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<{
    priority?: string[]
    category?: string[]
  }>({})

  // Filter tasks based on view
  const filteredTasks = tasks
    .filter((task) => {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      if (view === "today") {
        return task.dueDate && task.dueDate >= today && task.dueDate < tomorrow
      }
      if (view === "upcoming") {
        return task.dueDate && task.dueDate >= tomorrow
      }
      return true
    })
    .filter((task) => {
      // Apply additional filters
      if (selectedFilters.priority && selectedFilters.priority.length > 0) {
        if (!selectedFilters.priority.includes(task.priority)) return false
      }
      if (selectedFilters.category && selectedFilters.category.length > 0) {
        if (!selectedFilters.category.includes(task.category)) return false
      }
      return true
    })

  const completedTasks = filteredTasks.filter((t) => t.completed)
  const pendingTasks = filteredTasks.filter((t) => !t.completed)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {view === "all" && "All Tasks"}
            {view === "today" && "Today's Tasks"}
            {view === "upcoming" && "Upcoming Tasks"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {pendingTasks.length} pending · {completedTasks.length} completed
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => setTaskDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {pendingTasks.length === 0 && completedTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first task</p>
          <Button onClick={() => setTaskDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingTasks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Pending</h4>
              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                    onUpdate={(updates) => updateTask(task.id, updates)}
                  />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Completed</h4>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                    onUpdate={(updates) => updateTask(task.id, updates)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <TaskDialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen} />
      <FilterDialog
        open={filterDialogOpen}
        onOpenChange={setFilterDialogOpen}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />
    </div>
  )
}
