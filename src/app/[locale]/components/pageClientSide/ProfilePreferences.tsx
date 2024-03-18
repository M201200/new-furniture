"use client"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

export default function ProfilePreferences() {
  const preferences = usePreferences()

  return (
    <>
      <li className="flex gap-1">
        <span className="text-textSecondary">Language:</span>{" "}
        <span className="font-semibold">{preferences.locale}</span>{" "}
      </li>
      <li className="flex gap-1">
        <span className="text-textSecondary">Currency:</span>
        <span className="font-semibold">{preferences.currency}</span>{" "}
      </li>
      <li className="flex gap-1">
        <span className="text-textSecondary">Theme:</span>{" "}
        <span className="font-semibold">{preferences.theme}</span>
      </li>
    </>
  )
}