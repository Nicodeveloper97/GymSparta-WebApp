"use client"

import { useState, useEffect } from "react"
import Button from "../atoms/button"
import Typography from "@/components/atoms/Typography"

interface HeaderProps {
  onTrainerPanelToggle: () => void
}

export default function Header({ onTrainerPanelToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Typography variant="h4" className="font-light tracking-wider text-white">
            SPARTA
          </Typography>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("routine")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Entrenamientos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Contacto
            </button>
            <Button variant="ghost" size="sm" onClick={onTrainerPanelToggle}>
              Panel Entrenador
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
