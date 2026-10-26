import { useEffect, useMemo, useState } from 'react'
import { airlineDashboardData as data } from '../data/airlineDashboardData'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const ALL = 'All airlines'
const number = value => Math.round(value).toLocaleString('en-US')
const percent = value => (value * 100).toFixed(1) + '%'
const billions = amount => '$' + (amount / 1e9).toFixed(2) + 'B'
const millions = amount => '$' + (amount / 1e6).toFixed(1) + 'M'
const colors = ['#67e8f9', '#fb923c', '#a78bfa', '#34d399', '#f472b6']

function Panel({ title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#101e31] p-4 sm:p-6">
      <h3 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h3>
      {subtitle && <p className="mt-1 text-sm leading-relaxed text-slate-400">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Stat({ label, value, note }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101e31] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums tracking-tight text-cyan-200 sm:text-3xl">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{note}</p>
    </div>
  )
}

function LineChart({ series, rows, getX, formatX, maxY, description }) {
  const w = 760, h = 265, left = 50, top = 20, plotW = 682, plotH = 194
  const xs = rows.map(getX)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const x = value => left + (value - minX) / (maxX - minX || 1) * plotW
  const y = value => top + plotH * (1 - Math.max(0, value) / maxY)
  const ticks = [0, maxY / 4, maxY / 2, maxY * 3 / 4, maxY]
  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={description} className="w-full overflow-visible">
        {ticks.map(tick => (
          <g key={tick}>
            <line x1={left} x2={left + plotW} y1={y(tick)} y2={y(tick)} stroke="#cbd5e1" strokeOpacity=".15" />
            <text x={left - 9} y={y(tick) + 4} textAnchor="end" fontSize="12" fill="#9ca3af">{(tick * 100).toFixed(0)}%</text>
          </g>
        ))}
        {rows.filter((_, i) => i % Math.max(1, Math.floor(rows.length / 8)) === 0 || i === rows.length - 1).map(row => (
          <text key={getX(row)} x={x(getX(row))} y={h - 21} fontSize="12" textAnchor="middle" fill="#a5b4ca">
            {formatX(getX(row))}
          </text>
        ))}
        {series.map(item => (
          <g key={item.label}>
            <polyline
              fill="none" stroke={item.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
              points={rows.map(row => x(getX(row)).toFixed(2) + ',' + y(item.value(row)).toFixed(2)).join(' ')}
            />
            {rows.map(row => (
              <circle key={getX(row)} cx={x(getX(row))} cy={y(item.value(row))} r="4.5" fill={item.color}>
                <title>{formatX(getX(row))}: {item.label} {percent(item.value(row))}; {number(row.flights)} flights</title>
              </circle>
            ))}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-4 text-xs text-slate-300">
        {series.map(item => <span key={item.label} className="inline-flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />{item.label}</span>)}
      </div>
    </>
  )
}

function Bars({ rows, label, value, max, formatValue = x => percent(x), onSelect, selected }) {
  const maxValue = max ?? Math.max(...rows.map(value), 0.00001)
  return (
    <div className="space-y-3">
      {rows.map(row => (
        <div key={label(row)} className="space-y-1">
          <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
            {onSelect ? (
              <button type="button" onClick={() => onSelect(row)} className={'min-h-8 text-left hover:text-cyan-200 hover:underline ' + (selected === label(row) ? 'font-semibold text-cyan-200' : 'text-slate-200')}>
                {label(row)}
              </button>
            ) : <span className="text-slate-200">{label(row)}</span>}
            <span className="font-semibold tabular-nums text-slate-100">{formatValue(value(row))}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/10" role="img" aria-label={label(row) + ': ' + formatValue(value(row))}>
            <div className="h-full rounded-full bg-cyan-300" style={{ width: Math.max(0, Math.min(100, value(row) / maxValue * 100)) + '%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function MonthHourHeatmap() {
  const rows = data.month_hour
  const hours = Object.keys(rows[0]).filter(key => key !== 'MONTH')
  return (
    <div className="overflow-x-auto" role="region" tabIndex={0} aria-label="2015 national month-by-departure-hour delay rate heatmap">
      <table className="w-full min-w-[720px] border-separate border-spacing-[3px] text-center text-[10px]">
        <caption className="sr-only">National delay percentages by month and scheduled departure hour, from the project's committed summary data</caption>
        <thead><tr><th scope="col" className="px-2 text-left text-slate-400">Month</th>{hours.map(hour => <th key={hour} scope="col" className="pb-2 font-medium text-slate-400">{hour}</th>)}</tr></thead>
        <tbody>{rows.map(row => (
          <tr key={row.MONTH}>
            <th scope="row" className="pr-2 text-left text-slate-300">{monthNames[row.MONTH - 1]}</th>
            {hours.map(hour => {
              const v = row[hour]
              const intensity = Math.min(v / 0.38, 1)
              return (
                <td key={hour} title={monthNames[row.MONTH - 1] + ' at ' + hour + ':00 — ' + percent(v) + ' delayed'} className="h-7 rounded-[3px] font-semibold tabular-nums" style={{ backgroundColor: `rgba(103,232,249,${0.07 + intensity * 0.91})`, color: intensity > 0.46 ? '#071525' : '#dbeafe' }}>
                  {(v * 100).toFixed(0)}
                </td>
              )
            })}
          </tr>
        ))}</tbody>
      </table>
      <p className="mt-2 text-xs text-slate-400">Cells show rounded % delayed. National figures; unaffected by individual airline selection.</p>
    </div>
  )
}

const sections = [
  { key: 'when', label: 'When delays happen' },
  { key: 'why', label: 'Why delays happen' },
  { key: 'airlines', label: 'Airline comparison' },
  { key: 'where', label: 'Airports & routes' },
]

export default function AirlineDashboard() {
  const [airline, setAirline] = useState(ALL)
  const [activeTab, setActiveTab] = useState('when')
  const [minuteCost, setMinuteCost] = useState(74)
  const [preventedShare, setPreventedShare] = useState(25)
  const [airportSort, setAirportSort] = useState('worst')
  const [selectedAirport, setSelectedAirport] = useState('LGA')
  const [routeType, setRouteType] = useState('worst')

  useEffect(() => {
    const previous = document.title
    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href')
    document.title = 'Airline Delay Analytics | Interactive Dashboard | Naman Saini'
    if (canonical) canonical.setAttribute('href', 'https://naman-saini.com/projects/airline-delay/dashboard')
    return () => {
      document.title = previous
      if (canonical && previousCanonical) canonical.setAttribute('href', previousCanonical)
    }
  }, [])

  const airlineOptions = useMemo(() => [ALL, ...data.airlines.map(r => r.AIRLINE_NAME).sort()], [])
  const selected = airline === ALL ? null : data.airlines.find(r => r.AIRLINE_NAME === airline)
  const shownFlights = selected ? selected.flights : data.kpis.flights
  const delayRate = selected ? selected.delay_rate : data.kpis.delay_rate
  const cancelRate = selected ? selected.cancel_rate : data.kpis.cancel_rate
  const selectedCause = data.causes.find(row => row.AIRLINE_NAME === airline)
  const causes = ['Carrier', 'Late Aircraft', 'NAS (Air System)', 'Weather', 'Security'].map(name => ({ name, minutes: selectedCause[name] }))
  const totalCauseMinutes = causes.reduce((sum, row) => sum + row.minutes, 0)
  const controllable = (selectedCause['Carrier'] + selectedCause['Late Aircraft']) / totalCauseMinutes
  const monthly = data.monthly.filter(row => row.AIRLINE_NAME === airline).sort((a, b) => a.MONTH - b.MONTH)
  const hourly = data.hourly.filter(row => row.AIRLINE_NAME === airline && row.DEP_HOUR >= 5 && row.DEP_HOUR <= 23 && row.flights > 2000).sort((a, b) => a.DEP_HOUR - b.DEP_HOUR)
  const rankedAirlines = [...data.airlines].sort((a, b) => b.delay_rate - a.delay_rate)
  const airports = [...data.airports].sort((a, b) => airportSort === 'worst' ? b.delay_rate - a.delay_rate : airportSort === 'best' ? a.delay_rate - b.delay_rate : b.departures - a.departures)
  const highlightedAirport = data.airports.find(row => row.IATA === selectedAirport)
  const routes = data.routes.filter(row => row.group === routeType).sort((a, b) => routeType === 'worst' ? b.delay_rate - a.delay_rate : a.delay_rate - b.delay_rate)
  const hypotheticalSavings = selectedCause['Late Aircraft'] * minuteCost * preventedShare / 100

  return (
    <div className="min-h-screen bg-[#080f1e] text-slate-100">
      <a href="#airline-dashboard-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-cyan-300 focus:p-3 focus:text-slate-950">Skip to dashboard</a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5 sm:px-8">
        <a href="/" className="inline-flex min-h-11 items-center text-xl font-bold" aria-label="Portfolio homepage">naman<span className="text-cyan-300">.</span></a>
        <nav aria-label="Project navigation" className="flex flex-wrap gap-5 text-sm text-slate-300">
          <a href="/projects/airline-delay" className="inline-flex min-h-11 items-center hover:text-cyan-300">← Airline case study</a>
          <a href="/#projects" className="inline-flex min-h-11 items-center hover:text-cyan-300">All projects</a>
        </nav>
      </header>

      <main id="airline-dashboard-main" className="mx-auto max-w-6xl space-y-8 px-6 pb-24 pt-9 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.19em] text-cyan-300">Operations analytics · 2015 US BTS data</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Airline Delay Analytics</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">Explore when flights were delayed, why disruption happened, how airlines compared and which airports and routes had the highest risk. Based on 5,819,079 historical flights.</p>
          </div>
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold text-cyan-200">Interactive historical dashboard</span>
        </div>

        <div className="rounded-2xl border border-amber-300/25 bg-amber-300/[0.05] px-5 py-4 text-sm leading-relaxed text-amber-100">
          This dashboard uses the <strong>original project's committed aggregate data</strong> from the US Department of Transportation's 2015 flight records—not live flights or newly predicted delays. Filtered airline views come from airline-specific aggregates; airports, route rankings, cancellations-by-reason and the month-hour heatmap are national figures.
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <label htmlFor="airline-filter" className="min-w-0 flex-1 text-sm font-semibold text-slate-200">
            Explore an airline
            <select
              id="airline-filter" value={airline} onChange={e => setAirline(e.target.value)}
              className="mt-2 block min-h-12 w-full max-w-md rounded-xl border border-cyan-300/30 bg-[#172a42] px-4 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
            >
              {airlineOptions.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </label>
          <p className="text-xs text-slate-400">Delayed = arrived at least 15 minutes late.</p>
        </div>

        <section aria-label="Flight performance indicators">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            <Stat label="Flights analysed" value={shownFlights >= 1e6 ? (shownFlights / 1e6).toFixed(2) + 'M' : number(shownFlights)} note={airline === ALL ? 'Full 2015 BTS sample' : 'Selected carrier, 2015'} />
            <Stat label="Delay rate" value={percent(delayRate)} note="Arrivals at least 15 minutes late" />
            <Stat label="Cancellation rate" value={(cancelRate * 100).toFixed(2) + '%'} note="Cancelled scheduled flights" />
            <Stat label="Controllable share" value={percent(controllable)} note="Carrier + late-aircraft minutes" />
            <Stat label={selected ? 'Carrier controllable cost' : 'Estimated direct delay cost'} value={selected ? millions(selected.recoverable_cost_m * 1e6) : billions(data.kpis.delay_cost_usd)} note={selected ? 'Carrier + late-aircraft estimate' : 'Attributed minutes × $74/min'} />
          </div>
        </section>

        <section aria-label="Explore airline analytics">
          <div role="tablist" aria-label="Dashboard topics" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map(section => (
              <button
                key={section.key} id={'airline-tab-' + section.key} type="button" role="tab"
                aria-selected={activeTab === section.key} aria-controls={'airline-panel-' + section.key}
                onClick={() => setActiveTab(section.key)}
                className={'min-h-12 rounded-xl border px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ' + (activeTab === section.key ? 'border-cyan-300 bg-cyan-300 text-slate-950' : 'border-white/15 bg-[#111d30] text-slate-300 hover:border-cyan-300/50')}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div id={'airline-panel-' + activeTab} role="tabpanel" aria-labelledby={'airline-tab-' + activeTab} className="mt-5">
            {activeTab === 'when' && (
              <div className="space-y-5">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Panel title="Delays and cancellations by month" subtitle={'Monthly percentage of scheduled flights · ' + airline}>
                    <LineChart rows={monthly} getX={row => row.MONTH} formatX={i => monthNames[i - 1]} maxY={0.4}
                      series={[{ label: 'Delayed', value: row => row.delay_rate, color: colors[0] }, { label: 'Cancelled', value: row => row.cancel_rate, color: colors[1] }]}
                      description={'Monthly delay and cancellation rates for ' + airline}
                    />
                  </Panel>
                  <Panel title="How delays build through the day" subtitle={'Delay rate by departure hour · ' + airline}>
                    {hourly.length > 1 ? (
                      <LineChart rows={hourly} getX={row => row.DEP_HOUR} formatX={h => h + ':00'} maxY={0.45}
                        series={[{ label: 'Delayed', value: row => row.delay_rate, color: colors[0] }]}
                        description={'Hourly delay rates for ' + airline}
                      />
                    ) : <p className="text-sm text-slate-400">Not enough flight observations meet the chart's 2,000-flight-per-hour minimum.</p>}
                  </Panel>
                </div>
                <Panel title="National month × hour delay heatmap" subtitle="Find high-risk combinations such as busy summer evenings. Uses national observations irrespective of airline filter.">
                  <MonthHourHeatmap />
                </Panel>
                <p className="rounded-xl border-l-4 border-cyan-300 bg-white/[0.04] p-5 text-sm leading-relaxed text-slate-300">My key finding: national delay rates rose from about <strong className="text-white">9% at 6 AM</strong> to approximately <strong className="text-white">26% in the evening</strong>. The cumulative pattern suggests first-departure discipline and turnaround buffers deserve attention; the chart alone does not prove the cause of each delay.</p>
              </div>
            )}

            {activeTab === 'why' && (
              <div className="space-y-5">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Panel title="Share of attributed delay minutes" subtitle={airline + ' · DOT cause categories. Carrier and late aircraft are classified as controllable.'}>
                    <Bars rows={causes.map(c => ({ ...c, share: c.minutes / totalCauseMinutes }))} label={r => r.name} value={r => r.share} formatValue={percent} />
                  </Panel>
                  <Panel title="Why flights were cancelled" subtitle="National totals, all airlines · official DOT cancellation categories.">
                    <Bars rows={data.cancel_reasons.map(c => ({ ...c, share: c.cancellations / data.cancel_reasons.reduce((sum, r) => sum + r.cancellations, 0) }))} label={r => r.reason} value={r => r.share} formatValue={percent} />
                  </Panel>
                </div>
                <Panel title="What might operational improvements be worth?" subtitle="A transparent scenario calculation, not observed airline savings. Prevent a hypothetical share of the selected airline's late-aircraft delay minutes.">
                  <div className="grid items-start gap-6 lg:grid-cols-2">
                    <div className="space-y-5">
                      <label htmlFor="cost-per-minute" className="block text-sm text-slate-200">
                        Estimated direct cost per delay minute <strong className="float-right text-cyan-200">${minuteCost}</strong>
                        <input id="cost-per-minute" type="range" min="40" max="120" step="2" value={minuteCost} onChange={e => setMinuteCost(Number(e.target.value))} className="mt-3 w-full accent-cyan-300" />
                      </label>
                      <label htmlFor="prevented-share" className="block text-sm text-slate-200">
                        Hypothetical late-aircraft minutes prevented <strong className="float-right text-cyan-200">{preventedShare}%</strong>
                        <input id="prevented-share" type="range" min="0" max="40" step="5" value={preventedShare} onChange={e => setPreventedShare(Number(e.target.value))} className="mt-3 w-full accent-cyan-300" />
                      </label>
                      <button type="button" onClick={() => { setMinuteCost(74); setPreventedShare(25) }} className="min-h-11 rounded-full border border-white/20 px-4 text-sm text-slate-200 hover:border-cyan-300">Reset scenario</button>
                    </div>
                    <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Illustrative avoided operating cost</p>
                      <p aria-live="polite" className="mt-3 text-3xl font-bold tabular-nums text-cyan-200">{millions(hypotheticalSavings)}</p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-300">{number(selectedCause['Late Aircraft'])} attributed late-aircraft minutes × {preventedShare}% × ${minuteCost}/min.</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-slate-400">Costs are a simple model from the historical source's delay minutes, not a causal estimate, profit projection, or savings delivered to an employer. Attribution itself is carrier-reported.</p>
                </Panel>
              </div>
            )}

            {activeTab === 'airlines' && (
              <div className="space-y-5">
                <Panel title="Compare delay rates across 14 airlines" subtitle="Select an airline to update the KPIs and other airline-specific charts. The original dataset covers 2015, not current performance.">
                  <Bars rows={rankedAirlines} label={row => row.AIRLINE_NAME} value={row => row.delay_rate} onSelect={row => setAirline(row.AIRLINE_NAME)} selected={airline} />
                </Panel>
                <Panel title="Volume and operational exposure" subtitle="2015 airline-level comparisons; controllable vs. external delay minutes per flight.">
                  <div className="overflow-x-auto">
                    <table className="min-w-[660px] w-full text-left text-xs sm:text-sm">
                      <thead><tr className="border-b border-white/10 text-slate-400"><th className="px-3 py-3">Airline</th><th className="px-3 py-3 text-right">Flights</th><th className="px-3 py-3 text-right">Own-operation min/flight</th><th className="px-3 py-3 text-right">External min/flight</th><th className="px-3 py-3 text-right">Delay rate</th></tr></thead>
                      <tbody>{rankedAirlines.map(row => (
                        <tr key={row.AIRLINE_NAME} className={'border-b border-white/[0.07] ' + (airline === row.AIRLINE_NAME ? 'bg-cyan-300/10 text-cyan-100' : 'text-slate-200')}>
                          <td className="px-3 py-3">{row.AIRLINE_NAME}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{number(row.flights)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{row.controllable_min.toFixed(1)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{row.external_min.toFixed(1)}</td>
                          <td className="px-3 py-3 text-right tabular-nums">{percent(row.delay_rate)}</td>
                        </tr>
                      ))}</tbody>
                    </table>
                  </div>
                </Panel>
              </div>
            )}

            {activeTab === 'where' && (
              <div className="space-y-5">
                <div className="grid gap-5 lg:grid-cols-2">
                  <Panel title="Airports ranked by delay rate" subtitle="National airport records · filter-independent. Shows top 12 by selected ranking.">
                    <label htmlFor="airport-sort" className="block text-sm text-slate-300">Ranking
                      <select id="airport-sort" className="mt-2 block min-h-11 w-full rounded-lg border border-white/20 bg-[#172a42] px-3 text-white" value={airportSort} onChange={e => setAirportSort(e.target.value)}>
                        <option value="worst">Highest delay rate</option>
                        <option value="best">Lowest delay rate</option>
                        <option value="volume">Most departures</option>
                      </select>
                    </label>
                    <div className="mt-5">
                      <Bars rows={airports.slice(0, 12)} label={r => r.IATA} value={r => airportSort === 'volume' ? r.departures : r.delay_rate} max={airportSort === 'volume' ? airports[0].departures : 0.35} formatValue={x => airportSort === 'volume' ? number(x) : percent(x)} onSelect={r => setSelectedAirport(r.IATA)} selected={selectedAirport} />
                    </div>
                    <p className="mt-3 text-xs text-slate-400">{highlightedAirport ? highlightedAirport.name + ': ' + number(highlightedAirport.departures) + ' departures; ' + percent(highlightedAirport.delay_rate) + ' delayed.' : ''}</p>
                  </Panel>
                  <Panel title="Most and least delayed routes" subtitle="National observations · routes with at least 1,000 flights in this comparison.">
                    <fieldset className="flex gap-3 text-sm">
                      <legend className="sr-only">Route ranking</legend>
                      {['worst', 'best'].map(type => (
                        <label key={type} className={'cursor-pointer rounded-full border px-4 py-2 ' + (routeType === type ? 'border-cyan-300 bg-cyan-300/10 text-cyan-200' : 'border-white/15 text-slate-300')}>
                          <input type="radio" name="route-type" className="mr-2 accent-cyan-300" value={type} checked={routeType === type} onChange={() => setRouteType(type)} />
                          {type === 'worst' ? 'Most delayed' : 'Least delayed'}
                        </label>
                      ))}
                    </fieldset>
                    <div className="mt-6"><Bars rows={routes.slice(0, 12)} label={r => r.route} value={r => r.delay_rate} max={0.40} /></div>
                  </Panel>
                </div>
                <p className="rounded-xl border-l-4 border-cyan-300 bg-white/[0.04] p-5 text-sm leading-relaxed text-slate-300">Comparing airports and routes can reveal where disruption concentrates. Raw rankings do not control for airport congestion, weather exposure or airline schedules, so they are starting points for investigation—not causal performance verdicts.</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <h2 className="text-xl font-semibold">Evidence, scope and reproducibility</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">Data: US DOT / Bureau of Transportation Statistics Reporting Carrier On-Time Performance, calendar year 2015. This interface uses the original project's committed aggregate tables (not simulated values), without re-querying live flights. It does not train or run the separate prototype delay-risk model. Industry direct-cost estimates use a project-documented $74 per delay minute by default and exclude passenger impacts.</p>
          <div className="mt-4 flex flex-wrap gap-5">
            <a href="https://github.com/NamanSaini04/airline-delay-analytics/tree/main/dashboard/data" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-cyan-300 hover:underline">Source data & calculations ↗</a>
            <a href="https://github.com/NamanSaini04/airline-delay-analytics/blob/main/reports/full_report.md" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-cyan-300 hover:underline">Full analytical report ↗</a>
            <a href="https://github.com/NamanSaini04/airline-delay-analytics/blob/main/dashboard/app.py" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-cyan-300 hover:underline">Original Streamlit app code ↗</a>
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl border-t border-white/10 px-6 py-7 text-sm text-slate-400 sm:px-8">© {new Date().getFullYear()} Naman Saini · AI · Data · Security</footer>
    </div>
  )
}
