export function detectLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()

  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "sass",
    json: "json",
    md: "markdown",
    markdown: "markdown",
    txt: "plaintext",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "go",
    rs: "rust",
    swift: "swift",
    kt: "kotlin",
    sql: "sql",
    sh: "shell",
    bash: "shell",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",
  }

  return languageMap[ext || ""] || "plaintext"
}

export function getLanguageIcon(language: string): string {
  const iconMap: Record<string, string> = {
    javascript: "🟨",
    typescript: "🔷",
    html: "🌐",
    css: "🎨",
    json: "📋",
    markdown: "📝",
    python: "🐍",
    java: "☕",
    plaintext: "📄",
  }

  return iconMap[language] || "📄"
}
