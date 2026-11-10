
export type Photo = { id: string; url: string; alt: string; author: string; liked: boolean }

// Type de la réponse de l'API Unsplash.
type UnsplashPhoto = {
  id: string
  urls: {
    small: string
  }
  alt_description: string | null
  user: {
    name: string
  }
}

// Adapter : appelle l'API Unsplash et convertit sa réponse volumineuse en Photo[].
export async function fetchPhotos(page: number, perPage = 20): Promise<Photo[]> {
  const res = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}`, {
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }, // clé côté serveur uniquement
    next: { revalidate: 300 }, // cache 5 min : le quota Unsplash en démo est d'environ 50 requêtes/heure
  })
  if (!res.ok) throw new Error(`Unsplash ${res.status}`)
const photos: UnsplashPhoto[] = await res.json()
   return photos.map((p) => ({
    id: p.id,
    url: p.urls.small,
    alt: p.alt_description ?? 'Photo',
    author: p.user.name,
    liked: false, // renseigné ensuite par la route, selon l'utilisateur
  }))
}