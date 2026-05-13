import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAssets } from '../lib/api'
import { getConfig, formatDate } from '../lib/assetHelpers'
import {
  trackView,
  getRecentlyViewedIds,
  clearRecentlyViewed,
} from '../lib/recentlyViewed'
import AudienceBar from '../components/AudienceBar'
import Badge from '../components/Badge'
import flagship from '../data/flagship.json'

const HOW_IT_WORKS = [
  { n: '01', title: 'Browse the library',          body: 'Webinars, whitepapers, and podcasts.' },
  { n: '02', title: 'Preview the brief',           body: "See what's inside before signing up." },
  { n: '03', title: 'Unlock with email or Google', body: 'Free, no credit card.' },
]

export default function Home() {
  const [assets, setAssets]                 = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [loading, setLoading]               = useState(true)
  const [email, setEmail]                   = useState('')
  const [subscribed, setSubscribed]         = useState(false)

  useEffect(() => {
    getAssets()
      .then(data => {
        setAssets(data)
        const stored = getRecentlyViewedIds()
        if (stored.length > 0) {
          const matched = stored
            .map(id => data.find(a => a.id === id))
            .filter(Boolean)
            .slice(0, 3)
          setRecentlyViewed(matched)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // flagship is the local JSON import — always defined, never from the API.
  // The other two cards come from the API sorted by lastModifiedDate.
  const featured = useMemo(() => {
    const sorted = [...assets].sort(
      (a, b) =>
        new Date(b.lastModifiedDate || 0).getTime() -
        new Date(a.lastModifiedDate || 0).getTime()
    )
    return [flagship, ...sorted.slice(0, 2)]
  }, [assets])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
  }

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        aria-labelledby="hero-heading"
        className="dark-surface"
        style={{ background: 'var(--bh-navy-800)', padding: '80px 32px' }}
      >
        <div className="hero-grid" style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 0.85fr)',
          gap: 56, alignItems: 'center',
        }}>
          {/* Left — copy + CTAs */}
          <div className="bh-section-stack" style={{ '--stack-gap': '20px' }}>
            <p className="bh-kicker-inverse">
              Becker's Resource Hub
            </p>

            <h1
              id="hero-heading"
              className="bh-display-2"
              style={{
                color: '#fff',
                textWrap: 'balance',
                maxWidth: '14ch',
                fontSize: 'clamp(40px, 5.5vw, 60px)',
              }}
            >
              The resource library for health system leaders
            </h1>

            <p className="bh-body-lg" style={{
              color: 'var(--bh-ice-100)',
              maxWidth: '52ch',
            }}>
              Webinars, whitepapers, and podcasts curated for hospital
              executives and clinicians navigating a complex industry.
            </p>

            <div style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: 8,
            }}>
              <Link to="/assets" className="btn btn-primary">
                Browse the full library
              </Link>
              
            </div>
          </div>

          {/* Right — How it works card */}
          <HowItWorksCard />
        </div>
      </section>

      {/* ── 2. Audience composition ── */}
      <section
        aria-labelledby="audience-heading"
        style={{ background: '#fff', padding: '64px 32px 56px' }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <p className="bh-kicker" style={{ marginBottom: 10 }}>
            Who we reach
          </p>
          <h2
            id="audience-heading"
            className="bh-h3"
            style={{ marginBottom: 24, textWrap: 'balance' }}
          >
            The Becker's audience, at a glance
          </h2>

          <AudienceBar
            caption="Trusted reach across hospital and health-system leadership."
          />
        </div>
      </section>

      {/* ── 3. Featured ── */}
      <section
        id="featured"
        aria-labelledby="featured-heading"
        style={{ background: 'var(--color-bg-tinted)', padding: '72px 32px' }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: '1px solid var(--bh-ice-200)',
            gap: 16,
            flexWrap: 'wrap',
          }}>
            <div>
              <p className="bh-kicker" style={{ marginBottom: 8 }}>
                Featured Resources
              </p>
              <h2 id="featured-heading" className="bh-h3" style={{ textWrap: 'balance' }}>
                Selected for health system executives
              </h2>
            </div>
            <Link to="/assets" className="btn-text">
              View all resources →
            </Link>
          </header>

          <ul style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            listStyle: 'none',
          }} aria-label="Featured resources">
            {loading
              ? [1, 2, 3].map(i => <li key={i}><SkeletonCard /></li>)
              : featured.map(asset => (
                  <li key={asset.id}>
                    <FeaturedCard
                      asset={asset}
                      isFlagship={asset.id === flagship.id}
                    />
                  </li>
                ))
            }
          </ul>
        </div>
      </section>

      {/* ── 4. Recently viewed ── */}
      {recentlyViewed.length > 0 && (
        <section
          aria-labelledby="recent-heading"
          style={{ background: '#fff', padding: '64px 32px' }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <header style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 24,
              gap: 16,
              flexWrap: 'wrap',
            }}>
              <div>
                <p className="bh-kicker" style={{ marginBottom: 8 }}>
                  Your activity
                </p>
                <h2 id="recent-heading" className="bh-h3">Recently viewed</h2>
              </div>
              <button
                onClick={() => {
                  clearRecentlyViewed()
                  setRecentlyViewed([])
                }}
                className="btn-text"
                style={{ fontSize: 13 }}
                aria-label="Clear recently viewed history"
              >Clear history</button>
            </header>

            <ul style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              listStyle: 'none',
            }} aria-label="Recently viewed resources">
              {recentlyViewed.map(asset => (
                <li key={asset.id}>
                  <FeaturedCard asset={asset} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Divider ── */}
      <div style={{ background: 'var(--bh-gray-900)', height: 3 }} aria-hidden="true" />

      {/* ── 5. Newsletter ── */}
      <section
        id="subscribe"
        aria-labelledby="subscribe-heading"
        className="dark-surface"
        style={{ background: 'var(--bh-navy-900)', padding: '64px 32px' }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p className="bh-kicker-inverse" style={{ marginBottom: 12 }}>Newsletter</p>

          <h2 id="subscribe-heading" className="bh-h3" style={{
            color: '#fff',
            marginBottom: 12,
            textWrap: 'balance',
          }}>
            Get Becker's in your inbox
          </h2>

          <p className="bh-body-lg" style={{
            color: 'var(--bh-ice-100)',
            marginBottom: 28,
            maxWidth: '52ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Join 500,000+ healthcare executives who start the day with
            Becker's. Top resources and articles, delivered daily.
          </p>

          {subscribed ? (
            <div role="status" aria-live="polite" style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 24px',
              color: '#fff',
              fontSize: 15, fontWeight: 500,
            }}>
              Thanks. Check your inbox to confirm your subscription.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate>
              <div style={{ display: 'flex', maxWidth: 480, margin: '0 auto' }}>
                <label htmlFor="subscribe-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="email"
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    padding: '12px 16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRight: 'none',
                    borderRadius: '4px 0 0 4px',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: '0 4px 4px 0', whiteSpace: 'nowrap' }}
                >Subscribe today</button>
              </div>
            </form>
          )}

          <p className="bh-meta" style={{
            color: 'var(--bh-ice-200)',
            marginTop: 16,
          }}>
            Free to join. Unsubscribe any time.
          </p>
        </div>
      </section>
    </>
  )
}

// ── HowItWorksCard ──────────────────────────────────────────────

function HowItWorksCard() {
  return (
    <aside
      aria-labelledby="how-it-works-heading"
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 28px 24px',
        boxShadow: 'var(--shadow-lg)',
        backdropFilter: 'blur(2px)',
        overflow: 'hidden',
      }}
    >
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'var(--bh-red-800)',
      }} />

      <h2
        id="how-it-works-heading"
        className="bh-kicker-inverse"
        style={{ marginBottom: 20 }}
      >
        How it works
      </h2>

      <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
        {HOW_IT_WORKS.map((step, i) => (
          <li
            key={step.n}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 16,
              alignItems: 'flex-start',
            }}
          >
            <DiscColumn n={step.n} isLast={i === HOW_IT_WORKS.length - 1} />
            <div style={{
              paddingBottom: i === HOW_IT_WORKS.length - 1 ? 0 : 18,
            }}>
              <div className="bh-label" style={{
                color: '#fff',
                fontSize: 'var(--fs-base)',
                lineHeight: 1.3,
              }}>{step.title}</div>
              <div className="bh-small" style={{
                color: 'var(--bh-ice-200)',
                marginTop: 4,
              }}>{step.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  )
}

function DiscColumn({ n, isLast }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      <span
        aria-hidden="true"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#fff',
          color: 'var(--bh-red-800)',
          display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-serif)',
          fontWeight: 'var(--fw-bold)',
          fontSize: 14,
          letterSpacing: '-0.01em',
          flexShrink: 0,
        }}
      >{n}</span>
      {!isLast && (
        <span
          aria-hidden="true"
          style={{
            flex: 1,
            width: 1,
            background: 'var(--bh-red-800)',
            opacity: 0.5,
            marginTop: 4,
            marginBottom: 4,
            minHeight: 20,
          }}
        />
      )}
    </div>
  )
}

// ── FeaturedCard ─────────────────────────────────────────────────

function FeaturedCard({ asset, isFlagship }) {
  const cfg  = getConfig(asset.assetType)
  const date = formatDate(asset.executionDate || asset.expirationDate)

  return (
    <Link
      to={`/assets/${asset.id}`}
      onClick={() => trackView(asset.id)}
      className="bh-card-hover"
      aria-label={`${cfg.label}${isFlagship ? ', flagship report' : ''}: ${asset.name}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#fff',
        border: isFlagship
          ? '1px solid var(--bh-navy-800)'
          : '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',
        boxShadow: isFlagship ? 'var(--shadow-md)' : 'none',
      }}
    >
      {isFlagship && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 3, background: 'var(--bh-red-800)',
          }}
        />
      )}

      <div style={{ padding: '20px 20px 16px', flex: 1 }}>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 12,
          flexWrap: 'wrap',
        }}>
          <Badge type={asset.assetType} />
          {isFlagship && (
            <span className="bh-kicker" style={{ color: 'var(--bh-red-800)' }}>
              Flagship report
            </span>
          )}
        </div>

        <h3 className="bh-headline" style={{
          fontSize: 'var(--fs-md)',
          marginBottom: 8,
        }}>{asset.name}</h3>

        <p className="bh-byline" style={{
          color: 'var(--bh-gray-700)',
          marginBottom: 10,
        }}>
          <span className="sr-only">Sponsored by </span>
          {asset.sponsorName}
        </p>

        <p className="bh-body" style={{
          fontSize: 'var(--fs-sm)',
          color: 'var(--bh-gray-700)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{asset.description}</p>
      </div>

      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--bh-ice-200)',
        background: 'var(--bh-gray-050)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <time
          dateTime={asset.executionDate || asset.expirationDate}
          className="bh-meta"
          style={{ color: 'var(--bh-gray-700)' }}
        >
          {date || 'On demand'}
        </time>
        <span className="bh-label" style={{ color: 'var(--bh-red-800)' }}>
          {cfg.verb} →
        </span>
      </div>
    </Link>
  )
}

// ── SkeletonCard ─────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div role="status" aria-label="Loading resource" style={{
      background: '#fff',
      border: '1px solid var(--bh-ice-200)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    }}>
      <span className="sr-only">Loading...</span>
      <div style={{ padding: 20 }}>
        <div className="skeleton" style={{ height: 22, width: 100, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 20, width: '85%', marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 20, width: '65%', marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 13, width: '90%', marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 13, width: '70%' }} />
      </div>
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--bh-ice-200)',
        background: 'var(--bh-gray-050)',
        display: 'flex', justifyContent: 'space-between',
      }}>
        <div className="skeleton" style={{ height: 13, width: 80 }} />
        <div className="skeleton" style={{ height: 13, width: 60 }} />
      </div>
    </div>
  )
}