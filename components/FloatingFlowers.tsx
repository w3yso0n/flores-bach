'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const generateFlower = (index: number) => {
  const delay = Math.random() * 5
  const duration = 10 + Math.random() * 10
  const size = 30 + Math.random() * 30
  const left = Math.random() * 100
  const rotate = Math.random() > 0.5 ? 360 : -360

  return (
    <motion.img
      key={index}
      src="/flor.svg"
      alt="flor"
      className="absolute"
      style={{ width: `${size}px`, left: `${left}%`, bottom: '-60px' }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -window.innerHeight - size, opacity: [0, 1, 0], rotate }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function FloatingFlowers() {
  const flowers = useMemo(() => Array.from({ length: 10 }, (_, i) => generateFlower(i)), [])

  return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">{flowers}</div>
}
