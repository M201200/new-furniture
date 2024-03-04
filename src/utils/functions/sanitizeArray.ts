export default function sanitizeArray(
  array: string[] | string | null | undefined
) {
  if (!array) return []
  else if (Array.isArray(array))
    return array.map((item) => item.replace(/[^\w-]/g, ""))
  else if (typeof array === "string") return [array.replace(/[^\w-]/g, "")]
  else return []
}
