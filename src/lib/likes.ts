import { db } from './db'

// "Sous-base" dédiée aux likes : isole ces données du reste de la base.
const likes = db.sublevel<string, boolean>('likes', { valueEncoding: 'json' })

// Clé = "utilisateur:photo" : un like appartient à UN utilisateur et UNE photo.
const key = (user: string, photoId: string) => `${user}:${photoId}`

// Repository : seul fichier qui connaît Level. Le reste de l'app appelle ces méthodes.
export const likesRepo = {
  // Parmi une liste de photos, retourne celles que l'utilisateur a likées.
  // getMany = UNE seule requête pour toute la page (au lieu d'une par photo).
   async likedAmong(user: string, ids: string[]) {
    const found = await likes.getMany(ids.map((id) => key(user, id)))
    return new Set(ids.filter((_, i) => found[i] !== undefined))
  },

  // Bascule le like : le supprime s'il existe, le crée sinon.
  async toggle(user: string, photoId: string) {
    const k = key(user, photoId)
    const [existing] = await likes.getMany([k])
    existing ? await likes.del(k) : await likes.put(k, true)
    return !existing // true = la photo est maintenant likée
  },
}