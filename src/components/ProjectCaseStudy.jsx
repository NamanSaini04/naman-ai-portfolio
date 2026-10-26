import { useEffect } from 'react'
import ArrowIcon from './ArrowIcon'
import { caseStudies } from '../data/caseStudies'
import { projectMedia } from '../data/projectMedia'

const primary = 'button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200'
const secondary = 'button-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10'

export default function ProjectCaseStudy({ project }) {
  const details = project && caseStudies[project.id]
  const media = project && projectMedia[project.id]

  useEffect(() => {
    if (!project || !details) return undefined
    const originalTitle = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const originalCanonical = canonical?.getAttribute('href')
    document.title = `${project.title} | Naman Saini — Project Case Study`
    if (canonical) canonical.setAttribute('href', `https://naman-saini.com/projects/${project.id}`)
    return () => {
      document.title = originalTitle
      if (canonical && originalCanonical) canonical.setAttribute('href', originalCanonical)
    }
  }, [project, details])

  if (!project || !details) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-20">
        <p className="text-sm uppercase tracking-widest text-cyan-300">Project unavailable</p>
        <h1 className="mt-4 text-3xl font-bold">This case study could not be found.</h1>
        <a className={`${primary} mt-7 w-fit`} href="/#projects">Back to projects <ArrowIcon /></a>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <a href="#case-study-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cyan-300 focus:p-3 focus:text-slate-950">Skip to case study</a>
      <header className="site-header mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
        <a className="inline-flex min-h-11 items-center text-xl font-bold tracking-tight" href="/" aria-label="Naman Saini portfolio home">naman<span className="text-cyan-300">.</span></a>
        <nav aria-label="Case study navigation" className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <a className="inline-flex min-h-11 items-center hover:text-cyan-300" href="/#projects">All projects</a>
          <a className="inline-flex min-h-11 items-center hover:text-cyan-300" href="/#contact">Contact</a>
        </nav>
      </header>

      <main id="case-study-main" tabIndex={-1} className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pt-14">
        <a href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 hover:text-cyan-300">← Back to all projects</a>

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{project.category}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl">{project.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{tech}</span>
              ))}
            </div>
          </div>
          <aside className="surface rounded-2xl border border-cyan-300/20 p-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">Project status</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{project.status}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{details.kicker}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className={secondary} href={project.github} target="_blank" rel="noopener noreferrer">GitHub code <ArrowIcon /></a>
            </div>
          </aside>
        </div>

        <section aria-labelledby="outcome-title" className="mt-12 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.035] p-5 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300">Results dashboard</p>
              <h2 id="outcome-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Outcomes at a glance.</h2>
            </div>
            {details.dashboard && (
              <a className={primary} href={details.dashboard} target="_blank" rel="noopener noreferrer" aria-label={`Open published external dashboard for ${project.title}`}>View Dashboard <ArrowIcon /></a>
            )}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {details.metrics.map((metric) => (
              <div key={metric.label} className="surface rounded-2xl border border-white/10 p-5">
                <p className="text-3xl font-bold tabular-nums tracking-tight text-cyan-300">{metric.value}</p>
                <h3 className="mt-2 text-sm font-semibold text-slate-100">{metric.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{metric.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-slate-300">{details.outcome}</p>

          {details.dashboard ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <div>
                <p className="text-sm font-semibold text-slate-100">{details.dashboardType}</p>
                <p className="mt-1 text-sm text-slate-400">{details.dashboardLabel}</p>
                <p className="mt-1 text-xs text-slate-400">External URL documented in the project repository. Live availability may vary.</p>
              </div>
              <a className="text-sm font-medium text-cyan-300 underline-offset-4 hover:underline" href={details.dashboard} target="_blank" rel="noopener noreferrer">Open interactive dashboard ↗</a>
            </div>
          ) : (
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-slate-100">{details.dashboardLabel}</p>
              <p className="mt-2 text-sm text-slate-400">There is no verified public dashboard URL for this project yet. To launch it locally after following the repository's setup instructions:</p>
              <code className="mt-3 block w-fit max-w-full overflow-auto rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-cyan-200">{details.localCommand}</code>
            </div>
          )}
        </section>

        {media && (
          <section aria-labelledby="evidence-title" className="mt-12">
            <h2 id="evidence-title" className="text-2xl font-semibold tracking-tight">Visual evidence</h2>
            <figure className="surface mt-5 rounded-2xl border border-white/10 p-4 sm:p-6">
              <p className="mb-4 text-sm font-semibold text-slate-200">{media.label}</p>
              <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${media.label}`}>
                <span className="block overflow-hidden rounded-xl bg-slate-50 p-3">
                  <img src={media.thumbnail} srcSet={media.srcSet} sizes="(min-width: 1024px) 900px, calc(100vw - 96px)" width={media.width} height={media.height} loading="lazy" decoding="async" alt={media.alt} className="mx-auto h-auto max-h-[480px] w-full object-contain" />
                </span>
              </a>
              <figcaption className="mt-3 text-sm leading-relaxed text-slate-400">{media.caption} <a className="text-cyan-300 hover:underline" href={media.source} target="_blank" rel="noopener noreferrer">View source image</a></figcaption>
            </figure>
          </section>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <section aria-labelledby="challenge-title" className="surface rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-cyan-300">01 / Context</p>
            <h2 id="challenge-title" className="mt-2 text-2xl font-semibold">The problem</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{details.challenge}</p>
          </section>
          <section aria-labelledby="method-title" className="surface rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-cyan-300">02 / Approach</p>
            <h2 id="method-title" className="mt-2 text-2xl font-semibold">How it was built</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-slate-300 marker:text-cyan-300">
              {details.method.map((step) => <li key={step}>{step}</li>)}
            </ul>
          </section>
          <section aria-labelledby="insights-title" className="surface rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-cyan-300">03 / Interpretation</p>
            <h2 id="insights-title" className="mt-2 text-2xl font-semibold">What the results tell us</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-slate-300 marker:text-cyan-300">
              {details.insights.map((insight) => <li key={insight}>{insight}</li>)}
            </ul>
          </section>
          <section aria-labelledby="limits-title" className="surface rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-widest text-amber-200">04 / Boundaries</p>
            <h2 id="limits-title" className="mt-2 text-2xl font-semibold">Limitations and next steps</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{details.caveat}</p>
          </section>
        </div>

        <section className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-8" aria-label="Project references">
          <div>
            <h2 className="text-lg font-semibold">Explore the evidence.</h2>
            <p className="mt-1 text-sm text-slate-400">Methodology, reproducibility and additional figures live in the project repository.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className={secondary} href={details.sourceEvidence} target="_blank" rel="noopener noreferrer">Read project findings <ArrowIcon /></a>
            <a className={secondary} href={project.github} target="_blank" rel="noopener noreferrer">Source code <ArrowIcon /></a>
          </div>
        </section>
        <a href="/#projects" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan-300 hover:underline">← All project case studies</a>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-7 text-sm text-slate-400 sm:px-8"><span>© {new Date().getFullYear()} Naman Saini</span><span>AI · Data · Security</span></footer>
    </div>
  )
}
