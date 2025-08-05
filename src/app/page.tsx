"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/organisms/LoadingScreen"
import Header from "@/components/organisms/Header"
import Hero from "@/components/organisms/Hero"
import About from "@/components/organisms/About"
import RoutineSearch from "@/components/organisms/RoutineSearch"
import CalorieCalculator from "@/components/organisms/CalorieCalculator"
import Contact from "@/components/organisms/Contact"
import Footer from "@/components/organisms/Footer"
import TrainerPanel from "@/components/organisms/TrainerPanel"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showTrainerPanel, setShowTrainerPanel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <Header onTrainerPanelToggle={() => setShowTrainerPanel(!showTrainerPanel)} />

      {showTrainerPanel ? (
        <TrainerPanel onClose={() => setShowTrainerPanel(false)} />
      ) : (
        <>
          <Hero />
          <About />
          <RoutineSearch />
          <CalorieCalculator />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}
