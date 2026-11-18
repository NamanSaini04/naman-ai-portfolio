import { useEffect } from 'react'
import ArrowIcon from './ArrowIcon'
import { contact } from '../data/profile'
import { services } from '../data/services'
import { portraitSrc } from '../data/profilePortrait'

const card = 'surface rounded-2xl border border-white/10 p-6 sm:p-7'

function enquiry(subject) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`
}

export function ServicesOverview() {
  return (
    <section id="services" aria-labelledby="services-overview-title" className="border-t border-white/10 py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h2 id="services-overview-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">What I can help with</h2>
        <a href="/services" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan-300 hover:underline">
          View all services <ArrowIcon />
        </a>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {services.map(service => (
          <a key={service.id} href={`/services#${service.id}`} className={`group flex flex-col transition-colors hover:border-cyan-300/50 ${card}`}>
            <h3 className="text-xl font-semibold tracking-tight text-slate-100">{service.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-slate-300">{service.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 group-hover:underline">
              Learn more <ArrowIcon />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default function ServicesPage({ primaryLink, secondaryLink }) {
  useEffect(() => {
    const originalTitle = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const originalCanonical = canonical?.getAttribute('href')
    document.title = 'AI & Data Services | Naman Saini'
    canonical?.setAttribute('href', 'https://naman-saini.com/services')
    const section = document.getElementById(window.location.hash.slice(1))
    section?.scrollIntoView()
    return () => {
      document.title = originalTitle
      if (originalCanonical) canonical?.setAttribute('href', originalCanonical)
    }
  }, [])

  return (
    <>
      <section aria-labelledby="services-title" className="py-12 sm:py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <img src={portraitSrc} alt="Portrait of Naman Saini" width="96" height="96" className="size-24 shrink-0 rounded-full bg-slate-100 object-cover object-top" />
          <div>
            <h1 id="services-title" className="text-4xl font-semibold tracking-tight sm:text-6xl">AI &amp; Data Services</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">I build small projects around a clear problem, from finding answers in documents to making a recurring report easier to refresh.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className={primaryLink}>Discuss a project <ArrowIcon /></a>
              <a href="/#projects" className={secondaryLink}>See portfolio projects</a>
            </div>
          </div>
        </div>
      </section>
      <div className="grid gap-5 border-t border-white/10 py-9 lg:grid-cols-3">
        {services.map(service => (
          <article key={service.id} id={service.id} className={`flex scroll-mt-8 flex-col ${card}`}>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">{service.title}</h2>
            <p className="mt-3 leading-relaxed text-slate-300">{service.details}</p>
            <h3 className="mt-6 font-semibold text-slate-100">What we could build</h3>
            <ul className="mt-2 flex-1 list-disc space-y-2 pl-5 leading-relaxed text-slate-300 marker:text-cyan-300">
              {service.examples.map(example => <li key={example}>{example}</li>)}
            </ul>
            <a href={enquiry(service.title + ' enquiry')} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-cyan-300 hover:underline">
              {service.action} <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
      <section id="contact" aria-labelledby="services-contact-title" className="border-t border-white/10 py-12">
        <h2 id="services-contact-title" className="text-3xl font-semibold tracking-tight">Tell me what you’re working on</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">Share what you do today, what data you have and what you’d like to improve. We can use that to define a first project.</p>
        <a className={`mt-6 ${primaryLink}`} href={enquiry('AI and data project enquiry')}>Email me <ArrowIcon /></a>
      </section>
    </>
  )
}
