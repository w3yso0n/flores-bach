'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative text-center py-24 px-4 bg-white overflow-hidden">
      {/* FONDO FLORAL OPCIONAL */}
      <div className="absolute inset-0 opacity-5 bg-[url('/3.jpg')] bg-center bg-no-repeat bg-contain pointer-events-none" />

      <motion.h1
        className="text-5xl font-bold text-[#9A3324] relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Flores de Bach
      </motion.h1>

      <motion.p
        className="mt-5 text-lg max-w-xl mx-auto leading-relaxed relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Equilibra tus emociones de forma natural. Conoce nuestros tratamientos
        personalizados y reserva tu cita fácilmente.
      </motion.p>

      <motion.div
        className="mt-8 relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <Link href="#agenda">
          <Button className="bg-[#9A3324] hover:bg-[#7b271b] text-white px-6 py-2 text-lg rounded-full shadow transition-transform hover:scale-110">
            Agendar cita
          </Button>
        </Link>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-[#9A3324] mt-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Un espacio guiado por Adriana Leyva Nolasco
      </motion.h2>
    </section>
  )
}
