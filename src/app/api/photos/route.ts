import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/http'
import { fetchPhotos } from '@/lib/unsplash'
import { likesRepo } from '@/lib/likes'

// GET /api/photos?page=2 : une page de photos + l'état "liké" de l'utilisateur connecté.
export const GET = withAuth(async (req, user) => {
  const page = Number(new URL(req.url).searchParams.get('page') ?? 1)
  const photos = await fetchPhotos(page)
  const liked = await likesRepo.likedAmong(user, photos.map((p) => p.id))
  return NextResponse.json(photos.map((p) => ({ ...p, liked: liked.has(p.id) })))
})