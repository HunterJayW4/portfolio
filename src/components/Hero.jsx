import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroBackground from '../assets/hero-bg.jpg'

export default function Hero() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 50]) // slight scroll for parallax effect

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center text-white overflow-hidden"
    >
      {/* Animated background image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundImage: `url(${heroBackground})`, y: bgY }}
        className="absolute inset-0 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-800/80 z-0" />

      {/* Main content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="max-w-4xl z-10"
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Hi, I’m <span className="text-red-400">Hunter Walp</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-6">
          A Boise-based software developer building <span className="text-white font-semibold">medical data interfaces</span>,
          <span className="text-white font-semibold"> embedded hardware</span>, and dynamic full-stack applications.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl space-y-4 text-slate-300"
        >
          <p>
            At <span className="text-white font-medium">Gestalt Diagnostics</span>, I worked as a Data Analyst Intern — designing HIPAA-compliant data pipelines using{' '}
            <span className="text-white font-semibold">JavaScript</span>,{' '}
            <span className="text-white font-semibold">Mirth Connect</span>, and{' '}
            <span className="text-white font-semibold">SQL</span>.
          </p>
          <p>
            My senior capstone at <span className="text-white font-medium">Integrity Mental Health of Idaho</span> involved building a sustainable{' '}
            <span className="text-teal-300">EHR suite</span> using{' '}
            <span className="text-white font-semibold">React</span> and{' '}
            <span className="text-white font-semibold">SQLite</span>.
          </p>
          <p>
            I also love getting close to the metal — like developing{' '}
            <span className="text-white font-semibold">Pong</span> on an{' '}
            <span className="text-white font-semibold">STM32</span> with potentiometer joysticks and embedded C.
          </p>
        </motion.div>

        <p className="text-sm text-slate-400 mt-6">
          <span className="text-slate-300 font-medium">Skills:</span>{' '}
          JavaScript · React · SQL · Python · Java · Embedded C · Tailwind CSS
        </p>
      </motion.div>
    </section>
  )
}
