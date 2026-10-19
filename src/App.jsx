import ArrowIcon from './components/ArrowIcon'
import ProjectCard from './components/ProjectCard'
import SectionHeading from './components/SectionHeading'
import { githubUrl, projects } from './data/portfolio'
import { certifications, contact, education, experience, skillGroups } from './data/profile'

const currentYear = new Date().getFullYear()
const primaryLink = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-sm font-medium text-stone-950 transition-colors hover:bg-lime-200'
const secondaryLink = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-lime-300 focus:p-3 focus:text-stone-950">Skip to content</a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 border-b border-white/10 px-6 py-5 sm:px-8">
        <a href="#main" aria-label="Naman home" className="inline-flex min-h-11 items-center text-xl font-bold tracking-tight">naman<span className="text-lime-300">.</span></a>
        <nav aria-label="Main navigation" className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-300 sm:gap-x-6">
          {[['Projects', 'projects'], ['Skills', 'skills'], ['Background', 'experience'], ['CV', 'cv'], ['Contact', 'contact']].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center hover:text-lime-300">{label}</a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-6 sm:px-8">
        <section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-16" aria-labelledby="hero-title">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-lime-300">NAMAN SAINI / AI & DATA PORTFOLIO</p>
            <h1 id="hero-title" className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-[4.25rem]">Engineering AI.<br /><span className="text-stone-400">Making data useful.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">AI Engineering, Machine Learning, Data Engineering, and Cybersecurity Analytics — explored through practical, documented projects.</p>
            <p className="mt-5 text-sm leading-relaxed text-stone-400">MSc studies in Artificial Intelligence · University of Bath</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={primaryLink}>Explore my work <ArrowIcon /></a>
              <a href="#cv" className={secondaryLink}>CV & background</a>
            </div>
          </div>
          <aside aria-label="Portfolio focus" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-xs tracking-[0.18em] text-stone-400">FROM MODELS TO DECISIONS</p>
            <dl className="mt-6 divide-y divide-white/10">
              {[
                ['Machine Learning', 'Cost-aware fraud detection and model evaluation.'],
                ['AI Engineering', 'Auditable SOC workflows with cited retrieval.'],
                ['Data Engineering', 'Historical job data and validated pipelines.'],
                ['Cybersecurity Analytics', 'Incident trends and response analysis.'],
              ].map(([title, description]) => (
                <div key={title} className="py-4 first:pt-0 last:pb-0">
                  <dt className="font-medium text-stone-100">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-stone-400">{description}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </section>

        <section id="about" className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="about-title">
          <SectionHeading id="about-title" label="01 / ABOUT" title="Practical work. Clear evidence." />
          <div className="space-y-4 leading-relaxed text-stone-400">
            <p>My work connects machine learning, reliable data pipelines, and security analysis. The projects below show how I approach model decisions, investigation workflows, and data quality.</p>
            <p>Each project links to its implementation, with current status and limitations made explicit. Synthetic security data and planned features are clearly identified.</p>
          </div>
        </section>

        <section id="projects" className="border-t border-white/10 py-16 sm:py-20" aria-labelledby="projects-title">
          <SectionHeading id="projects-title" label="02 / SELECTED WORK" title="Projects with purpose." description="Explore documented implementations, current progress, and the decisions behind each project." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        </section>

        <section id="skills" className="border-t border-white/10 py-16 sm:py-20" aria-labelledby="skills-title">
          <SectionHeading id="skills-title" label="03 / TECHNICAL SKILLS" title="A toolkit grounded in projects." description="Languages, tools, and techniques evidenced in the linked repositories. No proficiency ratings or years of experience implied." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {skillGroups.map(group => (
              <article key={group.title} className="rounded-2xl border border-white/10 p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{group.description}</p>
                <ul aria-label={`${group.title} skills`} className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map(skill => <li key={skill} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-stone-300">{skill}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-8 border-t border-white/10 py-16 sm:py-20 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" label="04 / PROFESSIONAL EXPERIENCE" title="Experience & contribution." />
          <div className="space-y-5">
            {experience.map(position => (
              <article key={`${position.organisation}-${position.role}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <p className="text-sm font-medium text-lime-300">{position.organisation}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{position.role}</h3>
                <p className="mt-2 text-sm text-stone-400">{position.dates}</p>
                <ul className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-stone-300 marker:text-stone-500">
                  {position.responsibilities.map(item => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="grid gap-8 border-t border-white/10 py-16 sm:py-20 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="education-title">
          <SectionHeading id="education-title" label="05 / EDUCATION" title="An academic foundation in AI." />
          <div className="space-y-5">
            {education.map(qualification => (
              <article key={qualification.course} className="rounded-2xl border border-lime-300/25 bg-white/[0.03] p-6 sm:p-7">
                <p className="text-sm font-medium text-lime-300">{qualification.institution}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{qualification.course}</h3>
                <p className="mt-3 text-sm text-stone-400">{qualification.dates}</p>
                {qualification.note && <p className="mt-4 text-sm leading-relaxed text-stone-300">{qualification.note}</p>}
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="grid gap-8 border-t border-white/10 py-16 sm:py-20 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="certifications-title">
          <SectionHeading id="certifications-title" label="06 / CERTIFICATIONS" title="Continued learning." />
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 px-6 sm:px-7">
            {certifications.map(title => <li key={title} className="py-5 leading-relaxed text-stone-300">{title}</li>)}
          </ul>
        </section>

        <section id="cv" className="grid gap-8 border-t border-white/10 py-16 sm:py-20 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="cv-title">
          <SectionHeading id="cv-title" label="07 / CV" title="The full picture." />
          <div className="rounded-2xl border border-white/10 p-6 sm:p-7">
            <h3 className="text-xl font-medium">Curriculum vitae</h3>
            <p className="mt-3 leading-relaxed text-stone-400">A downloadable CV will be added once an approved document is available.</p>
            <p className="mt-5 inline-block rounded-full border border-white/15 px-4 py-2 text-sm text-stone-400">CV not yet available</p>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-16 sm:py-20" aria-labelledby="contact-title">
          <SectionHeading id="contact-title" label="08 / CONTACT" title="Let’s start a conversation." description="Get in touch by email, connect on LinkedIn, or explore my work on GitHub." />
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className={`${primaryLink} break-all`}>{contact.email} <ArrowIcon /></a>
            <a href={contact.linkedin} className={secondaryLink}>LinkedIn <ArrowIcon /></a>
            <a href={githubUrl} className={secondaryLink}>GitHub <ArrowIcon /></a>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-7 text-sm text-stone-400 sm:px-8"><span>© {currentYear} Naman Saini</span><span>AI · Data · Security</span></footer>
    </>
  )
}
