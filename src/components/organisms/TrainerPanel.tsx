"use client"

import type React from "react"

import { useState } from "react"
import Typography from "@/components/atoms/Typography"
import Input from "../atoms/input"
import Button from "../atoms/button"

interface Exercise {
  name: string
  sets: string
  reps: string
  notes: string
}

interface DayRoutine {
  dayName: string
  exercises: Exercise[]
}

interface TrainerPanelProps {
  onClose: () => void
}

export default function TrainerPanel({ onClose }: TrainerPanelProps) {
  const [clientDocument, setClientDocument] = useState("")
  const [clientName, setClientName] = useState("")
  const [visibilityDays, setVisibilityDays] = useState("30")
  const [routines, setRoutines] = useState<DayRoutine[]>([
    { dayName: "Día 1", exercises: [{ name: "", sets: "", reps: "", notes: "" }] },
  ])
  const [savedRoutines, setSavedRoutines] = useState<any[]>([])
  const [editingRoutine, setEditingRoutine] = useState<any>(null)

  const addDay = () => {
    setRoutines([
      ...routines,
      {
        dayName: `Día ${routines.length + 1}`,
        exercises: [{ name: "", sets: "", reps: "", notes: "" }],
      },
    ])
  }

  const removeDay = (dayIndex: number) => {
    if (routines.length > 1) {
      setRoutines(routines.filter((_, index) => index !== dayIndex))
    }
  }

  const updateDayName = (dayIndex: number, newName: string) => {
    const updated = routines.map((day, index) => (index === dayIndex ? { ...day, dayName: newName } : day))
    setRoutines(updated)
  }

  const addExercise = (dayIndex: number) => {
    const updated = routines.map((day, index) =>
      index === dayIndex ? { ...day, exercises: [...day.exercises, { name: "", sets: "", reps: "", notes: "" }] } : day,
    )
    setRoutines(updated)
  }

  const updateExercise = (dayIndex: number, exerciseIndex: number, field: string, value: string) => {
    const updated = routines.map((day, dIndex) =>
      dIndex === dayIndex
        ? {
            ...day,
            exercises: day.exercises.map((exercise, eIndex) =>
              eIndex === exerciseIndex ? { ...exercise, [field]: value } : exercise,
            ),
          }
        : day,
    )
    setRoutines(updated)
  }

  const removeExercise = (dayIndex: number, exerciseIndex: number) => {
    const updated = routines.map((day, dIndex) =>
      dIndex === dayIndex ? { ...day, exercises: day.exercises.filter((_, eIndex) => eIndex !== exerciseIndex) } : day,
    )
    setRoutines(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + Number.parseInt(visibilityDays))

    const newRoutine = {
      id: editingRoutine?.id || Date.now(),
      clientDocument,
      clientName,
      visibilityDays: Number.parseInt(visibilityDays),
      expiryDate: expiryDate.toISOString().split("T")[0],
      routines,
      createdAt: editingRoutine?.createdAt || new Date().toISOString().split("T")[0],
    }

    if (editingRoutine) {
      setSavedRoutines(savedRoutines.map((routine) => (routine.id === editingRoutine.id ? newRoutine : routine)))
      setEditingRoutine(null)
    } else {
      setSavedRoutines([...savedRoutines, newRoutine])
    }

    // Reset form
    setClientDocument("")
    setClientName("")
    setVisibilityDays("30")
    setRoutines([{ dayName: "Día 1", exercises: [{ name: "", sets: "", reps: "", notes: "" }] }])

    alert(editingRoutine ? "¡Rutina actualizada exitosamente!" : "¡Rutina guardada exitosamente!")
  }

  const editRoutine = (routine: any) => {
    setEditingRoutine(routine)
    setClientDocument(routine.clientDocument)
    setClientName(routine.clientName)
    setVisibilityDays(routine.visibilityDays.toString())
    setRoutines(routine.routines)
  }

  const deleteRoutine = (routineId: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta rutina?")) {
      setSavedRoutines(savedRoutines.filter((routine) => routine.id !== routineId))
    }
  }

  const cancelEdit = () => {
    setEditingRoutine(null)
    setClientDocument("")
    setClientName("")
    setVisibilityDays("30")
    setRoutines([{ dayName: "Día 1", exercises: [{ name: "", sets: "", reps: "", notes: "" }] }])
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <Typography variant="caption" className="mb-4 tracking-widest uppercase text-neutral-500">
                Gestión Profesional
              </Typography>
              <Typography variant="h2" className="text-white">
                Panel de Entrenador
              </Typography>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar Panel
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="xl:col-span-2">
              <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-8">
                <div className="flex items-center justify-between mb-8">
                  <Typography variant="h3" className="text-white">
                    {editingRoutine ? "Editar Rutina" : "Crear Nueva Rutina"}
                  </Typography>
                  {editingRoutine && (
                    <span className="px-3 py-1 bg-blue-900/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                      Modo Edición
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Client Information */}
                  <div className="bg-neutral-700/50 rounded-lg p-6">
                    <Typography variant="h4" className="mb-6 text-white">
                      Información del Cliente
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Input
                        label="Documento del Cliente"
                        value={clientDocument}
                        onChange={(e) => setClientDocument(e.target.value)}
                        required
                      />
                      <Input
                        label="Nombre del Cliente"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                      />
                      <Input
                        label="Días de Visibilidad"
                        type="number"
                        value={visibilityDays}
                        onChange={(e) => setVisibilityDays(e.target.value)}
                        min="1"
                        max="365"
                        required
                      />
                    </div>
                  </div>

                  {/* Routine Days */}
                  <div className="bg-neutral-700/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <Typography variant="h4" className="text-white">
                        Días de Entrenamiento ({routines.length})
                      </Typography>
                      <Button type="button" variant="secondary" onClick={addDay}>
                        Agregar Día
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {routines.map((day, dayIndex) => (
                        <div key={dayIndex} className="bg-neutral-800 rounded-lg p-6 border border-neutral-600">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center text-sm font-medium">
                                {dayIndex + 1}
                              </div>
                              <Input
                                value={day.dayName}
                                onChange={(e) => updateDayName(dayIndex, e.target.value)}
                                className="max-w-xs"
                                required
                              />
                            </div>
                            {routines.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeDay(dayIndex)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Eliminar Día
                              </Button>
                            )}
                          </div>

                          {/* Exercises */}
                          <div className="space-y-4">
                            {day.exercises.map((exercise, exerciseIndex) => (
                              <div key={exerciseIndex} className="bg-neutral-700/50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <Typography variant="h4" className="text-white">
                                    Ejercicio {exerciseIndex + 1}
                                  </Typography>
                                  {day.exercises.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      onClick={() => removeExercise(dayIndex, exerciseIndex)}
                                      className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                      Eliminar
                                    </Button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <Input
                                    label="Nombre del Ejercicio"
                                    value={exercise.name}
                                    onChange={(e) => updateExercise(dayIndex, exerciseIndex, "name", e.target.value)}
                                    required
                                  />
                                  <Input
                                    label="Series"
                                    value={exercise.sets}
                                    onChange={(e) => updateExercise(dayIndex, exerciseIndex, "sets", e.target.value)}
                                    required
                                  />
                                  <Input
                                    label="Repeticiones"
                                    value={exercise.reps}
                                    onChange={(e) => updateExercise(dayIndex, exerciseIndex, "reps", e.target.value)}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Notas del Entrenador
                                  </label>
                                  <textarea
                                    value={exercise.notes}
                                    onChange={(e) => updateExercise(dayIndex, exerciseIndex, "notes", e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-colors duration-200"
                                    placeholder="Instrucciones especiales, técnica, etc."
                                  />
                                </div>
                              </div>
                            ))}

                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => addExercise(dayIndex)}
                              className="w-full border-2 border-dashed border-neutral-600 hover:border-neutral-500"
                            >
                              Agregar Ejercicio
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6">
                    <Button type="submit" variant="primary" size="lg">
                      {editingRoutine ? "Actualizar Rutina" : "Guardar Rutina"}
                    </Button>
                    {editingRoutine && (
                      <Button type="button" variant="ghost" size="lg" onClick={cancelEdit}>
                        Cancelar Edición
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Saved Routines Section */}
            <div className="xl:col-span-1">
              <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-8">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h3" className="text-white">
                    Rutinas Guardadas
                  </Typography>
                  <span className="px-3 py-1 bg-neutral-700 text-neutral-300 text-sm rounded-full">
                    {savedRoutines.length}
                  </span>
                </div>

                {savedRoutines.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <Typography variant="body" className="text-neutral-500">
                      No hay rutinas guardadas aún
                    </Typography>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {savedRoutines.map((routine) => (
                      <div key={routine.id} className="bg-neutral-700/50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Typography variant="h4" className="text-white mb-1">
                              {routine.clientName}
                            </Typography>
                            <Typography variant="caption" className="text-neutral-500">
                              Doc: {routine.clientDocument}
                            </Typography>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => editRoutine(routine)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteRoutine(routine.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Eliminar
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-white font-medium">{routine.routines.length}</div>
                            <div className="text-neutral-500">Días</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium">{routine.visibilityDays}</div>
                            <div className="text-neutral-500">Días Válidos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium text-xs">{routine.expiryDate}</div>
                            <div className="text-neutral-500">Expira</div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-neutral-600">
                          <Typography variant="small" className="text-neutral-400">
                            Creada: {routine.createdAt}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
