import { motion } from 'framer-motion'

const experiences = [
  {
    role: 'Software Developer Intern',
    org: 'Cencora',
    location: 'Conshohocken, PA',
    date: 'Jun – Aug 2025',
    color: 'var(--blu)',
    desc: 'Supported EDI/API integrations within the Technical Delivery – D&S IT team. Worked on data mapping (850, 810, DNS, CNS) and optimized healthcare data exchange systems. Gained hands-on experience with supply chain tech and X12 standards.',
    tags: ['EDI', 'X12', 'API', 'Healthcare IT'],
  },
  {
    role: 'Senator — Finance',
    org: 'Graduate Student Government, Northeastern University',
    location: 'Boston, MA',
    date: 'Jun 2025 – Present',
    color: 'var(--grn)',
    desc: 'Collaborating with the VP of Finance to restructure financial transactions and records into insightful dashboards for improved data-driven governance.',
    tags: ['Finance', 'Dashboards', 'Data'],
  },
  {
    role: 'Student Advisor / Director of Operations / Head of Finance',
    org: 'Graduate Biotechnology-Bioinformatics Association (GBBA)',
    location: 'Northeastern University',
    date: 'Dec 2024 – Present',
    color: 'var(--grn)',
    desc: 'Led financial operations and budgeting for biomedical events. Secured funding via sponsorships and grants for journal clubs, lab tours, and industry speaker series. Currently serving as Student Advisor.',
    tags: ['Leadership', 'Finance', 'Biotech', 'Operations'],
  },
  {
    role: 'Computational Research & Modeler',
    org: 'National Centre for Biological Sciences (NCBS-TIFR)',
    location: 'Bengaluru, India',
    date: 'Jan – Aug 2023',
    color: 'var(--pur)',
    desc: "Built biochemical signalling models of synapses for Parkinson's Disease and other neurodegenerative diseases. Extensive literature curation, ODE + HillTau model building, and FindSim-based model optimization against WT/disease states.",
    tags: ['ODE Modeling', 'HillTau', 'FindSim', 'Neuroscience', 'Python'],
  },
  {
    role: 'Researcher & Content Writer',
    org: 'IAPWE',
    location: 'New York City Metropolitan Area',
    date: 'Mar 2023 – Oct 2024',
    color: 'var(--mut)',
    desc: 'Produced research-driven science writing and editorial content at the intersection of biology and technology.',
    tags: ['Science Writing', 'Research'],
  },
  {
    role: 'R&D Analyst & QA Intern',
    org: 'Micro Labs Limited',
    location: 'Mumbai, India',
    date: 'Jun – Aug 2022',
    color: 'var(--pink)',
    desc: 'Summer internship in pharmaceutical R&D and Quality Assurance. Techniques: Dissolution, FTIR, UV-IR, HPLC, GC, Formulations.',
    tags: ['HPLC', 'FTIR', 'QA', 'Pharma', 'R&D'],
  },
]

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Background</div>
          <div className="sec-title">Experience</div>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          {/* vertical line */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(180deg, var(--grn), var(--pur), transparent)'
          }} />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ position: 'relative', marginBottom: '1.25rem' }}
            >
              {/* dot */}
              <div style={{
                position: 'absolute', left: '-1.68rem', top: '1.35rem',
                width: 11, height: 11, borderRadius: '50%',
                background: exp.color, border: '2px solid var(--bg)'
              }} />

              <div
                style={{
                  background: 'var(--s1)', border: '1px solid var(--brd)',
                  borderRadius: 12, padding: '1.25rem 1.5rem',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = exp.color
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--brd)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>{exp.role}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--mut)', whiteSpace: 'nowrap' }}>{exp.date}</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: exp.color, marginBottom: '0.5rem' }}>
                  {exp.org} · {exp.location}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--mut)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{exp.desc}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--mono)', fontSize: '0.67rem',
                      color: exp.color,
                      background: `${exp.color}12`,
                      border: `1px solid ${exp.color}30`,
                      padding: '2px 8px', borderRadius: 4
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}