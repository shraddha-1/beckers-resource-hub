import { Link } from 'react-router-dom'
import GoogleAuthButton from './GoogleAuthButton'

// Conversion gate that lives in the right column of the asset detail
// page. Order is intentional: the lowest-friction path (Google) sits
// at the top, then the email-based form route, then a one-line trust
// note. Copy adapts to the asset type so "Get the report" and "Save
// your seat" don't both read the same.

const ACTION_BY_TYPE = {
  'Live Webinar':       { headline: 'Save your seat',     sub: 'Confirm your spot for this live session.',  primary: 'Continue with email' },
  'On-Demand Webinar':  { headline: 'Watch the replay',   sub: 'Unlock the on-demand recording in seconds.', primary: 'Continue with email' },
  'Whitepaper':         { headline: 'Get the report',     sub: 'Read the full research and download the PDF.', primary: 'Continue with email' },
  'on-demand podcast':  { headline: 'Listen to the show', sub: 'Unlock the episode and the show notes.',    primary: 'Continue with email' },
}

export default function ContentGate({ asset, onGoogleSuccess }) {
  const copy = ACTION_BY_TYPE[asset.assetType] || {
    headline: 'Get access',
    sub: 'Unlock this resource in seconds.',
    primary: 'Continue with email',
  }

  return (
    <aside
      aria-labelledby="content-gate-heading"
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
        color: '#fff',
      }}>
        <h2
          id="content-gate-heading"
          className="bh-h4"
          style={{ color: '#fff' }}
        >{copy.headline}</h2>
        <p className="bh-small" style={{
          marginTop: 6,
          color: 'var(--bh-ice-100)',
        }}>{copy.sub}</p>
      </header>

      <div style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}>
        <GoogleAuthButton onSuccess={onGoogleSuccess} />

        <div
          aria-hidden="true"
          className="bh-kicker"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: 'var(--bh-gray-500)',
          }}
        >
          <span style={{ flex: 1, height: 1, background: 'var(--bh-gray-200)' }} />
          <span>or</span>
          <span style={{ flex: 1, height: 1, background: 'var(--bh-gray-200)' }} />
        </div>

        <Link
          to={`/assets/${asset.id}/signup?via=gate`}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: 15 }}
          aria-label={`${copy.primary} for ${asset.name}`}
        >{copy.primary}</Link>

        <p className="bh-meta" style={{
          color: 'var(--bh-gray-700)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Free, no credit card. We'll never share your email.
        </p>
      </div>
    </aside>
  )
}
