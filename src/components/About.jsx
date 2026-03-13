import { motion } from 'framer-motion'

const highlights = [
  { icon: '🧬', label: 'Genomics & Transcriptomics', desc: 'NGS pipelines, DEA, GSEA on real GEO datasets' },
  { icon: '🧠', label: 'Neuroscience & ODE Modeling', desc: 'Synaptic signalling models for Parkinson\'s at NCBS-TIFR' },
  { icon: '🤖', label: 'ML & Deep Learning', desc: 'Attention networks, SHAP explainability, multi-omics fusion' },
  { icon: '💊', label: 'Biotech & Drug Discovery', desc: 'Molecular dynamics, pharmacology, wet lab background' },
]

export default function About() {
  return (
    <section id="about">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Who I Am</div>
          <div className="sec-title">About Me</div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Left — bio text */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ color: 'var(--txt)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              I'm a computational biologist and ML engineer passionate about decoding biological systems through data. Currently pursuing my MS in Bioinformatics at Northeastern University (GPA 3.9), I work at the intersection of <span style={{ color: 'var(--grn)', fontWeight: 600 }}>genomics</span>, <span style={{ color: 'var(--blu)', fontWeight: 600 }}>machine learning</span>, and <span style={{ color: 'var(--pur)', fontWeight: 600 }}>neuroscience</span>.
            </p>
            <p style={{ color: 'var(--mut)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              My research journey began at NCBS-TIFR in Bengaluru, where I built biochemical ODE models of synaptic signalling for Parkinson's Disease. Since then I've built RNA-seq pipelines on HPC clusters, trained deep learning models for AMR prediction, and developed interactive bioinformatics tools.
            </p>
            <p style={{ color: 'var(--mut)', fontSize: '0.9rem', lineHeight: 1.8 }}>
              I believe the future of biomedical research lies in integrating AI and data science with molecular biology — and I'm actively seeking co-op and research opportunities to contribute to that future.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <a href="mailto:135.mayankgandhi@gmail.com" className="btn btn-g">Get in Touch</a>
              <a href="/MayankGandhi-Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-o">Download Resume</a>
            </div>
          </motion.div>

          {/* Right — highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: 'var(--s1)', border: '1px solid var(--brd)',
                  borderRadius: 10, padding: '0.9rem 1.2rem',
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--grn)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--brd)'; e.currentTarget.style.transform = 'translateX(0)' }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{h.icon}</span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.2rem' }}>{h.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--mut)', lineHeight: 1.5 }}>{h.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}