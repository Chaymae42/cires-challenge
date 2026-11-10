'use client'
import { usePhotos } from '@/hooks/usePhotos'
import { useOnVisible } from '@/hooks/useOnVisible'
import { PhotoCard } from './PhotoCard'

export function PhotoGrid() {
  const { photos, loading, done, loadMore, toggleLike } = usePhotos()
  // Le div "sentinelle" en bas de liste : quand il devient visible, on charge la suite.
  const sentinel = useOnVisible(loadMore, photos.length)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {photos.map((p) => <PhotoCard key={p.id} photo={p} onLike={() => toggleLike(p.id)} />)}
      </div>
      <div ref={sentinel} className="py-8 text-center text-gray-500">
        {loading ? 'Chargement…' : done && 'Fin de la galerie'}
      </div>
    </>
  )
}