"use client"
import { useEffect, useTransition } from "react"

import { useRouter } from "next/navigation"

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
  const router = useRouter()

  const theme = usePreferences((state) => state.theme)
  const setTheme = usePreferences((state) => state.setTheme)

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme)
      document.body.className = currentTheme
    } else {
      const storage = localStorage.getItem("theme") as Theme | null
      setTheme(storage ? storage : isDarkMode ? "dark" : "light")
      theme !== document.body.className
        ? (document.body.className = theme || "dark")
        : null
    }
  }, [theme, setTheme, isDarkMode, currentTheme])

  return (
    <select
      title={tl.changeTheme}
      className="cursor-pointer bg-gray-500 text-gray-50 fluid-base p-[1px] rounded"
      name="theme select"
      value={theme || "dark"}
      disabled={isPending}
      onChange={(e) => {
        if (user_email) {
          startTransition(() => {
            updatePreferredTheme(user_email, e.target.value as Theme)
          })
          setTheme(e.target.value as Theme)
          document.body.className = e.target.value
          router.refresh()
        } else {
          setTheme(e.target.value as Theme)
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
