import ArrowIcon from './ArrowIcon'

export default function ProjectCard({ project, index }) {
  return (
    <article aria-labelledby={`${project.id}-title`} className={`flex min-w-0 flex-col rounded-2xl border bg-white/[0.03] p-6 transition-colors focus-within:border-lime-300/60 hover:border-lime-300/40 sm:p-7 ${project.featured ? 'border-lime-300/30' : 'border-white/10'}`}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-400">
        <span>{project.featured ? 'FEATURED' : `0${index + 1}`}</span>
        <span className={`rounded-full border px-3 py-1 text-xs ${project.status.startsWith('In Progress') ? 'border-amber-300/30 text-amber-200' : 'border-white/15 text-stone-300'}`}>{project.status}</span>
      </div>
      <p className="text-xs tracking-widest text-lime-300">{project.category}</p>
      <h3 id={`${project.id}-title`} className="mt-3 text-2xl font-semibold">{project.title}</h3>
      <p className="mt-4 leading-relaxed text-stone-400">{project.description}</p>
      <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map(technology => <li key={technology} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs leading-relaxed text-stone-300">{technology}</li>)}
      </ul>
      {project.disclosure && <p className="mt-5 text-sm leading-relaxed text-stone-300"><span className="font-medium text-lime-300">Data note: </span>{project.disclosure}</p>}
      {project.planned && <p className="mt-5 text-sm leading-relaxed text-stone-300"><span className="font-medium text-amber-200">Planned: </span>{project.planned}</p>}
      {project.statusNote && <p className="mt-5 text-xs leading-relaxed text-stone-400">{project.statusNote}</p>}
      <div className="mt-auto pt-6">
        <details className="border-t border-white/10 pt-2">
          <summary className="cursor-pointer py-3 text-sm text-stone-300 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300">Implementation details<span className="sr-only"> for {project.title}</span></summary>
          <p className="pb-4 text-sm leading-relaxed text-stone-400">{project.details}</p>
        </details>
        <a href={project.github} aria-label={`View ${project.title} on GitHub`} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-lime-300 hover:underline">View on GitHub <ArrowIcon /></a>
      </div>
    </article>
  )
}
