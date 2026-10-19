export default function SectionHeading({ id, label, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium tracking-[0.18em] text-lime-300">{label}</p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-stone-400">{description}</p>}
    </div>
  )
}
