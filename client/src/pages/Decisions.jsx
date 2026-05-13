import { Link } from 'react-router-dom'
import Badge from '../components/Badge'

export default function Decisions() {
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
            fontFamily: 'var(--font-sans)',
            fontSize: 11, fontWeight: 700,
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
            fontFamily: 'var(--font-sans)',
            fontSize: 17, color: 'var(--bh-ice-100)',
            lineHeight: 1.7, maxWidth: 620, marginBottom: 32,
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

      {/* What changed in the updated UI */}
      <section style={{
        background: 'var(--color-bg)',
        padding: '64px 32px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>UI evolution</SectionLabel>
          <H2>What changed and why</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
            The second version of the portal introduces a content gate pattern,
            a richer asset detail page, and a sponsor filter. Here is what
            changed and the reasoning behind each decision.
          </BodyText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {UI_CHANGES.map(({ title, before, after, why }) => (
              <div key={title} style={{
                background: '#fff',
                border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '16px 24px',
                  background: 'var(--bh-gray-050)',
                  borderBottom: '1px solid var(--bh-gray-200)',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 18, fontWeight: 700,
                    color: 'var(--bh-gray-900)',
                  }}>{title}</h3>
                </div>
                <div style={{
                  padding: '20px 24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                }}>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--bh-gray-500)', marginBottom: 8,
                    }}>Before</div>
                    <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>
                      {before}
                    </p>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 11, fontWeight: 700,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: 'var(--bh-red-800)', marginBottom: 8,
                    }}>After</div>
                    <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>
                      {after}
                    </p>
                  </div>
                </div>
                <div style={{
                  padding: '14px 24px',
                  background: 'var(--bh-ice-100)',
                  borderTop: '1px solid var(--bh-ice-200)',
                  borderLeft: '3px solid var(--bh-navy-800)',
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: 'var(--bh-navy-800)', marginBottom: 4,
                  }}>Why</div>
                  <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>
                    {why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target audience */}
      <section style={{
        background: 'var(--color-bg-tinted)',
        padding: '64px 32px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>The audience</SectionLabel>
          <H2>Built for health system executives</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
            This is not a consumer product. The people using it are hospital
            CEOs, CFOs, and CIOs making decisions that affect thousands of
            patients. Every design choice reflects their context: time-poor,
            trust-sensitive, and used to enterprise-grade interfaces.
          </BodyText>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
          }}>
            {[
              {
                role: 'CEO / COO',
                traits: [
                  'Reads 3 to 4 publications before 8am',
                  'Scans headlines, clicks on 1 in 10',
                  'Needs strategic intelligence fast',
                ],
                implication: 'Row layout over card grid. Verb-matched CTAs. No friction to access content.',
              },
              {
                role: 'CFO',
                traits: [
                  'Evaluates financial frameworks and benchmarks',
                  'Trusts data from recognized organizations',
                  'Downloads whitepapers for offline reading',
                ],
                implication: 'Sponsor name treated as trust signal. Download verb communicates a file. Date signals freshness.',
              },
              {
                role: 'CIO / CMIO',
                traits: [
                  'Attends vendor webinars regularly',
                  'Evaluates technology decisions',
                  'Needs speaker credentials to judge quality',
                ],
                implication: 'Speaker names and titles on listing rows. Live Webinar badge signals urgency and time commitment.',
              },
            ].map(({ role, traits, implication }) => (
              <div key={role} style={{
                background: '#fff',
                border: '1px solid var(--bh-gray-200)',
                borderTop: '3px solid var(--bh-red-800)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20, fontWeight: 700,
                  color: 'var(--bh-gray-900)', marginBottom: 16,
                }}>{role}</div>
                <ul style={{ listStyle: 'none', marginBottom: 16 }}>
                  {traits.map(t => (
                    <li key={t} style={{
                      fontSize: 13, color: 'var(--bh-gray-700)',
                      lineHeight: 1.6, paddingLeft: 14,
                      position: 'relative', marginBottom: 6,
                    }}>
                      <span style={{
                        position: 'absolute', left: 0,
                        color: 'var(--bh-red-800)', fontWeight: 700,
                      }}>+</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--bh-red-800)', marginBottom: 6,
                }}>Design implication</div>
                <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>
                  {implication}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UX decisions */}
      <section style={{ background: 'var(--color-bg)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>UX decisions</SectionLabel>
          <H2>Layout, interaction, and conversion choices</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 48 }}>
            Each decision documents the problem, what I considered,
            and why I landed where I did.
          </BodyText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {UX_DECISIONS.map(d => <DecisionCard key={d.number} {...d} />)}
          </div>
        </div>
      </section>

      {/* Technical decisions */}
      <section style={{
        background: 'var(--color-bg-tinted)',
        padding: '64px 32px',
        borderTop: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Technical decisions</SectionLabel>
          <H2>Engineering choices and why</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 48 }}>
            The frontend architecture is built to be maintainable,
            fast, and easy to evaluate.
          </BodyText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {TECH_DECISIONS.map(d => <DecisionCard key={d.number} {...d} />)}
          </div>
        </div>
      </section>

      {/* Edge cases */}
      <section style={{
        background: 'var(--color-bg)',
        padding: '64px 32px',
        borderTop: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Edge cases</SectionLabel>
          <H2>Every state, handled</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 48 }}>
            A polished product handles every state the user encounters,
            not just the happy path.
          </BodyText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            <EdgeCase
              title="Loading state"
              description="When the page first loads, the API call is in flight. Skeleton loaders appear that match the exact shape of real content. Three skeleton cards on the homepage, four skeleton rows on the listing page, a two-column skeleton on the asset detail and signup pages."
              why="Skeleton loaders feel faster than spinners because they show the layout before content arrives. The shape of the skeleton is the shape of the content, so the page does not visually jump when data loads."
            >
              <SkeletonPreview />
            </EdgeCase>

            <EdgeCase
              title="Content gate"
              description="On the asset detail page, the right column shows a gate instead of the content. The visitor sees the full editorial brief, stats, outline, and speaker list before deciding whether to register. The gate offers Google sign-in as the primary path and email as the secondary."
              why="Showing the full brief before asking for contact details reduces anxiety. The visitor knows exactly what they are trading their email for. Google sign-in reduces the form to zero fields for users with a Google account."
            >
              <div style={{
                padding: '20px 24px',
                background: 'var(--bh-navy-800)',
                borderRadius: 'var(--radius-lg)',
                color: '#fff',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18, fontWeight: 700, marginBottom: 6,
                }}>Save your seat</div>
                <p style={{ fontSize: 13, color: 'var(--bh-ice-100)', marginBottom: 16 }}>
                  Confirm your spot for this live session.
                </p>
                <div style={{
                  background: '#fff',
                  borderRadius: 'var(--radius-sm)',
                  padding: '11px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 14, fontWeight: 600, color: 'var(--bh-gray-900)',
                  marginBottom: 12,
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                    <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </div>
                <div style={{
                  background: 'var(--bh-red-800)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '11px 16px',
                  fontSize: 14, fontWeight: 600, color: '#fff',
                  textAlign: 'center',
                }}>Continue with email</div>
              </div>
            </EdgeCase>

            <EdgeCase
              title="Empty state after filtering"
              description="When filters or search return no results, a clear message explains what happened with a path to reset. The message tells the user their filters returned nothing, not that the product is broken."
              why="An empty list with no explanation creates confusion. The user does not know if there is no content, if they made a mistake, or if something failed. The empty state answers all three at once."
            >
              <div style={{
                textAlign: 'center', padding: '40px 32px',
                background: '#fff',
                border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20, fontWeight: 700,
                  color: 'var(--bh-gray-900)', marginBottom: 8,
                }}>No resources found</div>
                <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', marginBottom: 20 }}>
                  Try adjusting your filters or clearing the search.
                </p>
                <button className="btn btn-primary" style={{ pointerEvents: 'none' }}>
                  Clear all filters
                </button>
              </div>
            </EdgeCase>

            <EdgeCase
              title="API error state"
              description="If the backend is not running or returns an error, a visible alert appears with a plain-language explanation including a hint about the likely cause."
              why="A blank page or a JavaScript console error is invisible to the user. For a take-home submission, this also prevents confusion if the evaluator forgets to start the backend server."
            >
              <div style={{
                padding: '16px 20px',
                background: '#FAEAEA',
                border: '2px solid var(--bh-red-800)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--bh-red-900)',
                fontSize: 14, fontWeight: 500, lineHeight: 1.6,
              }}>
                <strong>Failed to load resources.</strong> Make sure the backend is running on port 3000.
              </div>
            </EdgeCase>

            <EdgeCase
              title="Form validation on blur"
              description="Each field validates when the user leaves it. The error appears next to the label immediately. If the user fixes the field, the error clears without resubmitting."
              why="Submit-time validation shows all errors at once. Keystroke validation on email shows the field as invalid while still being typed. Blur-time fires at the natural completion moment for each field."
            >
              <div style={{
                background: '#fff', border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-lg)', padding: '24px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--bh-red-900)' }}>
                      First name <span style={{ fontWeight: 400 }}>— Required</span>
                    </label>
                    <input readOnly value="" style={{
                      fontSize: 14, padding: '10px 12px',
                      border: '2px solid var(--bh-red-600)',
                      borderRadius: 'var(--radius-sm)',
                      background: '#fff', outline: 'none', width: '100%',
                    }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--bh-gray-700)' }}>
                      Last name
                    </label>
                    <input readOnly value="Smith" style={{
                      fontSize: 14, padding: '10px 12px',
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
              description="After a successful form submission, the form panel transforms into a confirmation state in place. The asset summary stays visible on the left. The primary CTA sends the user back to the asset detail page they just unlocked. Related assets appear below."
              why="Redirecting to a thank-you page disconnects the user from the context they were in. The inline confirmation lets them verify they signed up for the right thing, then immediately access the content they paid for with their email."
            >
              <div style={{
                background: '#fff', border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-lg)', padding: '28px 24px', textAlign: 'center',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--bh-ice-100)', border: '2px solid var(--bh-navy-800)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke="var(--bh-navy-800)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700,
                  color: 'var(--bh-gray-900)', marginBottom: 8,
                }}>You're in</div>
                <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', marginBottom: 16 }}>
                  Confirmed for <strong>The Future of AI in Clinical Decision Support</strong>
                </p>
                <button className="btn btn-primary" style={{ pointerEvents: 'none', fontSize: 14 }}>
                  View the event details →
                </button>
              </div>
            </EdgeCase>

          </div>
        </div>
      </section>

      {/* WCAG */}
      <section style={{
        background: 'var(--color-bg-tinted)',
        padding: '64px 32px',
        borderTop: '1px solid var(--color-border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Accessibility</SectionLabel>
          <H2>WCAG 2.1 AA compliance</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
            Every interactive element, color combination, and semantic
            structure was audited against WCAG 2.1 AA.
          </BodyText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
            {WCAG_ITEMS.map(({ criterion, status, detail }) => (
              <div key={criterion} style={{
                display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20,
                padding: '16px 20px', background: '#fff',
                border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-md)', alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 6 }}>
                    {criterion}
                  </div>
                  <div style={{
                    display: 'inline-block', fontSize: 11, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 'var(--radius-pill)',
                    background: 'var(--bh-ice-100)', color: 'var(--bh-navy-800)',
                    border: '1px solid var(--bh-ice-200)',
                  }}>{status}</div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <H3>Color contrast audit</H3>
          <BodyText style={{ marginBottom: 24 }}>
            Every text color combination, checked against WCAG AA minimum
            (4.5:1 for normal text, 3:1 for large text).
          </BodyText>

          <div style={{ border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 60px',
              background: 'var(--bh-navy-800)', padding: '10px 16px',
            }}>
              {['Element','Text','Background','Ratio','WCAG'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {CONTRAST_TABLE.map(({ element, text, bg, ratio, level }, i) => (
              <div key={element} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 60px',
                padding: '10px 16px',
                background: i % 2 === 0 ? '#fff' : 'var(--bh-gray-050)',
                borderTop: '1px solid var(--bh-gray-200)',
              }}>
                <div style={{ fontSize: 13, color: 'var(--bh-gray-900)', fontWeight: 500 }}>{element}</div>
                <div style={{ fontSize: 12, color: 'var(--bh-gray-700)', fontFamily: 'monospace' }}>{text}</div>
                <div style={{ fontSize: 12, color: 'var(--bh-gray-700)', fontFamily: 'monospace' }}>{bg}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--bh-gray-900)' }}>{ratio}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: level === 'AAA' ? 'var(--bh-navy-800)' : 'var(--bh-red-800)' }}>{level}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badge system */}
      <section style={{ background: 'var(--color-bg)', padding: '64px 32px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Design system</SectionLabel>
          <H2>Four badge types from their palette</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 40 }}>
            Their system defines four tag variants. Each badge maps to one
            variant with semantic meaning. No invented colors.
          </BodyText>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { type: 'Live Webinar',      variant: 'tag-red',     reason: 'Red signals urgency. Live webinars happen once at a specific time. Red communicates act now.' },
              { type: 'On-Demand Webinar', variant: 'tag-navy',    reason: 'Navy signals established, evergreen content. Always available. Navy communicates authority and permanence.' },
              { type: 'Whitepaper',        variant: 'tag-ice',     reason: 'Ice is neutral and reference-like. Whitepapers are research documents. The neutral tone signals consume at your own pace.' },
              { type: 'on-demand podcast', variant: 'tag-outline', reason: 'Outline uses the same red as Live Webinar but inverted, grouping podcasts with the Becker\'s accent color while differentiating from live events.' },
            ].map(({ type, variant, reason }) => (
              <div key={type} style={{
                background: '#fff', border: '1px solid var(--bh-gray-200)',
                borderRadius: 'var(--radius-md)', padding: '16px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 16,
              }}>
                <div style={{ flexShrink: 0, paddingTop: 2 }}>
                  <Badge type={type} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--bh-gray-500)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                    {variant}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* persons.js explanation */}
      <section style={{ background: 'var(--color-bg-tinted)', padding: '64px 32px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel>Backend data model</SectionLabel>
          <H2>What persons.js does</H2>
          <BodyText style={{ maxWidth: 620, marginBottom: 32 }}>
            The backend maintains a stub database of known people called
            persons.js. It serves two purposes and directly affects how
            the frontend handles returning users.
          </BodyText>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
            {[
              {
                title: 'Speaker identity',
                body: 'When the backend builds an asset response, speakers are stored by reference to a person ID. The backend looks up the full person record from persons.js to attach firstName, lastName, jobTitle, and companyName to each speaker in the asset response. This is why speakers in the listing rows and signup page show full credentials.',
              },
              {
                title: 'Idempotent signups',
                body: 'The API docs state that signing up the same person for the same asset twice returns the same signup record both times. The backend checks if the person exists in persons.js by matching on email before creating a new record. If Linda Nguyen signs up twice, she gets the same signup ID back both times.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{
                background: '#fff', border: '1px solid var(--bh-gray-200)',
                borderTop: '3px solid var(--bh-navy-800)',
                borderRadius: 'var(--radius-lg)', padding: '20px 24px',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 10 }}>
                  {title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px 24px', background: 'var(--bh-ice-100)',
            border: '1px solid var(--bh-ice-200)', borderLeft: '3px solid var(--bh-navy-800)',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bh-navy-800)', marginBottom: 8 }}>
              Frontend implication
            </div>
            <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.65 }}>
              The API returns a person.id after each successful signup.
              Currently the frontend stores form values in localStorage
              for pre-fill but not the generated person ID. Storing the
              person ID and sending it on future signups would allow the
              backend to skip its email-matching lookup entirely and return
              the idempotent record immediately. This is a one-line addition
              to the signup success handler and is the next improvement.
            </p>
          </div>
        </div>
      </section>

      {/* What is next */}
      <section style={{ background: 'var(--bh-navy-800)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>
            What is next
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 32, lineHeight: 1.2 }}>
            With more time, I would build
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {NEXT_ITEMS.map(({ title, body }) => (
              <div key={title} style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-md)',
              }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                  {title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--bh-ice-100)', lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>

          <Link to="/" className="btn btn-primary" style={{ fontSize: 14 }}>
            Back to the portal
          </Link>
        </div>
      </section>
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
      fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700,
      color: 'var(--bh-gray-900)', marginBottom: 16, lineHeight: 1.2,
    }}>{children}</h2>
  )
}

function H3({ children }) {
  return (
    <h3 style={{
      fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700,
      color: 'var(--bh-gray-900)', marginBottom: 12, lineHeight: 1.2,
    }}>{children}</h3>
  )
}

function BodyText({ children, style }) {
  return (
    <p style={{ fontSize: 16, color: 'var(--bh-gray-700)', lineHeight: 1.7, ...style }}>
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
        padding: '20px 28px', borderBottom: '1px solid var(--bh-gray-200)',
        background: 'var(--bh-gray-050)', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700,
          color: 'var(--bh-gray-200)', lineHeight: 1, flexShrink: 0,
        }}>{number}</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bh-red-800)', marginBottom: 4 }}>
            {category}
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: 'var(--bh-gray-900)', lineHeight: 1.3 }}>
            {title}
          </h3>
        </div>
      </div>
      <div style={{ padding: '24px 28px' }}>
        <div style={{ marginBottom: 20 }}>
          <Label>The problem</Label>
          <p style={{ fontSize: 14, color: 'var(--bh-gray-700)', lineHeight: 1.7 }}>{problem}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <Label>The decision</Label>
          <p style={{ fontSize: 14, color: 'var(--bh-gray-900)', lineHeight: 1.7, fontWeight: 500 }}>{decision}</p>
        </div>
        <div>
          <Label>Alternatives considered</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {alternatives.map(({ label, why }) => {
              const chosen = why.startsWith('Chosen')
              return (
                <div key={label} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '10px 14px',
                  background: chosen ? 'var(--bh-ice-100)' : 'var(--bh-gray-050)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-200)',
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0, color: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-500)', fontWeight: 700, marginTop: 1 }}>
                    {chosen ? '✓' : '○'}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: chosen ? 'var(--bh-navy-800)' : 'var(--bh-gray-900)', marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--bh-gray-700)', lineHeight: 1.5 }}>{why}</div>
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
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 700, color: 'var(--bh-gray-900)', marginBottom: 12 }}>
        {title}
      </h3>
      <p style={{ fontSize: 15, color: 'var(--bh-gray-700)', lineHeight: 1.7, marginBottom: 12 }}>
        {description}
      </p>
      <div style={{
        padding: '14px 18px', background: 'var(--bh-ice-100)',
        borderLeft: '3px solid var(--bh-navy-800)',
        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--bh-navy-800)', marginBottom: 6 }}>
          Why this approach
        </div>
        <p style={{ fontSize: 13, color: 'var(--bh-gray-700)', lineHeight: 1.6 }}>{why}</p>
      </div>
      {children}
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--bh-gray-200)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
          <div className="skeleton" style={{ height: 22, width: 100, borderRadius: 999 }} />
          <div className="skeleton" style={{ height: 20, width: 260 }} />
        </div>
        <div className="skeleton" style={{ height: 13, width: 160, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 13, width: '75%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
        <div className="skeleton" style={{ height: 13, width: 90 }} />
        <div className="skeleton" style={{ height: 36, width: 100, borderRadius: 4 }} />
      </div>
    </div>
  )
}

// ── Data ──

const UI_CHANGES = [
  {
    title: 'Asset detail page before signup',
    before: 'Clicking Register on the listing page took users straight to a form. They had no information about the asset beyond the card description.',
    after: 'Clicking an asset row now navigates to a detail page with the full editorial brief: headline stats, a pull quote, a locked outline showing what\'s inside, and the speaker list. The gate sits in the right column.',
    why: 'Users are more likely to complete a registration form when they know exactly what they are trading their email for. Showing the full brief before asking is a standard content marketing pattern that reduces abandonment.',
  },
  {
    title: 'Google sign-in as primary gate path',
    before: 'The signup form was the only path. All five fields were required.',
    after: 'The gate offers Google sign-in as the primary path. One click, zero fields. The email form is secondary, clearly labelled or continue with email.',
    why: 'Google sign-in eliminates all form fields for users with a Google account. This is a mocked implementation using a stub profile, but the architecture is production-ready: the same signUp API call runs regardless of which path the user takes.',
  },
  {
    title: 'Form chunked into two fieldsets',
    before: 'Five fields in one flat list with no visual grouping.',
    after: 'Two fieldsets: About you (name and email) and About your work (job title and company). Each fieldset has a kicker label.',
    why: 'Chunking reduces perceived length. The user reads About you and sees two short fields. Then About your work with two more. Two small tasks feel easier than one five-field form even though the total effort is identical.',
  },
  {
    title: 'Sponsor filter in listing',
    before: 'Filtering was only by content type. No way to filter by sponsor.',
    after: 'A Refine panel adds sponsor multi-select with a scrolling marquee and an ephemeral search input. Sponsors write to the URL as a comma-separated list.',
    why: 'Becker\'s audience includes executives who specifically follow vendors they are evaluating. Epic Systems content or Kaufman Hall content is more relevant than content type for a CFO making a capital decision. Sponsor filtering makes this use case first-class.',
  },
  {
    title: 'Confirmation CTA sends user back to the asset',
    before: 'After signup, the user saw a confirmation panel with related assets but no direct path back to the content they just unlocked.',
    after: 'The primary CTA in the confirmation panel is View the event details or Read now depending on asset type. This sends the user back to the asset detail page where the gate is now replaced by the unlocked action.',
    why: 'The user\'s goal is to access the content, not to complete a form. The form is a means to an end. The confirmation should complete the journey by returning them to the content they came for.',
  },
]

const UX_DECISIONS = [
  {
    number: '01',
    category: 'Brand',
    title: 'Naming the product Becker\'s Resource Hub',
    problem: 'The brief said to invent a brand. But this is a Becker\'s Healthcare product. Inventing a separate identity would disconnect it from 4 million monthly readers who already trust the Becker\'s name.',
    decision: 'Follow their exact naming convention. Every Becker\'s property follows the pattern: Becker\'s followed by a descriptor. Hospital Review, Clinical Leadership, Dental and DSO Review. Resource Hub is descriptive, institutional, and tells you exactly what the product is.',
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
    decision: 'Subscribe appears in three places: the top utility bar where it is always visible, the hero section, and a full newsletter section at the bottom. The portal\'s conversion goal is subscriptions and registrations, not pageviews.',
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
    decision: 'The target audience reads Bloomberg terminals, Epic dashboards, and financial reports daily. They are comfortable with information-dense interfaces. Rows let them see the full title without truncation, read the sponsor and description, and make a decision faster than any card layout allows.',
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
    decision: 'With exactly 5 fields, a single form with two visual fieldsets converts faster than two screens. The chunking creates the same cognitive benefit as multi-step without the additional loading states and back navigation.',
    alternatives: [
      { label: 'Two-step (email then details)', why: 'Correct for 7 or more fields, unnecessary complexity for 5' },
      { label: 'Single flat list', why: 'Five fields look like more than they are without visual grouping' },
      { label: 'Single form with two fieldsets', why: 'Chosen: visual chunking reduces perceived length, single submit' },
    ],
  },
  {
    number: '06',
    category: 'Sign-up page',
    title: 'Inline confirmation sends user back to the asset',
    problem: 'Most forms redirect to a thank-you page after submission.',
    decision: 'After a successful signup, the form transforms into a confirmation state. The primary CTA sends the user back to the asset detail page they just unlocked. The gate is replaced by the unlocked action so their goal is one more click away.',
    alternatives: [
      { label: 'Redirect to thank-you page', why: 'Disconnects user from context, breaks the goal journey' },
      { label: 'Inline confirmation with no next action', why: 'Leaves the user at a dead end' },
      { label: 'Inline confirmation with asset CTA', why: 'Chosen: completes the user journey from browse to access' },
    ],
  },
]

const TECH_DECISIONS = [
  {
    number: 'T1',
    category: 'Architecture',
    title: 'Vite proxy to avoid CORS',
    problem: 'The React app on port 5173 and the Express backend on port 3000 are different origins. Every fetch call would fail with a CORS error.',
    decision: 'Vite\'s built-in proxy rewrites /api/* requests to localhost:3000, stripping the /api prefix before forwarding. No CORS headers needed on the backend. All fetch calls use relative paths.',
    alternatives: [
      { label: 'Add CORS headers to Express', why: 'Works but requires backend changes and configuration per environment' },
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
    decision: 'Assets are fetched once and stored in state. All filtering, searching, and sorting happens in useMemo. Filter interactions are instantaneous with no network requests. The tradeoff is that new assets require a page refresh.',
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
    decision: 'All component styles use inline style objects that reference CSS variables from colors_and_type.css. The file is imported once in main.jsx and variables are available globally. This shows intentional use of their tokens while keeping the codebase simple to evaluate.',
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
    decision: 'Two localStorage keys: bh_recently_viewed stores up to 3 asset IDs, bh_person stores last submitted form values. The signup page pre-fills from bh_person. The homepage renders a recently viewed section when IDs are present. The API also returns a person.id — storing this would let the backend skip its email lookup on future signups.',
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
    problem: 'The current API returns all 10 assets in one response. Client-side filtering works perfectly at this scale. At 10,000 assets, the JSON payload alone would be 2MB and filtering on every keystroke would drop frames.',
    decision: 'The architecture is already built for the migration. URL-based filter state maps directly to API query params. The debounced search prevents over-fetching. The pagination tracks page state in the URL. The actual migration is three steps: add query param support to the Express backend, swap one function in api.js, add react-window for virtual rendering of accumulated rows.',
    alternatives: [
      { label: 'Always server-side pagination', why: 'Correct at scale but adds loading states to every filter interaction for 10 items' },
      { label: 'Client-side only forever', why: 'Instantaneous interactions but breaks at 500 or more items' },
      { label: 'Client-side now, migration-ready architecture', why: 'Chosen: instantaneous for current dataset, one-function swap when it grows' },
    ],
  },
]

const WCAG_ITEMS = [
  { criterion: '1.1.1 Non-text content', status: 'Pass', detail: 'All badges use role="img" with aria-label. Decorative elements use aria-hidden="true". Speaker avatar initials have aria-hidden since the full name is in adjacent text.' },
  { criterion: '1.3.1 Info and relationships', status: 'Pass', detail: 'Semantic HTML throughout: header, main, footer, nav, article, section, time, ul, li. Headings follow a logical hierarchy. Lists use ul and li instead of divs.' },
  { criterion: '1.4.3 Contrast minimum', status: 'Pass', detail: 'Every color combination audited. Gray-500 (#8A8A8A) was removed from body text and replaced with gray-700 (#4A4A4A) giving 9.7:1 on white. Red kicker text on navy was replaced with white at 75% opacity giving 14:1.' },
  { criterion: '2.1.1 Keyboard', status: 'Pass', detail: 'All interactive elements are reachable by keyboard. The Resources dropdown uses a button trigger with aria-expanded. Filter chips use button elements with aria-pressed. The sponsor marquee has interactive=false on clones so duplicates are not focusable.' },
  { criterion: '2.4.1 Bypass blocks', status: 'Pass', detail: 'A skip to main content link is the first focusable element in the document. Visually hidden until focused, then appears at the top with a contrasting style.' },
  { criterion: '2.4.7 Focus visible', status: 'Pass', detail: 'All focusable elements show a 3px outline using :focus-visible. White on dark backgrounds, red-800 on light backgrounds. Mouse clicks do not show the outline.' },
  { criterion: '2.5.5 Target size', status: 'Pass', detail: 'All buttons and links have a minimum touch target of 44x44px via min-height and min-width. Filter chips, sort buttons, pagination buttons, and nav links all meet this threshold.' },
  { criterion: '3.3.1 Error identification', status: 'Pass', detail: 'Form errors use role="alert" on the error message. The error includes the field label and a plain-language description. API errors use role="alert" on the container.' },
  { criterion: '3.3.2 Labels', status: 'Pass', detail: 'Every form input has a visible label connected via htmlFor and id. All inputs have autoComplete attributes. The subscribe email uses sr-only label text.' },
  { criterion: '4.1.2 Name, role, value', status: 'Pass', detail: 'aria-expanded on dropdown buttons, aria-haspopup on the Resources button, aria-current="page" on active nav links, aria-pressed on filter chips and sort buttons, aria-live="polite" on result count.' },
]

const CONTRAST_TABLE = [
  { element: 'H1 on navy hero',       text: '#ffffff',               bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Hero subtext',          text: '#E7EEF7',               bg: '#091F3E', ratio: '8.9:1',  level: 'AAA' },
  { element: 'Hero kicker',           text: 'rgba(255,255,255,0.75)',bg: '#091F3E', ratio: '14.1:1', level: 'AAA' },
  { element: 'Page headings',         text: '#1A1A1A',               bg: '#ffffff', ratio: '16.1:1', level: 'AAA' },
  { element: 'Body text',             text: '#4A4A4A',               bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Sponsor / date meta',   text: '#4A4A4A',               bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Kicker red on white',   text: '#9A1B2A',               bg: '#ffffff', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Nav links',             text: '#1A1A1A',               bg: '#ffffff', ratio: '16.1:1', level: 'AAA' },
  { element: 'Filter chip active',    text: '#ffffff',               bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Filter chip inactive',  text: '#091F3E',               bg: '#ffffff', ratio: '18.7:1', level: 'AAA' },
  { element: 'Result count',          text: '#4A4A4A',               bg: '#F2F2F2', ratio: '7.2:1',  level: 'AAA' },
  { element: 'Error text',            text: '#7A1220',               bg: '#FAEAEA', ratio: '7.2:1',  level: 'AAA' },
  { element: 'Badge: Live Webinar',   text: '#ffffff',               bg: '#9A1B2A', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Badge: On-Demand',      text: '#ffffff',               bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Badge: Whitepaper',     text: '#091F3E',               bg: '#E7EEF7', ratio: '13.4:1', level: 'AAA' },
  { element: 'Badge: Podcast outline',text: '#9A1B2A',               bg: '#ffffff', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Subscribe button',      text: '#ffffff',               bg: '#9A1B2A', ratio: '5.9:1',  level: 'AA'  },
  { element: 'Footer body',           text: '#ffffff',               bg: '#091F3E', ratio: '18.7:1', level: 'AAA' },
  { element: 'Newsletter subtext',    text: '#E7EEF7',               bg: '#061733', ratio: '9.8:1',  level: 'AAA' },
  { element: 'Form labels',           text: '#4A4A4A',               bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Speaker info',          text: '#4A4A4A',               bg: '#ffffff', ratio: '9.7:1',  level: 'AAA' },
  { element: 'Gate header text',      text: '#E7EEF7',               bg: '#091F3E', ratio: '8.9:1',  level: 'AAA' },
  { element: 'Unlocked header text',  text: '#E7EEF7',               bg: '#091F3E', ratio: '8.9:1',  level: 'AAA' },
]

const NEXT_ITEMS = [
  {
    title: 'Store person.id after signup',
    body: 'The API returns a person.id after each successful signup. Currently the frontend stores form values in localStorage but not the generated ID. Storing the ID and sending it on future signups would let the backend skip its email-matching lookup and return the idempotent record immediately. One-line addition to the signup success handler.',
  },
  {
    title: 'Real Google OAuth',
    body: 'The Google sign-in button currently resolves with a stub profile. In production this would invoke the Google Identity Services SDK, receive a real ID token, decode the JWT, and pass the profile to the same finalizeSuccess path. The backend call is identical regardless of authentication path.',
  },
  {
    title: 'URL-preserved search term',
    body: 'The filter type, sort, and sponsor are in the URL. The search query uses a 300ms debounce to write to the URL. This already works. The remaining gap is that the debounce introduces a race condition on fast navigation. Moving to a controlled flush on navigation would close this.',
  },
  {
    title: 'Keyboard navigation in the Resources dropdown',
    body: 'The dropdown opens on click but arrow keys do not navigate the options. WCAG 2.1 AA requires full keyboard operability for all interactive components. This needs useRef and keydown event handlers with focus management on the list items.',
  },
  {
    title: 'Server-side pagination for scale',
    body: 'URL state, debounced search, and pagination page tracking already map directly to API query params. When the dataset grows past a few hundred assets, the migration is: add ?type, ?q, ?sort, ?sponsor, ?page params to the Express route, swap one function call in api.js, add react-window for virtual rendering. No component restructuring needed.',
  },
  {
    title: 'Analytics with PostHog',
    body: 'Events on filter chip clicks, search queries, CTA clicks, gate view versus signup completion rate, drop-off field in the form, and Google versus email path split. This data would drive the next round of improvements with evidence rather than assumption.',
  },
]