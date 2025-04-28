import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import internshipBackground from '../assets/bogus.jpg' // ✅ Your background image here

export default function GestaltInternship() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) // only for background lines, not for image now

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center text-white overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Static background image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          style={{ backgroundImage: `url(${internshipBackground})` }}
          className="absolute inset-0 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/80 to-slate-900/90 z-10" />

        {/* Animated background lines */}
        <motion.div
          style={{ y: bgY }}
          className="absolute top-0 left-0 w-full h-full bg-[url('/bg-diag-lines.svg')] opacity-10 mix-blend-overlay z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, y }}
        className="max-w-4xl relative z-30"
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Internship @ <span className="text-teal-400 drop-shadow-glow">Gestalt Diagnostics</span>
        </h2>

        {/* Animated paragraphs */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6"
        >
          During my internship at <span className="font-semibold text-white">Gestalt Diagnostics</span>, I supported hospitals and labs by building secure medical data interfaces using <span className="text-teal-300 font-semibold drop-shadow-glow">Mirth Connect</span> and <span className="text-teal-300 font-semibold drop-shadow-glow">JavaScript</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6"
        >
          I diagnosed real-time data issues between patient portals and clinical systems, crafted dynamic HL7 routes, and optimized SQL queries to improve interoperability. I also delivered IT support for data synchronization, fixed broken HL7 messages, and ensured compliance with <span className="text-white font-medium drop-shadow-glow">HIPAA standards</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6"
        >
          This role sharpened my ability to work across teams — collaborating with doctors, IT staff, and interface engineers — and gave me a deeper appreciation for the role of software in healthcare infrastructure.
        </motion.p>

        {/* Stack footer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm text-slate-500 italic"
        >
          Stack used: Mirth Connect · JavaScript · SQL · HL7 · HIPAA Compliance · Debugging · Data Integration
        </motion.p>
      </motion.div>
    </section>
  )
}
