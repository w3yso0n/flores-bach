'use client'

import Link from "next/link"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import CalendarioVisual from "@/components/CalendarioVisual"
import GaleriaFlores from "@/components/CarruselFlores"
import CatalogoFlores from "@/components/CatalogoFlores"
import FormularioSintomas from "@/components/FormularioSintomas"
import HeroSection from "@/components/HeroSection"
import FloatingFlowers from "@/components/FloatingFlowers"
import { motion } from "framer-motion"
import Servicios from "@/components/Servicios"

export default function HomePage() {
  const [mostrarCalendario, setMostrarCalendario] = useState(false)
  const calendarioRef = useRef<HTMLDivElement>(null)

  const manejarClick = () => {
    setMostrarCalendario(true)
    setTimeout(() => {
      calendarioRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-background text-[#4a4a4a]">
  <FloatingFlowers />
      <HeroSection />

      {/* ¿QUÉ SON LAS FLORES? */}
      <section className="relative py-20 px-6 max-w-4xl mx-auto overflow-hidden">
      {/* FONDO DECORATIVO OPCIONAL */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-10 rotate-45 bg-[url('/1.jpg')] bg-no-repeat bg-contain" />
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 -rotate-12 bg-[url('/flor.svg')] bg-no-repeat bg-contain" />

      <motion.h2
        className="text-4xl font-bold text-[#9A3324] mb-6 relative z-10 text-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        ¿Qué son las Flores de Bach?
      </motion.h2>

      <motion.p
        className="text-lg leading-loose text-gray-700 text-justify relative z-10"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Las Flores de Bach son esencias naturales utilizadas para restaurar el equilibrio emocional. 
        Actúan de forma suave y segura, ayudando a gestionar emociones como la ansiedad, el miedo, el estrés o la tristeza. 
        Son una herramienta terapéutica natural que acompaña procesos de transformación interna y bienestar.
      </motion.p>
    </section>

      {/* SERVICIOS */}
      <Servicios/>

      {/* GALERÍA */}
      <GaleriaFlores />

      {/* FORMULARIO DE SÍNTOMAS */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-[#9A3324] text-center mb-6">
          ¿Cómo te sientes hoy?
        </h2>
        <p className="text-center text-muted-foreground max-w-xl mx-auto mb-6">
          Selecciona los síntomas que estás experimentando y te recomendaremos una combinación especial de gotitas para acompañarte.
        </p>
        <FormularioSintomas />
      </section>

      {/* CATÁLOGO DE FLORES */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-[#9A3324] mb-6 text-center">
          Catálogo de Flores de Bach
        </h2>
        <CatalogoFlores />
      </section>

      {/* CTA AGENDAR */}
      <section
        id="agenda"
        className="text-center py-16 px-4 bg-gradient-to-br from-[#9A3324] to-[#b24d3e] text-white"
      >
        <h2 className="text-3xl font-bold">¿List@ para comenzar?</h2>
        <p className="mt-2 text-lg">
          Agenda tu consulta hoy mismo y empieza tu camino hacia el equilibrio
          emocional.
        </p>
        <div className="mt-6">
          <Button
            variant="secondary"
            onClick={manejarClick}
            className="text-[#9A3324] bg-white hover:bg-slate-100 font-semibold px-5 py-2 rounded-full shadow transition-transform hover:scale-105"
          >
            Ver horarios disponibles
          </Button>
        </div>
      </section>

      {/* CALENDARIO DE CITAS */}
      {mostrarCalendario && (
        <section
          ref={calendarioRef}
          className="py-12 px-4 bg-white animate-fade-in"
        >
          <CalendarioVisual />
        </section>
      )}
    </main>
  )
}
