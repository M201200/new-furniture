import { useCallback, useDebugValue, useSyncExternalStore } from "react"

type MediaQuery = `(${string}:${string})`

type FormatDebugValue = {
  query: MediaQuery
  matches: boolean
}

const formatDebugValue = ({ query, matches }: FormatDebugValue) =>
  `\`${query}\` => ${matches}`

function getSnapshot(query: MediaQuery) {
  return window.matchMedia(query).matches
}

function subscribe(onChange: any, query: MediaQuery) {
  const mql = window.matchMedia(query)
  mql.addEventListener("change", onChange)

  return () => {
    mql.removeEventListener("change", onChange)
  }
}

export function useMediaQuery(query: MediaQuery, initialState = false) {
  const subscribeMediaQuery = useCallback(
    (onChange: () => void) => () => {
      subscribe(onChange, query)
    },
    [query]
  )

  const matches = useSyncExternalStore(
    subscribeMediaQuery,
    () => getSnapshot(query),
    () => initialState
  )

  useDebugValue({ query, matches }, formatDebugValue)

  return matches
}
