// Table de règles
const ACCOUNTS: Record<string, { password: string; blocked?: boolean }> = {
  muser1: { password: 'mpassword1' },
  muser2: { password: 'mpassword2' },
  muser3: { password: 'mpassword3', blocked: true }, // identifiants valides mais compte bloqué
}

// Retourne soit { username } (succès), soit { error } (échec).
export function authenticate(username: string, password: string) {
  const account = ACCOUNTS[username]
  // Compte inconnu OU mauvais mot de passe : même message (on ne révèle pas lequel).
  if (!account || account.password !== password) return { error: 'Informations de connexion invalides' }
  if (account.blocked) return { error: 'Ce compte a été bloqué.' }
  return { username }
}