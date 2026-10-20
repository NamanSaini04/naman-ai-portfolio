import fraudChart from '../assets/projects/fraud-cost-threshold.png'
import socArchitecture from '../assets/projects/soc-architecture.png'
import fraudSmall from '../assets/projects/thumbnails/fraud-cost-threshold-440.webp'
import fraudLarge from '../assets/projects/thumbnails/fraud-cost-threshold-880.webp'
import socSmall from '../assets/projects/thumbnails/soc-architecture-645.webp'
import socLarge from '../assets/projects/thumbnails/soc-architecture-1290.webp'

// Full-size assets remain unmodified. Lossless-WebP thumbnails are resized derivatives.
// Provenance: docs/project-assets.md.
export const projectMedia = {
  'fraud-detection': {
    src: fraudChart,
    thumbnail: fraudSmall,
    srcSet: `${fraudSmall} 440w, ${fraudLarge} 880w`,
    width: 880,
    height: 440,
    label: 'Cost-based threshold analysis',
    alt: 'Original fraud project chart showing illustrative expected cost across decision thresholds.',
    caption: 'Offline threshold analysis with illustrative cost assumptions; not realised savings.',
    source: 'https://github.com/NamanSaini04/Financial-fraud-detection/blob/748ff564a927956eefc791187e90ade4b9b441c4/reports/figures/07_cost_vs_threshold.png',
  },
  'soc-copilot': {
    src: socArchitecture,
    thumbnail: socSmall,
    srcSet: `${socSmall} 645w, ${socLarge} 1290w`,
    width: 1935,
    height: 1062,
    label: 'SOC investigation architecture',
    alt: 'Original SOC Copilot architecture linking synthetic alerts, Streamlit, FastAPI, agent workflows, RAG, MCP tools, human approval, and incident reports.',
    caption: 'Repository architecture diagram. The working MVP uses synthetic alerts and logs.',
    source: 'https://github.com/NamanSaini04/soc-copilot/blob/42f199f1f1e2e3cb1d5d433b2e59381f475cff76/reports/technical/assets/architecture.png',
  },
}
