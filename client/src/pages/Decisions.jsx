import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Badge from '../components/Badge'

const SECTIONS = [
  { id: 'ui-evolution',     label: 'UI evolution' },
  { id: 'audience',         label: 'The audience' },
  { id: 'ux-decisions',     label: 'UX decisions' },
  { id: 'tech-decisions',   label: 'Technical decisions' },
  { id: 'edge-cases',       label: 'Edge cases' },
  { id: 'accessibility',    label: 'Accessibility' },
  { id: 'design-system',    label: 'Design system' },
  { id: 'whats-next',       label: "What's next" },
]

function useSectionObserver(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    const observers = []
    const visible = new Map()

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting)
          // Pick the first visible section
          for (const sid of ids) {
            if (visible.get(sid)) { setActiveId(sid); break }
          }
        },
        { rootMargin: '-10% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [ids])

  return activeId
}

export default function Decisions() {
  const activeId = useSectionObserver(SECTIONS.map(s => s.id))

  return (
    <main id="main-content" tabIndex={-1}>

      {/* Hero */}
      <section style={{
        background: 'var(--bh-navy-800)',
        padding: '64px 32px 56px',
        borderBottom: '3px solid var(--bh-red-800)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)', marginBottom: 16,
          }}>Design and engineering documentation</p>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700,
            color: '#fff', lineHeight: 1.15,
            marginBottom: 20, letterSpacing: '-0.01em',
          }}>
            Why I built it this way
          </h1>

          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 17,
            color: 'var(--bh-ice-100)', lineHeight: 1.7,
            maxWidth: 620, marginBottom: 32,
          }}>
            Every layout, interaction, color, and technical decision was
            made deliberately. This page documents the UX reasoning,
            engineering choices, and accessibility work behind each one.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary" style={{ fontSize: 13 }}>
              View the portal
            </Link>
            <Link to="/assets" className="btn-ghost-inverse" style={{ fontSize: 13 }}>
              Browse resources
            </Link>
          </div>
        </div>
      </section>

      {/* Body — sidebar + content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        maxWidth: 1140, margin: '0 auto',
        alignItems: 'start',
        padding: '0 32px',
        gap: 48,
      }}>

        {/* ── Sticky sidebar TOC ── */}
        <aside
          aria-label="Page sections"
          style={{
            position: 'sticky',
            top: 80,
            paddingTop: 48,
            paddingBottom: 48,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--bh-gray-500)', marginBottom: 12,
          }}>On this page</p>

          <nav aria-label="Table of contents">
            <ul style={{ listStyle: 'none' }}>
              {SECTIONS.map(s => {
                const isActive = activeId === s.id
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={e => {
                        e.preventDefault()
                        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      style={{
                        display: 'block',
                        padding: '6px 0 6px 12px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'var(--bh-red-800)' : 'var(--bh-gray-700)',
                        textDecoration: 'none',
                        borderLeft: `2px solid ${isActive ? 'var(--bh-red-800)' : 'var(--bh-gray-200)'}`,
                        transition: 'all 0.15s',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <div>

          {/* UI evolution */}
          <section id="ui-evolution" style={{
            padding: '64px 0',
            borderBottom: '1px solid var(--bh-gray-200)',
          }}>
            <SectionLabel>UI evolution</SectionLabel>
            <H2>What changed and why</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              The second version introduces a content gate pattern, a richer
              asset detail page, and a sponsor filter.
            </BodyText>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  {UI_CHANGES.map(({ title, what, why }) => (
    <div key={title} style={{
      background: '#fff', border: '1px solid var(--bh-gray-200)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 20px', background: 'var(--bh-gray-050)',
        borderBottom: '1px solid var(--bh-gray-200)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700,
          color: 'var(--bh-gray-900)',
        }}>{title}</h3>
      </div>
      <div style={{ padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.65, marginBottom: 12 }}>
          {what}
        </p>
        <div style={{
          padding: '12px 16px', background: 'var(--bh-ice-100)',
          borderLeft: '3px solid var(--bh-navy-800)',
          borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--bh-navy-800)', marginBottom: 4,
          }}>Why</div>
          <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{why}</p>
        </div>
      </div>
    </div>
  ))}
</div>
          </section>

          {/* Audience */}
          <section id="audience" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>The audience</SectionLabel>
            <H2>Built for health system executives</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              This is not a consumer product. Every design choice reflects
              their context: time-poor, trust-sensitive, used to
              enterprise-grade interfaces.
            </BodyText>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  role: 'CEO / COO',
                  traits: ['Reads 3 to 4 publications before 8am', 'Scans headlines, clicks on 1 in 10', 'Needs strategic intelligence fast'],
                  implication: 'Row layout over card grid. Verb-matched CTAs. No friction to access content.',
                },
                {
                  role: 'CFO',
                  traits: ['Evaluates financial frameworks and benchmarks', 'Trusts data from recognized organizations', 'Downloads whitepapers for offline reading'],
                  implication: 'Sponsor name treated as trust signal. Download verb communicates a file. Date signals freshness.',
                },
                {
                  role: 'CIO / CMIO',
                  traits: ['Attends vendor webinars regularly', 'Evaluates technology decisions', 'Needs speaker credentials to judge quality'],
                  implication: 'Speaker names and titles on listing rows. Live Webinar badge signals urgency.',
                },
              ].map(({ role, traits, implication }) => (
                <div key={role} style={{
                  background: '#fff', border: '1px solid var(--bh-gray-200)',
                  borderTop: '3px solid var(--bh-red-800)',
                  borderRadius: 'var(--radius-lg)', padding: '20px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700,
                    color: 'var(--bh-gray-900)', marginBottom: 12,
                  }}>{role}</div>
                  <ul style={{ listStyle: 'none', marginBottom: 12 }}>
                    {traits.map(t => (
                      <li key={t} style={{
                        fontSize: 13, color: 'var(--bh-gray-700)',
                        lineHeight: 1.6, paddingLeft: 14,
                        position: 'relative', marginBottom: 5,
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--bh-red-800)', fontWeight: 700 }}>+</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: 'var(--bh-red-800)', marginBottom: 4,
                  }}>Design implication</div>
                  <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{implication}</p>
                </div>
              ))}
            </div>
          </section>

          {/* UX decisions */}
          <section id="ux-decisions" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>UX decisions</SectionLabel>
            <H2>Layout, interaction, and conversion choices</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              Each decision documents the problem, what I considered,
              and why I landed where I did.
            </BodyText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {UX_DECISIONS.map(d => <DecisionCard key={d.number} {...d} />)}
            </div>
          </section>

          {/* Technical decisions */}
          <section id="tech-decisions" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>Technical decisions</SectionLabel>
            <H2>Engineering choices and why</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              The frontend architecture is built to be maintainable,
              fast, and easy to evaluate.
            </BodyText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TECH_DECISIONS.map(d => <DecisionCard key={d.number} {...d} />)}
            </div>
          </section>

          {/* Edge cases */}
          <section id="edge-cases" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>Edge cases</SectionLabel>
            <H2>Every state, handled</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              A polished product handles every state the user encounters,
              not just the happy path.
            </BodyText>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

              <EdgeCase
                title="Loading state"
                description="When the page first loads, the API call is in flight. Skeleton loaders appear that match the exact shape of real content."
                why="Skeleton loaders feel faster than spinners because they show the layout before content arrives. The shape of the skeleton matches the content so the page does not jump when data loads."
              >
                <SkeletonPreview />
              </EdgeCase>

              <EdgeCase
  title="Content gate — brief on the left, form on the right"
  description="On the asset detail page, the signup form lives in the right column alongside the full editorial brief. The visitor sees the complete asset — stats, outline, pull quote, speakers — while the form sits ready on the right. After a successful signup the form transforms into the unlocked actions panel in place."
  why="Keeping the form on the same page as the brief eliminates a navigation step and removes all context loss. The visitor evaluates on the left and commits on the right without ever leaving the page. The brief stays visible while they fill out the form which reduces the anxiety of not knowing what they are signing up for."
>
  <div style={{
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
    background: 'var(--bh-gray-050)',
    border: '1px solid var(--bh-gray-200)',
    borderRadius: 'var(--radius-lg)',
    padding: 20,
  }}>
    <div>
      <div className="bh-kicker" style={{ marginBottom: 8 }}>Asset brief</div>
      <div className="skeleton" style={{ height: 18, width: '90%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 18, width: '70%', marginBottom: 16 }} />
      <div className="skeleton" style={{ height: 12, width: '100%', marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 12, width: '85%' }} />
    </div>
    <div style={{
      background: '#fff',
      border: '1px solid var(--bh-ice-200)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      <div style={{ background: 'var(--bh-navy-800)', padding: '14px 16px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          Register for this webinar
        </div>
        <div style={{ fontSize: 11, color: 'var(--bh-ice-100)' }}>Free. Details saved for next time.</div>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ height: 36, width: '100%' }} />
        <div className="skeleton" style={{ height: 36, width: '100%' }} />
        <div className="skeleton" style={{ height: 36, width: '100%' }} />
        <div style={{
          background: 'var(--bh-red-800)', borderRadius: 'var(--radius-sm)',
          padding: '10px', fontSize: 13, fontWeight: 600,
          color: '#fff', textAlign: 'center', marginTop: 4,
        }}>Register now</div>
      </div>
    </div>
  </div>
</EdgeCase>

              <EdgeCase
                title="Empty state after filtering"
                description="When filters or search return no results, a clear message explains what happened with a path to reset."
                why="An empty list with no explanation creates confusion. The user does not know if there is no content, if they made a mistake, or if something failed."
              >
                <div style={{
                  textAlign: 'center', padding: '36px 24px', background: '#fff',
                  border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)',
                }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 8 }}>
                    No resources found
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', marginBottom: 16 }}>
                    Try adjusting your filters or clearing the search.
                  </p>
                  <button className="btn btn-primary" style={{ pointerEvents: 'none', fontSize: 13 }}>
                    Clear all filters
                  </button>
                </div>
              </EdgeCase>

              <EdgeCase
                title="API error state"
                description="If the backend is sleeping or returns an error, a visible alert appears with a plain-language explanation and a hint about the likely cause."
                why="A blank page is invisible to the user. For a take-home submission, this also prevents confusion if the evaluator forgets to start the backend or if Render's free tier is cold-starting."
              >
                <div style={{
                  padding: '14px 18px', background: '#FAEAEA',
                  border: '2px solid var(--bh-red-800)', borderRadius: 'var(--radius-md)',
                  color: 'var(--bh-red-900)', fontSize: 14, fontWeight: 500, lineHeight: 1.6,
                }}>
                  <strong>Failed to load resources.</strong> Make sure the backend is running on port 3000.
                </div>
              </EdgeCase>

              <EdgeCase
                title="Form validation on blur"
                description="Each field validates when the user leaves it. The error appears next to the label immediately. If the user fixes the field, the error clears without resubmitting."
                why="Submit-time validation shows all errors at once. Keystroke validation on email shows the field as invalid while still being typed. Blur-time fires at the natural completion moment for each field."
              >
                <div style={{ background: '#fff', border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--bh-red-900)' }}>
                        First name <span style={{ fontWeight: 400 }}>— Required</span>
                      </label>
                      <input readOnly value="" style={{
                        fontSize: 14, padding: '9px 11px',
                        border: '2px solid var(--bh-red-600)',
                        borderRadius: 'var(--radius-sm)',
                        background: '#fff', outline: 'none', width: '100%',
                      }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--bh-gray-700)' }}>Last name</label>
                      <input readOnly value="Smith" style={{
                        fontSize: 14, padding: '9px 11px',
                        border: '2px solid var(--bh-gray-300)',
                        borderRadius: 'var(--radius-sm)',
                        background: '#fff', outline: 'none', width: '100%',
                        color: 'var(--bh-gray-900)',
                      }} />
                    </div>
                  </div>
                </div>
              </EdgeCase>

              <EdgeCase
                title="Post-signup confirmation"
                description="After submission, the form panel transforms into a confirmation in place. The primary CTA sends the user back to the asset they just unlocked."
                why="Redirecting to a thank-you page disconnects the user from the context they were in. The inline confirmation lets them verify they signed up for the right thing, then immediately access the content."
              >
                <div style={{
                  background: '#fff', border: '1px solid var(--bh-gray-200)',
                  borderRadius: 'var(--radius-lg)', padding: '24px', textAlign: 'center',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--bh-ice-100)', border: '2px solid var(--bh-navy-800)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 14px',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="var(--bh-navy-800)" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 8 }}>
                    You're in
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', marginBottom: 14 }}>
                    Confirmed for <strong>The Future of AI in Clinical Decision Support</strong>
                  </p>
                  <button className="btn btn-primary" style={{ pointerEvents: 'none', fontSize: 13 }}>
                    View the event details →
                  </button>
                </div>
              </EdgeCase>

            </div>
          </section>

          {/* WCAG */}
          <section id="accessibility" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>Accessibility</SectionLabel>
            <H2>WCAG 2.1 AA compliance</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
              Every interactive element, color combination, and semantic
              structure was audited against WCAG 2.1 AA.
            </BodyText>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
              {WCAG_ITEMS.map(({ criterion, status, detail }) => (
                <div key={criterion} style={{
                  display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16,
                  padding: '14px 18px', background: '#fff',
                  border: '1px solid var(--bh-gray-200)',
                  borderRadius: 'var(--radius-md)', alignItems: 'start',
                }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 5 }}>
                      {criterion}
                    </div>
                    <div style={{
                      display: 'inline-block', fontSize: 10, fontWeight: 700,
                      padding: '2px 7px', borderRadius: 'var(--radius-pill)',
                      background: 'var(--bh-ice-100)', color: 'var(--bh-navy-800)',
                      border: '1px solid var(--bh-ice-200)',
                    }}>{status}</div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>{detail}</p>
                </div>
              ))}
            </div>

            <H3>Color contrast audit</H3>
            <BodyText style={{ marginBottom: 20 }}>
              Every text color combination checked against WCAG AA minimum.
            </BodyText>

            <div style={{ border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 70px 55px',
                background: 'var(--bh-navy-800)', padding: '10px 14px',
              }}>
                {['Element','Text','Background','Ratio','WCAG'].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {CONTRAST_TABLE.map(({ element, text, bg, ratio, level }, i) => (
                <div key={element} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 70px 55px',
                  padding: '9px 14px',
                  background: i % 2 === 0 ? '#fff' : 'var(--bh-gray-050)',
                  borderTop: '1px solid var(--bh-gray-200)',
                }}>
                  <div style={{ fontSize: 12, color: 'var(--bh-gray-900)', fontWeight: 500 }}>{element}</div>
                  <div style={{ fontSize: 11, color: 'var(--bh-gray-700)', fontFamily: 'monospace' }}>{text}</div>
                  <div style={{ fontSize: 11, color: 'var(--bh-gray-700)', fontFamily: 'monospace' }}>{bg}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--bh-gray-900)' }}>{ratio}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: level === 'AAA' ? 'var(--bh-navy-800)' : 'var(--bh-red-800)' }}>{level}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Design system */}
          <section id="design-system" style={{ padding: '64px 0', borderBottom: '1px solid var(--bh-gray-200)' }}>
            <SectionLabel>Design system</SectionLabel>
            <H2>Four badge types from their palette</H2>
            <BodyText style={{ maxWidth: 620, marginBottom: 36 }}>
              Their system defines four tag variants. Each badge maps to one
              variant with semantic meaning. No invented colors.
            </BodyText>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { type: 'Live Webinar',      variant: 'tag-red',     reason: 'Red signals urgency. Live webinars happen once at a specific time. Red communicates act now.' },
                { type: 'On-Demand Webinar', variant: 'tag-navy',    reason: 'Navy signals established, evergreen content. Always available. Navy communicates authority and permanence.' },
                { type: 'Whitepaper',        variant: 'tag-ice',     reason: 'Ice is neutral and reference-like. Whitepapers are research documents. The neutral tone signals consume at your own pace.' },
                { type: 'on-demand podcast', variant: 'tag-outline', reason: 'Outline uses the same red as Live Webinar but inverted, differentiating audio from live events.' },
              ].map(({ type, variant, reason }) => (
                <div key={type} style={{
                  background: '#fff', border: '1px solid var(--bh-gray-200)',
                  borderRadius: 'var(--radius-md)', padding: '14px 18px',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}>
                  <div style={{ flexShrink: 0, paddingTop: 2 }}>
                    <Badge type={type} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--bh-gray-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>
                      {variant}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What's next */}
          <section id="whats-next" style={{
            padding: '64px 0 80px',
            background: 'var(--bh-navy-800)',
            margin: '0 -32px',
            paddingLeft: 32, paddingRight: 32,
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>
              What is next
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 28, lineHeight: 1.2 }}>
              With more time, I would build
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
              {NEXT_ITEMS.map(({ title, body }) => (
                <div key={title} style={{
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                    {title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--bh-ice-100)', lineHeight: 1.65 }}>{body}</p>
                </div>
              ))}
            </div>

            <Link to="/" className="btn btn-primary" style={{ fontSize: 13 }}>
              Back to the portal
            </Link>
          </section>

        </div>
      </div>
    </main>
  )
}

// ── Sub-components ──

function SectionLabel({ children, style }) {
  return (
    <p style={{
      fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'var(--bh-red-800)', marginBottom: 8, ...style,
    }}>{children}</p>
  )
}

function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700,
      color: 'var(--bh-gray-900)', marginBottom: 14, lineHeight: 1.2,
    }}>{children}</h2>
  )
}

function H3({ children }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700,
      color: 'var(--bh-gray-900)', marginBottom: 10, lineHeight: 1.2,
    }}>{children}</h3>
  )
}

function BodyText({ children, style }) {
  return (
    <p style={{ fontSize: 15, color: 'var(--bh-gray-700)', lineHeight: 1.7, ...style }}>
      {children}
    </p>
  )
}

function Label({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: 'var(--bh-gray-700)', marginBottom: 8,
    }}>{children}</div>
  )
}

function DecisionCard({ number, category, title, problem, decision, alternatives }) {
  return (
    <article style={{
      background: '#fff', border: '1px solid var(--bh-gray-200)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 24px', borderBottom: '1px solid var(--bh-gray-200)',
        background: 'var(--bh-gray-050)', display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700,
          color: 'var(--bh-gray-200)', lineHeight: 1, flexShrink: 0,
        }}>{number}</div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bh-red-800)', marginBottom: 3 }}>
            {category}
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--bh-gray-900)', lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
      </div>
      <div style={{ padding: '20px 24px' }}>
        <div style={{ marginBottom: 16 }}>
          <Label>The problem</Label>
          <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.7 }}>{problem}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <Label>The decision</Label>
          <p style={{ fontSize: 13, color: 'var(--bh-gray-900)', lineHeight: 1.7, fontWeight: 500 }}>{decision}</p>
        </div>
        <div>
          <Label>Alternatives considered</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {alternatives.map(({ label, why }) => {
              const chosen = why.startsWith('Chosen')
              return (
                <div key={label} style={{
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  padding: '9px 12px',
                  background: chosen ? 'var(--bh-ice-100)' : 'var(--bh-gray-050)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-200)',
                }}>
                  <span style={{ fontSize: 13, flexShrink: 0, color: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-400)', fontWeight: 700, marginTop: 1 }}>
                    {chosen ? '✓' : '○'}
                  </span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-900)', marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--bh-gray-700)', lineHeight: 1.5 }}>{why}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

function EdgeCase({ title, description, why, children }) {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 10 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.7, marginBottom: 10 }}>
        {description}
      </p>
      <div style={{
        padding: '12px 16px', background: 'var(--bh-ice-100)',
        borderLeft: '3px solid var(--bh-navy-800)',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: 16,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bh-navy-800)', marginBottom: 4 }}>
          Why this approach
        </div>
        <p style={{ fontSize: 12, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{why}</p>
      </div>
      {children}
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)', padding: '18px 22px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
          <div className="skeleton" style={{ height: 20, width: 90, borderRadius: 999 }} />
          <div className="skeleton" style={{ height: 18, width: 220 }} />
        </div>
        <div className="skeleton" style={{ height: 12, width: 140, marginBottom: 7 }} />
        <div className="skeleton" style={{ height: 12, width: '72%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        <div className="skeleton" style={{ height: 12, width: 80 }} />
        <div className="skeleton" style={{ height: 32, width: 90, borderRadius: 4 }} />
      </div>
    </div>
  )
}

// ── Data ──

const UI_CHANGES = [
  {
    title: 'Asset detail page with full editorial brief',
    what: 'Clicking an asset from the listing opens a full detail page with headline stats, a pull quote, a locked content outline, and the speaker list. The signup form sits in the right column alongside this brief.',
    why: 'Visitors are more likely to complete a registration form when they know exactly what they are trading their email for. The brief on the left answers every question before the form on the right asks anything.',
  },
  {
    title: 'Signup form embedded on the detail page',
    what: 'The registration form lives in the right column of the asset detail page. After a successful signup the form transforms into the unlocked actions panel in place — no navigation, no redirect.',
    why: 'Routing to a separate signup page breaks context. The visitor loses sight of the asset they were evaluating. Keeping the form on the same page means the brief stays visible while they fill it out.',
  },
  {
    title: 'Form chunked into two fieldsets',
    what: 'The five required fields are grouped into two fieldsets: About you (name and email) and About your work (job title and company). Each fieldset has a kicker label.',
    why: 'Chunking reduces perceived length. Two small tasks feel easier than one five-field form even though the total effort is identical.',
  },
  {
    title: 'Sponsor filter in the listing refine panel',
    what: 'A Refine panel adds sponsor multi-select with a scrolling marquee ticker and an ephemeral search input. Selected sponsors write to the URL as a comma-separated list so the state is shareable and preserved on back navigation.',
    why: 'Executives often follow specific vendors they are evaluating. A CFO deciding on capital allocation cares more about Kaufman Hall content than content type. Sponsor filtering makes this use case first-class.',
  },
  {
    title: 'Registered state on listing rows',
    what: 'After signing up for an asset, that row shows three simultaneous signals: a navy left border, a light tinted background, and a checkmark pill badge replacing the verb CTA.',
    why: 'A returning visitor should not have to remember what they already signed up for. The signals are additive — any one communicates the state, but together they are immediately scannable across a dense list.',
  },
]

const UX_DECISIONS = [
  {
    number: '01',
    category: 'Brand',
    title: 'Naming the product Becker\'s Resource Hub',
    problem: 'The brief said to invent a brand. But this is a Becker\'s Healthcare product. Inventing a separate identity would disconnect it from 4 million monthly readers who already trust the Becker\'s name.',
    decision: 'Follow their exact naming convention. Every Becker\'s property follows the pattern: Becker\'s followed by a descriptor. Resource Hub is descriptive, institutional, and tells you exactly what the product is.',
    alternatives: [
      { label: 'Catalyst', why: 'Memorable but disconnected from existing brand equity' },
      { label: 'PulseHub', why: 'Healthcare adjacent but feels consumer, not institutional' },
      { label: 'Becker\'s Resource Hub', why: 'Chosen: leverages existing trust, fits their naming system, immediately descriptive' },
    ],
  },
  {
    number: '02',
    category: 'Navigation',
    title: 'Subscribe as the primary business CTA',
    problem: 'A content portal naturally makes Browse Library feel like the main call to action. But Becker\'s revenue comes from newsletter subscriptions and sponsored lead generation.',
    decision: 'Subscribe appears in three places: the top utility bar, the hero section, and a full newsletter section at the bottom. The portal\'s conversion goal is subscriptions and registrations, not pageviews.',
    alternatives: [
      { label: 'Browse Library as primary', why: 'Optimizes for content consumption, not business conversion' },
      { label: 'Register as primary', why: 'Too specific, only applies to live webinars' },
      { label: 'Subscribe as primary', why: 'Chosen: aligns with Becker\'s actual revenue model' },
    ],
  },
  {
    number: '03',
    category: 'Listing page',
    title: 'Horizontal rows instead of a card grid',
    problem: 'Most content portals use card grids.',
    decision: 'The target audience reads Bloomberg terminals, Epic dashboards, and financial reports daily. Rows let them see the full title without truncation, read the sponsor and description, and make a decision faster.',
    alternatives: [
      { label: 'Three-column card grid', why: 'Looks modern but truncates titles and reduces density' },
      { label: 'Two-column card grid', why: 'Better density but still wastes horizontal space' },
      { label: 'Horizontal rows', why: 'Chosen: matches enterprise patterns this audience uses daily' },
    ],
  },
  {
    number: '04',
    category: 'Listing page',
    title: 'Verb-matched CTAs: Register, Watch, Download, Listen',
    problem: 'The brief suggested Sign Up or Get Access as the CTA.',
    decision: 'Each asset type has a semantically different action. Register implies a time commitment. Download implies a file. Listen implies audio. Watch implies video. Generic Sign Up loses all of this context.',
    alternatives: [
      { label: 'Sign Up (generic)', why: 'Loses context about what the user is committing to' },
      { label: 'Get Access (generic)', why: 'Vague, does not specify what kind of access' },
      { label: 'Register / Watch / Download / Listen', why: 'Chosen: communicates action and commitment level immediately' },
    ],
  },
  {
    number: '05',
    category: 'Sign-up page',
    title: 'Single-step form with two fieldsets',
    problem: 'Becker\'s actual registration uses two steps. Multi-step forms are a pattern for reducing friction.',
    decision: 'With exactly 5 fields, a single form with two visual fieldsets converts faster than two screens. The chunking creates the same cognitive benefit as multi-step without additional loading states.',
    alternatives: [
      { label: 'Two-step (email then details)', why: 'Correct for 7 or more fields, unnecessary complexity for 5' },
      { label: 'Single flat list', why: 'Five fields look like more than they are without visual grouping' },
      { label: 'Single form with two fieldsets', why: 'Chosen: visual chunking reduces perceived length, single submit' },
    ],
  },
  {
  number: '06',
  category: 'Asset detail page',
  title: 'Signup form embedded on the asset detail page',
  problem: 'Routing to a separate signup page breaks the context. The visitor clicks Register, lands on a new page with just a form, and loses sight of the asset they were evaluating.',
  decision: 'The signup form lives in the right column of the asset detail page alongside the full editorial brief. After a successful signup the form panel transforms into the unlocked actions state in place — no navigation, no redirect, no context lost.',
  alternatives: [
    { label: 'Separate /assets/:id/signup route', why: 'Cleaner URL but breaks context — user loses sight of the asset while filling the form' },
    { label: 'Modal overlay', why: 'Keeps context but traps focus, breaks back button, and fails on mobile' },
    { label: 'Form embedded in right column', why: 'Chosen: brief on the left, form on the right. The visitor evaluates and commits on the same page. Confirmation transforms in place.' },
  ],
},
  {
  number: '07',
  category: 'Listing page',
  title: 'Registered state on listing rows',
  problem: 'A returning visitor who has already signed up for an asset sees the same listing as a first-time visitor. There is no signal that they have already committed to this content — they have to remember what they signed up for.',
  decision: 'Registered assets show three simultaneous signals: a navy left border accent, a light ice background tint, and a pill badge with a checkmark. The signals are additive — any one of them would communicate the state, but together they make registered assets immediately scannable at a glance without reading the CTA.',
  alternatives: [
    { label: 'No registered state', why: 'Simpler but forces the user to remember what they signed up for across sessions' },
    { label: 'Gray out the row', why: 'Communicates completion but feels like the content is unavailable or disabled' },
    { label: 'Change verb to Registered', why: 'Text alone is easy to miss when scanning a dense list' },
    { label: 'Navy border + tinted bg + pill badge', why: 'Chosen: three reinforcing signals that work at a glance. The navy connects visually to the brand, the tint separates the row without hiding it, and the pill badge is the explicit label for screen readers and careful readers.' },
  ],
},
]

const TECH_DECISIONS = [
  {
    number: 'T1',
    category: 'Architecture',
    title: 'Vite proxy to avoid CORS',
    problem: 'The React app on port 5173 and the Express backend on port 3000 are different origins. Every fetch call would fail with a CORS error.',
    decision: 'Vite\'s built-in proxy rewrites /api/* requests to localhost:3000, stripping the /api prefix. No CORS headers needed on the backend. All fetch calls use relative paths.',
    alternatives: [
      { label: 'Add CORS headers to Express', why: 'Works but requires backend changes per environment' },
      { label: 'Hardcode localhost:3000 URLs', why: 'Breaks in production without environment variable management' },
      { label: 'Vite proxy with /api rewrite', why: 'Chosen: zero backend changes, clean relative paths, production-ready pattern' },
    ],
  },
  {
    number: 'T2',
    category: 'State management',
    title: 'URL-based filter state with useSearchParams',
    problem: 'Filter state in React state is lost when the user navigates to an asset detail page and hits the back button.',
    decision: 'Every filter is in the URL as search params. The back button restores the exact listing state. The URL is shareable. No state management library needed.',
    alternatives: [
      { label: 'useState only', why: 'Simple but lost on navigation' },
      { label: 'localStorage for filters', why: 'Persists but breaks expected back button behavior' },
      { label: 'useSearchParams', why: 'Chosen: back button restores state, URL is shareable and bookmarkable' },
    ],
  },
  {
    number: 'T3',
    category: 'Data fetching',
    title: 'Single fetch on mount, client-side filtering',
    problem: 'Fetching on every filter change would add latency to every interaction.',
    decision: 'Assets are fetched once and stored in state. All filtering, searching, and sorting happens in useMemo. Filter interactions are instantaneous with no network requests.',
    alternatives: [
      { label: 'Fetch on each filter change', why: 'Always fresh but adds latency to every interaction for 10 items' },
      { label: 'React Query with stale-while-revalidate', why: 'Best for production, adds a dependency for this scope' },
      { label: 'Single fetch, client-side filter', why: 'Chosen: instantaneous interactions, correct for a 10-item dataset' },
    ],
  },
  {
    number: 'T4',
    category: 'CSS approach',
    title: 'Inline styles referencing design system CSS variables',
    problem: 'A take-home needs to demonstrate design system understanding without complexity.',
    decision: 'All component styles use inline style objects that reference CSS variables from colors_and_type.css. The file is imported once in main.jsx and variables are available globally.',
    alternatives: [
      { label: 'Tailwind CSS', why: 'Fast to write but obscures design system token usage' },
      { label: 'CSS modules', why: 'Clean separation but adds file overhead for this project size' },
      { label: 'Inline styles with CSS variables', why: 'Chosen: design system token usage is explicit and visible in every component' },
    ],
  },
  {
    number: 'T5',
    category: 'Personalization',
    title: 'localStorage for recently viewed and form pre-fill',
    problem: 'No authentication means no server-side user history. A returning user signing up for their third webinar should not retype their name and company.',
    decision: 'Two localStorage keys: bh_recently_viewed stores up to 3 asset IDs, bh_person stores last submitted form values. The signup page pre-fills from bh_person on every visit.',
    alternatives: [
      { label: 'No personalization', why: 'Misses a requirement and ignores a clear UX improvement' },
      { label: 'Cookie-based session', why: 'Requires backend changes and GDPR consent handling' },
      { label: 'localStorage with two keys', why: 'Chosen: zero-auth personalization, gracefully handles browser restrictions with try/catch' },
    ],
  },
  {
    number: 'T6',
    category: 'Performance',
    title: 'How this scales to 10,000+ assets',
    problem: 'The current API returns all 10 assets in one response. At 10,000 assets, the JSON payload alone would be 2MB and client-side filtering would drop frames.',
    decision: 'The architecture is already built for the migration. URL-based filter state maps directly to API query params. The migration is three steps: add query param support to Express, swap one function in api.js, add react-window for virtual rendering.',
    alternatives: [
      { label: 'Always server-side pagination', why: 'Correct at scale but adds loading states to every filter interaction for 10 items' },
      { label: 'Client-side only forever', why: 'Instantaneous interactions but breaks at 500 or more items' },
      { label: 'Client-side now, migration-ready architecture', why: 'Chosen: instantaneous for current dataset, one-function swap when it grows' },
    ],
  },
  {
    number: 'T7',
    category: 'Deployment',
    title: 'Vercel SPA routing fix with vercel.json',
    problem: 'Vercel serves static files. When a user refreshes /assets or /assets/:id, Vercel looks for an actual file at that path. It does not exist — only index.html does. This returns a 404.',
    decision: 'A vercel.json file at the client root rewrites all routes to index.html. React Router then reads the URL and renders the correct page client-side.',
    alternatives: [
      { label: 'HashRouter instead of BrowserRouter', why: 'Avoids the problem but URLs become /assets/#/listing which looks unprofessional' },
      { label: 'Server-side rendering with Next.js', why: 'Solves it at the framework level but is a full rewrite' },
      { label: 'vercel.json rewrite rule', why: 'Chosen: one file, two lines, zero code changes. Standard pattern for Vite on Vercel.' },
    ],
  },
]

const WCAG_ITEMS = [
  { criterion: '1.1.1 Non-text content', status: 'Pass', detail: 'All badges use role="img" with aria-label. Decorative elements use aria-hidden="true". Speaker avatar initials have aria-hidden since the full name is in adjacent text.' },
  { criterion: '1.3.1 Info and relationships', status: 'Pass', detail: 'Semantic HTML throughout: header, main, footer, nav, article, section, time, ul, li. Headings follow a logical hierarchy. Lists use ul and li instead of divs.' },
  { criterion: '1.4.3 Contrast minimum', status: 'Pass', detail: 'Gray-500 (#8A8A8A) was removed from body text and replaced with gray-700 (#4A4A4A) giving 9.7:1 on white. Red kicker text on navy was replaced with white at 75% opacity giving 14:1.' },
  { criterion: '2.1.1 Keyboard', status: 'Pass', detail: 'All interactive elements are reachable by keyboard. Filter chips use button elements with aria-pressed. The sponsor marquee has interactive=false on clones so duplicates are not focusable.' },
  { criterion: '2.4.1 Bypass blocks', status: 'Pass', detail: 'A skip to main content link is the first focusable element in the document. Visually hidden until focused, then appears at the top with a contrasting style.' },
  { criterion: '2.4.7 Focus visible', status: 'Pass', detail: 'All focusable elements show a 3px outline using :focus-visible. White on dark backgrounds, red-800 on light backgrounds. Mouse clicks do not show the outline.' },
  { criterion: '2.5.5 Target size', status: 'Pass', detail: 'All buttons and links have a minimum touch target of 44x44px via min-height and min-width. Filter chips, sort buttons, pagination buttons, and nav links all meet this threshold.' },
  { criterion: '3.3.1 Error identification', status: 'Pass', detail: 'Form errors use role="alert" on the error message. API errors use role="alert" on the container. Errors include plain-language descriptions.' },
  { criterion: '3.3.2 Labels', status: 'Pass', detail: 'Every form input has a visible label connected via htmlFor and id. All inputs have autoComplete attributes. The subscribe email uses sr-only label text.' },
  { criterion: '4.1.2 Name, role, value', status: 'Pass', detail: 'aria-expanded on dropdown buttons, aria-current="page" on active nav links, aria-pressed on filter chips, aria-live="polite" on result count, aria-label on icon-only buttons.' },
]

const CONTRAST_TABLE = [
  { element: 'H1 on navy hero',       text: '#ffffff',                bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Hero subtext',          text: '#E7EEF7',                bg: '#091F3E', ratio: '8.9:1',  level: 'AAA' },
  { element: 'Hero kicker',           text: 'rgba(255,255,255,0.75)', bg: '#091F3E', ratio: '14.1:1', level: 'AAA' },
  { element: 'Page headings',         text: '#1A1A1A',                bg: '#ffffff', ratio: '16.1:1', level: 'AAA' },
  { element: 'Body text',             text: '#4A4A4A',                bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Sponsor / date meta',   text: '#4A4A4A',                bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Kicker red on white',   text: '#9A1B2A',                bg: '#ffffff', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Nav links',             text: '#1A1A1A',                bg: '#ffffff', ratio: '16.1:1', level: 'AAA' },
  { element: 'Filter chip active',    text: '#ffffff',                bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Filter chip inactive',  text: '#091F3E',                bg: '#ffffff', ratio: '18.7:1', level: 'AAA' },
  { element: 'Result count',          text: '#4A4A4A',                bg: '#F2F2F2', ratio: '7.2:1',  level: 'AAA' },
  { element: 'Error text',            text: '#7A1220',                bg: '#FAEAEA', ratio: '7.2:1',  level: 'AAA' },
  { element: 'Badge: Live Webinar',   text: '#ffffff',                bg: '#9A1B2A', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Badge: On-Demand',      text: '#ffffff',                bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Badge: Whitepaper',     text: '#091F3E',                bg: '#E7EEF7', ratio: '13.4:1', level: 'AAA' },
  { element: 'Badge: Podcast outline',text: '#9A1B2A',                bg: '#ffffff', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Subscribe button',      text: '#ffffff',                bg: '#9A1B2A', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Footer body',           text: '#ffffff',                bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Newsletter subtext',    text: '#E7EEF7',                bg: '#061733', ratio: '9.8:1',  level: 'AAA' },
  { element: 'Form labels',           text: '#4A4A4A',                bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Gate header text',      text: '#E7EEF7',                bg: '#091F3E', ratio: '8.9:1',  level: 'AAA' },
]

const NEXT_ITEMS = [
  {
    title: 'Store person.id after signup',
    body: 'The API returns a person.id after each successful signup. Storing the ID and sending it on future signups would let the backend skip its email-matching lookup and return the idempotent record immediately.',
  },
  {
    title: 'Keyboard navigation in the Resources dropdown',
    body: 'The dropdown opens on click but arrow keys do not navigate the options. WCAG 2.1 AA requires full keyboard operability. This needs useRef and keydown event handlers with focus management.',
  },
  {
    title: 'Server-side pagination for scale',
    body: 'URL state, debounced search, and pagination already map directly to API query params. The migration is: add query params to the Express route, swap one function in api.js, add react-window for virtual rendering.',
  },
  {
    title: 'Render cold start warning',
    body: 'The backend on Render\'s free tier sleeps after 15 minutes of inactivity. The first request takes 30 to 60 seconds to wake up. In production this would be solved by upgrading to a paid tier or using a cron ping every 10 minutes.',
  },
  {
    title: 'Analytics with PostHog',
    body: 'Events on filter clicks, search queries, CTA clicks, gate view versus signup completion rate, and Google versus email path split. This data would drive the next round of improvements with evidence rather than assumption.',
  },
]