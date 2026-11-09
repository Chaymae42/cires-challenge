import type { NextConfig } from 'next'

const config: NextConfig = {
  // Level contient du code natif : on demande à Next de ne pas le "bundler".
  serverExternalPackages: ['level', 'classic-level'],
  // next/image n'accepte que les domaines déclarés ici.
  images: { remotePatterns: [{ hostname: 'images.unsplash.com' }] },
}
export default config