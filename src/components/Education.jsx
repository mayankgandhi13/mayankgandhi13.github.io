import { motion } from 'framer-motion'

const education = [
  {
    degree: 'Master of Science — Bioinformatics & Computational Biology',
    school: 'Northeastern University',
    location: 'Boston, MA',
    date: 'Aug 2024 – Sep 2026',
    gpa: '3.9 / 4.0',
    color: 'var(--grn)',
    courses: [
      'Bioinformatics Computational Methods (BINF 6430)',
      'Biotechnology Business & Strategy (BIOT 5219)',
      'Genomics & NGS Analysis',
      'Machine Learning in Bioinformatics',
      'Statistical Methods for Omics Data',
      'Structural Bioinformatics',
    ],
  },
  {
    degree: 'Bachelor of Technology — Biomedical Engineering',
    school: 'MIT ADT University',
    location: 'Pune, India',
    date: 'Aug 2019 – Jun 2023',
    gpa: '3.3 / 4.0',
    color: 'var(--pur)',
    courses: [],
  },
]

const certs = [
  'Internet of Things / IoE',
  'Molecular Dynamics & Drug Simulations',
  'Data Visualisation — Tableau',
  'R Programming',
  'Fundamentals of Manuscript Preparation',
]

const awards = [
  { label: 'Smart India Hackathon 2022', color: 'var(--grn)' },
  { label: 'Best In Vedic Award', color: 'var(--pur)' },
]

export default function Education() {
  return (
    <section id="education">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Academic</div>
          <div className="sec-title">Education</div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {education.map((edu, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: 'var(--s1)', border: '1px solid var(--brd)', borderRadius: 14, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = edu.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--brd)'}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: edu.color }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: edu.color, marginBottom: '0.5rem' }}>{edu.date}</div>
              <div style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.3rem' }}>{edu.degree}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: edu.color, marginBottom: '0.2rem' }}>{edu.school}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--mut)', marginBottom: '1rem' }}>{edu.location}</div>
              {edu.gpa && (
                <div style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--grn)', background: 'rgba(0,229,176,0.08)', border: '1px solid rgba(0,229,176,0.25)', padding: '3px 10px', borderRadius: 20, marginBottom: '1rem' }}>
                  GPA {edu.gpa}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {certs.map(c => (
            <span key={c} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--grn)', background: 'rgba(0,229,176,0.06)', border: '1px solid rgba(0,229,176,0.2)', padding: '5px 14px', borderRadius: 20 }}>{c}</span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {awards.map(a => (
            <span key={a.label} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: a.color, background: `${a.color}10`, border: `1px solid ${a.color}35`, padding: '5px 14px', borderRadius: 20 }}>🏆 {a.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
