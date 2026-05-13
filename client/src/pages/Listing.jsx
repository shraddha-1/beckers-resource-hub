import { useEffect, useState, useMemo, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAssets } from '../lib/api'
import { getConfig, formatDate, getUniqueSponsors } from '../lib/assetHelpers'
import { isUnlocked } from '../lib/unlocks'
import Badge from '../components/Badge'
import { trackView } from '../lib/recentlyViewed'

const TYPES = ['Live Webinar', 'On-Demand Webinar', 'Whitepaper', 'on-demand podcast']

const SORT_OPTIONS = [
  { label: 'Latest updated', value: 'modified' },
  { label: 'A to Z',         value: 'alpha' },
]

const PAGE_SIZE = 5
const SPONSOR_VISIBLE_CAP = 50
const MARQUEE_CAP = 80

export default function Listing() {
  const [assets, setAssets]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [refineOpen, setRefineOpen]     = useState(false)
  const [sponsorQuery, setSponsorQuery] = useState('')
  const [localSearch, setLocalSearch]   = useState('')
  const debounceRef = useRef(null)

  const activeType   = searchParams.get('type')    || 'all'
  const search       = searchParams.get('q')       || ''
  const sort         = searchParams.get('sort')    || 'modified'
  const sponsorParam = searchParams.get('sponsor') || ''
  const page         = parseInt(searchParams.get('page') || '1', 10)

  const activeSponsors = sponsorParam
    ? sponsorParam.split(',').filter(Boolean)
    : []

  useEffect(() => {
    setLocalSearch(search)
  }, [search])

  useEffect(() => {
    getAssets()
      .then(setAssets)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const handleSearchChange = (val) => {
    setLocalSearch(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        if (val) { next.set('q', val) } else { next.delete('q') }
        next.delete('page')
        return next
      })
    }, 300)
  }

  const updateParams = (updates) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v === undefined || v === null || v === '' || v === 'all') {
          next.delete(k)
        } else {
          next.set(k, String(v))
        }
      })
      return next
    })
  }

  const allSponsors = useMemo(() => getUniqueSponsors(assets), [assets])

  const typeCounts = useMemo(() => {
    const c = {}
    TYPES.forEach(t => { c[t] = assets.filter(a => a.assetType === t).length })
    return c
  }, [assets])

  const filteredSponsors = useMemo(() => {
    const q = sponsorQuery.trim().toLowerCase()
    if (!q) return allSponsors
    return allSponsors.filter(name => name.toLowerCase().includes(q))
  }, [allSponsors, sponsorQuery])

  const visibleSponsors = filteredSponsors.slice(0, SPONSOR_VISIBLE_CAP)
  const hiddenCount     = Math.max(0, filteredSponsors.length - visibleSponsors.length)
  const isSearching     = sponsorQuery.trim().length > 0
  const marqueeChips    = allSponsors.slice(0, MARQUEE_CAP)

  const filtered = useMemo(() => {
    let r = [...assets]
    if (activeType !== 'all') r = r.filter(a => a.assetType === activeType)
    if (activeSponsors.length > 0) {
      r = r.filter(a => activeSponsors.includes(a.sponsorName))
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.sponsorName.toLowerCase().includes(q)
      )
    }
    r.sort((a, b) => {
      if (sort === 'alpha') return a.name.localeCompare(b.name)
      return new Date(b.lastModifiedDate || 0).getTime() -
             new Date(a.lastModifiedDate || 0).getTime()
    })
    return r
  }, [assets, activeType, activeSponsors, search, sort])

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated   = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const setType = (type) => {
    updateParams({ type: type === 'all' ? undefined : type, page: undefined })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const setSort = (val) => {
    updateParams({ sort: val === 'modified' ? undefined : val, page: undefined })
  }

  const toggleSponsor = (name) => {
    const next = activeSponsors.includes(name)
      ? activeSponsors.filter(s => s !== name)
      : [...activeSponsors, name]
    updateParams({
      sponsor: next.length > 0 ? next.join(',') : undefined,
      page: undefined,
    })
  }

  const goToPage = (p) => {
    updateParams({ page: p === 1 ? undefined : p })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearAll = () => {
    setLocalSearch('')
    setSponsorQuery('')
    setSearchParams({})
  }

  const refineCount = (sort !== 'modified' ? 1 : 0) + activeSponsors.length

  const chipStyle = (active) => ({
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill)',
    border: '1.5px solid',
    borderColor: active ? 'var(--bh-navy-800)' : 'var(--bh-ice-300)',
    background: active ? 'var(--bh-navy-800)' : '#fff',
    color: active ? '#fff' : 'var(--bh-navy-800)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    minHeight: 40,
  })

  return (
    <div className="listing-page" style={{
      maxWidth: 1200, margin: '0 auto', padding: '40px 32px 80px',
    }}>

      {/* Header */}
      <header style={{
        marginBottom: 28, paddingBottom: 24,
        borderBottom: '1px solid var(--bh-ice-200)',
      }}>
        <p className="bh-kicker" style={{ marginBottom: 10 }}>
          Becker's Resource Hub
        </p>
        <h1 className="bh-h1" style={{ marginBottom: 12 }}>
          Resource library
        </h1>
        <p className="bh-body-lg" style={{
          color: 'var(--bh-gray-700)', maxWidth: '60ch',
        }}>
          Webinars, whitepapers, and podcasts curated for hospital
          executives. Pick a format below or refine by sponsor.
        </p>
      </header>

      {/* Type filter chips */}
      <div
        role="group"
        aria-label="Filter by content type"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}
      >
        <button
          type="button"
          onClick={() => setType('all')}
          aria-pressed={activeType === 'all'}
          style={chipStyle(activeType === 'all')}
        >
          All types ({assets.length})
        </button>
        {TYPES.map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            aria-pressed={activeType === t}
            style={chipStyle(activeType === t)}
          >
            {getConfig(t).label} ({typeCounts[t] ?? 0})
          </button>
        ))}
      </div>

      {/* Search + Sort + Refine */}
      <div className="listing-toolbar" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        gap: 12, marginBottom: 16, alignItems: 'center',
      }}>
        <div style={{ position: 'relative' }}>
          <label htmlFor="search-input" className="sr-only">
            Search resources by title, sponsor, or topic
          </label>
          <svg aria-hidden="true" style={{
            position: 'absolute', left: 14, top: '50%',
            transform: 'translateY(-50%)',
            width: 16, height: 16, color: 'var(--bh-gray-700)',
            pointerEvents: 'none',
          }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            id="search-input"
            type="search"
            placeholder="Search by title, sponsor, or topic"
            value={localSearch}
            onChange={e => handleSearchChange(e.target.value)}
            aria-label="Search resources"
            style={{
              width: '100%',
              padding: '11px 40px 11px 42px',
              fontFamily: 'var(--font-sans)',
              fontSize: 15, color: 'var(--bh-gray-900)',
              background: '#fff',
              border: '1.5px solid var(--bh-ice-300)',
              borderRadius: 'var(--radius-md)',
              outline: 'none', minHeight: 44,
            }}
          />
          {localSearch && (
            <button
              onClick={() => handleSearchChange('')}
              aria-label="Clear search"
              style={{
                position: 'absolute', right: 12, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                cursor: 'pointer', padding: 4,
                color: 'var(--bh-gray-700)',
                fontSize: 18, lineHeight: 1,
                minWidth: 32, minHeight: 32,
              }}
            >×</button>
          )}
        </div>

        <div className="bh-select">
          <label htmlFor="sort-select" className="sr-only">Sort resources</label>
          <select
            id="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setRefineOpen(o => !o)}
          aria-expanded={refineOpen}
          aria-controls="refine-panel"
          className={refineOpen ? 'btn btn-secondary' : 'btn btn-ghost'}
          style={{ fontSize: 14, padding: '0 18px', whiteSpace: 'nowrap' }}
        >
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            style={{ marginRight: 8 }}>
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="8" y1="12" x2="20" y2="12"/>
            <line x1="12" y1="18" x2="20" y2="18"/>
          </svg>
          Refine{refineCount > 0 ? ` (${refineCount})` : ''}
        </button>
      </div>

      {/* Refine panel */}
      <div
        id="refine-panel"
        hidden={!refineOpen}
        style={{
          background: 'var(--bh-ice-050)',
          border: '1px solid var(--bh-ice-200)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 22px', marginBottom: 20,
        }}
      >
        <fieldset style={{ border: 'none', padding: 0, margin: 0, minWidth: 0 }}>
          <legend className="bh-kicker" style={{ marginBottom: 10, padding: 0 }}>
            Sponsors{activeSponsors.length > 0 ? ` (${activeSponsors.length})` : ''}
          </legend>

          {activeSponsors.length > 0 && (
            <div
              role="list"
              aria-label="Selected sponsors"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: 6,
                paddingBottom: 12, marginBottom: 12,
                borderBottom: '1px solid var(--bh-ice-200)',
              }}
            >
              {activeSponsors.map(name => (
                <button
                  key={name}
                  type="button"
                  role="listitem"
                  onClick={() => toggleSponsor(name)}
                  aria-label={`Remove ${name} filter`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12, fontWeight: 700,
                    padding: '5px 6px 5px 12px',
                    border: '1.5px solid var(--bh-red-800)',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--bh-red-800)',
                    color: '#fff', cursor: 'pointer', minHeight: 28,
                  }}
                >
                  <span>{name}</span>
                  <span aria-hidden="true" style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, lineHeight: 1,
                  }}>×</span>
                </button>
              ))}
            </div>
          )}

          <div style={{ position: 'relative', marginBottom: 12 }}>
            <label htmlFor="sponsor-search" className="sr-only">
              Filter the sponsor list
            </label>
            <svg aria-hidden="true" style={{
              position: 'absolute', left: 12, top: '50%',
              transform: 'translateY(-50%)',
              width: 14, height: 14, color: 'var(--bh-gray-700)',
              pointerEvents: 'none',
            }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              id="sponsor-search"
              type="search"
              placeholder={`Search ${allSponsors.length} sponsor${allSponsors.length === 1 ? '' : 's'}`}
              value={sponsorQuery}
              onChange={e => setSponsorQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 32px 9px 34px',
                fontFamily: 'var(--font-sans)',
                fontSize: 13, color: 'var(--bh-gray-900)',
                background: '#fff',
                border: '1.5px solid var(--bh-ice-300)',
                borderRadius: 'var(--radius-sm)',
                outline: 'none', minHeight: 38,
              }}
            />
            {sponsorQuery && (
              <button
                type="button"
                onClick={() => setSponsorQuery('')}
                aria-label="Clear sponsor search"
                style={{
                  position: 'absolute', right: 8, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', padding: 4,
                  color: 'var(--bh-gray-700)',
                  fontSize: 16, lineHeight: 1,
                  minWidth: 28, minHeight: 28,
                }}
              >×</button>
            )}
          </div>

          {isSearching ? (
            filteredSponsors.length === 0 ? (
              <p className="bh-small" style={{ color: 'var(--bh-gray-700)' }}>
                No sponsors match "{sponsorQuery}".
              </p>
            ) : (
              <>
                <div style={{
                  maxHeight: 240, overflowY: 'auto', paddingRight: 4,
                  display: 'flex', flexWrap: 'wrap', gap: 6,
                }}>
                  {visibleSponsors.map(name => (
                    <SponsorChip
                      key={name}
                      name={name}
                      selected={activeSponsors.includes(name)}
                      onToggle={() => toggleSponsor(name)}
                    />
                  ))}
                </div>
                {hiddenCount > 0 && (
                  <p className="bh-meta" style={{ marginTop: 10 }}>
                    Showing {visibleSponsors.length} of {filteredSponsors.length} — keep typing to narrow.
                  </p>
                )}
              </>
            )
          ) : (
            <SponsorMarquee
              sponsors={marqueeChips}
              activeSponsors={activeSponsors}
              onToggle={toggleSponsor}
            />
          )}
        </fieldset>
      </div>

      {/* Result count */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: 14, color: 'var(--bh-gray-700)',
          marginBottom: 20, padding: '10px 16px',
          background: 'var(--bh-gray-100)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--bh-gray-200)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}
      >
        <span>
          {loading
            ? 'Loading resources...'
            : filtered.length === 0
              ? 'No resources found'
              : `Showing ${(currentPage - 1) * PAGE_SIZE + 1} to ${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length} resource${filtered.length !== 1 ? 's' : ''}`
          }
        </span>
        {(activeType !== 'all' || localSearch || activeSponsors.length > 0 || sort !== 'modified') && (
          <button
            onClick={clearAll}
            className="btn-text"
            style={{ fontSize: 13, padding: 0 }}
            aria-label="Clear all active filters"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div role="alert" style={{
          padding: '16px 20px', background: '#FAEAEA',
          border: '2px solid var(--bh-red-800)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--bh-red-900)',
          fontSize: 14, fontWeight: 500,
          marginBottom: 20, lineHeight: 1.6,
        }}>
          <strong>Failed to load resources.</strong> Make sure the backend is running on port 3000.
        </div>
      )}

      {/* Skeletons */}
      {loading && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none' }}>
          {[1,2,3,4,5].map(i => (
            <li key={i}>
              <div role="status" aria-label="Loading resource" style={{
                background: '#fff',
                border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 24px',
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
              }}>
                <span className="sr-only">Loading...</span>
                <div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                    <div className="skeleton" style={{ height: 22, width: 100 }} />
                    <div className="skeleton" style={{ height: 20, width: 260 }} />
                  </div>
                  <div className="skeleton" style={{ height: 13, width: 160, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 13, width: '75%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div className="skeleton" style={{ height: 13, width: 90 }} />
                  <div className="skeleton" style={{ height: 36, width: 100, borderRadius: 4 }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div role="status" style={{
          textAlign: 'center', padding: '80px 32px',
          background: '#fff',
          border: '1px solid var(--bh-gray-200)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <h2 className="bh-h3" style={{ marginBottom: 12 }}>No resources found</h2>
          <p className="bh-body" style={{ color: 'var(--bh-gray-700)', marginBottom: 24 }}>
            Try adjusting your filters or clearing the search.
          </p>
          <button onClick={clearAll} className="btn btn-primary">
            Clear all filters
          </button>
        </div>
      )}

      {/* Asset rows */}
      {!loading && !error && paginated.length > 0 && (
        <>
          <ul style={{
            display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none',
            marginBottom: 32,
          }} aria-label="Available resources">
            {paginated.map(asset => (
              <li key={asset.id}>
                <AssetRow asset={asset} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </div>
  )
}

// ── SponsorChip ──────────────────────────────────────────────────

function SponsorChip({ name, selected, onToggle, interactive = true }) {
  return (
    <button
      type="button"
      onClick={interactive ? onToggle : undefined}
      aria-pressed={interactive ? selected : undefined}
      aria-hidden={interactive ? undefined : 'true'}
      tabIndex={interactive ? undefined : -1}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 12, fontWeight: selected ? 700 : 500,
        padding: '6px 12px',
        border: '1.5px solid',
        borderColor: selected ? 'var(--bh-red-800)' : 'var(--bh-ice-300)',
        borderRadius: 'var(--radius-pill)',
        background: selected ? 'var(--bh-red-800)' : '#fff',
        color: selected ? '#fff' : 'var(--bh-navy-800)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'all 0.15s',
        minHeight: 32, whiteSpace: 'nowrap',
      }}
    >{name}</button>
  )
}

// ── SponsorMarquee ───────────────────────────────────────────────

function SponsorMarquee({ sponsors, activeSponsors, onToggle }) {
  if (sponsors.length === 0) return null
  return (
    <div
      className="bh-marquee"
      role="region"
      aria-label="Sponsor list. Hover or focus to pause scrolling."
    >
      <div className="bh-marquee-track">
        {sponsors.map(name => (
          <SponsorChip
            key={`real-${name}`}
            name={name}
            selected={activeSponsors.includes(name)}
            onToggle={() => onToggle(name)}
          />
        ))}
        {sponsors.map(name => (
          <SponsorChip
            key={`clone-${name}`}
            name={name}
            selected={activeSponsors.includes(name)}
            onToggle={() => onToggle(name)}
            interactive={false}
          />
        ))}
      </div>
    </div>
  )
}

// ── Pagination ───────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
    return pages
  }

  const pageBtn = (label, targetPage, opts = {}) => {
    const isActive   = opts.active
    const isDisabled = opts.disabled
    const isDots     = opts.dots
    const key = opts.key ?? (isDots ? `dots-${targetPage}` : `page-${targetPage}`)

    return (
      <button
        key={key}
        onClick={() => !isDisabled && !isDots && onPageChange(targetPage)}
        aria-label={isDots ? undefined : `Page ${targetPage}`}
        aria-current={isActive ? 'page' : undefined}
        disabled={isDisabled || isDots}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14, fontWeight: isActive ? 700 : 400,
          padding: 0, width: 40, height: 40,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid',
          borderColor: isActive
            ? 'var(--bh-navy-800)'
            : isDisabled || isDots ? 'var(--bh-gray-200)' : 'var(--bh-ice-300)',
          borderRadius: 'var(--radius-sm)',
          background: isActive ? 'var(--bh-navy-800)' : '#fff',
          color: isActive
            ? '#fff'
            : isDisabled || isDots ? 'var(--bh-gray-300)' : 'var(--bh-navy-800)',
          cursor: isDisabled || isDots ? 'default' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        {isDots ? '...' : label}
      </button>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
    >
      {pageBtn(
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6"/>
        </svg>,
        currentPage - 1,
        { disabled: currentPage === 1, key: 'prev' }
      )}

      {getPages().map((p, i) =>
        p === '...'
          ? pageBtn('...', i, { dots: true, key: `dots-${i}` })
          : pageBtn(p, p, { active: p === currentPage })
      )}

      {pageBtn(
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5">
          <path d="m9 18 6-6-6-6"/>
        </svg>,
        currentPage + 1,
        { disabled: currentPage === totalPages, key: 'next' }
      )}
    </nav>
  )
}

// ── AssetRow ─────────────────────────────────────────────────────

function AssetRow({ asset }) {
  const cfg      = getConfig(asset.assetType)
  const date     = formatDate(asset.executionDate || asset.expirationDate)
  const unlocked = isUnlocked(asset.id)

  return (
    <Link
      to={`/assets/${asset.id}`}
      onClick={() => trackView(asset.id)}
      className="bh-card-hover asset-row"
      aria-label={`${cfg.label}: ${asset.name}${unlocked ? ', already registered' : ''}`}
      style={{
        display: 'grid', gridTemplateColumns: '1fr auto',
        gap: 24, alignItems: 'center',
        background: '#fff',
        border: '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        textDecoration: 'none',
      }}
    >
      <div>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 8, flexWrap: 'wrap',
        }}>
          <Badge type={asset.assetType} />
          <h2 className="bh-headline" style={{ fontSize: 'var(--fs-md)' }}>
            {asset.name}
          </h2>
        </div>

        <p className="bh-byline" style={{ color: 'var(--bh-gray-700)', marginBottom: 8 }}>
          <span className="sr-only">Sponsored by </span>
          {asset.sponsorName}
        </p>

        <p className="bh-body" style={{
          fontSize: 'var(--fs-sm)', color: 'var(--bh-gray-700)',
          display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden', maxWidth: 700,
        }}>{asset.description}</p>

        {asset.assetType === 'Live Webinar' && asset.speakers?.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
            <div aria-hidden="true" style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'var(--bh-ice-100)',
              border: '1.5px solid var(--bh-ice-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700,
              color: 'var(--bh-navy-800)', flexShrink: 0,
            }}>
              {asset.speakers[0].firstName[0]}{asset.speakers[0].lastName[0]}
            </div>
            <span className="bh-small" style={{ color: 'var(--bh-gray-700)' }}>
              {asset.speakers[0].firstName} {asset.speakers[0].lastName}
              {' · '}{asset.speakers[0].jobTitle}, {asset.speakers[0].companyName}
            </span>
          </div>
        )}
      </div>

      <div className="asset-row-actions" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', gap: 10, flexShrink: 0,
      }}>
        {date && (
          <time
            dateTime={asset.executionDate || asset.expirationDate}
            className="bh-meta"
            style={{ whiteSpace: 'nowrap', color: 'var(--bh-gray-700)' }}
          >{date}</time>
        )}
        {unlocked ? (
          <span className="bh-label" style={{
            color: 'var(--bh-navy-800)',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Registered
          </span>
        ) : (
          <span className="bh-label" style={{ color: 'var(--bh-red-800)' }}>
            {cfg.verb} →
          </span>
        )}
      </div>
    </Link>
  )
}