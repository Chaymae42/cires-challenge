import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/http'
import { fetchPhotos } from '@/lib/unsplash'
import { likesRepo } from '@/lib/likes'
import { parseCategory } from '@/lib/categories'

// GET /api/photos?page=2 : une page de photos + l'état "liké" de l'utilisateur connecté.
export const GET = withAuth(async (req, user) => {
  const params = new URL(req.url).searchParams
  const page = Number(params.get('page') ?? 1)
  const category = parseCategory(params.get('category')) // valeur sûre, même si l'URL est modifiée à la main

 
  const photos = await fetchPhotos(page)
  const liked = await likesRepo.likedAmong(user, photos.map((p) => p.id))
  return NextResponse.json(photos.map((p) => ({ ...p, liked: liked.has(p.id) })))
})