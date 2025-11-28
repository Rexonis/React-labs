"use client"

import { useState, useEffect } from "react"
import type { Category } from "@/lib/types"
import { mockCategories } from "@/lib/mock-data"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(mockCategories)
  }, [])

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category])
  }

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)))
  }

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id))
  }

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
