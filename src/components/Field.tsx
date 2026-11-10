// Champ de formulaire réutilisable : label + input stylé.
// `...props` transmet tous les attributs (name, type, placeholder...) à l'input.
export function Field({ label, ...props }: { label: string } & React.ComponentProps<'input'>) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input {...props} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal" />
    </label>
  )
}