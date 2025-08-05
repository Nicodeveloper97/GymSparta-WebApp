"use client"

import { useState } from "react"
import Typography from "@/components/atoms/Typography"
import Input from "@/components/atoms/input"
import Button from "@/components/atoms/button"

interface CalorieResult {
  bmr: number
  maintenance: number
  weightLoss: number
  weightGain: number
}

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activity: "1.2",
  })
  const [result, setResult] = useState<CalorieResult | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const activityLevels = [
    { value: "1.2", label: "Sedentario (poco o ningún ejercicio)" },
    { value: "1.375", label: "Ligeramente activo (ejercicio ligero 1-3 días/semana)" },
    { value: "1.55", label: "Moderadamente activo (ejercicio moderado 3-5 días/semana)" },
    { value: "1.725", label: "Muy activo (ejercicio intenso 6-7 días/semana)" },
    { value: "1.9", label: "Extremadamente activo (ejercicio muy intenso, trabajo físico)" },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.age || Number.parseInt(formData.age) < 10 || Number.parseInt(formData.age) > 120) {
      newErrors.age = "Ingresa una edad válida (10-120 años)"
    }
    if (!formData.weight || Number.parseFloat(formData.weight) < 20 || Number.parseFloat(formData.weight) > 300) {
      newErrors.weight = "Ingresa un peso válido (20-300 kg)"
    }
    if (!formData.height || Number.parseFloat(formData.height) < 100 || Number.parseFloat(formData.height) > 250) {
      newErrors.height = "Ingresa una altura válida (100-250 cm)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateCalories = () => {
    if (!validateForm()) return

    const age = Number.parseInt(formData.age)
    const weight = Number.parseFloat(formData.weight)
    const height = Number.parseFloat(formData.height)
    const activityFactor = Number.parseFloat(formData.activity)

    // Fórmula de Harris-Benedict revisada
    let bmr: number
    if (formData.gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }

    const maintenance = bmr * activityFactor
    const weightLoss = maintenance - 500 // Déficit de 500 cal para perder ~0.5kg/semana
    const weightGain = maintenance + 300 // Superávit de 300 cal para ganar peso gradualmente

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  const resetCalculator = () => {
    setFormData({
      age: "",
      gender: "male",
      weight: "",
      height: "",
      activity: "1.2",
    })
    setResult(null)
    setErrors({})
  }

  return (
    <section id="calories" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Typography variant="caption" className="mb-6 tracking-widest uppercase text-neutral-500">
              Nutrición Personalizada
            </Typography>
            <Typography variant="h2" className="mb-8 text-white">
              Calculadora De
              <br />
              <span className="text-neutral-500">Calorías</span>
            </Typography>
            <Typography variant="body" className="text-neutral-400 text-lg leading-relaxed max-w-3xl mx-auto">
              Descubre cuántas calorías necesitas diariamente según tu metabolismo basal y nivel de actividad física.
              Basado en la fórmula científica de Harris-Benedict.
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div className="bg-neutral-800 rounded-lg p-8 border border-neutral-700">
              <Typography variant="h3" className="mb-8 text-white">
                Ingresa tus datos
              </Typography>

              <div className="space-y-6">
                {/* Age and Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Edad (años)"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="25"
                    error={errors.age}
                    min="10"
                    max="120"
                  />
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Género</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-colors duration-200"
                    >
                      <option value="male">Masculino</option>
                      <option value="female">Femenino</option>
                    </select>
                  </div>
                </div>

                {/* Weight and Height */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Peso (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="70"
                    error={errors.weight}
                    min="20"
                    max="300"
                    step="0.1"
                  />
                  <Input
                    label="Altura (cm)"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    placeholder="175"
                    error={errors.height}
                    min="100"
                    max="250"
                  />
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Nivel de Actividad</label>
                  <select
                    value={formData.activity}
                    onChange={(e) => handleInputChange("activity", e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-colors duration-200"
                  >
                    {activityLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button variant="primary" size="lg" onClick={calculateCalories} className="flex-1">
                    Calcular Calorías
                  </Button>
                  <Button variant="ghost" size="lg" onClick={resetCalculator}>
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-neutral-800 rounded-lg p-8 border border-neutral-700">
              <Typography variant="h3" className="mb-8 text-white">
                Tus resultados
              </Typography>

              {!result ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <Typography variant="body" className="text-neutral-500">
                    Completa el formulario para ver tus calorías recomendadas
                  </Typography>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* BMR */}
                  <div className="bg-neutral-700/50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="h4" className="text-white">
                        Metabolismo Basal (BMR)
                      </Typography>
                      <Typography variant="h3" className="text-white">
                        {result.bmr}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-neutral-400">
                      Calorías que tu cuerpo necesita en reposo absoluto
                    </Typography>
                  </div>

                  {/* Maintenance */}
                  <div className="bg-neutral-700/50 rounded-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="h4" className="text-white">
                        Mantenimiento
                      </Typography>
                      <Typography variant="h3" className="text-blue-400">
                        {result.maintenance}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-neutral-400">
                      Calorías para mantener tu peso actual
                    </Typography>
                  </div>

                  {/* Weight Loss */}
                  <div className="bg-neutral-700/50 rounded-lg p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="h4" className="text-white">
                        Pérdida de Peso
                      </Typography>
                      <Typography variant="h3" className="text-green-400">
                        {result.weightLoss}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-neutral-400">
                      Déficit de 500 cal/día (~0.5kg por semana)
                    </Typography>
                  </div>

                  {/* Weight Gain */}
                  <div className="bg-neutral-700/50 rounded-lg p-6 border-l-4 border-orange-500">
                    <div className="flex items-center justify-between mb-2">
                      <Typography variant="h4" className="text-white">
                        Ganancia de Peso
                      </Typography>
                      <Typography variant="h3" className="text-orange-400">
                        {result.weightGain}
                      </Typography>
                    </div>
                    <Typography variant="caption" className="text-neutral-400">
                      Superávit de 300 cal/día (ganancia gradual)
                    </Typography>
                  </div>

                  {/* Tips */}
                  <div className="bg-neutral-900/50 rounded-lg p-6 mt-8">
                    <Typography variant="h4" className="text-white mb-4">
                      💡 Consejos importantes
                    </Typography>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Estos son valores estimados, consulta con un nutricionista</li>
                      <li>• Ajusta gradualmente según tus resultados</li>
                      <li>• La calidad de los alimentos es tan importante como la cantidad</li>
                      <li>• Mantén una hidratación adecuada (2-3 litros/día)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
