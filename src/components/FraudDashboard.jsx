import { useEffect, useState } from 'react'
import { projectMedia } from '../data/projectMedia'

const scenarios = [
  { id: 'cost', name: 'Cost-aware cutoff', threshold: '0.12', tp: 80, fn: 15, fp: 39, tn: 56612, detail: 'Selected in the original evaluation under $150 / missed fraud and $5 / false alert.' },
  { id: 'default', name: 'Default cutoff', threshold: '0.50', tp: 75, fn: 20, fp: 12, tn: 56639, detail: 'Uses the conventional 50% classification threshold.' },
  { id: 'recall', name: 'High-recall cutoff', threshold: '0.0006', tp: 86, fn: 9, fp: 3558, tn: 53093, detail: 'Catches more fraud but creates a very large review queue.' },
]

const models = [
  { name: 'XGBoost', score: 0.823, precision: 86.2, recall: 78.9 },
  { name: 'Random Forest', score: 0.808, precision: 97.1, recall: 71.6 },
  { name: 'Logistic Regression', score: 0.672, precision: 5.6, recall: 87.4 },
  { name: 'SVM (subsample)', score: 0.474, precision: 41.4, recall: 48.4 },
]

const usd = amount => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 0,
}).format(amount)

const csvEscape = value => '"' + String(value).replaceAll('"', '""') + '"'

function Metric({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:p-5">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-3 text-2xl font-bold tabular-nums tracking-tight text-cyan-200 sm:text-3xl">{value}</dd>
      {note && <p className="mt-2 text-xs leading-relaxed text-slate-400">{note}</p>}
    </div>
  )
}

export default function FraudDashboard() {
  const [selectedId, setSelectedId] = useState('cost')
  const [missedCost, setMissedCost] = useState(150)
  const [falseAlertCost, setFalseAlertCost] = useState(5)
  const selected = scenarios.find(s => s.id === selectedId) || scenarios[0]
  const scenarioCost = s => s.fn * missedCost + s.fp * falseAlertCost
  const selectedCost = scenarioCost(selected)
  const defaultCost = scenarioCost(scenarios[1])
  const alternative = scenarios.reduce((best, s) => scenarioCost(s) < scenarioCost(best) ? s : best, scenarios[0])
  const maxCost = Math.max(...scenarios.map(scenarioCost), 1)
  const estimatedReduction = defaultCost ? (defaultCost - selectedCost) / defaultCost * 100 : 0
  const totalTest = 56746
  const csv = [
    ['Scenario', 'Threshold', 'True positives', 'False negatives', 'False positives', 'True negatives', 'Recall', 'Precision', 'Illustrative cost'],
    ...scenarios.map(s => [
      s.name, s.threshold, s.tp, s.fn, s.fp, s.tn,
      (100 * s.tp / (s.tp + s.fn)).toFixed(1) + '%',
      (100 * s.tp / (s.tp + s.fp)).toFixed(1) + '%', scenarioCost(s),
    ]),
  ].map(row => row.map(csvEscape).join(',')).join('\n')

  useEffect(() => {
    const old = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const previous = canonical?.getAttribute('href')
    document.title = 'Fraud Detection | Interactive Analysis Dashboard | Naman Saini'
    if (canonical) canonical.setAttribute('href', 'https://naman-saini.com/projects/fraud-detection/dashboard')
    return () => {
      document.title = old
      if (canonical && previous) canonical.setAttribute('href', previous)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-100">
      <a href="#dashboard-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cyan-300 focus:p-3 focus:text-slate-950">Skip to dashboard</a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
        <a href="/" className="inline-flex min-h-11 items-center text-xl font-bold tracking-tight" aria-label="Portfolio homepage">naman<span className="text-cyan-300">.</span></a>
        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          <a className="inline-flex min-h-11 items-center hover:text-cyan-300" href="/projects/fraud-detection">← Fraud case study</a>
          <a className="inline-flex min-h-11 items-center hover:text-cyan-300" href="/#projects">All projects</a>
        </div>
      </header>
      <main id="dashboard-main" className="mx-auto max-w-6xl space-y-9 px-6 pb-24 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-cyan-300">Financial fraud · Interactive report</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Fraud Detection Analytics</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Explore the actual findings from my held-out evaluation of the ULB credit-card dataset,
              then test how different review-cost assumptions affect the choice of decision rule.
            </p>
          </div>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200">Historical offline evaluation</span>
        </div>

        <div role="note" className="rounded-2xl border border-amber-300/30 bg-amber-300/[0.055] p-4 text-sm leading-relaxed text-amber-100">
          <strong>What this dashboard does:</strong> it shows recorded model results and an interactive cost-assumption comparison for three evaluated thresholds.
          It does <strong>not</strong> run a live fraud model, rescore transactions, calculate new thresholds, or represent deployed fraud prevention.
          The original Streamlit application runs locally after its model and test-set files are generated.
        </div>

        <section aria-labelledby="snapshot-heading">
          <h2 id="snapshot-heading" className="mb-4 text-xl font-semibold">Evaluation snapshot</h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Transactions analysed" value="283,726" note="1,081 duplicates removed; full dataset" />
            <Metric label="Fraud prevalence" value="0.17%" note="473 fraud cases in full dataset" />
            <Metric label="Best model PR-AUC" value="0.823" note="XGBoost on held-out test split" />
            <Metric label="Fraud recall at 0.12" value="84.2%" note="80 of 95 fraud cases caught in test set" />
          </dl>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#101e31] p-5 sm:p-7" aria-labelledby="decision-heading">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Interactive comparison</p>
              <h2 id="decision-heading" className="mt-2 text-2xl font-semibold">Compare fraud-review decisions</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                Pick one of the three thresholds evaluated in the project. The confusion-matrix counts remain
                fixed; only the illustrative costs change when you move the sliders.
              </p>
            </div>
            <a
              href={'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)}
              download="fraud-evaluated-thresholds.csv"
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 text-sm text-slate-100 hover:border-cyan-300"
            >Download comparison CSV ↓</a>
          </div>

          <fieldset className="mt-6 grid gap-3 sm:grid-cols-3">
            <legend className="mb-3 text-sm font-semibold text-slate-200">Evaluated decision strategies</legend>
            {scenarios.map(s => (
              <label key={s.id} className={'cursor-pointer rounded-xl border p-4 transition-colors ' + (s.id === selectedId ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/10 bg-white/[0.025] hover:border-cyan-300/40')}>
                <input
                  type="radio" name="decision-strategy" value={s.id} checked={selectedId === s.id}
                  onChange={() => setSelectedId(s.id)} className="accent-cyan-300"
                />
                <span className="ml-2 text-sm font-semibold text-slate-100">{s.name}</span>
                <span className="mt-2 block text-xs text-slate-400">Cutoff: {s.threshold}</span>
              </label>
            ))}
          </fieldset>
          <p className="mt-4 text-sm text-slate-400">{selected.detail}</p>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <h3 className="text-lg font-semibold">Change the cost assumptions</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">Dollar amounts are adjustable hypothetical penalties, not confirmed business costs.</p>
              <label htmlFor="missed-fraud-cost" className="mt-7 flex justify-between gap-3 text-sm font-medium text-slate-200">
                <span>Cost per missed fraud</span><strong className="tabular-nums text-cyan-200">{usd(missedCost)}</strong>
              </label>
              <input id="missed-fraud-cost" type="range" min="0" max="500" step="5" value={missedCost} onChange={e => setMissedCost(Number(e.target.value))} className="mt-3 w-full accent-cyan-300" />
              <label htmlFor="false-alert-cost" className="mt-7 flex justify-between gap-3 text-sm font-medium text-slate-200">
                <span>Cost per false alarm</span><strong className="tabular-nums text-cyan-200">{usd(falseAlertCost)}</strong>
              </label>
              <input id="false-alert-cost" type="range" min="0" max="50" step="1" value={falseAlertCost} onChange={e => setFalseAlertCost(Number(e.target.value))} className="mt-3 w-full accent-cyan-300" />
              <button type="button" className="mt-6 min-h-11 rounded-full border border-white/20 px-5 text-sm font-semibold text-slate-100 hover:border-cyan-300" onClick={() => { setMissedCost(150); setFalseAlertCost(5); setSelectedId('cost') }}>Reset to study assumptions</button>
              <p className="mt-5 text-xs text-slate-400">Formula: total illustrative cost = missed fraud × missed-fraud cost + false alarms × review cost.</p>
            </div>

            <div aria-live="polite" className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.035] p-5">
              <h3 className="text-lg font-semibold">Selected strategy outcomes</h3>
              <p className="mt-5 text-xs uppercase tracking-wider text-slate-400">Illustrative cost</p>
              <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-cyan-200">{usd(selectedCost)}</p>
              <p className={'mt-2 text-sm font-medium ' + (estimatedReduction >= 0 ? 'text-emerald-300' : 'text-amber-200')}>
                {estimatedReduction >= 0 ? estimatedReduction.toFixed(1) + '% less' : Math.abs(estimatedReduction).toFixed(1) + '% more'} than the default cutoff under these assumptions
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div><dt className="text-xs text-slate-400">Fraud caught (recall)</dt><dd className="mt-1 text-xl font-bold tabular-nums">{(100 * selected.tp / 95).toFixed(1)}%</dd></div>
                <div><dt className="text-xs text-slate-400">Correct alerts (precision)</dt><dd className="mt-1 text-xl font-bold tabular-nums">{(100 * selected.tp / (selected.tp + selected.fp)).toFixed(1)}%</dd></div>
                <div><dt className="text-xs text-slate-400">Fraud missed</dt><dd className="mt-1 text-xl font-bold tabular-nums">{selected.fn}</dd></div>
                <div><dt className="text-xs text-slate-400">False alarms</dt><dd className="mt-1 text-xl font-bold tabular-nums">{selected.fp.toLocaleString('en-US')}</dd></div>
              </dl>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-300">
                Cheapest <strong>among these three tested strategies</strong> with your current assumptions:
                <strong className="text-cyan-200"> {alternative.name}</strong>. The true optimal threshold cannot be recomputed without all original prediction scores.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="text-lg font-semibold">How costs compare</h3>
            <div className="mt-4 space-y-4" aria-label="Illustrative total cost by evaluated strategy">
              {scenarios.map(s => (
                <div key={s.id}>
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2 text-sm">
                    <span className="text-slate-200">{s.name} <span className="text-slate-400">({s.threshold})</span></span>
                    <span className="font-semibold tabular-nums">{usd(scenarioCost(s))}</span>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full bg-white/10">
                    <div className={'h-full rounded-full transition-[width] duration-200 ' + (s.id === selectedId ? 'bg-cyan-300' : 'bg-slate-500')} style={{ width: (scenarioCost(s) / maxCost * 100) + '%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2" aria-label="Model quality and evaluated sample">
          <article className="rounded-3xl border border-white/10 bg-[#101e31] p-5 sm:p-7">
            <h2 className="text-xl font-semibold">Which model performed best?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Precision-recall AUC is more informative than accuracy when fraud is only 0.17% of transactions.
              These scores come from the saved test-set comparison.
            </p>
            <div className="mt-6 space-y-5">
              {models.map(m => (
                <div key={m.name}>
                  <div className="mb-2 flex justify-between gap-2 text-sm">
                    <span>{m.name}</span><span className="tabular-nums text-cyan-200">{m.score.toFixed(3)} PR-AUC</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{width: m.score * 100 + '%'}} /></div>
                  <p className="mt-1 text-xs text-slate-400">Recall {m.recall.toFixed(1)}% · Precision {m.precision.toFixed(1)}% at default cutoff</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-400">The SVM model was trained on a subsample; it is not directly comparable in training size.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-[#101e31] p-5 sm:p-7">
            <h2 className="text-xl font-semibold">Confusion matrix</h2>
            <p className="mt-2 text-sm text-slate-400">Actual held-out test outcomes at threshold {selected.threshold}; {totalTest.toLocaleString('en-US')} transactions, including 95 fraud cases.</p>
            <div className="mt-6 grid grid-cols-[110px_1fr_1fr] gap-2 text-center text-xs sm:grid-cols-[130px_1fr_1fr]">
              <div></div><div className="p-2 text-slate-400">Predicted legit</div><div className="p-2 text-slate-400">Predicted fraud</div>
              <div className="flex items-center justify-start p-2 text-left text-slate-400">Actual legit</div>
              <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-xl font-bold tabular-nums">{selected.tn.toLocaleString('en-US')}</div>
              <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-xl font-bold tabular-nums">{selected.fp.toLocaleString('en-US')}</div>
              <div className="flex items-center justify-start p-2 text-left text-slate-400">Actual fraud</div>
              <div className="rounded-xl border border-rose-300/20 bg-rose-300/10 p-4 text-xl font-bold tabular-nums">{selected.fn}</div>
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-xl font-bold tabular-nums">{selected.tp}</div>
            </div>
            <p className="mt-6 text-sm text-slate-300">
              I chose the 0.12 cutoff for the original cost assumptions: it found five more fraud cases than the default
              and required 27 more false-alarm reviews, reducing the estimated cost from $3,060 to $2,445.
            </p>
          </article>
        </section>

        <section aria-labelledby="visual-title" className="rounded-3xl border border-white/10 bg-[#101e31] p-5 sm:p-7">
          <h2 id="visual-title" className="text-xl font-semibold">Original evaluation chart</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">Generated from the project's original XGBoost scores with its initial cost assumptions. It is not recalculated by the sliders above.</p>
          <div className="mt-5 overflow-hidden rounded-xl bg-slate-50 p-3 sm:p-5">
            <img src={projectMedia['fraud-detection'].src} alt={projectMedia['fraud-detection'].alt} width="880" height="440" loading="lazy" className="mx-auto h-auto w-full max-w-4xl object-contain" />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{projectMedia['fraud-detection'].caption}</p>
          <a href="https://github.com/NamanSaini04/Financial-fraud-detection/blob/main/reports/analysis_report.md" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-cyan-300 hover:underline">Read the full evaluation report ↗</a>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7" aria-labelledby="limitations-heading">
          <h2 id="limitations-heading" className="text-xl font-semibold">Scope and limitations</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            One historical dataset covering two days of anonymised card transactions. The results are a held-out offline
            evaluation, not a deployed bank system or real-time fraud monitor. Costs are illustrative and model behaviour
            can change with new data. The original four-tab Streamlit app requires a locally trained model and prepared data,
            which are not checked into the GitHub repository.
          </p>
          <a href="https://github.com/NamanSaini04/Financial-fraud-detection" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-cyan-300 hover:underline">Inspect the Python project and Streamlit source ↗</a>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl border-t border-white/10 px-6 py-7 text-sm text-slate-400 sm:px-8">© {new Date().getFullYear()} Naman Saini · AI · Data · Security</footer>
    </div>
  )
}
