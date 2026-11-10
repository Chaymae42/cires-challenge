import Link from 'next/link'
import { CATEGORIES, type Category } from '@/lib/categories'

// Onglets de filtre : chaque onglet est un lien vers /?category=xxx.
// `active` met en évidence la catégorie en cours.
export function CategoryTabs({ active }: { active: Category }) {
  return (
    <nav aria-label="Catégories" className="mb-6 flex gap-2 overflow-x-auto pb-2">
      {CATEGORIES.map((c) => (
        <Link
          key={c}
          href={c === 'all' ? '/' : `/?category=${c}`}
          scroll={false} // ne remonte pas en haut de la page au clic
          aria-current={c === active ? 'page' : undefined}
          className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium capitalize transition ${
            c === active ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {c}
        </Link>
      ))}
    </nav>
  )
}