import Image from 'next/image'
import type { Photo } from '@/lib/unsplash'
import { LikeButton } from './LikeButton'

// Une carte : la photo, le nom de l'auteur, et le bouton like en bas.
export function PhotoCard({ photo, onLike }: { photo: Photo; onLike: () => void }) {
  return (
    <figure className="overflow-hidden rounded-xl bg-white shadow">
      <Image src={photo.url} alt={photo.alt} width={400} height={300} className="h-64 w-full object-cover" />
      <figcaption className="flex items-center justify-between p-3 text-sm">
        <span className="truncate">{photo.author}</span>
        <LikeButton liked={photo.liked} onClick={onLike} />
      </figcaption>
    </figure>
  )
}