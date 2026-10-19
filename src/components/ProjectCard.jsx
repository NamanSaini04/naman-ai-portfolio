import { motion, useReducedMotion } from 'motion/react'
import ArrowIcon from './ArrowIcon'
import { projectMedia } from '../data/projectMedia'

export default function ProjectCard({ project, index }) {
  const reduceMotion = useReducedMotion()
  const media = projectMedia[project.id]
  return (
    <motion.article whileHover={reduceMotion ? undefined : { y: -3 }} transition={{ duration: 0.25, ease: 'easeOut' }} aria-labelledby={`${project.id}-title`} className={`project-card surface grid min-w-0 gap-5 rounded-2xl border p-5 focus-within:border-cyan-300/60 hover:border-cyan-300/40 sm:p-7 ${project.featured ? 'border-cyan-300/30 md:col-span-2 lg:grid-cols-[1.05fr_1fr] lg:gap-8' : 'border-white/10'}`}>
      <div className="flex min-w-0 flex-col">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <span className={project.featured ? 'font-medium tracking-widest text-cyan-300' : ''}>{project.featured ? 'FEATURED PROJECT' : `0${index + 1}`}</span>
          <span className={`rounded-full border px-3 py-1 ${project.status.startsWith('In Progress') ? 'border-amber-300/30 text-amber-200' : 'border-white/15 text-slate-300'}`}>{project.status}</span>
        </div>
        <p className="text-[11px] leading-relaxed tracking-widest text-slate-400">{project.category}</p>
        <h3 id={`${project.id}-title`} className="mt-2 text-2xl leading-tight font-semibold tracking-tight sm:text-[1.65rem]">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{project.description}</p>
        <ul aria-label={`${project.title} technologies`} className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.map(technology => <li key={technology} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs leading-relaxed text-slate-300">{technology}</li>)}
        </ul>
        {project.disclosure && <p className="mt-4 text-sm leading-relaxed text-slate-300"><span className="font-medium text-cyan-300">Data note: </span>{project.disclosure}</p>}
        {project.planned && <p className="mt-4 text-sm leading-relaxed text-slate-300"><span className="font-medium text-amber-200">Planned: </span>{project.planned}</p>}
        <div className="mt-auto pt-4">
          <details className="border-t border-white/10">
            <summary className="cursor-pointer py-3 text-sm text-slate-300 hover:text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">Implementation details<span className="sr-only"> for {project.title}</span></summary>
            <p className="pb-3 text-sm leading-relaxed text-slate-400">{project.details}</p>
            {project.statusNote && <p className="pb-3 text-xs leading-relaxed text-slate-400">{project.statusNote}</p>}
          </details>
          <a href={project.github} aria-label={`View ${project.title} on GitHub`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan-300 hover:underline">View on GitHub <ArrowIcon /></a>
        </div>
      </div>
      {media && (
        <figure className="min-w-0 self-center rounded-xl border border-white/10 bg-slate-950/30 p-3 sm:p-4">
          <p className="mb-3 text-xs font-medium text-slate-300">{media.label}</p>
          <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${media.label.toLowerCase()} (opens in a new tab)`} className="block overflow-hidden rounded-lg border border-white/10 bg-white">
            <img src={media.src} width={media.width} height={media.height} loading="lazy" decoding="async" alt={media.alt} className="h-auto max-h-72 w-full object-contain" />
          </a>
          <figcaption className="mt-3 text-xs leading-relaxed text-slate-400">
            {media.caption}
            <span className="mt-2 flex flex-wrap items-center justify-between gap-x-3">
              <span>Tap image to enlarge</span>
              <a href={media.source} aria-label={`View original ${media.label.toLowerCase()} in the project repository`} className="inline-flex min-h-11 items-center gap-1 text-cyan-300 hover:underline">Repository source <ArrowIcon /></a>
            </span>
          </figcaption>
        </figure>
      )}
    </motion.article>
  )
}
