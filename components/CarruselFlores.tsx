'use client'

import Image from 'next/image'

export default function GaleriaFlores() {
  const imagenes = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg']

  return (
    <section className="py-14 px-6 bg-background text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#9A3324] mb-6">
          Conoce nuestro espacio y terapias
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imagenes.map((src, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 bg-white"
            >
              <Image
                src={src}
                alt={`Vista del espacio o terapia ${i + 1}`}
                width={300}
                height={200}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
