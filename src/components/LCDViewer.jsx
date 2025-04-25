import React, { useRef, useEffect, useMemo, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Html, useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(0)}% loaded</Html>
}

function Model({ path, position = [0, 0, 0], scale = 1, offset = [0, 0, 0], interactive = true, onClick }) {
  const modelRef = useRef()
  const { scene } = useGLTF(path)
  const isDragging = useRef(false)
  const startPointer = useRef({ x: 0, y: 0 })

  const centeredScene = useMemo(() => {
    const clone = scene.clone()
    const box = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    box.getCenter(center)

    clone.position.sub(center).add(new THREE.Vector3(...offset))
    clone.scale.set(scale, scale, scale)

    const container = new THREE.Group()
    container.add(clone)

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    return container
  }, [scene, scale, offset])

  useEffect(() => {
    const handlePointerUp = () => (isDragging.current = false)
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  useFrame(({ mouse }) => {
    if (!modelRef.current) return

    if (interactive && isDragging.current) {
      modelRef.current.rotation.y = mouse.x * Math.PI * 4
      modelRef.current.rotation.x = mouse.y * Math.PI * 0.8
    } else {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <group
      ref={modelRef}
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation()
        if (interactive) {
          isDragging.current = true
          startPointer.current = { x: e.clientX, y: e.clientY }
        }
      }}
      onPointerUp={(e) => {
        isDragging.current = false
        const end = { x: e.clientX, y: e.clientY }
        const dx = end.x - startPointer.current.x
        const dy = end.y - startPointer.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 5 && onClick) {
          onClick()
        }
      }}
    >
      <primitive object={centeredScene} />
    </group>
  )
}

function PartModal({ part, onClose }) {
  const parts = {
    stm32: {
      name: 'STM32 Microcontroller',
      description: 'This is the STM32 microcontroller used to run the system.',
      path: '/stm32.glb',
    },
    lcd: {
      name: 'LCD Display',
      description: 'This is the LCD screen used to display the game state.',
      path: '/lcd.glb',
    },
    joystick: {
      name: 'Potentiometer Joystick',
      description: 'This is a potentiometer-based joystick for controlling input.',
      path: '/joystick.glb',
    },
    breadboard: {
      name: 'Breadboard',
      description: 'This breadboard connects and powers all the components.',
      path: '/breadboard.glb',
    },
  }

  const { name, description, path } = parts[part]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative z-10"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="w-full h-[400px] rounded-lg bg-gradient-to-b from-slate-500 to-slate-600 mb-6 overflow-hidden">
          <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[2, 2, 5]}
                intensity={0.5}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-bias={-0.0001}
            />
                <Environment preset="dawn" background={false} intensity={0.25} />
                <Suspense fallback={<Html center>Loading...</Html>}>
                    <Model path={path} scale={6} interactive />
                </Suspense>
           </Canvas>

          </div>
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-md text-slate-700">{description}</p>
          <button
            onClick={onClose}
            className="mt-6 px-5 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function LCDViewer() {
  const [selectedModel, setSelectedModel] = useState(null)

  return (
    <section className="relative w-screen h-[400px] flex bg-slate-900 text-white">
      {/* LEFT: Label Text */}
      <div className="w-1/4 p-10 flex items-center justify-center">
        <h2 className="text-3xl font-bold tracking-tight">Materials used</h2>
      </div>

      {/* RIGHT: 3D Viewer */}
      <div className="w-3/4 h-full">
        <Canvas
          shadows
          camera={{ position: [0, 1, 5], fov: 35 }}
          style={{ backgroundColor: '#0f172a' }}
        >
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[2, 2, 5]}
            intensity={0.5}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-bias={-0.0001}
          />
          <Environment preset="dawn" background={false} intensity={0.25} />

          <Suspense fallback={<Loader />}>
            <Model path="/stm32.glb" position={[-4.5, 0, 0]} scale={15} onClick={() => setSelectedModel('stm32')} />
            <Model path="/lcd.glb" position={[-1.25, 0, 0]} scale={15} onClick={() => setSelectedModel('lcd')} />
            <Model path="/joystick.glb" position={[1.25, 0, 0]} scale={15} onClick={() => setSelectedModel('joystick')} />
            <Model path="/breadboard.glb" position={[4.5, 0, 0]} scale={15} onClick={() => setSelectedModel('breadboard')} />
          </Suspense>
        </Canvas>
      </div>

      {/* MODAL OVERLAY */}
      {selectedModel && <PartModal part={selectedModel} onClose={() => setSelectedModel(null)} />}
    </section>
  )
}
