import { getConfig } from '../lib/assetHelpers'

export default function Badge({ type }) {
  const cfg = getConfig(type)
  return (
    <span
      aria-label={`Content type: ${cfg.label}`}
      style={{
        display: 'inline-block',
        padding: '3px 10px',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 999,
        background: cfg.bg,
        color: cfg.color,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >{cfg.label}</span>
  )
}