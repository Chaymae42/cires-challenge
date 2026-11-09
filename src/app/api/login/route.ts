import { NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'
import { createSession } from '@/lib/session'

// POST /api/login : vérifie les identifiants, ouvre la session si OK.
export async function POST(req: Request) {
  const { username, password } = await req.json()
  const result = authenticate(username, password)
  // `'error' in result` : TypeScript sait ensuite que result est { error } ou { username }.
  if ('error' in result) return NextResponse.json(result, { status: 401 })
  await createSession(result.username)
  return NextResponse.json({ ok: true })
}