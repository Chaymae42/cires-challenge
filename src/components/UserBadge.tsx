import { CircleUser } from 'lucide-react'

// Icône de profil. Le nom n'apparaît qu'au survol (ou au focus clavier) : c'est une bulle d'info (tooltip).
export function UserBadge({ name }: { name: string }) {
  return (
    // `group` : permet aux enfants de réagir au survol du parent (group-hover).
    // tabIndex=0 : l'élément devient accessible au clavier. role="img" + aria-label : lu par les lecteurs d'écran.
    <div className="group relative" tabIndex={0} role="img" aria-label={`Connecté en tant que ${name}`}>
      <CircleUser className="h-8 w-8 text-slate-700 transition group-hover:text-indigo-600" />

      {/* Bulle : invisible par défaut (opacity-0), visible au survol du parent.
          right-0 : alignée à droite, pour ne pas dépasser de l'écran puisque l'icône est au bord droit. */}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-10 mt-2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 group-focus:opacity-100"
      >
        {name}
      </span>
    </div>
  )
}