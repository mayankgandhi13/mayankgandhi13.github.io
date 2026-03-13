import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import NetworkMap from './components/NetworkMap'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <hr className="divider" />
      <About />
      <hr className="divider" />
      <Skills />
      <hr className="divider" />
      <NetworkMap />
      <hr className="divider" />
      <Experience />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Education />
      <hr className="divider" />
      <Contact />
      <footer style={{
        textAlign:'center', padding:'2rem',
        color:'var(--mut)', fontFamily:'var(--mono)',
        fontSize:'0.72rem', borderTop:'1px solid var(--brd)'
      }}>
        // mayank gandhi · bioinformatics & ml · boston, ma · 2025
      </footer>
    </>
  )
}
