const SEGMENTS = [
  { pct: 42, value: '4M+',   label: 'Monthly pageviews', color: 'var(--bh-navy-800)', text: '#fff' },
  { pct: 28, value: '500K+', label: 'Newsletter subs',   color: 'var(--bh-red-800)',  text: '#fff' },
  { pct: 15, value: '4',     label: 'Sister sites',      color: 'var(--bh-navy-600)', text: '#fff' },
  { pct: 15, value: '20+',   label: 'Annual events',     color: 'var(--bh-ice-200)',  text: 'var(--bh-navy-800)' },
]

export default function AudienceBar({ caption }) {
  return (
    <figure
      aria-labelledby={caption ? 'audience-bar-caption' : undefined}
      style={{ margin: 0 }}
    >
      <div
        role="img"
        aria-label="Becker's audience: 4 million plus monthly pageviews, 500 thousand plus newsletter subscribers, 4 sister sites, more than 20 annual events"
        className="audience-bar-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: SEGMENTS.map(s => `${s.pct}fr`).join(' '),
          width: '100%',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          border: '1px solid var(--bh-ice-200)',
        }}
      >
        {SEGMENTS.map((s, i) => (
          <div
            key={s.label}
            aria-hidden="true"
            style={{
              background: s.color,
              padding: '14px 16px',
              borderRight: i < SEGMENTS.length - 1
                ? '1px solid rgba(255,255,255,0.16)'
                : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 6,
              minWidth: 0,        
              minHeight: 80,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 'var(--fw-bold)',
              fontSize: 'clamp(18px, 2.5vw, 28px)', 
              lineHeight: 1,
              color: s.text,
              letterSpacing: 'var(--tracking-tight)',
            }}>{s.value}</div>
            <div style={{
              fontFamily: 'var(--font-sans)',
  fontSize: 'clamp(9px, 1vw, 11px)',
  fontWeight: 'var(--fw-semibold)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--tracking-wide)',
  color: s.text,
  opacity: 0.9,
  wordBreak: 'break-word',
  lineHeight: 1.3,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {caption && (
        <figcaption
          id="audience-bar-caption"
          className="bh-meta"
          style={{ marginTop: 10, textAlign: 'center' }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}