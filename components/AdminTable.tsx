'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'

interface Cita {
  id: string
  nombre: string
  telefono: string
  fecha: string
  hora: string
  motivo: string
}

export default function AdminTable() {
  const [citas, setCitas] = useState<Cita[]>([])
  const [loading, setLoading] = useState(true)
  const [mensaje, setMensaje] = useState('')

  const fetchCitas = async () => {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true })
      console.log(data)
    if (error) {
      console.error(error)
    } else {
      setCitas(data)
    }
    setLoading(false)
  }

  const eliminarCita = async (id: string) => {
    const { error } = await supabase.from('citas').delete().eq('id', id)
    if (error) {
      console.error(error)
      setMensaje('Error al eliminar la cita 😢')
    } else {
      setMensaje('Cita eliminada ✅')
      fetchCitas()
    }
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-auto">
      {mensaje && <p className="mb-4 text-sm text-green-600">{mensaje}</p>}
      {loading ? (
        <p>Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p>No hay citas agendadas</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-100 text-[#9A3324]">
              <th className="p-2">Nombre</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Motivo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id} className="border-b">
                <td className="p-2">{cita.nombre}</td>
                <td className="p-2">{cita.telefono}</td>
                <td className="p-2">{cita.fecha}</td>
                <td className="p-2">{cita.hora}</td>
                <td className="p-2">{cita.motivo}</td>
                <td className="p-2">
                  <Button variant="destructive" onClick={() => eliminarCita(cita.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
