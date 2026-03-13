import { useState, useEffect } from 'react'

const links = ['About', 'Skills', 'Map', 'Experience', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 200,
      background: scrolled ? 'rgba(4,6,14,0.95)' : 'rgba(4,6,14,0.7)',
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${scrolled ? 'var(--brd)' : 'transparent'}`,
      transition: 'all 0.3s'
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: 56, padding: '0 2rem'
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.95rem',
          fontWeight: 600, color: 'var(--txt)', letterSpacing: '0.02em'
        }}>
          Mayank Gandhi
        </span>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map(l => (
            <li key={l}>
              <span
                onClick={() => scrollTo(l)}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '0.78rem',
                  color: 'var(--mut)', cursor: 'pointer',
                  letterSpacing: '0.1em', transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = 'var(--grn)'}
                onMouseLeave={e => e.target.style.color = 'var(--mut)'}
              >
                {l.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}