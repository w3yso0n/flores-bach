'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const diasSemana = [
  'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'
]

export default function DisponibilidadForm() {
  const [disponibilidad, setDisponibilidad] = useState<Record<string, { hora_inicio: string, hora_fin: string }>>({})

  const fetchDisponibilidad = async () => {
    const { data } = await supabase.from('disponibilidad').select('*')
    const formateado = data?.reduce((acc, item) => {
      acc[item.dia] = {
        hora_inicio: item.hora_inicio,
        hora_fin: item.hora_fin
      }
      return acc
    }, {} as Record<string, { hora_inicio: string, hora_fin: string }>) || {}
    setDisponibilidad(formateado)
  }

  const handleChange = (dia: string, campo: string, valor: string) => {
    setDisponibilidad(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor
      }
    }))
  }

  const guardarDisponibilidad = async () => {
    // Eliminar todo y volver a insertar
    await supabase.from('disponibilidad').delete().neq('id', '')
    const nuevos = Object.entries(disponibilidad).filter(([, { hora_inicio, hora_fin }]) => hora_inicio && hora_fin)
      .map(([dia, { hora_inicio, hora_fin }]) => ({ dia, hora_inicio, hora_fin }))
    const { error } = await supabase.from('disponibilidad').insert(nuevos)
    if (error) {
      console.error('Error al guardar:', error)
    } else {
      alert('Disponibilidad actualizada ✅')
    }
  }

  useEffect(() => {
    fetchDisponibilidad()
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-bold text-[#9A3324]">Configurar disponibilidad semanal</h2>
      {diasSemana.map(dia => (
        <div key={dia} className="flex items-center gap-4">
          <Label className="capitalize w-24">{dia}</Label>
          <Input
            type="time"
            value={disponibilidad[dia]?.hora_inicio || ''}
            onChange={(e) => handleChange(dia, 'hora_inicio', e.target.value)}
            className="w-32"
          />
          <span>a</span>
          <Input
            type="time"
            value={disponibilidad[dia]?.hora_fin || ''}
            onChange={(e) => handleChange(dia, 'hora_fin', e.target.value)}
            className="w-32"
          />
        </div>
      ))}
      <Button onClick={guardarDisponibilidad}>Guardar disponibilidad</Button>
    </div>
  )
}
