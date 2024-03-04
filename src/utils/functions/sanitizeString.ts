export default function sanitizeString(str: string | null | undefined) {
  if (!str) return ""
  return str.replace(/[^a-zA-Zа-яА-я0-9\s\(\)\-]/g, "") || ""
}
