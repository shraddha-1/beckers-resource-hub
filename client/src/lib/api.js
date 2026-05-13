const BASE = '/api/assets'

export async function getAssets() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Failed to load assets')
  const { data } = await res.json()
  return data
}

export async function getAsset(id) {
  const res = await fetch(`${BASE}/${id}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Asset not found')
  return json.data
}

export async function signUp(id, person) {
  const res = await fetch(`${BASE}/${id}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ person })
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Signup failed')
  return json.data
}