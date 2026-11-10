'use client'
import { useRef, useState } from 'react'
import type { Photo } from '@/lib/unsplash'

// Toute la logique de la galerie : chargement paginé + likes. Les composants restent de simples vues.
export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false) // plus de photos à charger
  const page = useRef(1)
  const busy = useRef(false) // verrou : évite deux chargements simultanés

  // Charge la page suivante et l'ajoute à la liste (scroll infini).
  async function loadMore() {
    if (busy.current || done) return
    busy.current = true
    setLoading(true)
    try {
      const res = await fetch(`/api/photos?page=${page.current}`)
      if (!res.ok) throw new Error()
      const batch: Photo[] = await res.json()
      page.current++
      setPhotos((prev) => [...prev, ...batch])
      setDone(batch.length === 0)
    } catch {
      setDone(true) // en cas d'erreur, on arrête pour ne pas boucler
    } finally {
      busy.current = false
      setLoading(false)
    }
  }

  // Like "optimiste" : l'interface change tout de suite, on annule si le serveur échoue.
  async function toggleLike(id: string) {
    const setLiked = (liked: boolean) =>
      setPhotos((ps) => ps.map((p) => (p.id === id ? { ...p, liked } : p)))
    const before = photos.find((p) => p.id === id)!.liked
    setLiked(!before)
    const res = await fetch('/api/likes', { method: 'POST', body: JSON.stringify({ photoId: id }) })
    if (!res.ok) setLiked(before)
  }

  return { photos, loading, done, loadMore, toggleLike }
}