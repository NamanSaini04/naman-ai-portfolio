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

The MSc Artificial Intelligence at the University of Bath is user-supplied. Dates and completion status are unconfirmed. Professional experience, certifications, and an approved CV have not been supplied and remain clearly labelled placeholders. No CV download link is published until a document is available. The four project records and project card component are preserved from the initial build.
