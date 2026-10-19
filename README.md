# Naman AI Portfolio

A responsive React + Vite + Tailwind CSS portfolio with a dark theme, lime accents, and Hero, About, Projects, and Contact sections. Includes keyboard focus indicators, a skip link, and reduced-motion support.

## Requirements and setup

Use Node.js 22.12+ (22.x) or 24+ and npm. No credentials, environment variables, or backend services are required.

```sh
npm install
npm run dev -- --host 0.0.0.0
```

For repeatable installation after a lockfile is present, use `npm ci`.

## Validation and production

```sh
npm run lint
npm run build
npm run preview -- --host 0.0.0.0
```

Build output is in `dist/`. Preview is for local inspection. Configure Vite's `base` when hosting below a subpath. There is no committed automated test suite.

## Structure

- `src/App.jsx`: page sections and navigation
- `src/components/`: project card and SVG arrow
- `src/data/portfolio.js`: project content and GitHub URL
- `src/index.css`: Tailwind and global accessibility styles
- `src/main.jsx`: React entry point
- `index.html`: title and metadata
- `vite.config.js`: React and Tailwind plugins

## Content accuracy

Four project cards link to their actual GitHub repositories. Fraud Detection and SOC Copilot are featured first. Completion labels reflect repository documentation, not independently executed project validations. SOC Copilot is a working MVP using synthetic data and TF-IDF retrieval. Job Market is in progress at Phase 3; dbt and dashboards remain planned. Incident Analytics uses 18,000 synthetic records, confirmed in its generator. No model performance, realised savings, production deployment, or professional achievement claims are made.

Cards include technology badges, keyboard-accessible implementation disclosures, and descriptive GitHub links. Edit `src/data/portfolio.js` to maintain content. See `docs/project-sources.md` for source evidence.

## Recovery

The previous environment was unavailable and contained uncommitted work. No source files, patches, or unreachable Git objects were recovered from the current filesystem. This project was reconstructed from source recorded in the conversation, preserving the prior layout and styling, including SVG arrows, mobile navigation targets, and improved footer contrast. Project placeholders were subsequently replaced with the four user-supplied projects after repository README and source inspection. The lockfile was regenerated.

## Design v2 draft

The `portfolio-design-v2` branch adds a recruiter-focused introduction, Technical Skills, Professional Experience, Education, Certifications, and CV sections. Shared section headings live in `src/components/SectionHeading.jsx`; project-evidenced skill groups live in `src/data/profile.js`.

Education dates, two professional roles, four certification titles, email, and LinkedIn contact details were supplied by the owner from their LinkedIn profile. MSc coursework is completed; the final award classification awaits official university confirmation. No Merit or official degree award is claimed. Certification issuers, issue dates, and credential IDs are omitted because they were not supplied. No proficiency claims were inferred from certification titles.

An approved CV has not been supplied. The CV section remains a placeholder with no download link; a LinkedIn profile PDF must not be substituted. The four project records and project card component are preserved from the initial build.

## Motion v3 draft

The `portfolio-motion-v3` branch refines the presentation with a midnight-navy palette, cyan accents, CSS gradient lighting, and a fine hero grid. No remote font, image, or animation assets are required. Profile and project data are unchanged.

Motion for React (`motion`, imported from `motion/react`) powers staggered hero entrances, once-only scroll reveals, and restrained project-card elevation. Individual transitions last 200–450ms. `MotionConfig` and `useReducedMotion` respect the system preference; reduced-motion mode removes entrance transforms, stagger, hover elevation, and smooth scrolling. Content never begins at zero opacity, so offscreen keyboard navigation remains readable. Project details retain native keyboard-accessible disclosure controls.

`src/components/HeroIntro.jsx` owns the hero sequence; `src/components/RevealSection.jsx` owns section entrances. CSS handles button/link states and disables transitions for reduced motion. A small local SVG favicon avoids a missing-icon request. No background loops, parallax, or external artwork are used.

## Polish v4 draft

`portfolio-polish-v4` gives the fraud and SOC projects full-width featured showcases with original, unmodified repository figures. Asset hashes, immutable source links, and interpretation limits are in `docs/project-assets.md`. The figures load lazily, reserve their dimensions, include text alternatives, and link to full-size originals for mobile reading. Project descriptions, skills, experience, education, certifications, contact details, and the professional hero headline are preserved.

A static SVG motif adds a subtle data/model/security cue without new animation or dependencies. Section headings and mobile spacing are tightened. The CV section remains ready for an approved document, without a download control or substituted LinkedIn PDF. Completion notes remain available in project disclosures.

## Prelaunch v5 draft

`portfolio-prelaunch-v5` adds clearer project-image framing and a visible, keyboard-accessible “Open full-size image” control. Original figures, captions, alt text, provenance, and full-size destinations remain unchanged.

The public CV section, navigation item, and hero CV link are disabled through `showCV` in `src/data/siteConfig.js`. `src/components/CvSection.jsx` retains the implementation for later activation; first supply an approved separate CV and wire its verified download URL. The hero action currently links to Contact instead.

The static HTML contains an AI/Data Engineering title, a description covering Machine Learning and Cybersecurity Analytics, and matching Open Graph and Twitter summary metadata. Canonical URL, social URL, and preview image are intentionally omitted until a deployment address and approved image are known.
