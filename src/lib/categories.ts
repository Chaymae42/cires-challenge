// Source unique de vérité : l'interface et l'API utilisent cette même liste.
// Pour ajouter une catégorie, ajoute un mot ici (c'est aussi le mot cherché sur Unsplash).
export const CATEGORIES = ['all', 'nature', 'architecture', 'travel', 'animals', 'food', 'technology', 'people'] as const
export type Category = (typeof CATEGORIES)[number]

// Valide une valeur venue de l'URL : si elle est inconnue, on retombe sur "all".
// Cela évite d'envoyer n'importe quel texte à l'API Unsplash.
export function parseCategory(value?: string | null): Category {
  return (CATEGORIES as readonly string[]).includes(value ?? '') ? (value as Category) : 'all'
}