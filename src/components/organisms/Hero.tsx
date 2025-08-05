"use client"

import { useEffect, useRef } from "react"
import Typography from "@/components/atoms/Typography"
import Button from "../atoms/button"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.3
        heroRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToRoutine = () => {
    const element = document.getElementById("routine")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-neutral-900">
      <div
        ref={heroRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url(/images/gym-hero.jpg)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <Typography variant="caption" className="tracking-widest uppercase text-neutral-500">
                Estudio de Fitness Premium
              </Typography>

              <Typography variant="h1" className="text-white">
                Transforma Tu
                <br />
                <span className="text-neutral-500">Potencial</span>
              </Typography>

              <Typography variant="body" className="text-neutral-400 max-w-lg text-lg leading-relaxed">
                Experimenta entrenamientos personalizados en nuestras instalaciones de última generación. Donde la
                dedicación se encuentra con la precisión, y los objetivos se convierten en logros.
              </Typography>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" onClick={scrollToRoutine}>
                Comenzar Entrenamiento
              </Button>
              <Button variant="ghost" size="lg">
                Conocer Más
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-16 bg-neutral-700">
          <div className="w-px h-4 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  )
}
