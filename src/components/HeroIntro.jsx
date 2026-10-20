import { showCV } from '../data/siteConfig'
import { motion, useReducedMotion } from 'motion/react'
import ArrowIcon from './ArrowIcon'

export default function HeroIntro({ primaryLink, secondaryLink }) {
  const reduceMotion = useReducedMotion()
  const entrance = {
    rest: { opacity: 0.75, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  }
  return (
    <motion.div initial={reduceMotion ? false : 'rest'} animate="visible" transition={{ staggerChildren: reduceMotion ? 0 : 0.07 }}>
      <motion.div variants={entrance} className="flex flex-col items-start gap-5">
        <img
          src="/naman-saini-portrait.webp"
          alt="Portrait of Naman Saini"
          width="226"
          height="226"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-24 w-24 shrink-0 rounded-2xl border border-cyan-300/30 bg-slate-100 object-cover object-top shadow-[0_14px_36px_#00000050] sm:h-28 sm:w-28"
        />
        <p className="eyebrow text-xs font-medium tracking-[0.18em] text-cyan-300">NAMAN SAINI / AI & DATA PORTFOLIO</p>
      </motion.div>
      <h1 id="hero-title" className="mt-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl lg:text-[4.25rem]">
        <motion.span variants={entrance} className="block">Engineering AI.</motion.span>
        <motion.span variants={entrance} className="block text-slate-300">Making data useful.</motion.span>
      </h1>
      <motion.p variants={entrance} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">AI Engineering, Machine Learning, Data Engineering, and Cybersecurity Analytics — explored through practical, documented projects.</motion.p>
      <motion.p variants={entrance} className="mt-5 text-sm leading-relaxed text-slate-400">MSc studies in Artificial Intelligence · University of Bath</motion.p>
      <motion.div variants={entrance} className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className={primaryLink}>Explore my work <ArrowIcon /></a>
        <a href={showCV ? '#cv' : '#contact'} className={secondaryLink}>{showCV ? 'CV & background' : 'Get in touch'}</a>
      </motion.div>
    </motion.div>
  )
}
