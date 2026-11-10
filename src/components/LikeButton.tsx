import { Heart } from 'lucide-react'

// Cœur rouge et rempli = déjà liké ; cœur vide = pas encore liké.
export function LikeButton({ liked, onClick }: { liked: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={liked} aria-label={liked ? 'Retirer le like' : 'Liker'}>
      <Heart className={`transition ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
    </button>
  )
}