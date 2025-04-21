"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { supabase } from "@/lib/supabaseClient";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Disponibilidad = {
  dia: string;
  hora_inicio: string;
  hora_fin: string;
};

export default function CalendarioVisual() {
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [selectedHora, setSelectedHora] = useState<string | null>(null);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);

  const fetchDisponibilidad = async () => {
    const { data } = await supabase.from("disponibilidad").select("*");
    setDisponibilidad(data || []);
  };

  const fetchHorasDelDia = async (date: Date) => {
    const diaNombre = format(date, "EEEE", { locale: es }).toLowerCase();
    const config = disponibilidad.find(
      (d) => d.dia.toLowerCase() === diaNombre
    );

    if (!config) {
      setHorasDisponibles([]);
      setHorasOcupadas([]);
      return;
    }

    const [hi, mi] = config.hora_inicio.split(":").map(Number);
    const [hf, mf] = config.hora_fin.split(":").map(Number);

    const bloques = [];
    let h = hi,
      m = mi;
    while (h < hf || (h === hf && m < mf)) {
      bloques.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
      m += 30;
      if (m >= 60) {
        m = 0;
        h++;
      }
    }

    const { data: ocupadas } = await supabase
      .from("citas")
      .select("hora")
      .eq("fecha", format(date, "yyyy-MM-dd"));

      const horasOcupadas = (ocupadas?.map(c => {
        const [hora, minuto] = c.hora.split(':')
        return `${hora}:${minuto}`  // Recorta segundos, deja solo HH:mm
      }) || [])
    const disponibles = bloques.filter((h) => !horasOcupadas.includes(h));

    setHorasDisponibles(disponibles);
    setHorasOcupadas(horasOcupadas);
  };

  useEffect(() => {
    fetchDisponibilidad();
  }, []);

  useEffect(() => {
    if (selectedDate) fetchHorasDelDia(selectedDate);
  }, [selectedDate, disponibilidad]);

  const diasHabilitados = disponibilidad.map((d) => d.dia.toLowerCase());

  const isDayAvailable = (date: Date) => {
    const dia = format(date, "EEEE", { locale: es }).toLowerCase();
    return diasHabilitados.includes(dia);
  };

  const agendarCita = async () => {
    if (!selectedDate || !selectedHora) return;

    const fechaFormateada = format(selectedDate, "yyyy-MM-dd");

    // Verificamos si ya existe una cita en esa fecha y hora
    const { data: citasExistentes, error: fetchError } = await supabase
      .from("citas")
      .select("id")
      .eq("fecha", fechaFormateada)
      .eq("hora", selectedHora);

    if (fetchError) {
      console.error("Error verificando disponibilidad:", fetchError);
      setMensaje("Error al verificar la disponibilidad 😢");
      return;
    }

    if (citasExistentes && citasExistentes.length > 0) {
      setMensaje("Ya se agendó una cita en esta hora. Por favor elige otra 🕒");
      return;
    }

    // Insertamos la cita
    const { error } = await supabase.from("citas").insert([
      {
        nombre,
        telefono,
        motivo,
        fecha: fechaFormateada,
        hora: selectedHora,
      },
    ]);

    if (error) {
      console.error(error);
      setMensaje("Error al guardar la cita 😢");
    } else {
      setMensaje("¡Cita agendada con éxito! 🌸");
      setNombre("");
      setTelefono("");
      setMotivo("");
      setSelectedHora(null);
      fetchHorasDelDia(selectedDate);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold text-[#9A3324]">
        Calendario de disponibilidad
      </h2>

      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={es}
        disabled={(date) => !isDayAvailable(date)}
        modifiersStyles={{
          selected: { backgroundColor: "#9A3324", color: "white" },
        }}
      />

      {selectedDate && (
        <>
          <p className="mt-2 font-semibold text-[#9A3324]">
            Horarios disponibles el{" "}
            {format(selectedDate, "PPP", { locale: es })}:
          </p>
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
                        required
                      />
                      <Label>Teléfono</Label>
                      <Input
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                      />
                      <Label>Motivo</Label>
                      <Textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                      />
                      <Button onClick={agendarCita}>Confirmar cita</Button>
                      {mensaje && (
                        <p className="text-sm text-green-600">{mensaje}</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}

              {horasOcupadas.map((h) => (
                <li
                  key={`ocupada-${h}`}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-center cursor-not-allowed opacity-70"
                  title="Ocupado"
                >
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600 text-sm">
              No hay horarios disponibles este día.
            </p>
          )}
        </>
      )}
    </div>
  );
}
