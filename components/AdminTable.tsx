'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Loader2, Trash } from 'lucide-react'

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
  const [error, setError] = useState('')

  const fetchCitas = async () => {
    setLoading(true)
    setMensaje('')
    setError('')
    try {
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .order('fecha', { ascending: true })
        .order('hora', { ascending: true })

      if (error) throw error
      setCitas(data || [])
    } catch (err) {
      setError('Error al cargar citas 😢')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const eliminarCita = async (id: string) => {
    try {
      const { error } = await supabase.from('citas').delete().eq('id', id)
      if (error) throw error
      setMensaje('Cita eliminada ✅')
      fetchCitas()
    } catch (err) {
      setError('Error al eliminar la cita 😢')
      console.error(err)
    }
  }

  useEffect(() => {
    fetchCitas()
  }, [])

  return (
    <Card className="w-full overflow-x-auto">
      <CardHeader>
        <CardTitle className="text-[#9A3324]">Citas agendadas</CardTitle>
      </CardHeader>
      <CardContent>
        {mensaje && (
          <Alert className="mb-4 border-green-500 text-green-700">
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>{mensaje}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-6 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Cargando citas...
          </div>
        ) : citas.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay citas agendadas</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-2 text-left">Nombre</th>
                <th className="p-2 text-left">Teléfono</th>
                <th className="p-2 text-left">Fecha</th>
                <th className="p-2 text-left">Hora</th>
                <th className="p-2 text-left">Motivo</th>
                <th className="p-2 text-left">Acciones</th>
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
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => eliminarCita(cita.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  )
}
