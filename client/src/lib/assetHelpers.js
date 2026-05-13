export const TYPE_CONFIG = {
  'Live Webinar': {
    label: 'Live Webinar',
    verb:  'Register',
    // tag-red: white on red-800 = 5.9:1. Passes AA.
    bg:    'var(--bh-red-800)',
    color: '#fff',
  },
  'On-Demand Webinar': {
    label: 'On-Demand Webinar',
    verb:  'Watch',
    // tag-navy: white on navy-800 = 18.7:1. Passes AAA.
    bg:    'var(--bh-navy-800)',
    color: '#fff',
  },
  'Whitepaper': {
    label: 'Whitepaper',
    verb:  'Download',
    // tag-ice: navy on ice-100 = 13.4:1. Passes AAA.
    bg:    'var(--bh-gray-200)',
    color: 'var(--bh-navy-800)',
  },
  'on-demand podcast': {
    label: 'Podcast',
    verb:  'Listen',
    // tag-outline: red on white with border. red-800 on white = 5.9:1. Passes AA.
    bg:    'var(--bh-ice-050)',
    color: 'var(--bh-red-800)',
    border: '1px solid var(--bh-red-800)',
  },
}

export function getConfig(type) {
  return TYPE_CONFIG[type] || {
    label: type, verb: 'Access',
    bg: 'var(--bh-gray-200)',
    color: 'var(--bh-gray-900)',
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}

export function getInitials(firstName, lastName) {
  return `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()
}

// Returns the unique sponsor names from a list of assets, in the order
// they first appear. Used by the landing-page sponsor wall and the
// listing-page sponsor multi-select.
export function getUniqueSponsors(assets) {
  const seen = new Set()
  const out = []
  for (const a of assets || []) {
    if (a?.sponsorName && !seen.has(a.sponsorName)) {
      seen.add(a.sponsorName)
      out.push(a.sponsorName)
    }
  }
  return out
}

// Lower-cased stop-words removed when extracting noun phrases from a
// description. Kept small on purpose — we only use this to seed
// per-type outlines, not as a real NLP pass.
const STOP = new Set([
  'a','an','the','and','or','but','of','in','on','to','for','with','by','from',
  'is','are','was','were','be','been','being','at','as','that','this','these',
  'those','it','its','their','our','your','about','how','what','why','when',
  'where','can','will','should','would','could','may','might','do','does','did',
  'into','out','up','down','over','under','again','further','then','once','here',
  'there','all','any','both','each','few','more','most','other','some','such',
  'no','nor','not','only','own','same','so','than','too','very'
])

// Picks the first N "interesting" noun-ish words from a description by
// stripping stop-words and short tokens. Output is stable for a given
// description so the outline never reshuffles between renders.
function topicWords(description, n) {
  const words = (description || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP.has(w))
  const seen = new Set()
  const out = []
  for (const w of words) {
    if (!seen.has(w)) { seen.add(w); out.push(w); if (out.length === n) break }
  }
  return out
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Returns a structured outline for the asset detail "What's inside" block.
// If the asset has a hand-authored outline (Vynca), use it verbatim.
// Otherwise generate a deterministic, type-appropriate outline that
// references real topic words pulled from the asset's description so
// the bullets are never lorem.
export function getOutlineForType(asset) {
  if (!asset) return { kind: 'list', items: [] }

  if (Array.isArray(asset.outline) && asset.outline.length > 0) {
    return { kind: 'list', items: asset.outline }
  }

  const topics = topicWords(asset.description, 4)
  const t = (i, fallback) => cap(topics[i] || fallback)

  switch (asset.assetType) {
    case 'Live Webinar':
    case 'On-Demand Webinar':
      return {
        kind: 'list',
        items: [
          `Opening framework: why ${t(0, 'this')} matters now`,
          `Case study: ${t(1, 'health')} systems leading the work`,
          `Implementation: tactics on ${t(2, 'operations')} and ${t(3, 'outcomes')}`,
          'Live Q and A with the speakers',
        ],
      }
    case 'Whitepaper':
      return {
        kind: 'list',
        items: [
          'Executive summary',
          `The state of ${t(0, 'the field')} today`,
          `${cap(t(1, 'evidence'))}-based approaches that work`,
          `Operational guidance for ${t(2, 'leaders')}`,
          'Recommendations and next steps',
        ],
      }
    case 'on-demand podcast':
      return {
        kind: 'segments',
        items: [
          { ts: '00:00', title: `Why ${t(0, 'this conversation')} matters` },
          { ts: '08:30', title: `Inside the work on ${t(1, 'integration')}` },
          { ts: '21:15', title: `What's next for ${t(2, 'health systems')}` },
        ],
      }
    default:
      return { kind: 'list', items: [] }
  }
}