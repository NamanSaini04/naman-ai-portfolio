import ArrowIcon from './components/ArrowIcon'
import ProjectCard from './components/ProjectCard'
import { githubUrl, projects } from './data/portfolio'

const currentYear = new Date().getFullYear()

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-lime-300 focus:p-3 focus:text-stone-950">Skip to content</a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-8">
        <a href="#main" aria-label="Naman home" className="text-xl font-bold tracking-tight">naman<span className="text-lime-300">.</span></a>
        <nav aria-label="Main navigation" className="flex gap-6 text-sm text-stone-300">
          <a href="#about" className="inline-flex min-h-11 items-center gap-1 hover:text-lime-300">About</a>
          <a href="#projects" className="inline-flex min-h-11 items-center gap-1 hover:text-lime-300">Projects</a>
          <a href="#contact" className="inline-flex min-h-11 items-center gap-1 hover:text-lime-300">Contact <ArrowIcon /></a>
        </nav>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-6">
        <section className="py-24 sm:py-32" aria-labelledby="hero-title">
          <p className="mb-8 text-sm tracking-[0.2em] text-lime-300">HELLO, I’M NAMAN SAINI</p>
          <h1 id="hero-title" className="max-w-4xl text-5xl leading-[1.08] font-semibold tracking-tight sm:text-7xl lg:text-8xl">Curiosity meets<br /><span className="text-stone-500">creative code.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-400">Welcome to my corner of the web. A place to explore ideas, build for the web, and document what comes next.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="rounded-full bg-lime-300 px-6 py-3 font-medium text-stone-950 transition-colors hover:bg-lime-200">Explore projects ↓</a>
            <a href={githubUrl} className="rounded-full border border-white/20 px-6 py-3 transition-colors hover:bg-white/10">Find me on GitHub <ArrowIcon /></a>
          </div>
        </section>
        <section id="about" className="grid gap-8 border-t border-white/10 py-20 md:grid-cols-2" aria-labelledby="about-title">
          <h2 id="about-title" className="text-3xl font-semibold tracking-tight">Always a work in progress.</h2>
          <div className="space-y-6 leading-relaxed text-stone-400">
            <p>My projects explore AI, Data Engineering, and security analytics — from cost-aware fraud detection to auditable SOC investigation workflows and historical job data pipelines.</p>
            <p>Built with React, Vite, and Tailwind CSS. Made to evolve, one idea at a time.</p>
          </div>
        </section>
        <section id="projects" className="border-t border-white/10 py-20" aria-labelledby="projects-title">
          <p className="text-xs tracking-widest text-lime-300">SELECTED WORK</p>
          <h2 id="projects-title" className="mt-4 text-3xl font-semibold tracking-tight">Projects with purpose.</h2>
          <p className="mt-4 text-stone-400">Explore documented implementations, current progress, and the decisions behind each project.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
        </section>
        <section id="contact" className="border-t border-white/10 py-24" aria-labelledby="contact-title">
          <p className="text-xs tracking-widest text-lime-300">LET’S CONNECT</p>
          <h2 id="contact-title" className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Good things start with hello.</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-stone-400">Explore my repositories and connect with me on GitHub.</p>
          <a href={githubUrl} className="mt-8 inline-block rounded-full bg-lime-300 px-6 py-3 font-medium text-stone-950 hover:bg-lime-200">Visit my GitHub <ArrowIcon /></a>
        </section>
      </main>
      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 border-t border-white/10 px-6 py-8 text-sm text-stone-400"><span>© {currentYear} Naman Saini</span><span>Built with curiosity.</span></footer>
    </>
  )
}
