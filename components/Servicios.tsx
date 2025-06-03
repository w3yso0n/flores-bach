'use client'

import { motion } from "framer-motion"
import { HeartHandshake, Flower, UserCircle2 } from "lucide-react"

const servicios = [
  {
    icono: <UserCircle2 className="w-10 h-10 text-[#9A3324]" />,
    titulo: "Consultas personalizadas",
    descripcion: "Evaluación individual para elegir la mezcla de flores adecuada.",
  },
  {
    icono: <Flower className="w-10 h-10 text-[#9A3324]" />,
    titulo: "Remedios emocionales",
    descripcion: "Mezclas para manejar ansiedad, miedos, estrés o tristeza.",
  },
  {
    icono: <HeartHandshake className="w-10 h-10 text-[#9A3324]" />,
    titulo: "Acompañamiento terapéutico",
    descripcion: "Seguimiento constante para adaptar el tratamiento a tu progreso.",
  },
]

export default function Servicios() {
  return (
    <section className="bg-[#fefefe] py-20 px-6 relative">
      <h2 className="text-4xl font-bold text-[#9A3324] mb-12 text-center">
        Nuestros servicios
      </h2>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {servicios.map((servicio, i) => (
          <motion.div
            key={i}
            className="bg-white p-8 rounded-xl shadow-xl border hover:shadow-2xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">{servicio.icono}</div>
            <h3 className="font-semibold text-xl mb-3 text-center text-[#9A3324]">
              {servicio.titulo}
            </h3>
            <p className="text-gray-700 text-center">{servicio.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
