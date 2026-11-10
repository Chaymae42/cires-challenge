import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/http'
import { likesRepo } from '@/lib/likes'

// POST /api/likes { photoId } : like/unlike, retourne le nouvel état.
export const POST = withAuth(async (req, user) => {
  const { photoId } = await req.json()
  return NextResponse.json({ liked: await likesRepo.toggle(user, photoId) })
})