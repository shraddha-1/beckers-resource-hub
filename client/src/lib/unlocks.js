// Tracks which assets the current visitor has unlocked by completing the
// signup gate. Stored in localStorage so the gate is bypassed on return
// visits without requiring real authentication. Mirrors the try/catch
// pattern used by trackView in Home.jsx so private-mode browsers fail


const KEY = 'bh_unlocked'

export function markUnlocked(id) {
  try {
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]')
    if (!existing.includes(id)) {
      localStorage.setItem(KEY, JSON.stringify([...existing, id]))
    }
  } catch {}
}

export function isUnlocked(id) {
  try {
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]')
    return existing.includes(id)
  } catch {}
  return false
}

export function getUnlockedIds() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {}
  return []
}

export function clearUnlocked() {
  try {
    localStorage.removeItem(KEY)
  } catch {}
}
