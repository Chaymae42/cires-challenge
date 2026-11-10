import Image from 'next/image'
import { LoginForm } from '@/components/LoginForm'

// Mise en page de la maquette : formulaire à gauche, image + témoignage à droite.
// L'image est masquée sur mobile (hidden lg:block).
export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="flex items-center justify-center p-8"><LoginForm /></section>
      <aside className="relative hidden lg:block">
        <Image src="/login.jpg" alt="" fill priority className="object-cover" />
        <blockquote className="absolute inset-x-8 bottom-8 rounded-2xl bg-white/20 p-6 text-white backdrop-blur">
          <p className="text-xl">“We’ve been using Untitled to kick start every new project.”</p>
          <footer className="mt-4 font-semibold">Andi Lane <span className="font-normal opacity-80">· Founder, Catalog</span></footer>
        </blockquote>
      </aside>
    </main>
  )
}