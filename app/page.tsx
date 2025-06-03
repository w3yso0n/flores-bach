'use client'

import Link from "next/link"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import CalendarioVisual from "@/components/CalendarioVisual"
import GaleriaFlores from "@/components/CarruselFlores"
import CatalogoFlores from "@/components/CatalogoFlores"
import FormularioSintomas from "@/components/FormularioSintomas"

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
      {/* HERO SECTION */}
      <section className="text-center py-20 px-4 bg-white shadow-inner">
        <h1 className="text-5xl font-bold text-[#9A3324]">Flores de Bach</h1>
        <p className="mt-5 text-lg max-w-xl mx-auto leading-relaxed">
          Equilibra tus emociones de forma natural. Conoce nuestros tratamientos
          personalizados y reserva tu cita fácilmente.
        </p>
        <div className="mt-8">
          <Link href="#agenda">
            <Button className="bg-[#9A3324] hover:bg-[#7b271b] text-white px-6 py-2 text-lg rounded-full shadow transition-transform hover:scale-105">
              Agendar cita
            </Button>
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-[#9A3324] mt-8">
          Un espacio guiado por Adriana Leyva Nolasco
        </h2>
      </section>

      {/* ¿QUÉ SON LAS FLORES? */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#9A3324] mb-4">
          ¿Qué son las Flores de Bach?
        </h2>
        <p className="text-base leading-relaxed text-justify">
          Las Flores de Bach son esencias naturales que ayudan a restaurar el
          equilibrio emocional. Son seguras, suaves y eficaces, utilizadas para
          tratar desde ansiedad, tristeza, estrés, hasta inseguridad o falta de
          enfoque.
        </p>
      </section>

      {/* SERVICIOS */}
      <section className="bg-[#fefefe] py-14 px-6">
        <h2 className="text-3xl font-bold text-[#9A3324] mb-8 text-center">
          Nuestros servicios
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              titulo: "Consultas personalizadas",
              descripcion:
                "Evaluación individual para elegir la mezcla de flores adecuada.",
            },
            {
              titulo: "Remedios emocionales",
              descripcion:
                "Mezclas para manejar ansiedad, miedos, estrés o tristeza.",
            },
            {
              titulo: "Acompañamiento terapéutico",
              descripcion:
                "Seguimiento constante para adaptar el tratamiento a tu progreso.",
            },
          ].map((servicio, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-transform hover:scale-105"
            >
              <h3 className="font-semibold text-lg mb-2 text-[#9A3324]">
                {servicio.titulo}
              </h3>
              <p className="text-sm text-gray-700">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

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
