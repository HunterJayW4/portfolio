import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Contact() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <section
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white px-6 py-24 flex flex-col items-center justify-center"
    >
      <motion.div
        style={{ opacity, y }}
        className="w-full max-w-3xl text-center"
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Get in Touch</h2>
        <p className="text-lg md:text-xl text-slate-300 mb-10">
          Have a question or want to work together? Reach out through the form below or drop me a message directly.
        </p>

        <div className="bg-slate-800/60 p-6 rounded-xl shadow-lg">
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-md bg-slate-700 placeholder-slate-400 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-md bg-slate-700 placeholder-slate-400 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-md bg-slate-700 placeholder-slate-400 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-10 text-slate-400 text-sm space-y-2">
          <p>Email: <span className="text-white font-medium">hunterjayw@gmail.com</span></p>
          <p>Phone: <span className="text-white font-medium">(208) 890-1281</span></p>
          <p>
            LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/hunter-walp-9a3b44288/" className="text-teal-400 hover:underline" target="_blank" rel="noreferrer">
            https://www.linkedin.com/in/hunter-walp-9a3b44288/
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  )
}
