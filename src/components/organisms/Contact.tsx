import Typography from "@/components/atoms/Typography"
import ContactForm from "@/components/molecules/ContactForm"

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <Typography variant="caption" className="mb-6 tracking-widest uppercase text-neutral-500">
                Ponte en Contacto
              </Typography>
              <Typography variant="h2" className="mb-8 text-white">
                Comienza Tu
                <br />
                <span className="text-neutral-500">Viaje Hoy</span>
              </Typography>
              <Typography variant="body" className="text-neutral-400 text-lg leading-relaxed">
                ¿Listo para transformar tu viaje fitness? Nuestro equipo está aquí para guiarte en cada paso del camino.
              </Typography>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography variant="h4" className="mb-2 text-white">
                    Visita Nuestro Estudio
                  </Typography>
                  <Typography variant="body" className="text-neutral-400">
                    Juan Acosta 282
                    <br />
                    Zona Norte, Fácil Acceso
                  </Typography>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography variant="h4" className="mb-2 text-white">
                    Llámanos
                  </Typography>
                  <Typography variant="body" className="text-neutral-400">
                    +54 280 427 3920
                    <br />
                    Lun-Vie 8:00 AM - 22:00 PM
                  </Typography>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography variant="h4" className="mb-2 text-white">
                    Horarios del Estudio
                  </Typography>
                  <div className="space-y-1 text-neutral-400">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes</span>
                      <span>8:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>10:00 - 14:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-800 rounded-lg p-8">
            <Typography variant="h3" className="mb-6 text-white">
              Envíanos un mensaje
            </Typography>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
