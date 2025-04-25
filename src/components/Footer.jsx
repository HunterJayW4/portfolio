// components/Footer.jsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="py-6 bg-slate-800 text-center text-sm">
      <p>© {new Date().getFullYear()} Hunter Walp · Built with React, Tailwind, and Three.js</p>
    </footer>
  )
}