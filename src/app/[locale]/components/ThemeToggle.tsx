"use client"
import { useEffect, useState, useTransition } from "react"

import updatePreferredTheme from "@/utils/actions/updatePreferredTheme"
import { useMediaQuery } from "@/utils/hooks/useMediaQuery"

type ThemeToggleParams = {
  currentTheme: Theme | null
  user_email?: string | null
}

export default function ThemeToggle({
  currentTheme,
  user_email,
}: ThemeToggleParams) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme:dark)")
  const [theme, setTheme] = useState<Theme | null>(currentTheme)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (currentTheme) document.body.className = currentTheme
    else {
      const storage = localStorage.getItem("theme") as Theme | null
      setTheme(storage ? storage : isDarkMode ? "dark" : "light")
      document.body.className = theme || "dark"
    }
  }, [theme, isDarkMode, currentTheme])

  return (
    <select
      title={"Theme"}
      className="w-full cursor-pointer bg-primary"
      name="theme select"
      value={theme || "dark"}
      onChange={(e) => {
        if (user_email) {
          startTransition(() => {
            updatePreferredTheme(user_email, e.target.value as Theme)
          })
          setTheme(e.target.value as Theme)
          document.body.className = e.target.value
        } else {
          setTheme(e.target.value as Theme)
          document.body.className = e.target.value
          localStorage.setItem("theme", e.target.value)
        }
      }}
    >
      <option value="light">{"Light"}</option>
      <option value="dark">{"Dark"}</option>
    </select>
  )
}
