import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { getAsset, getAssets, signUp } from '../lib/api'
import { getConfig, formatDate } from '../lib/assetHelpers'
import { markUnlocked } from '../lib/unlocks'
import AssetBrief from '../components/AssetBrief'
import Badge from '../components/Badge'
import GoogleAuthButton from '../components/GoogleAuthButton'



export default function Signup() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const prefillEmail = searchParams.get('prefill') || ''
  
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [related, setRelated] = useState([])

  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '', jobTitle: '', companyName: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    setAsset(null)
    setLoading(true)
    setConfirmed(null)
    setRelated([])
    setApiError(null)
    setErrors({})
    setTouched({})

    let initial = { firstName: '', lastName: '', email: '', jobTitle: '', companyName: '' }
    try {
      const saved = JSON.parse(localStorage.getItem('bh_person') || 'null')
      if (saved) {
        initial = {
          firstName:   saved.firstName   || '',
          lastName:    saved.lastName    || '',
          email:       saved.email       || '',
          jobTitle:    saved.jobTitle    || '',
          companyName: saved.companyName || '',
        }
      }
    } catch {
      // localStorage may be unavailable in private browsing.
    }

    if (prefillEmail && !initial.email) initial.email = prefillEmail

    setForm(initial)

    getAsset(id)
      .then(setAsset)
      .catch(() => navigate('/assets'))
      .finally(() => setLoading(false))
  }, [id, navigate, prefillEmail])

  const validateField = (name, value) => {
    if (!value.trim()) return 'Required'
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid email address'
    }
    return null
  }

  const handleBlur = (name) => {
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(e => ({ ...e, [name]: validateField(name, form[name]) }))
  }

  const handleChange = (name, value) => {
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      setErrors(e => ({ ...e, [name]: validateField(name, value) }))
    }
  }

  const finalizeSuccess = async (result, contact) => {
    try {
      localStorage.setItem('bh_person', JSON.stringify(contact))
    } catch {
      // localStorage may be unavailable; non-blocking.
    }
    markUnlocked(id)
    setConfirmed(result)
    try {
      const all = await getAssets()
      const others = all.filter(a =>
        a.id !== id && (
          a.assetType === asset?.assetType ||
          a.sponsorName === asset?.sponsorName
        )
      ).slice(0, 3)
      setRelated(others)
    } catch {
      // Related assets are decorative — failure is non-fatal.
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = ['firstName', 'lastName', 'email', 'jobTitle', 'companyName']
    const newErrors = {}
    const newTouched = {}
    fields.forEach(f => {
      newTouched[f] = true
      const err = validateField(f, form[f])
      if (err) newErrors[f] = err
    })
    setTouched(newTouched)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setApiError(null)
    setSubmitting(true)
    try {
      const result = await signUp(id, form)
      await finalizeSuccess(result, form)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogleSuccess = async (profile) => {
    setApiError(null)
    setSubmitting(true)
    const contact = {
      firstName:   profile.firstName   || '',
      lastName:    profile.lastName    || '',
      email:       profile.email       || '',
      jobTitle:    form.jobTitle       || 'Healthcare Professional',
      companyName: form.companyName    || 'Becker\'s Reader',
    }
    try {
      const result = await signUp(id, contact)
      setForm(contact)
      await finalizeSuccess(result, contact)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSkeleton />
  if (!asset)  return null

  const cfg = getConfig(asset.assetType)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 80px' }}>
      <Link
        to={`/assets/${id}`}
        className="btn-text"
        style={{
          display: 'inline-flex', alignItems: 'center',
          gap: 4, marginBottom: 24, fontSize: 13,
        }}
      >
        ← Back to resource
      </Link>

      <div className="asset-detail-grid">
        {/* LEFT — same editorial brief used on the asset detail page */}
        <AssetBrief asset={asset} />

        {/* RIGHT — sticky form or confirmation */}
        <div className="gate-sticky" aria-label={confirmed ? 'Registration confirmed' : 'Registration form'}>
          {confirmed ? (
            <ConfirmationState
              confirmed={confirmed}
              asset={asset}
              related={related}
            />
          ) : (
            <SignupForm
              cfg={cfg}
              form={form}
              errors={errors}
              apiError={apiError}
              submitting={submitting}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              onGoogleSuccess={handleGoogleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Form ─────────────────────────────────────────────────────────

function SignupForm({
  cfg, form, errors, apiError, submitting,
  onChange, onBlur, onSubmit, onGoogleSuccess,
}) {
  return (
    <div style={{
      background: 'var(--color-bg)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div className="dark-surface" style={{
        background: 'var(--bh-navy-800)',
        padding: '20px 24px',
      }}>
        <h2 className="bh-h4" style={{ color: '#fff', marginBottom: 4 }}>
          {cfg.verb === 'Register' ? 'Register for this webinar'
            : cfg.verb === 'Download' ? 'Download this whitepaper'
              : cfg.verb === 'Listen' ? 'Access this podcast'
                : 'Access this resource'}
        </h2>
        <p className="bh-small" style={{ color: 'var(--bh-ice-100)' }}>
          We'll save your details so you can unlock more resources without filling this out again.
        </p>
      </div>

      <div style={{ padding: 24 }}>
        <GoogleAuthButton
          onSuccess={onGoogleSuccess}
          disabled={submitting}
          label="Continue with Google"
        />

        <div
          aria-hidden="true"
          className="bh-kicker"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: 'var(--bh-gray-500)',
            margin: '18px 0 14px',
          }}
        >
          <span style={{ flex: 1, height: 1, background: 'var(--bh-gray-200)' }} />
          <span>or continue with email</span>
          <span style={{ flex: 1, height: 1, background: 'var(--bh-gray-200)' }} />
        </div>

        <form onSubmit={onSubmit} noValidate aria-label="Registration form">
          {apiError && (
            <div role="alert" style={{
              padding: '12px 14px',
              background: '#FAEAEA',
              border: '1px solid var(--bh-red-600)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13, color: 'var(--bh-red-800)',
              marginBottom: 16,
            }}>{apiError}</div>
          )}

          <fieldset style={{ border: 'none', padding: 0, margin: '0 0 18px' }}>
            <legend className="bh-kicker" style={{
              color: 'var(--bh-gray-700)',
              marginBottom: 10, padding: 0,
            }}>About you</legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="name-fields" style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
              }}>
                <Field
                  name="firstName" label="First name"
                  value={form.firstName} error={errors.firstName}
                  autoComplete="given-name"
                  onChange={v => onChange('firstName', v)}
                  onBlur={() => onBlur('firstName')}
                />
                <Field
                  name="lastName" label="Last name"
                  value={form.lastName} error={errors.lastName}
                  autoComplete="family-name"
                  onChange={v => onChange('lastName', v)}
                  onBlur={() => onBlur('lastName')}
                />
              </div>
              <Field
                name="email" label="Work email" type="email"
                value={form.email} error={errors.email}
                autoComplete="email"
                onChange={v => onChange('email', v)}
                onBlur={() => onBlur('email')}
              />
            </div>
          </fieldset>

          <fieldset style={{ border: 'none', padding: 0, margin: '0 0 18px' }}>
            <legend className="bh-kicker" style={{
              color: 'var(--bh-gray-700)',
              marginBottom: 10, padding: 0,
            }}>About your work</legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field
                name="jobTitle" label="Job title"
                value={form.jobTitle} error={errors.jobTitle}
                autoComplete="organization-title"
                onChange={v => onChange('jobTitle', v)}
                onBlur={() => onBlur('jobTitle')}
              />
              <Field
                name="companyName" label="Company name"
                value={form.companyName} error={errors.companyName}
                autoComplete="organization"
                onChange={v => onChange('companyName', v)}
                onBlur={() => onBlur('companyName')}
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
            style={{
              width: '100%',
              fontSize: 15, padding: '13px',
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}
          >
            {submitting ? 'Submitting…' : `${cfg.verb} now`}
          </button>

          <p className="bh-meta" style={{
            color: 'var(--bh-gray-700)',
            textAlign: 'center', lineHeight: 1.5,
            marginTop: 14,
          }}>
            By continuing, you agree to Becker's Healthcare{' '}
            <a href="#" style={{ color: 'var(--color-accent)' }}>
              terms of service and privacy policy
            </a>.
          </p>
        </form>
      </div>
    </div>
  )
}

// ── Field ────────────────────────────────────────────────────────

function Field({ name, label, type = 'text', value, error, onChange, onBlur, autoComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label
        htmlFor={`field-${name}`}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-semibold)',
          color: error ? 'var(--bh-red-900)' : 'var(--bh-gray-700)',
        }}
      >
        {label}
        {error && (
          <span role="alert" style={{ marginLeft: 6, fontWeight: 'var(--fw-regular)' }}>
            — {error}
          </span>
        )}
      </label>
      <input
        id={`field-${name}`}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14, padding: '10px 12px',
          border: '2px solid',
          borderColor: error ? 'var(--bh-red-600)' : 'var(--bh-gray-300)',
          borderRadius: 'var(--radius-sm)',
          background: '#fff',
          color: 'var(--bh-gray-900)',
          outline: 'none', width: '100%',
          minHeight: 44,
          transition: 'border-color 0.15s',
        }}
      />
    </div>
  )
}

// ── Confirmation ─────────────────────────────────────────────────

function ConfirmationState({ confirmed, asset, related }) {

  const isWebinar = asset.assetType === 'Live Webinar'
  const ctaLabel = isWebinar ? 'View the event details' : 'Read now'

  return (
    <div>
      <div style={{
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 24px',
        textAlign: 'center',
        marginBottom: 24,
      }}>
        <div aria-hidden="true" style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--bh-ice-100)',
          border: '2px solid var(--bh-navy-800)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="var(--bh-navy-800)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h2 className="bh-h3" style={{ marginBottom: 8 }}>You're in</h2>

        <p className="bh-small" style={{
          color: 'var(--bh-gray-700)',
          marginBottom: 18,
        }}>
          Confirmed for <strong>{asset.name}</strong>
        </p>

        <Link
          to={`/assets/${asset.id}`}
          className="btn btn-primary"
          style={{ fontSize: 14, padding: '11px 22px' }}
        >{ctaLabel} →</Link>

        <time
          dateTime={confirmed.signupDate}
          className="bh-meta"
          style={{
            display: 'block',
            color: 'var(--bh-gray-700)',
            marginTop: 16,
          }}
        >
          Registered {new Date(confirmed.signupDate).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}
        </time>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="signup-related-heading">
          <h3 id="signup-related-heading" className="bh-kicker" style={{ marginBottom: 12 }}>
            You might also like
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {related.map(a => {
              const c = getConfig(a.assetType)
              const date = formatDate(a.executionDate || a.expirationDate)
              return (
                <li key={a.id}>
                  <Link
                    to={`/assets/${a.id}`}
                    className="bh-card-hover"
                    aria-label={`${c.label}: ${a.name}`}
                    style={{
                      display: 'block',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--bh-ice-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 16px',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ marginBottom: 6 }}>
                      <Badge type={a.assetType} />
                    </div>
                    <h4 className="bh-headline" style={{
                      fontSize: 'var(--fs-md)',
                      marginBottom: 6,
                    }}>{a.name}</h4>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      {date && (
                        <time className="bh-meta" dateTime={a.executionDate || a.expirationDate}>
                          {date}
                        </time>
                      )}
                      <span className="bh-label" style={{ color: 'var(--bh-red-800)' }}>
                        {c.verb} →
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div role="status" aria-label="Loading"
      style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 80px' }}
    >
      <div className="skeleton" style={{ height: 14, width: 220, marginBottom: 24 }} />
      <div className="asset-detail-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="skeleton" style={{ height: 22, width: 120 }} />
          <div className="skeleton" style={{ height: 36, width: '95%' }} />
          <div className="skeleton" style={{ height: 36, width: '70%' }} />
          <div className="skeleton" style={{ height: 18, width: '100%', marginTop: 8 }} />
          <div className="skeleton" style={{ height: 18, width: '90%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="skeleton" style={{ height: 80, width: '100%', borderRadius: 8 }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
          <div className="skeleton" style={{ height: 44, width: '100%' }} />
        </div>
      </div>
    </div>
  )
}
