import type { Category } from './categories'

export type Photo = { id: string; url: string; alt: string; author: string; liked: boolean }


// Type de la réponse de l'API Unsplash.
type UnsplashPhoto = {
  id: string
  urls: {small: string}
  alt_description: string | null
  user: {name: string}
}

const API = 'https://api.unsplash.com'

// Adapter : convertit une photo Unsplash (objet volumineux) en Photo.
const toPhoto = (p: UnsplashPhoto): Photo => ({
  id: p.id,
  url: p.urls.small,
  alt: p.alt_description ?? 'Photo',
  author: p.user.name,
  liked: false, // renseigné ensuite par la route, selon l'utilisateur
})

// Adapter : appelle l'API Unsplash et convertit sa réponse volumineuse en Photo[].
export async function fetchPhotos(page: number, category: Category = 'all', perPage = 20): Promise<Photo[]> {
  const isAll = category === 'all'
  // "all" = liste générale ; sinon = recherche par mot-clé.
  const url = isAll
    ? `${API}/photos?page=${page}&per_page=${perPage}`
    : `${API}/search/photos?query=${category}&page=${page}&per_page=${perPage}`

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }, // clé côté serveur uniquement
    next: { revalidate: 300 }, // cache 5 min : le quota Unsplash en démo est d'environ 50 requêtes/heure
  })
  if (!res.ok) throw new Error(`Unsplash ${res.status}`)

  // La liste générale renvoie un tableau ; la recherche renvoie { results: [...] }.
  const data: UnsplashPhoto[] | { results: UnsplashPhoto[] } = await res.json()
  const photos = Array.isArray(data) ? data : data.results
  return photos.map(toPhoto)
}