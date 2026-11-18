import { createHash } from 'node:crypto'
import { runPortfolioAgent } from '../server/portfolioAgent.js'

// Best-effort burst control per warm Function instance. Gateway account budgets
// remain the control for total model spending across all Function instances.
const requests = new Map()
const windowMs = 60_000

export function validateChatInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid request')
  if (typeof body.question !== 'string' || !body.question.trim() || body.question.length > 600) throw new Error('Use a question of at most 600 characters')
  const history = body.history || []
  if (!Array.isArray(history) || history.length > 8 || history.some(message => !message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || message.content.length > 1400)) throw new Error('Invalid conversation history')
  const pathname = typeof body.pathname === 'string' && /^\/[a-z0-9/#_-]*$/i.test(body.pathname) && body.pathname.length <= 140 ? body.pathname : '/'
  return { question: body.question.trim(), history: history.map(({ role, content }) => ({ role, content })), pathname }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST to ask the portfolio assistant.' })
  }
  const origin = req.headers.origin
  const allowed = new Set(['https://naman-saini.com', 'https://www.naman-saini.com'])
  if (process.env.VERCEL_URL) allowed.add(`https://${process.env.VERCEL_URL}`)
  if (origin && !allowed.has(origin)) return res.status(403).json({ error: 'This assistant is available on Naman’s portfolio.' })
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return res.status(415).json({ error: 'Use a JSON request.' })
  if (Number(req.headers['content-length']) > 16_000) return res.status(413).json({ error: 'Please shorten the conversation.' })

  let input
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    if (JSON.stringify(body).length > 16_000) throw new Error('Request is too large')
    input = validateChatInput(body)
  } catch {
    return res.status(400).json({ error: 'Please use a question of at most 600 characters and a short conversation history.' })
  }

  const now = Date.now()
  for (const [key, record] of requests) if (record.resetAt <= now) requests.delete(key)
  const ip = String(req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim()
  const key = createHash('sha256').update(ip).digest('hex')
  const record = requests.get(key) || { count: 0, resetAt: now + windowMs }
  if (record.count >= 10) {
    res.setHeader('Retry-After', String(Math.ceil((record.resetAt - now) / 1000)))
    return res.status(429).json({ error: 'Please wait a minute before asking another question.', code: 'rate_limited' })
  }
  if (requests.size >= 2000 && !requests.has(key)) return res.status(429).json({ error: 'The assistant is busy. Please try again shortly.' })
  record.count += 1
  requests.set(key, record)

  // Vercel supplies a fresh invocation-scoped identity header. An optional
  // Gateway key supports other environments; credentials stay on the server.
  const apiKey = process.env.AI_GATEWAY_API_KEY || req.headers['x-vercel-oidc-token'] || process.env.VERCEL_OIDC_TOKEN
  try {
    const result = await runPortfolioAgent(input, { apiKey, model: process.env.PORTFOLIO_AGENT_MODEL || 'openai/gpt-4.1-mini', signal: AbortSignal.timeout(35_000) })
    return res.status(200).json(result)
  } catch (error) {
    console.warn('Portfolio AI request failed', { code: error.code || 'ai_unavailable', status: error.status || 503 })
    return res.status(503).json({ error: 'AI answers are temporarily unavailable. You can still explore the portfolio sources below.', code: error.code || 'ai_unavailable' })
  }
}
