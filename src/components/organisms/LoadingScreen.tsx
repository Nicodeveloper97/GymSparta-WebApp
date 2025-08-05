"use client"

import { useEffect, useState } from "react"
import Typography from "@/components/atoms/Typography"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 3
      })
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-neutral-900 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-12">
          <Typography variant="h1" className="mb-4 text-white">
            SPARTA
          </Typography>
          <Typography variant="caption" className="text-neutral-500 tracking-wider uppercase">
            Estudio de Fitness
          </Typography>
        </div>

        <div className="w-48 h-px bg-neutral-800 mx-auto overflow-hidden">
          <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <Typography variant="small" className="mt-4 text-neutral-600">
          {progress}%
        </Typography>
      </div>
    </div>
  )
}
