import { redirect } from 'next/navigation'
import { PhotoGrid } from '@/components/PhotoGrid'
import { destroySession, getUser } from '@/lib/session'
import { CategoryTabs } from '@/components/CategoryTabs'
import { parseCategory } from '@/lib/categories'
import { UserBadge } from '@/components/UserBadge'

// Server Action : fonction exécutée côté serveur, appelée directement par le formulaire.
async function logout() {
  'use server'
  await destroySession()
  redirect('/login')
}

// Composant serveur : lit l'utilisateur connecté, puis délègue la galerie au client.
export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const user = await getUser()
  const category = parseCategory((await searchParams).category)
  return (
    <main className="mx-auto max-w-7xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Galerie</h1>
        <div className="flex items-center gap-4">
      {/* getUser() peut renvoyer null : on n'affiche l'icône que si un utilisateur est connecté */}
        {user && <UserBadge name={user} />}
          <form action={logout}>
            <button className="text-sm underline transition hover:text-red-600">Se déconnecter</button>
          </form>
        </div>
      </header>
      <CategoryTabs active={category} />
      {/* key={category} : quand la catégorie change, la grille est recréée et repart de la page 1 */}
      <PhotoGrid key={category} category={category} />
    </main>
  )
}