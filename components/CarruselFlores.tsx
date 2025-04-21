'use client'

export default function GaleriaFlores() {
  const imagenes = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
  ]

  return (
    <section className="py-14 px-6 bg-white text-center">
      <h2 className="text-2xl font-bold text-[#9A3324] mb-6">Conoce nuestro espacio y terapias</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {imagenes.map((src, i) => (
          <div key={i} className="rounded overflow-hidden shadow hover:scale-105 transition-transform duration-300">
            <img
              src={src}
              alt={`flores-${i}`}
              className="w-full h-40 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
