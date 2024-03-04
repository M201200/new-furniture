export default function sanitizeStringToNumber(str: string | null | undefined) {
  if (!str) return null
  return !isNaN(+str.replace(/\D/g, "")) ? +str.replace(/\D/g, "") : null
}
