"use client"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

export default function ProfilePreferences() {
  const preferences = usePreferences()

  return (
    <>
      <li>Language: {preferences.locale}</li>
      <li>Currency: {preferences.currency}</li>
      <li>Theme: {preferences.theme}</li>
    </>
  )
}
