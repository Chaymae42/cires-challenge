import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'session'
const secret = new TextEncoder().encode(process.env.SESSION_SECRET)

// Crée un jeton signé contenant le nom d'utilisateur et le range dans un cookie.
export async function createSession(username: string) {
  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret) // la signature empêche toute falsification
  ;(await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true, // illisible depuis le JavaScript du navigateur (anti-XSS)
    sameSite: 'lax', // limite les attaques CSRF
    path: '/',
    maxAge: 7 * 86400,
  })
}

// Vérifie un jeton : retourne le nom d'utilisateur, ou null si invalide/expiré.
export async function verifyToken(token?: string) {
  if (!token) return null
  try {
    return (await jwtVerify(token, secret)).payload.username as string
  } catch {
    return null
  }
}

// Utilisateur connecté (lu depuis le cookie de la requête en cours).
export const getUser = async () => verifyToken((await cookies()).get(SESSION_COOKIE)?.value)
export const destroySession = async () => (await cookies()).delete(SESSION_COOKIE)