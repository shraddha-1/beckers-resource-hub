import { getInitials } from '../lib/assetHelpers'

// Speaker roster, lifted from the old Signup page so the asset detail
// and confirmation states render the same primitive. Avatar is a
// single initials disc — no stock photography per brand rules.
// Typography is locked to the design-system scale.

export default function SpeakerList({ speakers, heading }) {
  if (!speakers || speakers.length === 0) return null

  const headingText = heading
    || (speakers.length === 1 ? 'Presenter' : 'Presenters')

  return (
    <div>
      <h2 className="bh-kicker" style={{ marginBottom: 12 }}>{headingText}</h2>
      <ul style={{ listStyle: 'none' }}>
        {speakers.map((s, i) => (
          <li key={s.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 0',
            borderTop: '1px solid var(--bh-ice-200)',
            borderBottom: i === speakers.length - 1
              ? '1px solid var(--bh-ice-200)' : 'none',
          }}>
            <div aria-hidden="true" style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--bh-ice-100)',
              border: '1px solid var(--bh-ice-200)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-serif)',
              fontSize: 14, fontWeight: 'var(--fw-bold)',
              color: 'var(--bh-navy-800)',
              flexShrink: 0,
            }}>
              {getInitials(s.firstName, s.lastName)}
            </div>
            <div>
              <div className="bh-label" style={{
                fontSize: 'var(--fs-base)',
                marginBottom: 2,
              }}>{s.firstName} {s.lastName}</div>
              <div className="bh-small" style={{ color: 'var(--bh-gray-700)' }}>
                {s.jobTitle}
              </div>
              <div className="bh-small" style={{ color: 'var(--bh-gray-700)' }}>
                {s.companyName}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
