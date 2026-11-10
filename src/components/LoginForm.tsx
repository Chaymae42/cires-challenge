'use client' // composant interactif : s'exécute dans le navigateur
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field } from './Field'
import { GoogleIcon } from './GoogleIcon'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault() // évite le rechargement de la page
    // FormData lit tous les champs d'un coup : pas besoin d'un useState par champ.
    const body = Object.fromEntries(new FormData(e.currentTarget)) // { username, password }
    const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(body) })
    if (res.ok) router.push('/')
    else setError((await res.json()).error) // affiche le message renvoyé par l'API
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <h1 className="text-3xl font-semibold">Welcome back</h1>
      <p className="text-sm text-gray-500">Welcome back! Please enter your details.</p>
      {/* Champ "Email" de la maquette, mais type texte car les identifiants sont "muser1"... */}
      <Field label="Email" name="username" placeholder="Enter your email" required />
      <Field label="Password" name="password" type="password" placeholder="••••••••" required />
      <div className="flex justify-between text-sm">
        <label><input type="checkbox" /> Remember for 30 days</label>
        <a href="#" className="font-medium">Forgot password</a>
      </div>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      {/* Bouton principal : s'éclaircit au survol, s'enfonce au clic */}
<button className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white transition hover:bg-slate-700 active:scale-[0.98]">
  Sign in
</button>

{/* Bouton secondaire Google  : fond gris clair au survol */}
<button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border py-2.5 font-medium transition hover:bg-gray-100 active:scale-[0.98]">
   <GoogleIcon /> Sign in with Google
</button>

{/* Lien d'inscription : décoratif, il n'y a pas de page d'inscription dans l'énoncé */}
<p className="pt-2 text-center text-sm text-gray-500">
  Don’t have an account?{' '}
  <button
    type="button"
    className="rounded px-1 font-semibold text-slate-900 underline decoration-2 underline-offset-4 transition
               hover:bg-slate-100 hover:text-indigo-600 hover:decoration-indigo-600
               focus-visible:outline-2 focus-visible:outline-indigo-600 active:scale-95"
  >
    Sign up for free
  </button>
</p>

    </form>
  )
}