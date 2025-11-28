export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function openFileDialog(
  accept = ".txt,.js,.ts,.jsx,.tsx,.html,.css,.json,.md",
): Promise<{ name: string; content: string }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) {
        reject(new Error("No file selected"))
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        resolve({ name: file.name, content })
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsText(file)
    }

    input.click()
  })
}
