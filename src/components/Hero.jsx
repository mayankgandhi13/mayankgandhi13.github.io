import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const phrases = [
  'decode genomic sequences...',
  'build NGS pipelines on HPC...',
  'model synaptic signalling with ODEs...',
  'train attention networks on multi-omics...',
  'analyze COPD transcriptomes with limma...',
  'connect biology + AI + computation...',
  'optimize biochemical models with FindSim...',
]

function useTypewriter(phrases) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const phrase = phrases[pi]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, text.length + 1))
        if (text.length + 1 === phrase.length) setTimeout(() => setDeleting(true), 1600)
      } else {
        setText(phrase.slice(0, text.length - 1))
        if (text.length - 1 === 0) { setDeleting(false); setPi(p => (p + 1) % phrases.length) }
      }
    }, deleting ? 38 : 75)
    return () => clearTimeout(timeout)
  }, [text, deleting, pi, phrases])
  return text
}

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const isFloat = target % 1 !== 0
    const steps = 80
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [start, target, duration])
  return count
}

function HelixCanvas() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let t = 0, raf
    function resize() { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    function draw() {
      ctx.clearRect(0, 0, c.width, c.height)
      const cx = c.width / 2, h = c.height, amp = 55, freq = 0.028
      for (let y = 0; y < h; y += 4) {
        const x1 = cx + Math.sin(y * freq + t) * amp
        const x2 = cx + Math.sin(y * freq + t + Math.PI) * amp
        const a1 = 0.3 + 0.4 * Math.abs(Math.sin(y * freq + t))
        const a2 = 0.3 + 0.4 * Math.abs(Math.sin(y * freq + t + Math.PI))
        ctx.beginPath(); ctx.arc(x1, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,229,176,${a1})`; ctx.fill()
        ctx.beginPath(); ctx.arc(x2, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(61,158,255,${a2})`; ctx.fill()
        if (y % 22 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y)
          ctx.strokeStyle = 'rgba(167,139,250,0.25)'; ctx.lineWidth = 1; ctx.stroke()
        }
      }
      t += 0.03; raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', right: 0, top: 0, width: '38%', height: '100%', opacity: 0.4, pointerEvents: 'none' }} />
}

const statsData = [
  { value: 3.9,  suffix: '',  label: 'GPA',           float: true },
  { value: 6,    suffix: '+', label: 'Projects',       float: false },
  { value: 3,    suffix: '+', label: 'Years Research', float: false },
  { value: 5,    suffix: '+', label: 'Certifications', float: false },
]

function StatCard({ value, suffix, label, float, started }) {
  const count = useCountUp(value, 1800, started)
  return (
    <div style={{ textAlign: 'center', minWidth: 70 }}>
      <div style={{
        fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 800,
        background: 'linear-gradient(135deg,var(--grn),var(--blu))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text', lineHeight: 1
      }}>
        {float ? count.toFixed(1) : count}{suffix}
      </div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '0.62rem',
        color: 'var(--mut)', letterSpacing: '0.12em',
        marginTop: 6, textTransform: 'uppercase'
      }}>
        {label}
      </div>
    </div>
  )
}

export default function Hero() {
  const typed = useTypewriter(phrases)
  const [particlesInit, setParticlesInit] = useState(false)
  const [statsStarted, setStatsStarted] = useState(false)
  const statsRef = useRef()

  const initParticles = useCallback(async engine => {
    await loadSlim(engine)
    setParticlesInit(true)
  }, [])

  // Trigger counter when stats come into view
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsStarted(true); obs.disconnect() }
    }, { threshold: 0.5 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '5rem 2rem 3rem', overflow: 'hidden' }}>

      <Particles
        id="tsparticles"
        init={initParticles}
        options={{
          background: { color: { value: 'transparent' } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'grab' },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              grab: { distance: 160, links: { opacity: 0.4 } },
              push: { quantity: 3 },
            },
          },
          particles: {
            color: { value: ['#00e5b0', '#3d9eff', '#a78bfa'] },
            links: { color: '#3d9eff', distance: 140, enable: true, opacity: 0.1, width: 1 },
            move: { enable: true, speed: 0.6, outModes: { default: 'bounce' } },
            number: { value: 60, density: { enable: true, area: 900 } },
            opacity: { value: { min: 0.2, max: 0.5 } },
            shape: { type: 'circle' },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      <HelixCanvas />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--grn)',
            border: '1px solid rgba(0,229,176,0.25)', background: 'rgba(0,229,176,0.05)',
            padding: '5px 14px', borderRadius: 20, display: 'inline-block',
            marginBottom: '1.4rem', letterSpacing: '0.1em'
          }}>
            ▶ MS Bioinformatics · Northeastern University · Boston, MA
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(3.5rem,8vw,6.5rem)', fontWeight: 800, lineHeight: 1.0, marginBottom: '0.6rem', letterSpacing: '-0.03em' }}
        >
          Mayank<br />
          <span style={{
            background: 'linear-gradient(100deg,var(--grn) 0%,var(--blu) 50%,var(--pur) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(0,229,176,0.25))'
          }}>Gandhi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 'clamp(0.95rem,2vw,1.15rem)', color: 'var(--mut)', marginBottom: '1.2rem' }}
        >
          Genomics & Transcriptomics · Neuroscience · Data-Driven Healthcare
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.88rem', color: 'var(--grn)',
            background: 'rgba(0,229,176,0.05)', border: '1px solid rgba(0,229,176,0.15)',
            padding: '10px 16px', borderRadius: 8, marginBottom: '2rem',
            display: 'inline-block', minWidth: 340, minHeight: 40
          }}
        >
          <span style={{ color: 'var(--mut)' }}>$ </span>{typed}
          <span style={{ display: 'inline-block', width: 2, height: 14, background: 'var(--grn)', marginLeft: 2, verticalAlign: 'middle', animation: 'blink 0.8s step-end infinite' }} />
        </motion.div>

        {/* Animated stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {statsData.map((s, i) => (
            <StatCard key={i} {...s} started={statsStarted} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="btn btn-g" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}>View Projects</a>
          <a href="#about" className="btn btn-o" onClick={e => { e.preventDefault(); document.getElementById('about').scrollIntoView({ behavior: 'smooth' }) }}>About Me</a>
          <a href="/MayankGandhi-Resume.pdf" className="btn btn-o" target="_blank" rel="noreferrer">Resume</a>
          <a href="https://orcid.org/0009-0000-3448-9308" className="btn btn-o" target="_blank" rel="noreferrer">ORCID</a>
        </motion.div>
      </div>

      <style>{`@keyframes blink { 50% { opacity:0 } }`}</style>
    </section>
  )
}