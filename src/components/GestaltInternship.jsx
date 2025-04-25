import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function GestaltInternship() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg-diag-lines.svg')] opacity-10 mix-blend-overlay" />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl relative z-10"
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Internship @ <span className="text-teal-400">Gestalt Diagnostics</span>
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          During my internship at <span className="font-semibold text-white">Gestalt Diagnostics</span>, I supported hospitals and labs by building secure medical data interfaces using <span className="text-teal-300 font-semibold">Mirth Connect</span> and <span className="text-teal-300 font-semibold">JavaScript</span>.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          I diagnosed real-time data issues between patient portals and clinical systems, crafted dynamic HL7 routes, and optimized SQL queries to improve interoperability. I also delivered IT support for data synchronization, fixed broken HL7 messages, and ensured compliance with <span className="text-white font-medium">HIPAA standards</span>.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          This role sharpened my ability to work across teams — collaborating with doctors, IT staff, and interface engineers — and gave me a deeper appreciation for the role of software in healthcare infrastructure.
        </p>
        <p className="text-sm text-slate-500 italic">
          Stack used: Mirth Connect · JavaScript · SQL · HL7 · HIPAA Compliance · Debugging · Data Integration
        </p>
      </motion.div>
    </section>
  )
}
