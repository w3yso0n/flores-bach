'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { supabase } from '@/lib/supabaseClient'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CalendarIcon } from 'lucide-react'

type Disponibilidad = {
  dia: string
  hora_inicio: string
  hora_fin: string
}

export default function CalendarioVisual() {
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([])
  const [selectedHora, setSelectedHora] = useState<string | null>(null)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [motivo, setMotivo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([])

  useEffect(() => {
    supabase
      .from('disponibilidad')
      .select('*')
      .then(({ data }) => setDisponibilidad(data || []))
  }, [])

  useEffect(() => {
    if (selectedDate) fetchHorasDelDia(selectedDate)
  }, [selectedDate, disponibilidad])

  const fetchHorasDelDia = async (date: Date) => {
    const diaNombre = format(date, 'EEEE', { locale: es }).toLowerCase()
    const config = disponibilidad.find(
      (d) => d.dia.toLowerCase() === diaNombre
    )

    if (!config) {
      setHorasDisponibles([])
      setHorasOcupadas([])
      return
    }

    const [hi, mi] = config.hora_inicio.split(':').map(Number)
    const [hf, mf] = config.hora_fin.split(':').map(Number)

    const bloques: string[] = []
    for (let h = hi, m = mi; h < hf || (h === hf && m < mf); ) {
      bloques.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      m += 30
      if (m >= 60) {
        m = 0
        h++
      }
    }

    const { data: ocupadas } = await supabase
      .from('citas')
      .select('hora')
      .eq('fecha', format(date, 'yyyy-MM-dd'))

    const ocupadasClean = ocupadas?.map(c => c.hora.slice(0, 5)) || []
    const disponibles = bloques.filter(h => !ocupadasClean.includes(h))

    setHorasDisponibles(disponibles)
    setHorasOcupadas(ocupadasClean)
  }

  const agendarCita = async () => {
    if (!selectedDate || !selectedHora) return

    const fecha = format(selectedDate, 'yyyy-MM-dd')

    const { data: exist, error: checkErr } = await supabase
      .from('citas')
      .select('id')
      .eq('fecha', fecha)
      .eq('hora', selectedHora)

    if (checkErr) {
      setMensaje('Error al verificar disponibilidad 😢')
      return
    }

    if (exist?.length) {
      setMensaje('Ya existe una cita en esta hora. Elige otra 🕒')
      return
    }

    const { error } = await supabase.from('citas').insert([
      {
        nombre,
        telefono,
        motivo,
        fecha,
        hora: selectedHora,
      },
    ])

    if (error) {
      setMensaje('Error al agendar la cita 😢')
    } else {
      setMensaje('¡Cita agendada con éxito! 🌸')
      setNombre('')
      setTelefono('')
      setMotivo('')
      setSelectedHora(null)
      fetchHorasDelDia(selectedDate)
    }
  }

  const diasHabilitados = disponibilidad.map((d) => d.dia.toLowerCase())

  const isDayAvailable = (date: Date) =>
    diasHabilitados.includes(
      format(date, 'EEEE', { locale: es }).toLowerCase()
    )

  return (
    <div className="max-w-md mx-auto bg-background p-6 rounded-xl shadow space-y-4 border">
      <h2 className="text-2xl font-semibold text-[#9A3324] flex items-center gap-2">
        <CalendarIcon className="w-5 h-5" /> Calendario de Citas
      </h2>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={es}
        disabled={(date) => !isDayAvailable(date)}
        modifiersStyles={{
          selected: { backgroundColor: '#9A3324', color: 'white' },
        }}
      />

      {selectedDate && (
        <>
          <h4 className="text-[#9A3324] font-semibold mt-4">
            Horarios disponibles el {format(selectedDate, 'PPP', { locale: es })}
          </h4>

          {horasDisponibles.length > 0 ? (
            <ul className="grid grid-cols-3 gap-2 text-sm">
              {horasDisponibles.map((h) => (
                <Dialog key={h}>
                  <DialogTrigger asChild>
                    <li
                      onClick={() => setSelectedHora(h)}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-center cursor-pointer hover:bg-green-200"
                    >
                      {h}
                    </li>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agendar cita a las {h}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Label>Nombre</Label>
                      <Input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      <Label>Teléfono</Label>
                      <Input
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                      <Label>Motivo</Label>
                      <Textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                      />
                      <Button
                        className="w-full mt-2 bg-[#9A3324] hover:bg-[#842d20]"
                        onClick={agendarCita}
                      >
                        Confirmar cita
                      </Button>
                      {mensaje && (
                        <Alert className="mt-2">
                          <AlertTitle>Mensaje</AlertTitle>
                          <AlertDescription>{mensaje}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
              {horasOcupadas.map((h) => (
                <li
                  key={`ocupada-${h}`}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-center opacity-70 cursor-not-allowed"
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-destructive">No hay horarios disponibles</p>
          )}
        </>
      )}
    </div>
  )
}
