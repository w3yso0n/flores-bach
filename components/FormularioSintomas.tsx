'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type Sintoma = {
  id: string
  label: string
}

const sintomas: Sintoma[] = [
  { id: 'estres', label: 'Estrés' },
  { id: 'tristeza', label: 'Tristeza' },
  { id: 'cansancio', label: 'Cansancio físico' },
  { id: 'ansiedad', label: 'Ansiedad' },
  { id: 'insomnio', label: 'Dificultad para dormir' },
  { id: 'enojo', label: 'Irritabilidad o enojo' },
  { id: 'dolor_cabeza', label: 'Dolor de cabeza emocional' },
  { id: 'pérdida', label: 'Pérdida o duelo' },
  { id: 'miedo', label: 'Miedo o inseguridad' },
]

const recomendacionesBase: Record<string, string> = {
  estres: 'Gotitas para tensión general',
  tristeza: 'Gotitas para ánimo bajo',
  cansancio: 'Gotitas para recarga vital',
  ansiedad: 'Gotitas para calma emocional',
  insomnio: 'Gotitas para descanso reparador',
  enojo: 'Gotitas para liberar enojo',
  dolor_cabeza: 'Gotitas para equilibrio mental',
  pérdida: 'Gotitas para duelo y procesos emocionales',
  miedo: 'Gotitas para fortalecer confianza',
}

export default function FormularioSintomas() {
  const [seleccionados, setSeleccionados] = useState<string[]>([])
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const toggleSintoma = (id: string) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const recomendaciones = seleccionados.map((s) => recomendacionesBase[s])

  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-[#9A3324] text-2xl">
          ¿Cómo te sientes hoy?
        </CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Selecciona los síntomas o emociones que estés experimentando.
        </p>
      </CardHeader>
      <CardContent>
        {!mostrarResultado ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {sintomas.map((s) => (
                <div
                  key={s.id}
                  onClick={() => toggleSintoma(s.id)}
                  className={cn(
                    'cursor-pointer border p-3 rounded-md hover:bg-accent transition',
                    seleccionados.includes(s.id) ? 'bg-green-100 border-green-500' : ''
                  )}
                >
                  <Checkbox
                    checked={seleccionados.includes(s.id)}
                    onCheckedChange={() => toggleSintoma(s.id)}
                    id={s.id}
                  />
                  <label htmlFor={s.id} className="ml-2 capitalize text-sm">
                    {s.label}
                  </label>
                </div>
              ))}
            </div>
            <Button
              disabled={seleccionados.length === 0}
              onClick={() => setMostrarResultado(true)}
              className="bg-[#9A3324] hover:bg-[#7c281c]"
            >
              Ver mis gotitas recomendadas
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#9A3324]">Recomendación personalizada:</h3>
            <ul className="list-disc ml-6 text-sm text-muted-foreground">
              {recomendaciones.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <Button variant="outline" onClick={() => setMostrarResultado(false)}>
              Volver a editar mis síntomas
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
