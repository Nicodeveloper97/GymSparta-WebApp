"use client"

import type React from "react"
import { useState } from "react"
import Typography from "@/components/atoms/Typography"
import Input from "@/components/atoms/input"
import Button from "@/components/atoms/button"
import RoutineCard from "@/components/molecules/RoutineCard"

interface RoutineDay {
  day: string
  exercises: Array<{
    name: string
    sets: number
    reps: string
    notes?: string
  }>
}

interface RoutineData {
  name: string
  expiryDate: string
  routine: RoutineDay[]
}

const mockRoutine = {
  "38803625": {
    name: "Rutina Ejemplo",
    expiryDate: "2023-12-31",
    routine: [
      { day: "Lunes", exercises: [{ name: "Sentadillas", sets: 3, reps: "10" }] },
      { day: "Martes", exercises: [{ name: "Press de Pecho", sets: 3, reps: "12" }] },
      { day: "Miércoles", exercises: [{ name: "Dominadas", sets: 3, reps: "15" }] },
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

    if (mockRoutine[document as keyof typeof mockRoutine]) {
      const foundRoutine = mockRoutine[document as keyof typeof mockRoutine]

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
                Programa de Entrenamiento de {routine?.name}
              </Typography>
              <Typography variant="caption" className="text-neutral-400">
                Programa de {routine?.routine.length} días • Válido hasta{" "}
                {new Date(routine?.expiryDate).toLocaleDateString("es-ES")}
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {routine?.routine.map((day: RoutineDay, index: number) => (
                <button
                  key={index}
                  onClick={() => handleDaySelect(index)}
                  className="bg-neutral-800 rounded-lg p-8 border border-neutral-700 hover:border-neutral-600 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-colors duration-200">
                      <span className="font-medium">{index + 1}</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <Typography
                    variant="h4"
                    className="mb-3 text-white group-hover:text-neutral-300 transition-colors duration-200"
                  >
                    {day.day}
                  </Typography>

                  <Typography variant="caption" className="text-neutral-500">
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
              <RoutineCard
                day={routine?.routine[selectedDay].day}
                exercises={routine?.routine[selectedDay].exercises}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
