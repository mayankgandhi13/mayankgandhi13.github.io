import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    type: 'expression-atlas',
    name: 'NeuroExpr',
    fullName: "NeuroExpr — Alzheimer's Expression Atlas",
    desc: 'Multi-tool visualization pipeline for AD using GSE5281 microarray data. Differential expression with limma, pathway enrichment via clusterProfiler, and an interactive D3.js frontend.',
    stack: ['R', 'limma', 'clusterProfiler', 'Python', 'D3.js', 'GEO'],
    color: '#00e5b0',
    status: 'in-progress',
    lines: [
      '> Loading GSE5281 microarray data...',
      '> Running limma voom normalization...',
      '> DEA complete: 847 sig. genes (p<0.05)',
      '> clusterProfiler GSEA: 23 pathways',
      '> Rendering D3.js expression atlas...',
      '✓ Pipeline complete.',
    ],
  },
  {
    type: 'rna-seq',
    name: 'COPD-TX',
    fullName: 'COPD Transcriptomics Pipeline',
    desc: 'Full DEA pipeline on GSE76925 COPD lung tissue. limma voom → clusterProfiler → fgsea → Reactome GSEA. Identified dysregulated immune and fibrotic gene sets.',
    stack: ['R', 'limma', 'fgsea', 'Reactome', 'ggplot2'],
    color: '#a78bfa',
    github: 'https://github.com/mayankgandhi13/Transcriptomics-Analysis-of-COPD-vs-Control-Lung-Tissue-GSE76925',
    lines: [
      '> Loading GSE76925 RNA-seq counts...',
      '> limma voom: 12,847 genes filtered',
      '> DEA: 1,203 upregulated, 987 down',
      '> fgsea: IL-6/JAK/STAT3 enriched',
      '> Reactome GSEA: fibrosis pathways hit',
      '✓ Analysis complete.',
    ],
  },
  {
    type: 'deep-learning',
    name: 'AMR-Predictor',
    fullName: 'AMR Multi-omics Predictor',
    desc: 'Multi-branch attention fusion network (PyTorch) integrating WGS, pangenome, and transcriptomics for AMR prediction. SHAP explainability for feature attribution.',
    stack: ['PyTorch', 'SHAP', 'WGS', 'Attention', 'Python'],
    color: '#3d9eff',
    status: 'in-progress',
    lines: [
      '> Initializing attention fusion model...',
      '> Branches: WGS | pangenome | RNA-seq',
      '> Training epoch 50/50... loss: 0.042',
      '> AUROC: 0.94 | F1: 0.91',
      '> SHAP: top features extracted',
      '✓ Model training complete.',
    ],
  },
  {
    type: 'ode-neuro',
    name: 'SynapticSim',
    fullName: "Synaptic Signalling — Parkinson's",
    desc: "Biochemical signalling models of synapses for Parkinson's Disease (NCBS-TIFR). ODE + HillTau modeling, FindSim-based optimization, literature-curated experimental validation.",
    stack: ['Python', 'ODE', 'HillTau', 'FindSim', 'NCBS'],
    color: '#f472b6',
    github: 'https://github.com/mayankgandhi13/HillTau',
    lines: [
      '> Loading WT synapse model (HillTau)...',
      "> Applying Parkinson's mutations...",
      '> Running ODE solver: t=0 to 1000ms',
      '> FindSim optimization: χ²=0.023',
      '> Disease model validated vs. literature',
      '✓ Simulation complete.',
    ],
  },
  {
    type: 'data-viz',
    name: 'VizCompare',
    fullName: 'Cross-Library Data Visualization Comparison',
    desc: "Reproducing the same Alzheimer's dataset visualizations across tidyverse (R), Seaborn (Python), and Chart.js (JavaScript) to compare syntax, aesthetics, and use-case fit across ecosystems.",
    stack: ['R', 'tidyverse', 'Python', 'Seaborn', 'Chart.js', 'JavaScript'],
    color: '#a78bfa',
    status: 'in-progress',
    lines: [
      '> Loading Alzheimer dataset...',
      '> Rendering tidyverse (R) plots...',
      '> Rendering Seaborn (Python) plots...',
      '> Rendering Chart.js (JS) plots...',
      '> Comparing syntax & aesthetics...',
      '✓ Cross-library comparison complete.',
    ],
  },
  {
    type: 'biotech-finance',
    name: 'OncoClear',
    fullName: 'OncoClear Investor Dashboard',
    desc: 'Interactive investor dashboard for a cancer diagnostics startup (BIOT 5219 CFO role). React + Recharts deployed to GitHub Pages.',
    stack: ['React', 'Recharts', 'GitHub Pages'],
    color: '#00e5b0',
    github: 'https://github.com/mayankgandhi13/DashboardTesting-OncoDiagnostics',
    live: 'https://mayankgandhi13.github.io/DashboardTesting-OncoDiagnostics/',
    lines: [
      '> Initializing OncoClear financials...',
      '> Market size: $4.2B TAM loaded',
      '> Revenue model: 5-year projection',
      '> KPI dashboard: 12 metrics active',
      '> Deploying to GitHub Pages...',
      '✓ Dashboard live.',
    ],
  },
]

function TerminalCard({ project, i }) {
  const [hovered, setHovered] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  const handleHover = () => {
    setHovered(true)
    setLineIndex(0)
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setLineIndex(idx)
      if (idx >= project.lines.length) clearInterval(interval)
    }, 280)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--s1)',
        border: `1px solid ${hovered ? project.color : 'var(--brd)'}`,
        borderRadius: 12, overflow: 'hidden',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 30px ${project.color}20` : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{
        background: 'var(--s2)', padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: `1px solid ${hovered ? project.color + '40' : 'var(--brd)'}`,
        transition: 'border-color 0.25s'
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--mut)', marginLeft: 8 }}>
          mayank@bio ~ <span style={{ color: project.color }}>{project.name}.sh</span>
        </span>
      </div>

      <div style={{ padding: '1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: '0.63rem',
          color: project.color, background: `${project.color}12`,
          border: `1px solid ${project.color}30`,
          padding: '2px 8px', borderRadius: 4, display: 'inline-block', width: 'fit-content'
        }}>
          {project.type}
        </span>

        <div style={{ fontSize: '0.98rem', fontWeight: 700 }}>{project.fullName}</div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', minHeight: 110, flex: 1 }}>
          {hovered ? (
            <AnimatePresence>
              {project.lines.slice(0, lineIndex + 1).map((line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    color: line.startsWith('✓') ? project.color : line.startsWith('>') ? 'var(--mut)' : 'var(--txt)',
                    marginBottom: 3, lineHeight: 1.6
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p style={{ color: 'var(--mut)', fontSize: '0.82rem', lineHeight: 1.65, fontFamily: 'var(--sans)' }}>
              {project.desc}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.stack.map(s => (
            <span key={s} style={{
              fontFamily: 'var(--mono)', fontSize: '0.67rem',
              color: project.color, background: `${project.color}10`,
              border: `1px solid ${project.color}25`,
              padding: '2px 8px', borderRadius: 3
            }}>{s}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {project.status === 'in-progress' ? (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem',
              color: '#fbbf24', background: 'rgba(251,191,36,0.08)',
              border: '1px solid rgba(251,191,36,0.3)',
              padding: '3px 10px', borderRadius: 4
            }}>⚙ In Progress</span>
          ) : project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--mut)',
              textDecoration: 'none', border: '1px solid var(--brd)',
              padding: '3px 10px', borderRadius: 4, transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.target.style.color = project.color; e.target.style.borderColor = project.color }}
              onMouseLeave={e => { e.target.style.color = 'var(--mut)'; e.target.style.borderColor = 'var(--brd)' }}
            >GitHub ↗</a>
          ) : null}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" style={{
              fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--mut)',
              textDecoration: 'none', border: '1px solid var(--brd)',
              padding: '3px 10px', borderRadius: 4, transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.target.style.color = project.color; e.target.style.borderColor = project.color }}
              onMouseLeave={e => { e.target.style.color = 'var(--mut)'; e.target.style.borderColor = 'var(--brd)' }}
            >Live ↗</a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Portfolio</div>
          <div className="sec-title">Featured Projects</div>
          <p style={{ color: 'var(--mut)', fontFamily: 'var(--mono)', fontSize: '0.78rem', marginBottom: '2rem' }}>
            // hover over a card to run the pipeline
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {projects.map((p, i) => <TerminalCard key={i} project={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}