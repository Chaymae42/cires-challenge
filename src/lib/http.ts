import { NextResponse } from 'next/server'
import { getUser } from './session'

// Decorator : enveloppe une route pour lui ajouter (1) la vérification de session
// et (2) la gestion d'erreurs. Écrit une fois, réutilisé par toutes les routes protégées.
export const withAuth =
  (handler: (req: Request, user: string) => Promise<Response>) =>
  async (req: Request) => {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    try {
      return await handler(req, user) // l'utilisateur est garanti connecté ici
    } catch {
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
  }