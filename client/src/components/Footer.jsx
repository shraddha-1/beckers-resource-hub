import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bh-footer" role="contentinfo">
      <div className="bh-footer__inner">

        <div className="bh-footer__brand">
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11, fontWeight: 700,
              color: 'var(--bh-ice-200)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>Becker's</div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 20, fontWeight: 700,
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}>Resource Hub</div>
          </div>
          <h4>Contact Us</h4>
          <a className="bh-footer__phone" href="tel:18004172035"
            aria-label="Call 1-800-417-2035">
            1-800-417-2035
          </a>
          <a className="bh-footer__mail" href="mailto:becker@beckershealthcare.com"
            aria-label="Email becker@beckershealthcare.com">
            becker@beckershealthcare.com
          </a>
          <nav aria-label="Social media links">
            <div className="bh-footer__social">
              {['RSS','LinkedIn','Facebook','X','YouTube'].map(s => (
                <a key={s} href="#" aria-label={`Follow on ${s}`}>{s}</a>
              ))}
            </div>
          </nav>
        </div>

        <div className="bh-footer__col">
          <h4>Other Becker's Sites</h4>
          <ul>
            {['ASC','Spine','Dental','Payer','Behavioral','Physician'].map(s => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="bh-footer__col">
          <h4>More Resources</h4>
          <ul>
            {[
              { label: 'All Resources',      to: '/assets' },
              { label: 'Live Webinars',      to: '/assets?type=Live+Webinar' },
              { label: 'On-Demand Webinars', to: '/assets?type=On-Demand+Webinar' },
              { label: 'Whitepapers',        to: '/assets?type=Whitepaper' },
              { label: 'Podcasts',           to: '/assets?type=on-demand+podcast' },
            ].map(({ label, to }) => (
              <li key={label}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="bh-footer__col">
          <h4>About</h4>
          <ul>
            {["About Becker's",'Careers','Media Kit','Contact Us','Privacy Policy'].map(s => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
            <li>
              <Link to="/decisions" style={{
                color: 'var(--bh-red-600)',
                fontWeight: 600,
              }}>Design decisions</Link>
            </li>
          </ul>
        </div>

      </div>
      <div className="bh-footer__legal">
        <span>Copyright © 2026 Becker's Healthcare. All Rights Reserved.</span>
      </div>
    </footer>
  )
}