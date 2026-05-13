// Editorial stat tile. Used in dense composition rows on the asset
// detail body. Strict to brand: serif number, sans uppercase label,
// navy/ice surface, red corner accent. Typography pulled from the
// design-system classes so the scale stays consistent everywhere.

export default function StatTile({
  value,
  label,
  source,
  variant = 'light', // 'light' | 'dark' | 'plain'
  size = 'md',       // 'sm' | 'md' | 'lg'
  align = 'left',
}) {
  const isDark  = variant === 'dark'
  const isPlain = variant === 'plain'

  // Map size to a design-system heading class. The class controls
  // family/weight/lh; a one-off color override on the element handles
  // dark variants.
  const valueClass =
    size === 'lg' ? 'bh-h1' :
    size === 'sm' ? 'bh-h4' : 'bh-h2'

  return (
    <div
      role="group"
      aria-label={`${value} ${label}`}
      style={{
        position: 'relative',
        background: isPlain
          ? 'transparent'
          : isDark
            ? 'var(--bh-navy-800)'
            : 'var(--bh-ice-050)',
        border: isPlain
          ? 'none'
          : isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid var(--bh-ice-200)',
        borderRadius: 'var(--radius-md)',
        padding: size === 'sm' ? '14px 16px' : '20px 22px',
        textAlign: align,
        overflow: 'hidden',
      }}
    >
      {!isPlain && (
        <span aria-hidden="true" style={{
          position: 'absolute',
          top: 0, left: align === 'left' ? 0 : 'auto',
          right: align === 'right' ? 0 : 'auto',
          width: 4, height: 32,
          background: 'var(--bh-red-800)',
        }} />
      )}
      <div
        aria-hidden="true"
        className={valueClass}
        style={{
          color: isDark ? '#fff' : 'var(--bh-navy-800)',
          letterSpacing: 'var(--tracking-tight)',
          lineHeight: 1,
        }}
      >{value}</div>
      <div
        aria-hidden="true"
        className="bh-kicker"
        style={{
          marginTop: 8,
          color: isDark ? 'var(--bh-ice-200)' : 'var(--bh-gray-700)',
          // Override .bh-kicker's red color; the dark/light variant
          // owns the label color in this component.
        }}
      >{label}</div>
      {source && (
        <div aria-hidden="true" className="bh-meta" style={{
          marginTop: 6,
          color: isDark ? 'var(--bh-ice-300)' : 'var(--bh-gray-500)',
        }}>{source}</div>
      )}
    </div>
  )
}
