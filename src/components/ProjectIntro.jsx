import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import projectBackground from '../assets/gr86.jpg' // ✅ Your new background image

export default function ProjectIntro() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) // only the grid moves slightly

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
          style={{ backgroundImage: `url(${projectBackground})` }}
          className="absolute inset-0 min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#1e293b]/80 to-[#0f172a]/90 z-10" />

        {/* Animated grid lines */}
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
          Pong on an <span className="text-amber-400">STM32 Microcontroller</span>
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          I’m a programmer at heart, and this was my first time diving deep into the world of hardware.
          Before this course, I had only taken two Electrical Engineering classes. Still, I wanted to
          pay homage to a video game classic — <span className="text-white font-semibold">Pong</span> — and bring it to life from the bare metal.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          I soldered potentiometer-based joysticks (burned my fingers in the process 🔥), figured out how to
          interface them with the STM32 chip, and wrote all the logic to relay input to the LCD. The game
          was programmed entirely in <span className="text-teal-300">C</span>, a language I had only touched a few times before.
        </p>

        <p className="text-lg md:text-xl leading-relaxed text-slate-300 mb-6">
          I also had to solve the physics behind the bouncing ball — which ended up being simpler than expected —
          and bring together everything under real-time constraints. With only three weeks to source the parts and build
          the whole thing, this project pushed me hard. But it’s also the university project I’m most proud of.
        </p>

        <p className="text-md text-slate-400 italic">
          Built from scratch. No engines. Just wires, code, and a whole lot of learning.
        </p>
      </motion.div>
    </section>
  )
}
