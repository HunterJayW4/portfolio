import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ehrBackground from '../assets/hospital.jpeg' // ✅ Put a good EHR/tech/medical styled background here

export default function EHRProject() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

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
          style={{ backgroundImage: `url(${ehrBackground})` }}
          className="absolute inset-0 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#1e293b]/80 to-[#0f172a]/90 z-10" />

        {/* Optional grid or lines */}
        <motion.div
          style={{ y: gridY }}
          className="absolute top-0 left-0 w-full h-full bg-[url('/bg-grid.svg')] opacity-10 mix-blend-overlay z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ scale, opacity, y }}
        className="max-w-4xl relative z-30"
        transition={{ type: 'spring', stiffness: 60 }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Custom EHR Suite for <span className="text-green-400">Integrity Mental Health</span>
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          For my senior capstone project at Boise State University, I teamed up with two classmates to create a custom Electronic Health Records (EHR) system for a local mental health clinic — <span className="text-white font-semibold">Integrity Mental Health of Idaho</span>.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          We developed a full-stack prototype using <span className="text-teal-300">React</span> for the frontend, <span className="text-teal-300">Node.js</span> for the backend, and <span className="text-teal-300">SQLite</span> for lightweight database storage. The project took place over five months, with monthly client meetings to align technical progress with real-world clinical needs.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          Throughout the process, we adjusted course based on evolving requirements — enhancing patient profile management, intake form handling, appointment scheduling workflows, and ensuring the system was built for future scalability.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          At the end of the project, we delivered a working system prototype that left our client satisfied and excited to continue the development journey. The experience sharpened my skills in client communication, agile adaptation, and full-stack healthcare application design.
        </p>

        <p className="text-md text-slate-400 italic">
          Stack used: React · Node.js · SQLite · Tailwind CSS · Express · Full-Stack Development · Client Communication
        </p>
      </motion.div>
    </section>
  )
}
