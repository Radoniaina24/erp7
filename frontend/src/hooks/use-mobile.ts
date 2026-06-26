import { useSyncExternalStore } from 'react'

const MOBILE_BREAKPOINT = 768

const query = () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

function subscribe(onStoreChange: () => void) {
  const mql = query()
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return query().matches
}

function getServerSnapshot() {
  return false
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
