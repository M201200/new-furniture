// import { hasEntry, addEntry, removeEntry } from "@/api/LocalStorageActions"
// import { useState, useEffect } from "react"

// type Props = {
//   details: MediaEntry | BookEntry
//   add?: string
//   remove?: string
//   initial?: string
// }

// export default function useInitialAndToggle({
//   details,
//   add = "add",
//   remove = "remove",
//   initial = "",
// }: Props) {
//   const [isListed, setState] = useState(false)
//   const [action, setAction] = useState(initial)
//   const [entry] = useState(details)
//   useEffect(() => {
//     if (hasEntry(entry.catalog, entry.id)) setState(true)
//     if (action === remove) {
//       removeEntry(entry.id, entry.catalog)
//       setState(false)
//     }
//     if (action === add) {
//       addEntry(entry)
//       setState(true)
//     }
//   }, [add, remove, action, entry])

//   return [isListed, setAction] as const
// }
