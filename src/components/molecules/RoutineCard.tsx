import Typography from "@/components/atoms/Typography"

interface Exercise {
  name: string
  sets: number
  reps: string
  notes?: string
}

interface RoutineCardProps {
  day: string
  exercises: Exercise[]
}

export default function RoutineCard({ day, exercises }: RoutineCardProps) {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Typography variant="h3" className="mb-2 text-white">
          {day}
        </Typography>
        <Typography variant="caption" className="text-neutral-500">
          {exercises.length} ejercicios
        </Typography>
      </div>

      <div className="space-y-6">
        {exercises.map((exercise, index) => (
          <div key={index} className="border-l-2 border-neutral-700 pl-6">
            <div className="flex items-start justify-between mb-2">
              <Typography variant="h4" className="text-white">
                {exercise.name}
              </Typography>
              <Typography variant="caption" className="text-neutral-500 ml-4">
                {exercise.sets} × {exercise.reps}
              </Typography>
            </div>
            {exercise.notes && (
              <Typography variant="caption" className="text-neutral-400">
                {exercise.notes}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
