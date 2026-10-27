import RevealSection from './RevealSection'
import SectionHeading from './SectionHeading'
import ArrowIcon from './ArrowIcon'
import { cvPdfUrl } from '../data/siteConfig'

export default function CvSection() {
  return (
    <RevealSection id="cv" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="cv-title">
      <SectionHeading id="cv-title" label="07 / CV" title="Curriculum vitae." />
      <div className="surface rounded-2xl border border-white/10 p-6 sm:p-7">
        <p className="text-sm font-medium text-cyan-300">AI and Data Professional | Python, SQL, Machine Learning and Analytics</p>
        <p className="mt-3 leading-relaxed text-slate-300">
          Read or download my two-page UK master CV, covering AI and machine learning, data analytics, technical skills, education and experience.
        </p>
        <p className="mt-3 text-sm text-slate-400">PDF document · 2 pages</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={cvPdfUrl} target="_blank" rel="noopener noreferrer" className="button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-medium text-slate-950 hover:bg-cyan-200" aria-label="Open Naman Saini CV as a PDF in a new tab">
            View CV <ArrowIcon />
          </a>
          <a href={cvPdfUrl} download="Naman_Saini_UK_Master_CV.pdf" className="button-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium hover:bg-white/10" aria-label="Download Naman Saini CV PDF">
            Download PDF <ArrowIcon />
          </a>
        </div>
      </div>
    </RevealSection>
  )
}
