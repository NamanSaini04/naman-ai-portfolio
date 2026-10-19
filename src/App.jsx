import PipelineMotif from './components/PipelineMotif'
import { MotionConfig } from 'motion/react'
import HeroIntro from './components/HeroIntro'
import RevealSection from './components/RevealSection'
import ArrowIcon from './components/ArrowIcon'
import ProjectCard from './components/ProjectCard'
import SectionHeading from './components/SectionHeading'
import { githubUrl, projects } from './data/portfolio'
import { certifications, contact, education, experience, skillGroups } from './data/profile'

const currentYear = new Date().getFullYear()
const primaryLink = 'button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-200'
const secondaryLink = 'button-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-cyan-300 focus:p-3 focus:text-slate-950">Skip to content</a>
      <header className="site-header mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-white/10 px-6 py-5 sm:px-8">
        <a href="#main" aria-label="Naman home" className="inline-flex min-h-11 items-center text-xl font-bold tracking-tight">naman<span className="text-cyan-300">.</span></a>
        <nav aria-label="Main navigation" className="flex w-full flex-wrap justify-between gap-x-1 gap-y-1 text-[13px] text-slate-300 sm:w-auto sm:justify-start sm:gap-x-6 sm:text-sm">
          {[['Projects', 'projects'], ['Skills', 'skills'], ['Background', 'experience'], ['CV', 'cv'], ['Contact', 'contact']].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center hover:text-cyan-300">{label}</a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-6 sm:px-8">
        <section className="hero-section grid items-center gap-8 py-12 sm:gap-12 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-16" aria-labelledby="hero-title">
          <HeroIntro primaryLink={primaryLink} secondaryLink={secondaryLink} />
          <aside aria-label="Portfolio focus" className="focus-panel surface rounded-2xl border border-cyan-300/15 p-6 sm:p-8">
            <p className="text-xs tracking-[0.18em] text-slate-400">FROM MODELS TO DECISIONS</p>
            <PipelineMotif />
            <dl className="divide-y divide-white/10">
              {[
                ['Machine Learning', 'Cost-aware fraud detection and model evaluation.'],
                ['AI Engineering', 'Auditable SOC workflows with cited retrieval.'],
                ['Data Engineering', 'Historical job data and validated pipelines.'],
                ['Cybersecurity Analytics', 'Incident trends and response analysis.'],
              ].map(([title, description]) => (
                <div key={title} className="py-3 first:pt-0 last:pb-0">
                  <dt className="font-medium text-slate-100">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate-400">{description}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <RevealSection id="about" className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="about-title">
          <SectionHeading id="about-title" label="01 / ABOUT" title="AI, data & security." />
          <div className="space-y-4 leading-relaxed text-slate-400">
            <p>I build practical projects at the intersection of machine learning, data pipelines, and security analysis — with a focus on clear decisions and traceable evidence.</p>
            <p>Explore the source code, design decisions, and limitations in each project below.</p>
          </div>
        </RevealSection>

        <RevealSection id="projects" className="border-t border-white/10 py-12 sm:py-16" aria-labelledby="projects-title">
          <SectionHeading id="projects-title" label="02 / SELECTED WORK" title="Selected engineering projects." description="Featured implementations in fraud detection and SOC investigation, alongside data engineering and security analytics." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        </RevealSection>

        <RevealSection id="skills" className="border-t border-white/10 py-12 sm:py-16" aria-labelledby="skills-title">
          <SectionHeading id="skills-title" label="03 / TECHNICAL SKILLS" title="Tools behind the work." description="Tools and techniques used in the linked project implementations." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {skillGroups.map(group => (
              <article key={group.title} className="surface rounded-2xl border border-white/10 p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{group.description}</p>
                <ul aria-label={`${group.title} skills`} className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map(skill => <li key={skill} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="experience" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" label="04 / PROFESSIONAL EXPERIENCE" title="Teaching & industry experience." />
          <div className="space-y-5">
            {experience.map(position => (
              <article key={`${position.organisation}-${position.role}`} className="surface rounded-2xl border border-white/10 p-6 sm:p-7">
                <p className="text-sm font-medium text-cyan-300">{position.organisation}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{position.role}</h3>
                <p className="mt-2 text-sm text-slate-400">{position.dates}</p>
                <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-slate-300 marker:text-slate-500">
                  {position.responsibilities.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="education" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="education-title">
          <SectionHeading id="education-title" label="05 / EDUCATION" title="Education & academic status." />
          <div className="space-y-5">
            {education.map(qualification => (
              <article key={qualification.course} className="surface rounded-2xl border border-cyan-300/20 p-6 sm:p-7">
                <p className="text-sm font-medium text-cyan-300">{qualification.institution}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{qualification.course}</h3>
                <p className="mt-3 text-sm text-slate-400">{qualification.dates}</p>
                {qualification.note && <p className="mt-4 text-sm leading-relaxed text-slate-300">{qualification.note}</p>}
              </article>
            ))}
          </div>
        </RevealSection>

        <RevealSection id="certifications" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="certifications-title">
          <SectionHeading id="certifications-title" label="06 / CERTIFICATIONS" title="Certifications & courses." />
          <ul className="surface divide-y divide-white/10 rounded-2xl border border-white/10 px-6 sm:px-7">
            {certifications.map(title => <li key={title} className="py-5 leading-relaxed text-slate-300">{title}</li>)}
          </ul>
        </RevealSection>

        <RevealSection id="cv" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="cv-title">
          <SectionHeading id="cv-title" label="07 / CV" title="Curriculum vitae." />
          <div className="surface rounded-2xl border border-white/10 p-6 sm:p-7">
            <p className="text-sm font-medium text-slate-300">Approved CV coming soon</p>
            <p className="mt-3 leading-relaxed text-slate-400">A downloadable document will appear here once supplied and approved.</p>
          </div>
        </RevealSection>

        <RevealSection id="contact" className="border-t border-white/10 py-12 sm:py-16" aria-labelledby="contact-title">
          <SectionHeading id="contact-title" label="08 / CONTACT" title="Let’s start a conversation." description="Get in touch by email, connect on LinkedIn, or explore my work on GitHub." />
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className={`${primaryLink} break-all`}>{contact.email} <ArrowIcon /></a>
            <a href={contact.linkedin} className={secondaryLink}>LinkedIn <ArrowIcon /></a>
            <a href={githubUrl} className={secondaryLink}>GitHub <ArrowIcon /></a>
          </div>
        </RevealSection>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-7 text-sm text-slate-400 sm:px-8"><span>© {currentYear} Naman Saini</span><span>AI · Data · Security</span></footer>
    </MotionConfig>
  )
}
