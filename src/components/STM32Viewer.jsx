import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

function RotatingModel({ isDimmed }) {
  const modelRef = useRef()
  const { scene } = useGLTF('/stm32.glb')
  const isDragging = useRef(false)

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const center = new THREE.Vector3()
    box.getCenter(center)
    scene.position.sub(center)
    scene.scale.set(8, 8, 8)

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.material.transparent = true
        child.material.opacity = isDimmed ? 0.3 : 1.0
      }
    })
  }, [scene, isDimmed])

  useFrame(({ mouse }) => {
    if (modelRef.current) {
      if (isDragging.current) {
        modelRef.current.rotation.y = mouse.x * Math.PI * 4
        modelRef.current.rotation.x = mouse.y * Math.PI * 0.8
      } else {
        modelRef.current.rotation.y += 0.01
      }
    }
  })

  useEffect(() => {
    const handleDown = () => (isDragging.current = true)
    const handleUp = () => (isDragging.current = false)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [])

  return <primitive ref={modelRef} object={scene} />
}

export default function STM32Viewer() {
  const [hovered, setHovered] = useState(false)

  return (
    <section className="w-screen h-screen overflow-hidden relative">
      {/* Floating prompt */}
      {!hovered && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
          <p className="bg-slate-800/80 px-6 py-3 rounded-xl shadow-lg text-white text-sm md:text-base animate-bounce">
            🖱️ Interact with me! Hover and drag to rotate
          </p>
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 35 }}
        style={{ backgroundColor: '#0f172a' }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[2, 2, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <Environment preset="dawn" background={false} intensity={0.25} />

        <mesh receiveShadow position={[0, 0, -1.5]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>

        <RotatingModel isDimmed={!hovered} />
      </Canvas>
    </section>
  )
}
