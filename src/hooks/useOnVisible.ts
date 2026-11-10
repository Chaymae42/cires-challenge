
import { useEffect, useRef } from 'react'

// Hook générique : exécute callback quand l'élément devient visible.
export function useOnVisible(callback: () => void, watch: unknown) {
  const ref = useRef<HTMLDivElement>(null)
  const latest = useRef(callback)

  // Met à jour la référence après chaque changement de callback.
  useEffect(() => {
    latest.current = callback
  }, [callback])

  // Observe la visibilité de l'élément.
  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          latest.current()
        }
      },
      { rootMargin: '300px' },  // déclenche un peu avant que l'élément soit réellement visible
    )

    observer.observe(element)

    return () => observer.disconnect() // nettoyage
  }, [watch])  // ré-observe après chaque chargement : si l'écran est encore vide, on recharge

  return ref
}
