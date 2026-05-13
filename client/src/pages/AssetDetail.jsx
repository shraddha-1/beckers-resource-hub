import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAsset, getAssets } from '../lib/api'
import { getConfig, formatDate } from '../lib/assetHelpers'
import { isUnlocked, markUnlocked } from '../lib/unlocks'
import AssetBrief from '../components/AssetBrief'
import Badge from '../components/Badge'
import Signup from './Signup'
import UnlockedActions from '../components/UnlockedActions'
import { trackView } from '../lib/recentlyViewed'

export default function AssetDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [asset, setAsset]       = useState(null)
  const [related, setRelated]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setAsset(null)
    setRelated([])
    setLoading(true)
    setUnlocked(isUnlocked(id))
    trackView(id)

    Promise.all([getAsset(id), getAssets()])
      .then(([a, all]) => {
        setAsset(a)
        const others = all
          .filter(x => x.id !== id && (
            x.assetType === a.assetType || x.sponsorName === a.sponsorName
          ))
          .slice(0, 3)
        setRelated(others)
      })
      .catch(() => navigate('/assets'))
      .finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) return <DetailSkeleton />
  if (!asset)  return null

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '32px 32px 80px',
    }}>
      <Breadcrumb assetName={asset.name} />

      <div className="asset-detail-grid">
        {/* LEFT — editorial brief + related */}
        <div>
          <AssetBrief asset={asset} />
          {related.length > 0 && <RelatedAssets related={related} />}
        </div>

        {/* RIGHT — sticky signup form or unlocked actions */}
        <div className="gate-sticky">
          {unlocked ? (
            <UnlockedActions asset={asset} />
          ) : (
            <Signup
              asset={asset}
              related={related}
              onSuccess={() => {
                markUnlocked(asset.id)
                setUnlocked(true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          )}
          <SponsorMiniCard sponsorName={asset.sponsorName} />
        </div>
      </div>
    </div>
  )
}

function Breadcrumb({ assetName }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
      <ol style={{
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        <li>
          <Link to="/" className="bh-link bh-small">Home</Link>
        </li>
        <li aria-hidden="true" className="bh-small" style={{ color: 'var(--bh-gray-500)' }}>/</li>
        <li>
          <Link to="/assets" className="bh-link bh-small">Resources</Link>
        </li>
        <li aria-hidden="true" className="bh-small" style={{ color: 'var(--bh-gray-500)' }}>/</li>
        <li
          aria-current="page"
          className="bh-label"
          style={{
            maxWidth: '40ch',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >{assetName}</li>
      </ol>
    </nav>
  )
}

function SponsorMiniCard({ sponsorName }) {
  return (
    <aside
      aria-label={`About sponsor ${sponsorName}`}
      style={{
        marginTop: 16,
        background: 'var(--bh-ice-050)',
        border: '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 18px',
      }}
    >
      <p className="bh-kicker" style={{ marginBottom: 8 }}>Sponsored content</p>
      <p className="bh-small" style={{ lineHeight: 1.55 }}>
        This resource is produced in partnership with{' '}
        <strong style={{ color: 'var(--bh-navy-800)' }}>{sponsorName}</strong>.
        Becker's editorial standards apply.
      </p>
    </aside>
  )
}

function RelatedAssets({ related }) {
  return (
    <section
      aria-labelledby="related-heading"
      style={{
        marginTop: 48,
        paddingTop: 24,
        borderTop: '1px solid var(--bh-ice-200)',
      }}
    >
      <h2
        id="related-heading"
        className="bh-kicker"
        style={{ marginBottom: 16 }}
      >Related resources</h2>
      <ul style={{
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 12,
      }}>
        {related.map(a => {
          const c    = getConfig(a.assetType)
          const date = formatDate(a.executionDate || a.expirationDate)
          return (
            <li key={a.id}>
              <Link
                to={`/assets/${a.id}`}
                className="bh-card-hover"
                aria-label={`${c.label}: ${a.name}`}
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid var(--bh-ice-200)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px 16px',
                  textDecoration: 'none',
                  height: '100%',
                }}
              >
                <div style={{ marginBottom: 6 }}>
                  <Badge type={a.assetType} />
                </div>
                <h3 className="bh-headline" style={{
                  fontSize: 'var(--fs-md)',
                  marginBottom: 8,
                }}>{a.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {date ? (
                    <time dateTime={a.executionDate || a.expirationDate} className="bh-meta">
                      {date}
                    </time>
                  ) : <span className="bh-meta">On demand</span>}
                  <span className="bh-label" style={{ color: 'var(--bh-red-800)' }}>
                    {c.verb} →
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Loading resource"
      style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 80px' }}
    >
      <span className="sr-only">Loading...</span>
      <div className="skeleton" style={{ height: 14, width: 220, marginBottom: 24 }} />
      <div className="asset-detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="skeleton" style={{ height: 22, width: 110 }} />
          <div className="skeleton" style={{ height: 36, width: '95%' }} />
          <div className="skeleton" style={{ height: 36, width: '70%' }} />
          <div className="skeleton" style={{ height: 18, width: '100%', marginTop: 8 }} />
          <div className="skeleton" style={{ height: 18, width: '90%' }} />
          <div className="skeleton" style={{ height: 18, width: '95%' }} />
          <div className="skeleton" style={{ height: 200, width: '100%', marginTop: 16, borderRadius: 8 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="skeleton" style={{ height: 70, width: '100%', borderRadius: 8 }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
        </div>
      </div>
    </div>
  )
}