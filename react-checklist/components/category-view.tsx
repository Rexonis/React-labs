"use client"

import { useCategories } from "@/hooks/use-categories"
import { useTasks } from "@/hooks/use-tasks"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Plus, Briefcase, User, BookOpen, Heart, MoreVertical } from "lucide-react"
import { Progress } from "./ui/progress"
import { TaskItem } from "./task-item"
import { useState } from "react"

export function CategoryView() {
  const { categories } = useCategories()
  const { tasks, toggleTask, deleteTask, updateTask } = useTasks()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const getCategoryIcon = (iconName: string) => {
    const icons = {
      Briefcase,
      User,
      BookOpen,
      Heart,
    }
    const Icon = icons[iconName as keyof typeof icons] || Briefcase
    return <Icon className="w-5 h-5" />
  }

  const categoryTasks = selectedCategory ? tasks.filter((t) => t.category === selectedCategory) : []

  const completedCategoryTasks = categoryTasks.filter((t) => t.completed).length
  const completionRate =
    categoryTasks.length > 0 ? Math.round((completedCategoryTasks / categoryTasks.length) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">Categories</h3>
          <p className="text-sm text-muted-foreground">Organize your tasks by category</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Category
        </Button>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const categoryTaskList = tasks.filter((t) => t.category === category.name)
            const completed = categoryTaskList.filter((t) => t.completed).length
            const total = categoryTaskList.length
            const progress = total > 0 ? (completed / total) * 100 : 0

            return (
              <Card
                key={category.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + "30", color: category.color }}
                  >
                    {getCategoryIcon(category.icon)}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <h4 className="text-lg font-semibold mb-2">{category.name}</h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />

                  <div className="flex items-center justify-between text-sm pt-2">
                    <span className="text-muted-foreground">
                      {completed} of {total} tasks completed
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}

          <Card className="p-6 border-dashed border-2 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Add Category</p>
          </Card>
        </div>
      ) : (
        <div>
          <Button variant="ghost" className="mb-4" onClick={() => setSelectedCategory(null)}>
            ← Back to Categories
          </Button>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: categories.find((c) => c.name === selectedCategory)?.color + "30",
                  color: categories.find((c) => c.name === selectedCategory)?.color,
                }}
              >
                {getCategoryIcon(categories.find((c) => c.name === selectedCategory)?.icon || "Briefcase")}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{selectedCategory}</h3>
                <p className="text-sm text-muted-foreground">
                  {categoryTasks.length} tasks · {completionRate}% complete
                </p>
              </div>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>

          {categoryTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No tasks in this category</h3>
              <p className="text-muted-foreground mb-4">Start by adding a new task</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {categoryTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                  onUpdate={(updates) => updateTask(task.id, updates)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
