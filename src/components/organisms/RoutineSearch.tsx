"use client"

import type React from "react"

import { useState } from "react"
import Typography from "@/components/atoms/Typography"
import Input from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import RoutineCard from "@/components/molecules/RoutineCard"

interface Exercise {
  name: string
  sets: number
  reps: string
  notes?: string
}

interface RoutineDay {
  day: string
  exercises: Exercise[]
}

interface RoutineData {
  name: string
  expiryDate: string
  routine: RoutineDay[]
}

interface MockRoutineType {
  [key: string]: RoutineData
}

const mockRoutine: MockRoutineType = {
  "38803625": {
    name: "Juan Pérez",
    expiryDate: "2025-12-31",
    routine: [
      {
        day: "Día 1 - Pecho y Tríceps",
        exercises: [
          { name: "Press de Banca", sets: 4, reps: "8-10", notes: "Controla la bajada, explosivo en la subida" },
          { name: "Press Inclinado con Mancuernas", sets: 3, reps: "10-12", notes: "Mantén los codos a 45°" },
          { name: "Fondos en Paralelas", sets: 3, reps: "12-15", notes: "Si es muy fácil, agrega peso" },
          { name: "Extensiones de Tríceps", sets: 3, reps: "12-15", notes: "Mantén los codos fijos" },
          { name: "Press Francés", sets: 3, reps: "10-12", notes: "Movimiento lento y controlado" },
        ],
      },
      {
        day: "Día 2 - Espalda y Bíceps",
        exercises: [
          { name: "Dominadas", sets: 4, reps: "6-8", notes: "Si no puedes, usa banda elástica" },
          { name: "Remo con Barra", sets: 4, reps: "8-10", notes: "Aprieta las escápulas al final" },
          { name: "Remo con Mancuerna", sets: 3, reps: "10-12", notes: "Una mano apoyada en banco" },
          { name: "Curl de Bíceps con Barra", sets: 3, reps: "10-12", notes: "Movimiento controlado" },
          { name: "Curl Martillo", sets: 3, reps: "12-15", notes: "Alterna los brazos" },
        ],
      },
      {
        day: "Día 3 - Piernas",
        exercises: [
          { name: "Sentadillas", sets: 4, reps: "10-12", notes: "Baja hasta que los muslos estén paralelos" },
          { name: "Peso Muerto Rumano", sets: 4, reps: "8-10", notes: "Mantén la espalda recta" },
          { name: "Prensa de Piernas", sets: 3, reps: "12-15", notes: "Rango completo de movimiento" },
          { name: "Extensiones de Cuádriceps", sets: 3, reps: "12-15", notes: "Contracción máxima arriba" },
          { name: "Curl Femoral", sets: 3, reps: "12-15", notes: "Movimiento controlado" },
          { name: "Elevaciones de Gemelos", sets: 4, reps: "15-20", notes: "Pausa de 1 segundo arriba" },
        ],
      },
      {
        day: "Día 4 - Hombros y Abdomen",
        exercises: [
          { name: "Press Militar", sets: 4, reps: "8-10", notes: "Mantén el core activado" },
          { name: "Elevaciones Laterales", sets: 3, reps: "12-15", notes: "Controla la bajada" },
          { name: "Elevaciones Frontales", sets: 3, reps: "12-15", notes: "No uses impulso" },
          { name: "Pájaros", sets: 3, reps: "12-15", notes: "Aprieta las escápulas" },
          { name: "Plancha", sets: 3, reps: "30-60 seg", notes: "Mantén línea recta del cuerpo" },
          { name: "Abdominales Bicicleta", sets: 3, reps: "20 c/lado", notes: "Movimiento lento y controlado" },
        ],
      },
      {
        day: "Día 5 - Cardio y Funcional",
        exercises: [
          { name: "Burpees", sets: 4, reps: "8-12", notes: "Mantén buena técnica aunque estés cansado" },
          { name: "Mountain Climbers", sets: 3, reps: "20 c/lado", notes: "Ritmo constante" },
          { name: "Jumping Jacks", sets: 3, reps: "30 seg", notes: "Mantén el ritmo" },
          { name: "Sentadillas con Salto", sets: 3, reps: "12-15", notes: "Aterrizaje suave" },
          { name: "Flexiones", sets: 3, reps: "10-15", notes: "Si es muy difícil, hazlas de rodillas" },
          { name: "Caminata en Cinta", sets: 1, reps: "15-20 min", notes: "Ritmo moderado para recuperación" },
        ],
      },
    ],
  },
}

export default function RoutineSearch() {
  const [document, setDocument] = useState("")
  const [routine, setRoutine] = useState<RoutineData | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [error, setError] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSelectedDay(null)

    if (mockRoutine[document]) {
      const foundRoutine = mockRoutine[document]

      const expiryDate = new Date(foundRoutine.expiryDate + "T23:59:59")
      const today = new Date()

      if (expiryDate < today) {
        setError("Tu rutina ha expirado. Contacta a tu entrenador para renovarla.")
        setRoutine(null)
        return
      }

      setRoutine(foundRoutine)
    } else {
      setError("Documento no encontrado. Contacta a tu entrenador.")
      setRoutine(null)
    }
  }

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDay(dayIndex)
  }

  const goBackToSelection = () => {
    setSelectedDay(null)
  }

  return (
    <section id="routine" className="py-32 bg-neutral-900">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <Typography variant="caption" className="mb-6 tracking-widest uppercase text-neutral-500">
            Entrenamiento Personal
          </Typography>
          <Typography variant="h2" className="mb-8 text-white">
            Accede A Tu
            <br />
            <span className="text-neutral-500">Rutina Personalizada</span>
          </Typography>
          <Typography variant="body" className="text-neutral-400 text-lg leading-relaxed">
            Ingresa tu número de documento para acceder a tu programa de entrenamiento personalizado diseñado
            específicamente para tus objetivos y nivel de fitness.
          </Typography>
        </div>

        {/* Search Form */}
        <div className="max-w-md mb-16">
          <form onSubmit={handleSearch} className="space-y-6">
            <Input
              label="Número de Documento"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              placeholder="Ingresa tu documento (ej: 38803625)"
              error={error}
              required
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Acceder a Rutina
            </Button>
          </form>
        </div>

        {/* Day Selection */}
        {routine && selectedDay === null && (
          <div className="space-y-12">
            <div className="bg-neutral-800 rounded-lg p-8 border border-neutral-700">
              <Typography variant="h3" className="mb-2 text-white">
                Programa de Entrenamiento de {routine.name}
              </Typography>
              <Typography variant="caption" className="text-neutral-400">
                Programa de {routine.routine.length} días • Válido hasta{" "}
                {new Date(routine.expiryDate).toLocaleDateString("es-ES")}
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {routine.routine.map((day: RoutineDay, index: number) => (
                <button
                  key={index}
                  onClick={() => handleDaySelect(index)}
                  className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 hover:border-neutral-600 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-colors duration-200">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                    <svg
                      className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <Typography
                    variant="h4"
                    className="mb-2 text-white group-hover:text-neutral-300 transition-colors duration-200 text-sm"
                  >
                    {day.day}
                  </Typography>

                  <Typography variant="caption" className="text-neutral-500 text-xs">
                    {day.exercises.length} ejercicios
                  </Typography>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Day Routine */}
        {routine && selectedDay !== null && (
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={goBackToSelection}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Resumen
              </Button>
            </div>

            <div className="bg-neutral-800 rounded-lg border border-neutral-700">
              <RoutineCard day={routine.routine[selectedDay].day} exercises={routine.routine[selectedDay].exercises} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
