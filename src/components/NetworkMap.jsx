import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

const domains = [
  { id: 'bioinfo', label: 'Bioinformatics', color: '#00e5b0', angle: 0, skills: ['Genomics', 'Transcriptomics', 'scRNA-seq', 'Multi-omics', 'GSEA', 'NGS Pipeline', 'DESeq2/limma', 'clusterProfiler', 'Salmon/STAR', 'tximport', 'fgsea', 'Seurat'] },
  { id: 'ml', label: 'CS / ML / AI', color: '#3d9eff', angle: 90, skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'scikit-learn', 'SHAP/XAI', 'Attention Networks', 'ODE Modeling', 'Data Science', 'R / Python', 'SLURM/HPC', 'FindSim/HillTau'] },
  { id: 'bio', label: 'Biology', color: '#a78bfa', angle: 180, skills: ["Parkinson's", 'Neuroscience', 'Synaptic Signalling', 'Cancer Biology', 'Drug Discovery', 'Molecular Biology', 'Pharmacology'] },
  { id: 'wetlab', label: 'Wet Lab', color: '#f472b6', angle: 270, skills: ['HPLC/GC', 'FTIR/UV-IR', 'Nanoparticles', 'Cell Line Assays', 'Dissolution', 'QA/QC', 'Formulations'] },
]

function draw(el, setActive) {
  const W = el.clientWidth || 900
  const H = 600
  const cx = W / 2, cy = H / 2
  const domainR = Math.min(W, H) * 0.26
  const skillR = Math.min(W, H) * 0.43

  const svg = d3.select(el).attr('viewBox', '0 0 ' + W + ' ' + H).attr('width', W).attr('height', H)
  svg.selectAll('*').remove()

  const defs = svg.append('defs')
  domains.forEach(function(d) {
    const grad = defs.append('radialGradient').attr('id', 'grd-' + d.id)
    grad.append('stop').attr('offset', '0%').attr('stop-color', d.color).attr('stop-opacity', 0.25)
    grad.append('stop').attr('offset', '100%').attr('stop-color', d.color).attr('stop-opacity', 0.02)
  })

  const g = svg.append('g')

  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', skillR + 28).attr('fill', 'none').attr('stroke', 'rgba(255,255,255,0.04)').attr('stroke-width', 1)
  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', domainR).attr('fill', 'none').attr('stroke', 'rgba(255,255,255,0.06)').attr('stroke-width', 1).attr('stroke-dasharray', '4,6')

  domains.forEach(function(domain) {
    const aRad = (domain.angle * Math.PI) / 180
    const dx = cx + Math.cos(aRad) * domainR
    const dy = cy + Math.sin(aRad) * domainR
    const n = domain.skills.length
    const spread = Math.min(88, n * 11)
    const startA = domain.angle - spread / 2
    const step = spread / (n - 1 || 1)

    domain.skills.forEach(function(skill, i) {
      const sRad = ((startA + i * step) * Math.PI) / 180
      const sx = cx + Math.cos(sRad) * skillR
      const sy = cy + Math.sin(sRad) * skillR

      g.append('line').attr('x1', dx).attr('y1', dy).attr('x2', sx).attr('y2', sy)
        .attr('stroke', domain.color).attr('stroke-width', 0.7).attr('opacity', 0.18).attr('class', 'link-' + domain.id)

      const sg = g.append('g').attr('transform', 'translate(' + sx + ',' + sy + ')').attr('class', 'skill-' + domain.id)
      sg.append('circle').attr('r', 20).attr('fill', domain.color + '15').attr('stroke', domain.color).attr('stroke-width', 0.8).attr('opacity', 0.65)
      sg.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('fill', domain.color).attr('font-size', 7).attr('font-family', 'monospace').attr('pointer-events', 'none').text(skill.length > 11 ? skill.slice(0, 10) + '.' : skill)
    })

    g.append('line').attr('x1', cx).attr('y1', cy).attr('x2', dx).attr('y2', dy)
      .attr('stroke', domain.color).attr('stroke-width', 1).attr('opacity', 0.22).attr('class', 'cl-' + domain.id)

    const did = domain.id
    const dcol = domain.color
    const dg = g.append('g').attr('transform', 'translate(' + dx + ',' + dy + ')').style('cursor', 'pointer')

    dg.on('mouseenter', function() {
      d3.selectAll('.link-' + did).attr('opacity', 0.65).attr('stroke-width', 1.5)
      d3.selectAll('.skill-' + did + ' circle').attr('opacity', 1).attr('stroke-width', 2)
      d3.selectAll('.cl-' + did).attr('opacity', 0.65).attr('stroke-width', 2)
    })
    dg.on('mouseleave', function() {
      d3.selectAll('.link-' + did).attr('opacity', 0.18).attr('stroke-width', 0.7)
      d3.selectAll('.skill-' + did + ' circle').attr('opacity', 0.65).attr('stroke-width', 0.8)
      d3.selectAll('.cl-' + did).attr('opacity', 0.22).attr('stroke-width', 1)
    })
    dg.on('click', function() { setActive(function(a) { return a === did ? null : did }) })

    dg.append('circle').attr('r', 36).attr('fill', 'url(#grd-' + did + ')').attr('stroke', dcol).attr('stroke-width', 1.5)
    dg.append('circle').attr('r', 36).attr('fill', 'none').attr('stroke', dcol).attr('stroke-width', 0.8).attr('opacity', 0.18).append('animate').attr('attributeName', 'r').attr('from', 36).attr('to', 50).attr('dur', '2.5s').attr('repeatCount', 'indefinite')

    const parts = domain.label.split('/')
    dg.append('text').attr('text-anchor', 'middle').attr('dy', parts.length > 1 ? '-5' : '4').attr('fill', dcol).attr('font-size', 9.5).attr('font-weight', '600').attr('font-family', 'monospace').attr('pointer-events', 'none').text(parts[0].trim())
    if (parts.length > 1) {
      dg.append('text').attr('text-anchor', 'middle').attr('dy', '8').attr('fill', dcol).attr('font-size', 8.5).attr('font-family', 'monospace').attr('pointer-events', 'none').attr('opacity', 0.7).text(parts.slice(1).join('/').trim())
    }
  })

  const cg = g.append('g').attr('transform', 'translate(' + cx + ',' + cy + ')')
  cg.append('circle').attr('r', 48).attr('fill', 'rgba(0,229,176,0.07)').attr('stroke', '#00e5b0').attr('stroke-width', 2)
  cg.append('circle').attr('r', 48).attr('fill', 'none').attr('stroke', '#00e5b0').attr('stroke-width', 0.8).attr('opacity', 0.12).append('animate').attr('attributeName', 'r').attr('from', 48).attr('to', 66).attr('dur', '3s').attr('repeatCount', 'indefinite')
  cg.append('text').attr('text-anchor', 'middle').attr('dy', '-5').attr('fill', '#00e5b0').attr('font-size', 12).attr('font-weight', '700').attr('font-family', 'monospace').text('Mayank')
  cg.append('text').attr('text-anchor', 'middle').attr('dy', '10').attr('fill', '#00e5b0').attr('font-size', 12).attr('font-weight', '700').attr('font-family', 'monospace').text('Gandhi')
  cg.append('text').attr('text-anchor', 'middle').attr('dy', '24').attr('fill', 'rgba(0,229,176,0.45)').attr('font-size', 7).attr('font-family', 'monospace').text('bioinformatician')
}

export default function NetworkMap() {
  const svgRef = useRef()
  const [active, setActive] = useState(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(function() {
    if (drawn) return
    const obs = new ResizeObserver(function(entries) {
      const el = entries[0].target
      if (el.clientWidth > 0) {
        draw(el, setActive)
        setDrawn(true)
        obs.disconnect()
      }
    })
    if (svgRef.current) obs.observe(svgRef.current)
    return function() { obs.disconnect() }
  }, [drawn])

  return (
    <section id="map" style={{ background: 'rgba(8,13,26,0.6)', padding: '5rem 0' }}>
      <div className="section-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="sec-label">Knowledge Graph</div>
          <div className="sec-title">My Interdisciplinary Map</div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--mut)', marginBottom: '1.5rem' }}>
            // hover a domain to highlight · click to see all skills
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <svg ref={svgRef} style={{ width: '100%', display: 'block', background: 'var(--s1)', borderRadius: 16, border: '1px solid var(--brd)', minHeight: 600 }} />
        </motion.div>
        {active && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '1.25rem', background: 'var(--s1)', border: '1px solid ' + domains.find(function(d) { return d.id === active }).color, borderRadius: 12, padding: '1rem 1.25rem' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: domains.find(function(d) { return d.id === active }).color, marginBottom: '0.75rem' }}>
              {'// ' + domains.find(function(d) { return d.id === active }).label + ' — ' + domains.find(function(d) { return d.id === active }).skills.length + ' skills'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {domains.find(function(d) { return d.id === active }).skills.map(function(s) {
                const col = domains.find(function(d) { return d.id === active }).color
                return <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: col, background: col + '10', border: '1px solid ' + col + '30', padding: '3px 10px', borderRadius: 20 }}>{s}</span>
              })}
            </div>
          </motion.div>
        )}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          {domains.map(function(d) {
            return <span key={d.id} style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--mut)', display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, display: 'inline-block' }} />{d.label}</span>
          })}
        </div>
      </div>
    </section>
  )
}
