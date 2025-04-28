// App.jsx
import React from 'react'
import Hero from './components/Hero'
import ProjectIntro from './components/ProjectIntro'
import LCDViewer from './components/LCDViewer'
import CodeCaruousel from './components/CodeCarousel'
import Footer from './components/Footer'
import GestaltInternship from './components/GestaltInternship'
import Contact from './components/Contact'
import EHRProject from './components/EHRProject'

export default function App() {
  return (
    <div className="bg-slate-900 text-white font-sans">
      <Hero />
      <GestaltInternship />
      <EHRProject />
      <ProjectIntro />
      <LCDViewer />
      <CodeCaruousel />
      <Contact />
      <Footer />
    </div>
  )
}
