import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, verifyToken } from '@/lib/session'

// Exécuté avant chaque page : redirige selon que l'utilisateur est connecté ou non.
export async function middleware(req: NextRequest) {
  const user = await verifyToken(req.cookies.get(SESSION_COOKIE)?.value)
  const onLogin = req.nextUrl.pathname === '/login'
  if (!user && !onLogin) return NextResponse.redirect(new URL('/login', req.url)) // non connecté -> login
  if (user && onLogin) return NextResponse.redirect(new URL('/', req.url)) // déjà connecté -> galerie
}

// Exclut les routes /api (protégées par withAuth) et les fichiers statiques.
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }