import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const categories = [
  {
    label: '// Languages',
    color: 'var(--grn)',
    skills: [
      { name: 'R', pct: 92 },
      { name: 'Python', pct: 88 },
      { name: 'Bash', pct: 78 },
      { name: 'SQL', pct: 70 },
    ]
  },
  {
    label: '// NGS Pipeline',
    color: 'var(--blu)',
    skills: [
      { name: 'Salmon / STAR', pct: 90 },
      { name: 'GATK / BWA', pct: 82 },
      { name: 'SAMtools', pct: 85 },
      { name: 'FastQC / Trim', pct: 88 },
    ]
  },
  {
    label: '// R / Bioconductor',
    color: 'var(--grn)',
    skills: [
      { name: 'DESeq2 / limma', pct: 93 },
      { name: 'clusterProfiler', pct: 88 },
      { name: 'fgsea / Reactome', pct: 85 },
      { name: 'Seurat / Scanpy', pct: 75 },
    ]
  },
  {
    label: '// ML / DL',
    color: 'var(--pur)',
    skills: [
      { name: 'PyTorch', pct: 82 },
      { name: 'scikit-learn', pct: 88 },
      { name: 'SHAP', pct: 80 },
      { name: 'ODE Modeling', pct: 85 },
    ]
  },
  {
    label: '// HPC / Infra',
    color: 'var(--blu)',
    skills: [
      { name: 'SLURM / HPC', pct: 88 },
      { name: 'Docker / Conda', pct: 78 },
      { name: 'Git / GitHub', pct: 90 },
      { name: 'EDI / X12 / API', pct: 72 },
    ]
  },
  {
    label: '// Viz / Other',
    color: 'var(--pink)',
    skills: [
      { name: 'ggplot2 / D3', pct: 85 },
      { name: 'React / Recharts', pct: 75 },
      { name: 'Tableau', pct: 80 },
      { name: 'FindSim / HillTau', pct: 78 },
    ]
  },
]

function SkillBar({ name, pct, color, animate }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--txt)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--mut)' }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: 'var(--s3)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: '100%', background: color, borderRadius: 2 }}
        />
      </div>
    </div>
  )
}

function SkillCard({ cat, animate }) {
  return (
    <div style={{
      background: 'var(--s1)', border: '1px solid var(--brd)',
      borderRadius: 12, padding: '1.25rem',
      transition: 'border-color 0.2s'
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = cat.color}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--brd)'}
    >
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '0.72rem',
        color: cat.color, marginBottom: '1rem', letterSpacing: '0.1em'
      }}>
        {cat.label}
      </div>
      {cat.skills.map(s => (
        <SkillBar key={s.name} {...s} color={cat.color} animate={animate} />
      ))}
    </div>
  )
}

export default function Skills() {
  const ref = useRef()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref}>
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Technical Stack</div>
          <div className="sec-title">Skills & Tools</div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <SkillCard cat={cat} animate={animate} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}