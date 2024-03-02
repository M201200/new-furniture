"use client"
import { useEffect, useState } from "react"

import { useMediaQuery } from "@/utils/hooks/useMediaQuery"

type Theme = "dark" | "light"

export default function ThemeToggle({ locale }: { locale: Locale }) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme:dark)")
  const [theme, setTheme] = useState<Theme | null>()

  useEffect(() => {
    const storage = localStorage.getItem("theme") as Theme | null
    setTheme(storage ? storage : isDarkMode ? "dark" : "light")
    document.body.className = theme || "dark"
  }, [theme, isDarkMode])

  return (
    <select
      title={"Theme"}
      className="w-full cursor-pointer bg-primary"
      name="theme select"
      value={theme || "dark"}
      onChange={(e) => {
        setTheme(e.target.value as Theme)

        document.body.className = e.target.value
        localStorage.setItem("theme", e.target.value)
      }}
    >
      <option value="light">{"Light"}</option>
      <option value="dark">{"Dark"}</option>
    </select>
  )
}
