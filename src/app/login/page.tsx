import Image from 'next/image'
import { LoginForm } from '@/components/LoginForm'
import { TestimonialCard } from '@/components/TestimonialCard'

// Mise en page de la maquette : formulaire à gauche, image + témoignage à droite.
// L'image est masquée sur mobile (hidden lg:block).
export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center p-8"><LoginForm /></section>
      <aside className="relative hidden  min-h-screen lg:block">
        <Image src="/login.jpg" alt="" fill priority className="object-cover" />
         {/* Carte posée en bas de l'image, avec une marge de 2rem sur les côtés */}
        <div className="absolute inset-x-8 bottom-8">
          <TestimonialCard />
        </div>
      </aside>
    </main>
  )
}