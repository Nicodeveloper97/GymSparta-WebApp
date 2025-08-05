"use client"

import { useEffect, useRef } from "react"
import Typography from "@/components/atoms/Typography"
import Image from "next/image"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <Typography variant="caption" className="mb-6 tracking-widest uppercase text-neutral-500">
            Nuestra Filosofía
          </Typography>
          <Typography variant="h2" className="mb-8 text-white">
            Excelencia A Través De La
            <br />
            <span className="text-neutral-500">Precisión</span>
          </Typography>
          <Typography variant="body" className="text-neutral-400 text-lg leading-relaxed">
            Creemos que el fitness no se trata solo de transformación física, sino de construir disciplina, confianza y
            una mentalidad que trasciende el gimnasio.
          </Typography>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          <div className="space-y-6">
            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <Typography variant="h4" className="mb-3 text-white">
                Entrenamiento Personalizado
              </Typography>
              <Typography variant="body" className="text-neutral-400 leading-relaxed">
                Cada programa está adaptado a tus objetivos únicos, nivel de fitness y estilo de vida. Sin rutinas
                genéricas, solo resultados.
              </Typography>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <Typography variant="h4" className="mb-3 text-white">
                Guía Experta
              </Typography>
              <Typography variant="body" className="text-neutral-400 leading-relaxed">
                Nuestros entrenadores certificados aportan años de experiencia y educación continua para garantizar tu
                seguridad y éxito.
              </Typography>
            </div>
          </div>

          <div className="space-y-6">
            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <Typography variant="h4" className="mb-3 text-white">
                Enfoque Comunitario
              </Typography>
              <Typography variant="body" className="text-neutral-400 leading-relaxed">
                Únete a una comunidad de apoyo de personas con ideas afines comprometidas con el crecimiento, la salud y
                la excelencia.
              </Typography>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="relative h-80 bg-neutral-800 rounded-lg overflow-hidden group">
            <Image
              src="/images/javi-training.jpg"
              alt="Ambiente de entrenamiento"
              width={400}
              height={320}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          <div className="relative h-80 bg-neutral-800 rounded-lg overflow-hidden group">
            <Image
              src="/images/belen-fitness.jpg"
              alt="Área de entrenamiento funcional"
              width={400}
              height={320}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          <div className="relative h-80 bg-neutral-800 rounded-lg overflow-hidden group">
            <Image
              src="/images/juli-training.jpg"
              alt="Zona de entrenamiento de fuerza"
              width={400}
              height={320}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-neutral-800">
          <div className="text-center">
            <Typography variant="h2" className="mb-2 text-white">
              150+
            </Typography>
            <Typography variant="caption" className="text-neutral-500 uppercase tracking-wider">
              Miembros Activos
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h2" className="mb-2 text-white">
              3
            </Typography>
            <Typography variant="caption" className="text-neutral-500 uppercase tracking-wider">
              Años de Experiencia
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h2" className="mb-2 text-white">
              3
            </Typography>
            <Typography variant="caption" className="text-neutral-500 uppercase tracking-wider">
              Entrenadores Expertos
            </Typography>
          </div>
          <div className="text-center">
            <Typography variant="h2" className="mb-2 text-white">
              98%
            </Typography>
            <Typography variant="caption" className="text-neutral-500 uppercase tracking-wider">
              Tasa de Satisfacción
            </Typography>
          </div>
        </div>
      </div>
    </section>
  )
}
