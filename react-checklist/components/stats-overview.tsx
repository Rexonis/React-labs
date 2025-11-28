"use client"

import { useTasks } from "@/hooks/use-tasks"
import { useCategories } from "@/hooks/use-categories"
import { Card } from "./ui/card"
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Calendar } from "lucide-react"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export function StatsOverview() {
  const { tasks } = useTasks()
  const { categories } = useCategories()

  // Calculate statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const todayTasks = tasks.filter((t) => {
    if (!t.dueDate) return false
    const dueDate = new Date(t.dueDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() === today.getTime()
  }).length

  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false
    return new Date(t.dueDate) < new Date()
  }).length

  // Category distribution
  const categoryData = categories.map((cat) => ({
    name: cat.name,
    value: tasks.filter((t) => t.category === cat.name).length,
    color: cat.color,
  }))

  // Priority distribution
  const priorityData = [
    { name: "High", value: tasks.filter((t) => t.priority === "high").length, color: "oklch(0.577 0.245 27.325)" },
    { name: "Medium", value: tasks.filter((t) => t.priority === "medium").length, color: "oklch(0.75 0.22 50)" },
    { name: "Low", value: tasks.filter((t) => t.priority === "low").length, color: "oklch(0.55 0.12 120)" },
  ]

  // Weekly completion trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date
  })

  const weeklyData = last7Days.map((date) => {
    const dayTasks = tasks.filter((t) => {
      const createdDate = new Date(t.createdAt)
      return createdDate.toDateString() === date.toDateString()
    })
    return {
      day: date.toLocaleDateString("en", { weekday: "short" }),
      completed: dayTasks.filter((t) => t.completed).length,
      total: dayTasks.length,
    }
  })

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: CheckCircle2,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Due Today",
      value: todayTasks,
      icon: Calendar,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-1">Statistics</h3>
        <p className="text-sm text-muted-foreground">Track your productivity and task completion</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold mb-1">Overall Completion Rate</h4>
            <p className="text-sm text-muted-foreground">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-chart-4" />
            <span className="text-2xl font-bold">{completionRate}%</span>
          </div>
        </div>
        <Progress value={completionRate} className="h-3" />
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly Activity */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Weekly Activity</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
              <XAxis dataKey="day" stroke="oklch(0.6 0 0)" />
              <YAxis stroke="oklch(0.6 0 0)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.18 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="total" fill="oklch(0.7 0.2 260)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h4 className="text-lg font-semibold mb-4">Tasks by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.18 0 0)",
                  border: "1px solid oklch(0.25 0 0)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Priority Breakdown */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold mb-4">Priority Distribution</h4>
        <div className="space-y-4">
          {priorityData.map((priority, index) => {
            const percentage = totalTasks > 0 ? (priority.value / totalTasks) * 100 : 0
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: priority.color }} />
                    <span className="text-sm font-medium">{priority.name} Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{priority.value} tasks</span>
                    <Badge variant="secondary">{Math.round(percentage)}%</Badge>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
