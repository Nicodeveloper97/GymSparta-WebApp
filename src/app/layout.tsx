import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "GymSparta - Forja tu Leyenda",
  description:
    "Gimnasio de alta performance donde forjamos guerreros modernos a través de la disciplina y la excelencia física.",
  keywords: "gimnasio, fitness, entrenamiento, rutinas, sparta, fuerza",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
