"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Checkbox } from "./ui/checkbox"

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFilters: {
    priority?: string[]
    category?: string[]
  }
  onFiltersChange: (filters: any) => void
}

export function FilterDialog({ open, onOpenChange, selectedFilters, onFiltersChange }: FilterDialogProps) {
  const priorities = ["low", "medium", "high"]
  const categories = ["Work", "Personal", "Learning", "Health"]

  const toggleFilter = (type: "priority" | "category", value: string) => {
    const current = selectedFilters[type] || []
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]

    onFiltersChange({
      ...selectedFilters,
      [type]: updated,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Priority</Label>
            {priorities.map((priority) => (
              <div key={priority} className="flex items-center space-x-2">
                <Checkbox
                  id={`priority-${priority}`}
                  checked={selectedFilters.priority?.includes(priority)}
                  onCheckedChange={() => toggleFilter("priority", priority)}
                />
                <label htmlFor={`priority-${priority}`} className="text-sm font-medium capitalize cursor-pointer">
                  {priority}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold">Category</Label>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedFilters.category?.includes(category)}
                  onCheckedChange={() => toggleFilter("category", category)}
                />
                <label htmlFor={`category-${category}`} className="text-sm font-medium cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button onClick={() => onOpenChange(false)}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
