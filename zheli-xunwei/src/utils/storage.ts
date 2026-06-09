export function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function readLocalStorageJson<T>(key: string): T | null {
  return safeJsonParse<T>(localStorage.getItem(key))
}

export function writeLocalStorageJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}
