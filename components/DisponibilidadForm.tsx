'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const diasSemana = [
  'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
]

type Horario = { hora_inicio: string; hora_fin: string }
type Disponibilidad = Record<string, Horario>

export default function DisponibilidadForm() {
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>({})

  useEffect(() => {
    fetchDisponibilidad()
  }, [])

  const fetchDisponibilidad = async () => {
    const { data, error } = await supabase.from('disponibilidad').select('*')
    if (error) {
      toast( 'Error al cargar disponibilidad', {description: error.message})
      return
    }

    const formateado = data?.reduce((acc, item) => {
      acc[item.dia] = {
        hora_inicio: item.hora_inicio,
        hora_fin: item.hora_fin,
      }
      return acc
    }, {} as Disponibilidad) || {}

    setDisponibilidad(formateado)
  }

  const handleChange = (dia: string, campo: keyof Horario, valor: string) => {
    setDisponibilidad(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor,
      },
    }))
  }

  const guardarDisponibilidad = async () => {
    // Limpiar la tabla
    await supabase.from('disponibilidad').delete().neq('id', '')

    const nuevos = Object.entries(disponibilidad)
      .filter(([, { hora_inicio, hora_fin }]) => hora_inicio && hora_fin)
      .map(([dia, horarios]) => ({ dia, ...horarios }))

    if (nuevos.length === 0) {
      toast( 'Error',{ description: 'No hay horarios válidos para guardar.' })
      return
    }

    const { error } = await supabase.from('disponibilidad').insert(nuevos)

    if (error) {
      toast('Error al guardar', {
        description: error.message
      })
    } else {
      toast('Disponibilidad actualizada ✅', {
        description: 'Los horarios han sido guardados correctamente.'
      })
    }
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-[#9A3324]">Configurar disponibilidad semanal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {diasSemana.map((dia) => (
          <div key={dia} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label className="capitalize w-24">{dia}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={disponibilidad[dia]?.hora_inicio || ''}
                onChange={(e) => handleChange(dia, 'hora_inicio', e.target.value)}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">a</span>
              <Input
                type="time"
                value={disponibilidad[dia]?.hora_fin || ''}
                onChange={(e) => handleChange(dia, 'hora_fin', e.target.value)}
                className="w-32"
              />
            </div>
          </div>
        ))}

        <Button
          className="bg-[#9A3324] hover:bg-[#7c281c] w-full sm:w-auto"
          onClick={guardarDisponibilidad}
        >
          Guardar disponibilidad
        </Button>
      </CardContent>
    </Card>
  )
}
