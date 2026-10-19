import RevealSection from './RevealSection'
import SectionHeading from './SectionHeading'

// Retained for activation via showCV after an approved CV is supplied.
export default function CvSection() {
  return (
    <RevealSection id="cv" className="grid gap-6 border-t border-white/10 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-12" aria-labelledby="cv-title">
      <SectionHeading id="cv-title" label="07 / CV" title="Curriculum vitae." />
      <div className="surface rounded-2xl border border-white/10 p-6 sm:p-7">
        <p className="text-sm font-medium text-slate-300">Approved CV coming soon</p>
        <p className="mt-3 leading-relaxed text-slate-400">A downloadable document will appear here once supplied and approved.</p>
      </div>
    </RevealSection>
  )
}
