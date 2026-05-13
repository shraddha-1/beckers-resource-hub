// localStorage-backed recently-viewed list. Capped at 3 entries so the
// landing page row stays focused. Lives outside the page modules so
// React Fast Refresh can stay clean (a page file should only export
// the page component).

const KEY = 'bh_recently_viewed'
const MAX = 3

export function trackView(assetId) {
  try {
    const existing = JSON.parse(localStorage.getItem(KEY) || '[]')
    const updated = [assetId, ...existing.filter(id => id !== assetId)].slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(updated))
  } catch {
    // localStorage can throw in private browsing modes; safe to ignore.
  }
}

export function getRecentlyViewedIds() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function clearRecentlyViewed() {
  try { localStorage.removeItem(KEY) } catch { /* see trackView */ }
}
