import { Fragment, useState } from 'react'
import { projects } from '../data/portfolio'
import { evidenceGroups, evidenceLabels, evidenceProjectIds, skillEvidence } from '../data/skillEvidence'

const projectNames = {
  'fraud-detection': 'Fraud Detection',
  'ecommerce-sales': 'E-commerce',
  'incident-analytics': 'Incident Analytics',
  'airline-delay': 'Airline Delay',
  'soc-copilot': 'SOC Copilot',
  'job-market': 'Job Market DE',
}

const cellClass = {
  0: 'border border-white/[0.055] bg-[#152337] text-slate-500',
  1: 'border border-cyan-300/35 bg-cyan-800/65 text-cyan-100 hover:border-cyan-200 hover:bg-cyan-700',
  2: 'border border-cyan-100/60 bg-cyan-300 text-[#082235] hover:border-white hover:bg-cyan-200',
}

const cellLabel = {
  0: '–',
  1: 'S',
  2: 'C',
}

export default function SkillsHeatmap() {
  const [activeGroup, setActiveGroup] = useState('All')
  const rows = skillEvidence.filter(row => activeGroup === 'All' || row.group === activeGroup)
  const headerProjects = evidenceProjectIds.map(id => projects.find(project => project.id === id))

  return (
    <section aria-labelledby="skills-heatmap-heading" className="mt-10 overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#0c182b] p-4 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">PROJECT-BASED SKILL EVIDENCE</p>
          <h3 id="skills-heatmap-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">Skills across my projects</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            This heatmap shows where I used each skill in my six projects. Brighter cells mean the skill played a more central role.
            It is based on the documented work, <strong className="font-medium text-slate-100">not a self-rated proficiency chart.</strong>
          </p>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-2 text-xs font-medium text-cyan-200">
          6 projects · {skillEvidence.length} skills
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter skills by category">
        {['All', ...evidenceGroups].map(group => {
          const selected = group === activeGroup
          return (
            <button
              key={group}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveGroup(group)}
              className={
                'min-h-10 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ' +
                (selected
                  ? 'border-cyan-300 bg-cyan-300 text-slate-950'
                  : 'border-white/15 bg-white/[0.045] text-slate-300 hover:border-cyan-300/50 hover:text-cyan-100')
              }
            >
              {group === 'All' ? 'All skills' : group}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300" aria-label="Heatmap legend">
        {evidenceLabels.map((label, score) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className={'flex h-6 w-7 items-center justify-center rounded-md text-[10px] font-bold ' + cellClass[score]}>
              {cellLabel[score]}
            </span>
            {label}
          </span>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Select a highlighted cell to open the project's case study. “Not explicitly evidenced” means I have not claimed that skill for that project, not that I could never use it.
      </p>
      <p className="mt-3 text-xs font-medium text-cyan-200 lg:hidden">Scroll sideways to view all six projects →</p>

      <div
        role="region"
        tabIndex={0}
        aria-label="Scrollable skills by project heatmap"
        className="mt-3 max-w-full overflow-x-auto rounded-2xl border border-white/10 bg-[#0b1627] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 sm:p-3"
      >
        <table className="w-full min-w-[850px] table-fixed border-separate border-spacing-x-1.5 border-spacing-y-1.5 text-left">
          <caption className="sr-only">Evidence for each skill in the six portfolio projects. S indicates supporting use; C indicates a central project component. Colored cells link to project case studies.</caption>
          <colgroup>
            <col style={{ width: 198 }} />
            {headerProjects.map(project => <col key={project.id} />)}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="sticky left-0 z-20 bg-[#0b1627] px-2 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Skill</th>
              {headerProjects.map(project => (
                <th scope="col" key={project.id} className="px-1 pb-3 align-bottom text-center">
                  <a
                    href={'/projects/' + project.id}
                    title={'View ' + project.title + ' case study'}
                    className="inline-flex min-h-11 items-end justify-center rounded-lg px-1 py-2 text-xs font-semibold leading-tight text-slate-200 hover:text-cyan-200"
                  >
                    {projectNames[project.id] || project.title}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <Fragment key={row.name}>
                {(index === 0 || rows[index - 1].group !== row.group) && (
                  <tr>
                    <th colSpan={headerProjects.length + 1} className="px-2 pb-1 pt-5 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">{row.group}</th>
                  </tr>
                )}
                <tr>
                  <th scope="row" className="sticky left-0 z-10 rounded-lg bg-[#13233a] px-3 py-3 text-xs font-medium leading-snug text-slate-100 sm:text-sm">{row.name}</th>
                  {row.levels.map((score, column) => {
                    const project = headerProjects[column]
                    const label = row.name + ' in ' + project.title + ': ' + evidenceLabels[score]
                    return (
                      <td key={project.id} className="h-11 p-0.5 text-center">
                        {score > 0 ? (
                          <a
                            href={'/projects/' + project.id}
                            className={'flex min-h-10 w-full items-center justify-center rounded-lg text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ' + cellClass[score]}
                            aria-label={label + '. Open project case study'}
                            title={label}
                          >
                            {cellLabel[score]}
                          </a>
                        ) : (
                          <span
                            className={'flex min-h-10 w-full items-center justify-center rounded-lg text-xs font-bold ' + cellClass[score]}
                            aria-label={label}
                            title={label}
                          >
                            {cellLabel[score]}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        The evidence labels are editorial summaries of repository work, not grades, certifications, years of experience or claims of production deployment. Read each case study for methods, results and limitations.
      </p>
    </section>
  )
}
