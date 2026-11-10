import { Level } from 'level'

// Type générique pour les données stockées dans la base
type DatabaseValue = Record<string, unknown>

// En développement, Next recharge les modules à chaque modification.
// On garde donc l'instance dans globalThis pour n'ouvrir la base qu'UNE fois
// (pattern Singleton) : Level verrouille son dossier et plante sinon.
const g = globalThis as unknown as { db?: Level<string, DatabaseValue> }

// `??=` : on ne crée la base que si elle n'existe pas encore.
export const db = (g.db ??= new Level<string, DatabaseValue>('./data', { valueEncoding: 'json' }))