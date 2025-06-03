'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Flor = {
  nombre: string
  descripcion: string
  imagen: string
}

const flores: Flor[] = [
  {
    nombre: 'Agrimony',
    descripcion: 'Para personas que esconden su sufrimiento interno tras una máscara alegre.',
    imagen: '/flores/agrimony.jpg',
  },
  {
    nombre: 'Aspen',
    descripcion: 'Para miedos indefinidos y ansiedades sin causa conocida.',
    imagen: '/flores/aspen.jpg',
  },
  {
    nombre: 'Beech',
    descripcion: 'Para aquellos que tienden a criticar o juzgar con rigidez a los demás.',
    imagen: '/flores/beech.jpg',
  },
    {
        nombre: 'Centaury',
        descripcion: 'Para personas que tienen dificultades para decir "no" y se sacrifican por los demás.',
        imagen: '/flores/centaury.jpg',
    },
    {
        nombre: 'Cherry Plum',
        descripcion: 'Para quienes temen perder el control o actuar de manera violenta.',
        imagen: '/flores/cherry-plum.jpg',
    },
    {
        nombre: 'Chestnut Bud',
        descripcion: 'Para quienes repiten los mismos errores sin aprender de ellos.',
        imagen: '/flores/chestnut-bud.jpg',
    },
    {
        nombre: 'Chicory',
        descripcion: 'Para quienes son posesivos y buscan atención constante de los demás.',
        imagen: '/flores/chicory.jpg',
    },
    {
        nombre: 'Clematis',
        descripcion: 'Para personas soñadoras que tienen dificultades para concentrarse en el presente.',
        imagen: '/flores/clematis.jpg',
    },
    {
        nombre: 'Crab Apple',
        descripcion: 'Para quienes se sienten sucios o impuros, tanto física como emocionalmente.',
        imagen: '/flores/crab-apple.jpg',
    },
    {
        nombre: 'Elm',
        descripcion: 'Para quienes se sienten abrumados por las responsabilidades y la carga del trabajo.',
        imagen: '/flores/elm.jpg',
    },
    {
        nombre: 'Gentian',
        descripcion: 'Para quienes se desaniman fácilmente ante los obstáculos y las dificultades.',
        imagen: '/flores/gentian.jpg',
    },
    {
        nombre: 'Gorse',
        descripcion: 'Para quienes se sienten desesperanzados y sin fe en el futuro.',
        imagen: '/flores/gorse.jpg',
    },
]

export default function CatalogoFlores() {
  const [busqueda, setBusqueda] = useState('')

  const floresFiltradas = flores.filter((flor) =>
    flor.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#9A3324] mb-6">
        Catálogo de Flores de Bach
      </h1>

      <Input
        placeholder="Buscar flor por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {floresFiltradas.map((flor, i) => (
          <Card key={i} className="shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="p-0">
              <img
                src={flor.imagen}
                alt={flor.nombre}
                className="w-full h-48 object-cover rounded-t-md"
              />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <CardTitle className="text-[#9A3324] text-xl">{flor.nombre}</CardTitle>
              <p className="text-sm text-muted-foreground">{flor.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {floresFiltradas.length === 0 && (
        <p className="text-center text-muted-foreground mt-6">No se encontró ninguna flor con ese nombre.</p>
      )}
    </section>
  )
}
