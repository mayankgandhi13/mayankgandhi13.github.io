import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const links = ['About', 'Skills', 'Map', 'Experience', 'Projects', 'Education', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

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

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
          {links.map(l => (
            <li key={l} style={{ display: window.innerWidth < 700 ? 'none' : 'block' }}>
              <Link
                to={l.toLowerCase()}
                smooth duration={600}
                offset={-56}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '0.78rem',
                  color: 'var(--mut)', cursor: 'pointer',
                  letterSpacing: '0.1em', textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                activeStyle={{ color: 'var(--grn)' }}
                onMouseEnter={e => e.target.style.color = 'var(--grn)'}
                onMouseLeave={e => e.target.style.color = 'var(--mut)'}
              >
                {l.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}