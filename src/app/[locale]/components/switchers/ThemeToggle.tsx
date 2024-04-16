"use client"
import { useEffect, useState, useTransition } from "react"

import updatePreferredTheme from "@/utils/actions/ProfileActions/updatePreferredTheme"
import { useMediaQuery } from "@/utils/hooks/useMediaQuery"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

type ThemeToggleParams = {
  currentTheme: Theme | null
  user_email?: string | null
  tl: {
    changeTheme: string
    light: string
    dark: string
  }
}

export default function ThemeToggle({
  currentTheme,
  user_email,
  tl,
}: ThemeToggleParams) {
  const isDarkMode = useMediaQuery("(prefers-color-scheme:dark)")
  const [isPending, startTransition] = useTransition()

  const setTheme = usePreferences((state) => state.setTheme)

  const [localTheme, setLocalTheme] = useState<Theme | null>()

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme)
      setLocalTheme(currentTheme)
      document.body.className = currentTheme
    } else {
      const storage = localStorage.getItem("theme") as Theme | null
      setTheme(storage ? storage : isDarkMode ? "dark" : "light")
      setLocalTheme(storage ? storage : isDarkMode ? "dark" : "light")
      document.body.className = storage
        ? storage
        : isDarkMode
        ? "dark"
        : "light"
    }
  }, [setTheme, isDarkMode, currentTheme])

  return (
    <select
      title={tl.changeTheme}
      className="cursor-pointer bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-semibold fluid-base p-[1px] rounded"
      name="theme select"
      value={localTheme || "dark"}
      disabled={isPending}
      onChange={(e) => {
        if (user_email) {
          setTheme(e.target.value as Theme)
          setLocalTheme(e.target.value as Theme)
          document.body.className = e.target.value
          startTransition(() => {
            updatePreferredTheme(user_email, e.target.value as Theme)
          })
        } else {
          setTheme(e.target.value as Theme)
          setLocalTheme(e.target.value as Theme)
          document.body.className = e.target.value
          localStorage.setItem("theme", e.target.value)
        }
      }}
    >
      <option value="light">{tl.light}</option>
      <option value="dark">{tl.dark}</option>
    </select>
  )
}
