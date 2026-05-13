import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listing from './pages/Listing'
import AssetDetail from './pages/AssetDetail'
import Signup from './pages/Signup'
import Decisions from './pages/Decisions'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        display: 'flex', flexDirection: 'column', minHeight: '100vh',
        background: 'var(--bh-navy-800)',
      }}>

        {/* Skip to main content */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Nav />
        <main
          id="main-content"
          style={{ flex: 1, background: 'var(--color-bg-tinted)' }}
          tabIndex={-1}
        >
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/assets"            element={<Listing />} />
            <Route path="/assets/:id"        element={<AssetDetail />} />
            <Route path="/assets/:id/signup" element={<Signup />} />
            <Route path="/decisions"         element={<Decisions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}