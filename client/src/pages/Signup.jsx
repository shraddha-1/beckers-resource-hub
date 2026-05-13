import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../lib/api'
import { getConfig, formatDate } from '../lib/assetHelpers'
import Badge from '../components/Badge'

export default function Signup({ asset, onSuccess }) {
  const id = asset.id

  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed]   = useState(null)
  const [apiError, setApiError]     = useState(null)
  const [errors, setErrors]         = useState({})
  const [touched, setTouched]       = useState({})

  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bh_person') || 'null')
      if (saved) return {
        firstName:   saved.firstName   || '',
        lastName:    saved.lastName    || '',
        email:       saved.email       || '',
        jobTitle:    saved.jobTitle    || '',
        companyName: saved.companyName || '',
      }
    } catch {}
    return { firstName: '', lastName: '', email: '', jobTitle: '', companyName: '' }
  })

  const validateField = (name, value) => {
    if (!value.trim()) return 'Required'
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Enter a valid email address'
    return null
  }

  const handleBlur = (name) => {
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(e => ({ ...e, [name]: validateField(name, form[name]) }))
  }

  const handleChange = (name, value) => {
    setForm(f => ({ ...f, [name]: value }))
    if (touched[name])
      setErrors(e => ({ ...e, [name]: validateField(name, value) }))
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
      try { localStorage.setItem('bh_person', JSON.stringify(form)) } catch {}
      setConfirmed(result)
      onSuccess?.()
    } catch (err) {
      setApiError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const cfg = getConfig(asset.assetType)

  if (confirmed) {
    return <ConfirmationState confirmed={confirmed} asset={asset} />
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--bh-ice-200)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      <div style={{ background: 'var(--bh-navy-800)', padding: '20px 24px' }}>
        <h2 className="bh-h4" style={{ color: '#fff', marginBottom: 6 }}>
          {cfg.verb === 'Register' ? 'Register for this webinar'
            : cfg.verb === 'Download' ? 'Download this whitepaper'
            : cfg.verb === 'Listen'   ? 'Access this podcast'
            : 'Access this resource'}
        </h2>
        <p className="bh-small" style={{ color: 'var(--bh-ice-100)' }}>
          Free. Your details are saved so future signups take seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate
        aria-label="Registration form" style={{ padding: 24 }}>
        {apiError && (
          <div role="alert" style={{
            padding: '12px 14px', background: '#FAEAEA',
            border: '1px solid var(--bh-red-600)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 13, color: 'var(--bh-red-800)', marginBottom: 16,
          }}>{apiError}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="name-fields"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field name="firstName" label="First name"
              value={form.firstName} error={errors.firstName}
              autoComplete="given-name"
              onChange={v => handleChange('firstName', v)}
              onBlur={() => handleBlur('firstName')} />
            <Field name="lastName" label="Last name"
              value={form.lastName} error={errors.lastName}
              autoComplete="family-name"
              onChange={v => handleChange('lastName', v)}
              onBlur={() => handleBlur('lastName')} />
          </div>

          <Field name="email" label="Work email" type="email"
            value={form.email} error={errors.email}
            autoComplete="email"
            onChange={v => handleChange('email', v)}
            onBlur={() => handleBlur('email')} />

          <Field name="jobTitle" label="Job title"
            value={form.jobTitle} error={errors.jobTitle}
            autoComplete="organization-title"
            onChange={v => handleChange('jobTitle', v)}
            onBlur={() => handleBlur('jobTitle')} />

          <Field name="companyName" label="Company name"
            value={form.companyName} error={errors.companyName}
            autoComplete="organization"
            onChange={v => handleChange('companyName', v)}
            onBlur={() => handleBlur('companyName')} />

          <button type="submit" disabled={submitting}
            className="btn btn-primary"
            style={{
              width: '100%', fontSize: 15, padding: '13px', marginTop: 4,
              opacity: submitting ? 0.6 : 1,
              cursor: submitting ? 'not-allowed' : 'pointer',
            }}>
            {submitting ? 'Submitting…' : `${cfg.verb} now`}
          </button>

          <p className="bh-meta" style={{
            color: 'var(--bh-gray-700)', textAlign: 'center', lineHeight: 1.5,
          }}>
            By registering, you agree to Becker's Healthcare{' '}
            <a href="#" style={{ color: 'var(--bh-red-800)' }}>
              terms of service and privacy policy
            </a>.
          </p>
        </div>
      </form>
    </div>
  )
}

function ConfirmationState({ confirmed, asset }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--bh-ice-200)',
      borderRadius: 'var(--radius-lg)', padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div aria-hidden="true" style={{
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--bh-ice-100)', border: '2px solid var(--bh-navy-800)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 16px',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="var(--bh-navy-800)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="bh-h3" style={{ marginBottom: 8 }}>You're registered</h2>
      <p className="bh-small" style={{ color: 'var(--bh-gray-700)', marginBottom: 18 }}>
        Confirmed for <strong>{asset.name}</strong>
      </p>
      <Link to="/assets" className="btn btn-primary"
        style={{ fontSize: 14, padding: '11px 22px' }}>
        Browse more resources →
      </Link>
      <time dateTime={confirmed.signupDate} className="bh-meta"
        style={{ display: 'block', color: 'var(--bh-gray-700)', marginTop: 16 }}>
        Registered {new Date(confirmed.signupDate).toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}
      </time>
    </div>
  )
}

function Field({ name, label, type = 'text', value, error, onChange, onBlur, autoComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label htmlFor={`field-${name}`} style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
        color: error ? 'var(--bh-red-900)' : 'var(--bh-gray-700)',
      }}>
        {label}
        {error && <span role="alert" style={{ marginLeft: 6, fontWeight: 400 }}>— {error}</span>}
      </label>
      <input id={`field-${name}`} type={type} value={value}
        autoComplete={autoComplete} aria-invalid={!!error}
        onChange={e => onChange(e.target.value)} onBlur={onBlur}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, padding: '10px 12px',
          border: '2px solid',
          borderColor: error ? 'var(--bh-red-600)' : 'var(--bh-gray-300)',
          borderRadius: 'var(--radius-sm)', background: '#fff',
          color: 'var(--bh-gray-900)', outline: 'none', width: '100%',
          minHeight: 44, transition: 'border-color 0.15s',
        }}
      />
    </div>
  )
}