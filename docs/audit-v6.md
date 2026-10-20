# Portfolio audit V6 review

Base: `348f900151d7456bfe7530220595d9d16bf34273` (V5). Working branch: `portfolio-audit-v6`.

## Implemented changes

- Four source-code links now use `View on GitHub — {project title}`.
- Two enlargement links now use `Open full-size image — {project title}: {figure label} (opens in a new tab)`.
- Two provenance links now use `Repository source — {project title}: {figure label}`.
- Accessible names contain the exact visible wording, in the same order, and preserve project context. No visible link text changed.
- Inline project images use responsive resized WebP thumbnails encoded losslessly; original PNGs remain byte-for-byte unchanged for full-size viewing. Original captions, alternatives, source destinations, descriptions, and image proportions remain intact. See `project-assets.md` for thumbnail dimensions and encoding.

## Bundle review

Reviewed production imports and a diagnostic source map generated outside the checkout. Runtime code is principally React/ReactDOM and Motion, all required by existing functionality. The disabled CV copy is already absent from the built bundle. No clearly unnecessary runtime dependency was found, so no framework changes, animation removals, or major rewrites were made. No runtime dependencies were added; axe-core was installed only in a temporary validation directory.

Production JavaScript: approximately 374.66 kB uncompressed / 119.07 kB gzip, versus V5's approximately 374.27 / 118.87 kB. The small increase represents thumbnail URL/selection data and longer accessible names. Diagnostic source maps are not part of the production build or tracked files.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Production Chromium checks: 1440 × 900 at DPR 1 and 390 × 844 at DPR 2, with normal and reduced motion. Additional reduced-motion layout checks: 768 × 1024 and 320 × 740.
- Verified all eight exact accessible names, skip link, keyboard navigation, keyboard-operated project disclosures, focus indication, image loading, original-PNG enlargement, hidden CV, retained academic status, no horizontal overflow, and no console/page errors.
- axe-core WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA, best-practice checks, plus an explicit `label-content-name-mismatch` run: no violations in all six cases. Direct accessible-name assertions cover all eight links.
- axe marked gradient-background contrast checks incomplete (163 nodes per case); these are not counted as automated passes. Visual review and conservative computed-colour checks of the unchanged palette found ratios of 5.89:1 for muted text, 10.74:1 for cyan links against the lightest navy surface, and 13.97:1 for the primary CTA.
- Local layout-shift measurements were zero in the tested cases; these are local browser observations, not a new Lighthouse field-performance claim.
- Browser-selected inline image payload: 31,888 bytes at desktop DPR 1 and 33,936 bytes at mobile DPR 2, compared with 113,120 bytes for both original PNGs (about 72% and 70% smaller). Original PNGs were not fetched for inline display. Both full-size destinations served the exact original bytes when opened.

## Preserved settings and limits

Profile/project records, original PNGs, colours, layout, Motion/reduced-motion implementation, page metadata, build configuration, and package manifests are unchanged from V5. Vercel preview `x-robots-tag: noindex` and deployment protection remain platform-managed and untouched. No canonical/social URL was added. The preview SEO deduction is expected to remain; it is not an application issue to bypass.

The supplied Lighthouse scores are the owner's V5 measurements, not rerun V6 results. A deployed V6 Lighthouse check and any hands-on assistive-technology review remain outside this local validation. No deployment was performed. No commits or pushes were made during implementation.
