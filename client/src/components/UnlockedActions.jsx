// Replaces the ContentGate when the asset is already unlocked. Renders
// a type-appropriate primary action (download / watch / listen /
// register) plus a quiet acknowledgment that the visitor has access.
// Typography pulled from the design-system scale.

const ACTION_BY_TYPE = {
  'Live Webinar':       { label: 'Add to calendar',       sub: 'Your seat is confirmed.' },
  'On-Demand Webinar':  { label: 'Watch now',             sub: 'You have full access to the recording.' },
  'Whitepaper':         { label: 'Read the PDF',          sub: 'You have access to the full report.' },
  'on-demand podcast':  { label: 'Listen to the episode', sub: 'You have access to the full conversation.' },
}

export default function UnlockedActions({ asset }) {
  const cfg = ACTION_BY_TYPE[asset.assetType] || {
    label: 'Open resource', sub: 'You have access to this resource.',
  }

  const isPdf = !!asset.pdfUrl
  const href = isPdf ? asset.pdfUrl : '#'

  return (
    <aside
      aria-labelledby="unlocked-heading"
      className="dark-surface"
      style={{
        background: '#fff',
        border: '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <header style={{
        background: 'var(--bh-navy-800)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span aria-hidden="true" style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--bh-ice-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--bh-navy-800)" strokeWidth="3" strokeLinecap="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div>
          <h2
            id="unlocked-heading"
            className="bh-h4"
            style={{ color: '#fff', fontSize: 'var(--fs-md)' }}
          >Access unlocked</h2>
          <p className="bh-meta" style={{
            marginTop: 4,
            color: 'var(--bh-ice-100)',
          }}>{cfg.sub}</p>
        </div>
      </header>

      <div style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <a
          href={href}
          target={isPdf ? '_blank' : undefined}
          rel={isPdf ? 'noopener noreferrer' : undefined}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: 15 }}
          aria-label={`${cfg.label}: ${asset.name} (opens in a new tab)`}
        >{cfg.label}{isPdf ? ' →' : ''}</a>

        <p className="bh-meta" style={{
          color: 'var(--bh-gray-700)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Sponsored by <strong>{asset.sponsorName}</strong>. We may share your
          contact information with this sponsor.
        </p>
      </div>
    </aside>
  )
}
