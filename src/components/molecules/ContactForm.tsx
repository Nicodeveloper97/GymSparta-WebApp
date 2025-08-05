"use client"

import type React from "react"

import { useState } from "react"
import Input from "../atoms/input"
import Button from "../atoms/button"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const whatsappMessage =
      `Hola! Mi nombre es ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Teléfono: ${formData.phone}%0A` +
      `Mensaje: ${formData.message}`

    const whatsappUrl = `https://wa.me/2804334435?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <Input label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} required />

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Mensaje</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-neutral-700 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-neutral-600 transition-colors duration-200"
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        Enviar Mensaje
      </Button>
    </form>
  )
}
