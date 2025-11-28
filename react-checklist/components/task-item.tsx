"use client"

import type { Task } from "@/lib/types"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { MoreVertical, Calendar, Tag, ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface TaskItemProps {
  task: Task
  onToggle: () => void
  onDelete: () => void
  onUpdate: (updates: Partial<Task>) => void
}

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false)

  const priorityColors = {
    low: "bg-chart-4/20 text-chart-4 border-chart-4/30",
    medium: "bg-chart-5/20 text-chart-5 border-chart-5/30",
    high: "bg-destructive/20 text-destructive border-destructive/30",
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  return (
    <Card className={cn("p-4 transition-all hover:shadow-md", task.completed && "opacity-60")}>
      <div className="flex items-start gap-3">
        <Checkbox checked={task.completed} onCheckedChange={onToggle} className="mt-1" />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h4
                className={cn(
                  "font-medium text-foreground mb-1",
                  task.completed && "line-through text-muted-foreground",
                )}
              >
                {task.title}
              </h4>
              {task.description && <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>

            <Badge variant="outline" className="bg-muted">
              {task.category}
            </Badge>

            {task.dueDate && (
              <div className={cn("flex items-center gap-1 text-muted-foreground", isOverdue && "text-destructive")}>
                <Calendar className="w-3 h-3" />
                {format(task.dueDate, "MMM d")}
              </div>
            )}

            {task.tags.length > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Tag className="w-3 h-3" />
                {task.tags.length}
              </div>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setExpanded(!expanded)}>
                {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length} subtasks
                {expanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
              </Button>
            )}
          </div>

          {expanded && task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-3 space-y-2 pl-4 border-l-2 border-border">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => {
                      const updatedSubtasks = task.subtasks?.map((st) =>
                        st.id === subtask.id ? { ...st, completed: !st.completed } : st,
                      )
                      onUpdate({ subtasks: updatedSubtasks })
                    }}
                  />
                  <span className={cn("text-sm", subtask.completed && "line-through text-muted-foreground")}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
