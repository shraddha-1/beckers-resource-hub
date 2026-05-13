import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BHR_SITES = [
  { id: 'resource-hub', label: 'Resource Hub' },
  { id: 'bhr',          label: 'BHR' },
  { id: 'clinical',     label: 'Clinical' },
  { id: 'hit',          label: 'Health IT' },
  { id: 'cfo',          label: 'CFO' },
  { id: 'asc',          label: 'ASC' },
  { id: 'dental',       label: 'Dental' },
  { id: 'payer',        label: 'Payer' },
  { id: 'behavioral',   label: 'Behavioral' },
  { id: 'physician',    label: 'Physician' },
]

const RESOURCE_LINKS = [
  { label: 'Live Webinars',     type: 'Live Webinar' },
  { label: 'OnDemand Webinars', type: 'On-Demand Webinar' },
  { label: 'Whitepapers',       type: 'Whitepaper' },
  { label: 'Podcasts',          type: 'on-demand podcast' },
]

export default function Nav() {
  const { pathname } = useLocation()
  const [currentSite, setCurrentSite]         = useState('resource-hub')
  const [resourcesOpen, setResourcesOpen]     = useState(false)
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [mobileSitesOpen, setMobileSitesOpen] = useState(false)

  return (
    <header role="banner">

      {/* ── Site switcher ── */}
      <div className="hide-mobile" style={{
        background: '#fff',
        borderBottom: '1px solid var(--bh-gray-200)',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'stretch',
          minWidth: 0,
        }}>

          {/* Site links — scrollable on tablet */}
          <nav
            className="site-switcher-nav"
            aria-label="Becker's sites"
            style={{ display: 'flex', gap: 0, minWidth: 0, flexShrink: 1 }}
          >
            {BHR_SITES.map(s => (
              <a
                key={s.id}
                href="#"
                aria-current={s.id === currentSite ? 'page' : undefined}
                onClick={e => { e.preventDefault(); setCurrentSite(s.id) }}
                style={{
                  padding: '10px 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13, fontWeight: 600,
                  color: s.id === currentSite ? '#fff' : 'var(--bh-navy-800)',
                  background: s.id === currentSite ? 'var(--bh-navy-800)' : 'transparent',
                  textDecoration: 'none',
                  borderRight: '1px solid var(--bh-gray-200)',
                  whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center',
                  transition: 'background 0.1s',
                  minHeight: 60,
                }}
                onMouseEnter={e => {
                  if (s.id !== currentSite)
                    e.currentTarget.style.background = 'var(--bh-ice-050)'
                }}
                onMouseLeave={e => {
                  if (s.id !== currentSite)
                    e.currentTarget.style.background = 'transparent'
                }}
              >{s.label}</a>
            ))}
          </nav>

          {/* Right side */}
          <div
            className="site-switcher-right"
            style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: 20,
              paddingLeft: 20,
              borderLeft: '1px solid var(--bh-gray-200)',
              flexShrink: 0,
            }}
          >
            <a
              href="#"
              className="site-switcher-about"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13, fontWeight: 600,
                color: 'var(--bh-navy-800)',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 3,
                whiteSpace: 'nowrap',
              }}
            >
              About
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>

            <a
              href="#"
              className="site-switcher-sponsors"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13, fontWeight: 600,
                color: 'var(--bh-navy-800)',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 3,
                whiteSpace: 'nowrap',
              }}
            >
              For Sponsors
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </a>

            <a href="/#subscribe" className="subscribe-btn">
              Subscribe
              <span className="arrow-circle" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main masthead ── */}
      <div style={{
        background: '#fff',
        borderBottom: '3px solid var(--bh-red-800)',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 3px rgba(9,31,62,0.08)',
      }}>
        <div
          className="masthead-inner"
          style={{
            maxWidth: 1200, margin: '0 auto',
            padding: '0 24px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: 64, gap: 32,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="Becker's Resource Hub home"
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11, fontWeight: 700,
              color: 'var(--bh-gray-500)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              lineHeight: 1, marginBottom: 3,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>Becker's</span>
              <span aria-hidden="true" style={{
                display: 'inline-block', width: 28, height: 1,
                background: 'var(--bh-gray-300)',
              }} />
            </div>
            <div
              className="logo-product"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 20, fontWeight: 700,
                color: 'var(--bh-red-800)',
                lineHeight: 1, letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
            >Resource Hub</div>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="desktop-nav"
            style={{ display: 'flex', gap: 0, flex: 1 }}
          >
            {/* Resources dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                onClick={() => setResourcesOpen(o => !o)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 15, fontWeight: 600,
                  color: pathname.startsWith('/assets')
                    ? 'var(--bh-red-800)' : 'var(--bh-gray-900)',
                  background: 'none', border: 'none',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '0 20px 0 0', height: 64,
                  minHeight: 44,
                }}
                onMouseEnter={e => {
                  if (!pathname.startsWith('/assets'))
                    e.currentTarget.style.color = 'var(--bh-red-800)'
                }}
                onMouseLeave={e => {
                  if (!pathname.startsWith('/assets'))
                    e.currentTarget.style.color = 'var(--bh-gray-900)'
                }}
              >
                Resources
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  aria-hidden="true"
                  style={{
                    transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.15s',
                  }}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {resourcesOpen && (
                <ul style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#fff',
                  border: '1px solid var(--bh-gray-200)',
                  borderTop: '2px solid var(--bh-red-800)',
                  borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                  boxShadow: '0 12px 28px rgba(9,31,62,0.12)',
                  minWidth: 200, zIndex: 200,
                  listStyle: 'none', padding: '6px 0', marginTop: 0,
                }}>
                  <li>
                    <Link
                      to="/assets"
                      onClick={() => setResourcesOpen(false)}
                      style={{
                        display: 'block', padding: '10px 20px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14, fontWeight: 700,
                        color: 'var(--bh-gray-900)', textDecoration: 'none',
                        borderBottom: '1px solid var(--bh-gray-200)',
                        marginBottom: 4,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--bh-red-800)'
                        e.currentTarget.style.background = 'var(--bh-ice-050)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--bh-gray-900)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >All Resources</Link>
                  </li>
                  {RESOURCE_LINKS.map(({ label, type }) => (
                    <li key={type}>
                      <Link
                        to={`/assets?type=${encodeURIComponent(type)}`}
                        onClick={() => setResourcesOpen(false)}
                        style={{
                          display: 'block', padding: '9px 20px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: 14, fontWeight: 600,
                          color: 'var(--bh-gray-900)', textDecoration: 'none',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = 'var(--bh-red-800)'
                          e.currentTarget.style.background = 'var(--bh-ice-050)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = 'var(--bh-gray-900)'
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >{label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a
              href="#"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15, fontWeight: 600,
                color: 'var(--bh-gray-900)',
                textDecoration: 'none',
                padding: '0 20px 0 0',
                display: 'flex', alignItems: 'center', height: 64,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--bh-red-800)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--bh-gray-900)'}
            >Events</a>
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(o => !o)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 8,
              color: 'var(--bh-gray-900)',
              minWidth: 44, minHeight: 44,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {mobileOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="mobile-nav"
            style={{ background: '#fff', borderTop: '1px solid var(--bh-gray-200)' }}
          >
            {/* Subscribe strip */}
            <div style={{
              padding: '14px 24px',
              background: 'var(--bh-navy-800)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 16,
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--bh-ice-100)', /* 8.9:1 on navy. Passes AAA */
              }}>
                Join 500,000+ healthcare executives
              </span>
              <a
                href="/#subscribe"
                onClick={() => setMobileOpen(false)}
                className="subscribe-btn"
                style={{ fontSize: 12, padding: '6px 14px', minHeight: 36 }}
              >
                Subscribe
                <span className="arrow-circle" aria-hidden="true">→</span>
              </a>
            </div>

            {/* All Resources */}
            <Link
              to="/assets"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontSize: 15, fontWeight: 700,
                color: 'var(--bh-gray-900)', /* 16.1:1. Passes AAA */
                borderBottom: '1px solid var(--bh-gray-200)',
                textDecoration: 'none',
              }}
            >All Resources</Link>

            {/* Resource type links */}
            {RESOURCE_LINKS.map(({ label, type }) => (
              <Link
                key={type}
                to={`/assets?type=${encodeURIComponent(type)}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '12px 24px 12px 40px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'var(--bh-gray-700)', /* 9.7:1. Passes AAA */
                  borderBottom: '1px solid var(--bh-gray-100)',
                  textDecoration: 'none',
                }}
              >{label}</Link>
            ))}

            {/* Events */}
            <a href="#" style={{
              display: 'block', padding: '14px 24px',
              fontFamily: 'var(--font-sans)',
              fontSize: 15, fontWeight: 600,
              color: 'var(--bh-gray-900)',
              borderBottom: '1px solid var(--bh-gray-200)',
              textDecoration: 'none',
            }}>Events</a>

            {/* Design decisions */}
            <Link
              to="/decisions"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontSize: 15, fontWeight: 600,
                color: 'var(--bh-gray-900)',
                borderBottom: '1px solid var(--bh-gray-200)',
                textDecoration: 'none',
              }}
            >Design decisions</Link>

            {/* Other Becker's sites — collapsible */}
            <div>
              <button
                aria-expanded={mobileSitesOpen}
                onClick={() => setMobileSitesOpen(o => !o)}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14, fontWeight: 600,
                  color: 'var(--bh-gray-700)',
                  background: 'var(--bh-ice-050)',
                  border: 'none',
                  borderBottom: mobileSitesOpen
                    ? '1px solid var(--bh-gray-200)' : 'none',
                  cursor: 'pointer', textAlign: 'left',
                  minHeight: 44,
                }}
              >
                Other Becker's sites
                <svg
                  width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  aria-hidden="true"
                  style={{
                    transform: mobileSitesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.15s',
                    flexShrink: 0,
                  }}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {mobileSitesOpen && (
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 1, background: 'var(--bh-gray-200)',
                  borderBottom: '1px solid var(--bh-gray-200)',
                }}>
                  {BHR_SITES.map(s => (
                    <a
                      key={s.id}
                      href="#"
                      aria-current={s.id === currentSite ? 'page' : undefined}
                      onClick={e => {
                        e.preventDefault()
                        setCurrentSite(s.id)
                        setMobileSitesOpen(false)
                      }}
                      style={{
                        padding: '12px 8px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13, fontWeight: 600,
                        textAlign: 'center',
                        color: s.id === currentSite ? '#fff' : 'var(--bh-navy-800)',
                        background: s.id === currentSite
                          ? 'var(--bh-navy-800)' : '#fff',
                        textDecoration: 'none',
                        display: 'block',
                        minHeight: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >{s.label}</a>
                  ))}
                </div>
              )}
            </div>

            {/* About + For Sponsors */}
            <div style={{
              display: 'flex',
              borderTop: '1px solid var(--bh-gray-200)',
            }}>
              <a href="#" style={{
                flex: 1, padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontSize: 14, fontWeight: 600,
                color: 'var(--bh-gray-700)',
                borderRight: '1px solid var(--bh-gray-200)',
                textDecoration: 'none',
                minHeight: 44,
                display: 'flex', alignItems: 'center',
              }}>About</a>
              <a href="#" style={{
                flex: 1, padding: '14px 24px',
                fontFamily: 'var(--font-sans)',
                fontSize: 14, fontWeight: 600,
                color: 'var(--bh-gray-700)',
                textDecoration: 'none',
                minHeight: 44,
                display: 'flex', alignItems: 'center',
              }}>For Sponsors</a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}