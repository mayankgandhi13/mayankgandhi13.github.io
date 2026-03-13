import { motion } from 'framer-motion'

const links = [
  {
    label: 'Email',
    value: '135.mayankgandhi@gmail.com',
    href: 'mailto:135.mayankgandhi@gmail.com',
    color: 'var(--grn)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'mayankgandhi0713',
    href: 'https://linkedin.com/in/mayankgandhi0713',
    color: 'var(--blu)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'mayankgandhi13',
    href: 'https://github.com/mayankgandhi13',
    color: 'var(--txt)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
      </svg>
    ),
  },
  {
    label: 'ORCID',
    value: '0009-0000-3448-9308',
    href: 'https://orcid.org/0009-0000-3448-9308',
    color: 'var(--grn)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V8h2v9zm-1-10.25c-.69 0-1.25-.56-1.25-1.25S9.31 4.25 10 4.25s1.25.56 1.25 1.25S10.69 6.75 10 6.75zM17 17h-2v-4c0-1.1-.9-2-2-2s-2 .9-2 2v4h-2V8h2v1.1C11.55 8.4 12.52 8 13.5 8c1.93 0 3.5 1.57 3.5 3.5V17z"/>
      </svg>
    ),
  },
  {
    label: 'Resume',
    value: 'MayankGandhi-Resume.pdf',
    href: '/MayankGandhi-Resume.pdf',
    color: 'var(--pink)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M10,19L12,15H9V10H15V15L13,19H10Z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Connect</div>
          <div className="sec-title">Get in Touch</div>
          <p style={{ color: 'var(--mut)', fontSize: '0.9rem', maxWidth: 520, marginBottom: '2.5rem', lineHeight: 1.7 }}>
            I'm actively looking for co-op and internship opportunities in bioinformatics, computational biology, and ML for genomics. Feel free to reach out!
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--s1)', border: '1px solid var(--brd)',
                borderRadius: 12, padding: '1rem 1.25rem',
                textDecoration: 'none', color: 'var(--txt)',
                fontFamily: 'var(--mono)', fontSize: '0.78rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = l.color
                e.currentTarget.style.color = l.color
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--brd)'
                e.currentTarget.style.color = 'var(--txt)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ color: l.color, flexShrink: 0 }}>{l.icon}</span>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--mut)', marginBottom: 2, letterSpacing: '0.1em' }}>{l.label.toUpperCase()}</div>
                <div style={{ fontSize: '0.75rem' }}>{l.value}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}