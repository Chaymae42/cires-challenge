'use client' // utilise useState : s'exécute dans le navigateur
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'

type Review = { quote: string; name: string; role: string; agency: string }

// Données séparées de l'affichage : pour ajouter un témoignage, on ajoute un objet ici.
const REVIEWS: Review[] = [
  {
    quote: 'We’ve been using Untitled to kick start every new project and can’t imagine working without it.',
    name: 'Andi Lane',
    role: 'Founder, Catalog',
    agency: 'Web Design Agency',
  },
  {
    quote: 'The team shipped our redesign in half the time. Everything just works, and our clients noticed.',
    name: 'Sara Benali',
    role: 'CEO, Atlas Studio',
    agency: 'Digital Product Agency',
  },
  {
    quote: 'Clean, fast and reliable. It became the first tool we open every morning.',
    name: 'Karim Idrissi',
    role: 'CTO, Nova Labs',
    agency: 'Software Company',
  },
]

// Petit bouton rond réutilisé pour les deux flèches (évite de dupliquer les styles).
function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white/30 active:scale-95"
    >
      {children}
    </button>
  )
}

export function TestimonialCard() {
  const [index, setIndex] = useState(0) // témoignage affiché
  const review = REVIEWS[index]

  // step = +1 (suivant) ou -1 (précédent). Le modulo fait revenir au début/à la fin (boucle).
  const go = (step: number) => setIndex((i) => (i + step + REVIEWS.length) % REVIEWS.length)

  return (
    // bg-white/20 + backdrop-blur-md = effet "verre dépoli" de la maquette
    <figure className="rounded-2xl border border-white/30 bg-white/20 p-6 text-white shadow-lg backdrop-blur-md">
      <p className="text-2xl font-medium leading-snug">“{review.quote}”</p>

      <figcaption className="mt-6 flex items-end justify-between">
        {/* Gauche : identité de la personne */}
        <div>
          <p className="text-xl font-semibold">{review.name}</p>
          <p className="mt-1 text-sm font-medium">{review.role}</p>
          <p className="text-xs opacity-70">{review.agency}</p>
        </div>

        {/* Droite : étoiles au-dessus, flèches en dessous */}
        <div className="space-y-3">
          <div className="flex justify-end gap-0.5" aria-label="5 étoiles sur 5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-4 w-4 fill-white text-white" />
            ))}
          </div>
          <div className="flex gap-2">
            <RoundButton label="Témoignage précédent" onClick={() => go(-1)}><ArrowLeft className="h-4 w-4" /></RoundButton>
            <RoundButton label="Témoignage suivant" onClick={() => go(1)}><ArrowRight className="h-4 w-4" /></RoundButton>
          </div>
        </div>
      </figcaption>
    </figure>
  )
}