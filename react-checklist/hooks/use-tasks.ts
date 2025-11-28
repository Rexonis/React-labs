"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/lib/types"
import { mockTasks } from "@/lib/mock-data"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API or database
    setTasks(mockTasks)
  }, [])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  }
}
