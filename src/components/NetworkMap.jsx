import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    id: 'bioinfo',
    label: 'Bioinformatics',
    color: '#00e5b0',
    icon: '🧬',
    nodes: ['Genomics', 'Transcriptomics', 'Multi-omics', 'scRNA-seq', 'GSEA', 'Pathway Enrichment', 'NGS Pipeline', 'Salmon / STAR', 'DESeq2 / limma', 'tximport', 'clusterProfiler', 'fgsea', 'Seurat / Scanpy'],
  },
  {
    id: 'ml',
    label: 'CS / ML / AI',
    color: '#3d9eff',
    icon: '🤖',
    nodes: ['Machine Learning', 'Deep Learning', 'PyTorch', 'scikit-learn', 'SHAP / XAI', 'Attention Networks', 'ODE Modeling', 'Data Science', 'Mol. Dynamics', 'FindSim / HillTau', 'R / Python', 'SLURM / HPC'],
  },
  {
    id: 'bio',
    label: 'Biology / Medicine',
    color: '#a78bfa',
    icon: '🔬',
    nodes: ["Parkinson's", 'Neuroscience', 'Synaptic Signalling', 'Cancer Biology', 'Drug Discovery', 'Molecular Biology', 'Pharmacology', 'Formulations'],
  },
  {
    id: 'wetlab',
    label: 'Wet Lab',
    color: '#f472b6',
    icon: '🧪',
    nodes: ['HPLC / GC', 'FTIR / UV-IR', 'Nanoparticles', 'Cell Line Assays', 'Dissolution', 'QA / QC', 'Biomedical Devices'],
  },
]

const connections = [
  { from: 'bioinfo', to: 'ml',     label: 'ML-driven pipelines' },
  { from: 'bioinfo', to: 'bio',    label: 'Disease mechanism analysis' },
  { from: 'ml',      to: 'bio',    label: 'Computational modeling' },
  { from: 'bio',     to: 'wetlab', label: 'Experimental validation' },
  { from: 'bioinfo', to: 'wetlab', label: 'Data from experiments' },
]

export default function NetworkMap() {
  const [active, setActive] = useState(null)

  return (
    <section id="map" style={{ background: 'rgba(8,13,26,0.6)', padding: '5rem 0' }}>
      <div className="section-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Knowledge Graph</div>
          <div className="sec-title">My Interdisciplinary Map</div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--mut)', marginBottom: '2.5rem' }}>
            // click a domain to expand skills
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(active === cat.id ? null : cat.id)}
              style={{
                background: active === cat.id ? cat.color + '12' : 'var(--s1)',
                border: '1px solid ' + (active === cat.id ? cat.color : 'var(--brd)'),
                borderRadius: 14, padding: '1.25rem 1.5rem',
                cursor: 'pointer', transition: 'all 0.25s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: cat.color }}>{cat.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--mut)' }}>{cat.nodes.length} skills</div>
                </div>
                <div style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: '0.7rem', color: active === cat.id ? cat.color : 'var(--mut)' }}>
                  {active === cat.id ? '▲ collapse' : '▼ expand'}
                </div>
              </div>

              <AnimatePresence>
                {active === cat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 4 }}>
                      {cat.nodes.map(node => (
                        <span key={node} style={{
                          fontFamily: 'var(--mono)', fontSize: '0.7rem',
                          color: cat.color, background: cat.color + '10',
                          border: '1px solid ' + cat.color + '30',
                          padding: '3px 10px', borderRadius: 20,
                        }}>{node}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {active !== cat.id && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {cat.nodes.slice(0, 5).map(node => (
                    <span key={node} style={{
                      fontFamily: 'var(--mono)', fontSize: '0.68rem',
                      color: 'var(--mut)', background: 'var(--s2)',
                      border: '1px solid var(--brd)',
                      padding: '2px 8px', borderRadius: 20,
                    }}>{node}</span>
                  ))}
                  {cat.nodes.length > 5 && (
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: cat.color, padding: '2px 8px' }}>
                      +{cat.nodes.length - 5} more
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--mut)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            // DOMAIN CONNECTIONS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {connections.map((conn, i) => {
              const fromCat = categories.find(c => c.id === conn.from)
              const toCat = categories.find(c => c.id === conn.to)
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--s1)', border: '1px solid var(--brd)',
                  borderRadius: 8, padding: '6px 12px',
                  fontFamily: 'var(--mono)', fontSize: '0.72rem',
                  transition: 'border-color 0.2s', cursor: 'default'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = fromCat.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--brd)'}
                >
                  <span style={{ color: fromCat.color }}>{fromCat.label}</span>
                  <span style={{ color: 'var(--mut)' }}>→</span>
                  <span style={{ color: toCat.color }}>{toCat.label}</span>
                  <span style={{ color: 'var(--mut)', fontSize: '0.65rem' }}>· {conn.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
