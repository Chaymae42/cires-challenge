# Cires Challenge : Galerie Unsplash (Next.js)

Application web développée avec **Next.js** pour le challenge technique (Option 2) :
s'authentifier, parcourir des photos Unsplash et liker ses photos préférées.

## Fonctionnalités

- **Authentification** : page de connexion reproduisant la maquette (formulaire, carte de témoignage avec carrousel), avec les 4 scénarios demandés
- **Galerie de photos** via l'API Unsplash, avec **scroll infini**
- **Filtre par catégorie** (onglets : All, Nature, Architecture, Travel…)
- **Likes** : un cœur sous chaque photo, rouge et rempli quand la photo est déjà likée. Les likes sont propres à chaque utilisateur et conservés après rechargement
- Icône utilisateur avec bulle affichant le nom, et bouton de déconnexion
- Pages protégées : un visiteur non connecté est redirigé vers `/login`

## Prérequis

- Node.js 20 ou plus
- Une clé d'accès Unsplash (compte développeur gratuit sur https://unsplash.com/developers)

## Installation et lancement

```bash
git clone https://github.com/Chaymae42/cires-challenge.git
cd cires-challenge
npm install
```

Crée le fichier `.env.local` à partir du modèle :

```bash
# macOS / Linux
cp .env.example .env.local
# Windows (PowerShell)
copy .env.example .env.local
```

Renseigne les deux variables dans `.env.local` :

| Variable | Description |
|---|---|
| `UNSPLASH_ACCESS_KEY` | Access Key de ton application Unsplash |
| `SESSION_SECRET` | Chaîne aléatoire d'au moins 32 caractères (signe le cookie de session) |

Pour générer un secret :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Puis lance l'application :

```bash
npm run dev
```

Ouvre http://localhost:3000.

## Comptes de test

| Identifiant | Mot de passe | Résultat |
|---|---|---|
| `muser1` | `mpassword1` | Connexion réussie |
| `muser2` | `mpassword2` | Connexion réussie |
| `muser3` | `mpassword3` | Erreur : « Ce compte a été bloqué. » |
| autre | autre | Erreur : « Informations de connexion invalides » |

## Choix techniques

- **Next.js (App Router)** et **TypeScript**, style avec **Tailwind CSS**
- **Level** (base clé-valeur imposée) pour stocker les likes, dans le dossier local `data/`
- **Session** : cookie `httpOnly` contenant un jeton JWT signé (`jose`)
- **Unsplash** : appels faits côté serveur, la clé n'est jamais exposée au navigateur. Réponses mises en cache 5 minutes pour respecter le quota de l'API (environ 50 requêtes par heure en mode démo)

## Architecture

```
src/
├─ middleware.ts          Protège les pages (redirige vers /login)
├─ lib/
│  ├─ db.ts               Connexion Level (Singleton)
│  ├─ likes.ts            Accès aux likes (Repository)
│  ├─ auth.ts             Règles des comptes de test
│  ├─ session.ts          Cookie de session signé
│  ├─ http.ts             withAuth : vérifie la session et gère les erreurs (Decorator)
│  ├─ unsplash.ts         Appel à l'API Unsplash (Adapter)
│  └─ categories.ts       Liste des catégories (source unique)
├─ hooks/
│  ├─ usePhotos.ts        Chargement paginé et likes (mise à jour optimiste)
│  └─ useOnVisible.ts     Détecte quand un élément devient visible (scroll infini)
├─ components/            Composants d'interface réutilisables
└─ app/
   ├─ login/              Page de connexion
   ├─ page.tsx            Galerie
   └─ api/                Routes : login, photos, likes
```

### Design patterns utilisés

| Pattern | Fichier | Rôle |
|---|---|---|
| Singleton | `lib/db.ts` | Une seule connexion Level |
| Repository | `lib/likes.ts` | Isole l'accès aux données |
| Adapter | `lib/unsplash.ts` | Convertit la réponse d'Unsplash en modèle simple |
| Decorator | `lib/http.ts` | Authentification et erreurs communes aux routes |
| Custom hooks | `hooks/` | Logique séparée de l'affichage |

## Remarques

- Level écrit ses données dans le dossier local `data/` : l'application est conçue pour un lancement **en local**. Un hébergement serverless ne conserverait pas les likes.
- Les photos appartiennent à leurs auteurs et proviennent d'Unsplash.