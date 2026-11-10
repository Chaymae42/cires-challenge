'use client' // composant interactif : s'exécute dans le navigateur
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Field } from './Field'

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
      <button className="w-full rounded-lg bg-slate-900 py-2.5 font-medium text-white">Sign in</button>
      {/* Bouton purement visuel : la maquette l'affiche, l'énoncé ne demande pas Google OAuth */}
      <button type="button" className="w-full rounded-lg border py-2.5 font-medium">Sign in with Google</button>
    </form>
  )
}