import { useEffect, useRef, useState } from 'react'
import { getPortfolioAnswer, starterQuestions } from '../lib/portfolioAssistant.js'
import './PortfolioChat.css'

const welcome = {
  role: 'assistant',
  paragraphs: ['Hi, I’m Naman’s AI portfolio guide. I can research his projects, explain results, compare his work with your requirements and help draft a project enquiry.'],
  suggestions: ['Which projects show AI engineering?', 'Explain his dissertation results', 'Recommend projects for a data engineer role', 'What can he help my team build?'],
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 11h8M8 14h5" />
    </svg>
  )
}

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([welcome])
  const [pending, setPending] = useState(false)
  const launcher = useRef(null)
  const input = useRef(null)
  const transcript = useRef(null)
  const context = useRef({})
  const activeRequest = useRef(null)

  useEffect(() => () => activeRequest.current?.abort(), [])

  function closeChat() {
    setOpen(false)
    launcher.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    input.current?.focus({ preventScroll: true })
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        launcher.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open])

  useEffect(() => {
    const log = transcript.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages, open, pending])

  async function ask(value) {
    const text = value.trim().slice(0, 600)
    if (!text || activeRequest.current) return
    const request = new AbortController()
    activeRequest.current = request
    setPending(true)
    const history = messages.slice(1).slice(-6).map(message => ({ role: message.role, content: (message.text || [message.title, ...(message.paragraphs || []), ...(message.bullets || [])].filter(Boolean).join('\n\n')).slice(0, 1400) }))
    setMessages(previous => [...previous.slice(-38), { role: 'user', text }])
    setQuestion('')
    input.current?.focus({ preventScroll: true })
    try {
      const response = await fetch('/api/portfolio-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, history, pathname: window.location.pathname }),
        signal: request.signal,
      })
      const answer = await response.json()
      if (!response.ok || answer.mode !== 'agent' || !Array.isArray(answer.paragraphs)) throw new Error(answer.error || 'AI answers are temporarily unavailable.')
      if (activeRequest.current !== request) return
      context.current = {}
      setMessages(previous => [...previous, { role: 'assistant', ...answer }])
    } catch {
      if (request.signal.aborted || activeRequest.current !== request) return
      const answer = getPortfolioAnswer(text, context.current, window.location.pathname)
      context.current = answer.context || {}
      setMessages(previous => [...previous, { role: 'assistant', ...answer, mode: 'search', notice: 'AI answers are temporarily unavailable. These are matching portfolio sources.', suggestions: answer.suggestions || starterQuestions.slice(0, 3) }])
    } finally {
      if (activeRequest.current === request) {
        activeRequest.current = null
        setPending(false)
      }
    }
  }

  function resetChat() {
    activeRequest.current?.abort()
    activeRequest.current = null
    setPending(false)
    setMessages([welcome])
    context.current = {}
    setQuestion('')
    input.current?.focus({ preventScroll: true })
  }

  return (
    <div className="portfolio-chat">
      {open && (
        <dialog open id="portfolio-chat-panel" aria-modal="false" aria-labelledby="portfolio-chat-title" aria-describedby="portfolio-chat-subtitle" className="portfolio-chat-panel">
          <header className="portfolio-chat-header">
            <span className="portfolio-chat-avatar" aria-hidden="true">N</span>
            <div className="portfolio-chat-heading">
              <h2 id="portfolio-chat-title">Ask about Naman</h2>
              <p id="portfolio-chat-subtitle">AI agent with portfolio tools</p>
            </div>
            <button type="button" onClick={resetChat} className="portfolio-chat-icon-button" aria-label="Start a new conversation" title="Start a new conversation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 10a9 9 0 1 1 2.5 8M3 4v6h6" /></svg>
            </button>
            <button type="button" onClick={closeChat} className="portfolio-chat-icon-button" aria-label="Close chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </button>
          </header>

          <div ref={transcript} className="portfolio-chat-transcript" role="log" aria-live="polite" aria-relevant="additions" aria-label="Portfolio conversation">
            <p className="portfolio-chat-context">Answers from Naman’s portfolio, with links to explore.</p>
            {messages.map((message, index) => (
              <article key={index} className={`portfolio-chat-message portfolio-chat-message-${message.role}`} aria-label={message.role === 'user' ? 'You' : 'Portfolio assistant'}>
                <span className="portfolio-chat-message-label">{message.role === 'user' ? 'You' : message.mode === 'agent' ? 'AI portfolio agent' : message.mode === 'search' ? 'Portfolio search' : 'Portfolio assistant'}</span>
                {message.notice && <p className="portfolio-chat-notice">{message.notice}</p>}
                {message.title && <h3>{message.title}</h3>}
                {message.text && <p>{message.text}</p>}
                {message.paragraphs?.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                {message.bullets?.length > 0 && <ul>{message.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
                {message.links?.length > 0 && (
                  <div className="portfolio-chat-links">
                    {message.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}
                  </div>
                )}
                {message.toolsUsed?.length > 0 && (
                  <details className="portfolio-chat-tools">
                    <summary>How I checked this</summary>
                    <ul>{message.toolsUsed.map((step, stepIndex) => <li key={stepIndex}>{step.label}{step.detail ? ` · ${step.detail}` : ''}</li>)}</ul>
                  </details>
                )}
                {index === messages.length - 1 && message.suggestions?.length > 0 && (
                  <div className="portfolio-chat-suggestions" aria-label="Suggested questions">
                    {message.suggestions.map(suggestion => <button key={suggestion} type="button" disabled={pending} onClick={() => ask(suggestion)}>{suggestion}</button>)}
                  </div>
                )}
              </article>
            ))}
            {pending && <output className="portfolio-chat-working">Working on your question…</output>}
          </div>

          <form className="portfolio-chat-form" onSubmit={event => { event.preventDefault(); ask(question) }}>
            <label htmlFor="portfolio-chat-question" className="portfolio-chat-sr-only">Ask a question about Naman’s portfolio</label>
            <input ref={input} id="portfolio-chat-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={600} placeholder="Ask about a project or skill…" autoComplete="off" enterKeyHint="send" />
            <button type="submit" className="portfolio-chat-send" aria-label="Send message" disabled={pending || !question.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7M12 5v14" /></svg>
            </button>
          </form>
          <p className="portfolio-chat-footnote">Messages processed by AI · Check source links</p>
        </dialog>
      )}
      <button ref={launcher} type="button" onClick={() => open ? closeChat() : setOpen(true)} className="portfolio-chat-launcher" aria-expanded={open} aria-controls="portfolio-chat-panel" aria-label={open ? 'Close portfolio chat' : 'Open portfolio chat'}>
        <ChatIcon /><span>Ask about Naman</span>
      </button>
    </div>
  )
}
