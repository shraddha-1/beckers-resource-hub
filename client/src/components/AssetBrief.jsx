import { Link } from 'react-router-dom'
import { formatDate, getOutlineForType } from '../lib/assetHelpers'
import Badge from './Badge'
import LockedPreview from './LockedPreview'
import PullQuote from './PullQuote'
import SpeakerList from './SpeakerList'
import StatCallout from './StatCallout'

// One editorial brief, rendered identically on the asset detail and
// signup pages. Keeps the experience coherent: the visitor sees the
// same title, meta row, description, stats, quote, outline, and
// speakers whether they're evaluating the asset or filling out the
// form to unlock it.

export default function AssetBrief({ asset }) {
  if (!asset) return null

  const exec    = formatDate(asset.executionDate)
  const expires = formatDate(asset.expirationDate)
  const outline = getOutlineForType(asset)

  return (
    <article aria-label="Resource details" className="bh-section-stack">
      <div>
        <Badge type={asset.assetType} />
      </div>

      <h1
        className="bh-h1"
        style={{
          letterSpacing: 'var(--tracking-tight)',
          textWrap: 'balance',
          marginTop: 8,
        }}
      >
        {asset.name}
      </h1>

      <MetaRow asset={asset} exec={exec} expires={expires} />

      <p
        className="bh-body-lg"
        style={{ maxWidth: '60ch', color: 'var(--bh-gray-900)' }}
      >
        {asset.description}
      </p>

      {asset.stats && asset.stats.length > 0 && (
        <StatCallout stats={asset.stats} />
      )}

      {asset.quote && (
        <PullQuote
          body={asset.quote.body}
          attribution={asset.quote.attribution}
        />
      )}

      {outline && outline.items && outline.items.length > 0 && (
        <LockedPreview
          outline={outline}
          assetType={asset.assetType}
          pageCount={asset.pageCount}
        />
      )}

      {asset.speakers && asset.speakers.length > 0 && (
        <SpeakerList speakers={asset.speakers} />
      )}
    </article>
  )
}

// ── MetaRow ─────────────────────────────────────────────────────
// Single row of low-noise asset metadata: sponsor + the most relevant
// date + (optional) page count. Sponsor links to the listing
// pre-filtered by sponsor name.

function MetaRow({ asset, exec, expires }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        paddingBottom: 16,
        borderBottom: '1px solid var(--bh-ice-200)',
      }}
    >
      <MetaItem
        label="Sponsor"
        value={
          <Link
            to={`/assets?sponsor=${encodeURIComponent(asset.sponsorName)}`}
            className="bh-link"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--bh-navy-800)',
            }}
          >{asset.sponsorName}</Link>
        }
      />
      {exec ? (
        <MetaItem
          label="Live on"
          value={
            <time
              dateTime={asset.executionDate}
              style={{ color: 'var(--bh-red-800)', fontWeight: 'var(--fw-bold)' }}
            >{exec}</time>
          }
        />
      ) : expires ? (
        <MetaItem
          label="Available through"
          value={
            <time
              dateTime={asset.expirationDate}
              style={{ color: 'var(--bh-navy-800)', fontWeight: 'var(--fw-semibold)' }}
            >{expires}</time>
          }
        />
      ) : (
        <MetaItem label="Availability" value={<span>On-demand, anytime</span>} />
      )}
      {asset.pageCount && (
        <MetaItem label="Length" value={<span>{asset.pageCount} pages</span>} />
      )}
    </div>
  )
}

function MetaItem({ label, value }) {
  return (
    <div>
      <div className="bh-kicker" style={{ marginBottom: 4 }}>{label}</div>
      <div className="bh-byline" style={{ color: 'var(--bh-gray-900)' }}>{value}</div>
    </div>
  )
}
