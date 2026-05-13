// Tracks which assets the current visitor has unlocked by completing the
// signup gate. Stored in localStorage so the gate is bypassed on return
// visits without requiring real authentication. Mirrors the try/catch
// pattern used by trackView in Home.jsx so private-mode browsers fail
// silently instead of throwing.

const KEY = 'bh_unlocked'

export function getUnlocked() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function isUnlocked(id) {
  return getUnlocked().includes(id)
}

export function markUnlocked(id) {
  try {
    const current = getUnlocked()
    if (current.includes(id)) return
    const next = [id, ...current].slice(0, 50)
    localStorage.setItem(KEY, JSON.stringify(next))
  } catch {}
}
