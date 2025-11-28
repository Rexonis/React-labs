export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate?: Date
  createdAt: Date
  tags: string[]
  subtasks?: SubTask[]
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  taskCount: number
}

export interface Statistics {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  completionRate: number
  todayTasks: number
  upcomingTasks: number
  overdueTasks: number
}
