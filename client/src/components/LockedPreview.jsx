// Shows the asset's outline behind a soft mask so visitors can see what
// they'd unlock without seeing the content itself. The outline shape is
// type-specific (numbered chapters for whitepapers, agenda for webinars,
// segments with timestamps for podcasts).

export default function LockedPreview({ outline, assetType, pageCount }) {
  if (!outline || !outline.items || outline.items.length === 0) return null

  const labelByType = {
    'Live Webinar':       'Agenda',
    'On-Demand Webinar':  'Agenda',
    'Whitepaper':         "What's inside",
    'on-demand podcast':  'Episode chapters',
  }
  const heading = labelByType[assetType] || "What's inside"

  return (
    <section
      aria-labelledby="locked-preview-heading"
      style={{
        position: 'relative',
        background: 'var(--bh-ice-050)',
        border: '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 26px',
      }}
    >
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 12,
        marginBottom: 16,
      }}>
        <h2 id="locked-preview-heading" className="bh-kicker">
          {heading}
        </h2>
        {pageCount && (
          <span className="bh-meta" style={{ color: 'var(--bh-gray-700)' }}>
            {pageCount} pages
          </span>
        )}
      </header>

      {outline.kind === 'segments' ? (
        <ol style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          {outline.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px 1fr',
                gap: 14,
                alignItems: 'baseline',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--bh-red-800)',
              }}>{item.ts}</span>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--bh-navy-800)',
                lineHeight: 1.4,
              }}>{item.title}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ol style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          counterReset: 'outline',
        }}>
          {outline.items.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 1fr',
                gap: 12,
                alignItems: 'baseline',
                paddingBottom: 10,
                borderBottom: i < outline.items.length - 1
                  ? '1px solid var(--bh-ice-200)'
                  : 'none',
              }}
            >
              <span aria-hidden="true" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--bh-gray-500)',
                letterSpacing: '0.04em',
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--bh-navy-800)',
                lineHeight: 1.4,
              }}>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
