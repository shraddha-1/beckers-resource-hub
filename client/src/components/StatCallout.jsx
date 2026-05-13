import StatTile from './StatTile'

// Strip of editorial stat tiles. Used inside the asset detail body to
// surface the headline numbers from the source content (e.g. Vynca's
// $3,494 / 43% / 52% from the whitepaper) before the visitor unlocks.

export default function StatCallout({ stats, kicker = 'Inside the report' }) {
  if (!stats || stats.length === 0) return null

  return (
    <section
      aria-labelledby="stat-callout-heading"
      style={{
        margin: '24px 0',
      }}
    >
      <h2
        id="stat-callout-heading"
        className="bh-kicker"
        style={{ marginBottom: 12 }}
      >
        {kicker}
      </h2>
      <ul style={{
        listStyle: 'none',
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
        gap: 12,
      }}>
        {stats.map((s, i) => (
          <li key={i}>
            <StatTile value={s.value} label={s.label} size="md" />
          </li>
        ))}
      </ul>
    </section>
  )
}
