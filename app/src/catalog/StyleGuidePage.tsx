import {
  categoricalSets,
  foundation,
  semantic,
  sequentialSets,
} from "style-guide/js/nbi/palette.js";
import { ModelCard } from "../components/ModelCard";
import { ThemeControls } from "../components/ThemeControls";
import { ThemeCatalog } from "./ThemeCatalog";
import styles from "./catalog.module.css";

type Swatch = {
  name: string;
  var: string;
  background: string;
  foreground?: string;
};

const nbiBrandSwatches: Swatch[] = [
  { name: "Yellow", var: "--nbi-yellow", background: "var(--nbi-yellow)", foreground: "var(--nbi-on-yellow)" },
  { name: "Paper", var: "--nbi-paper", background: "var(--nbi-paper)" },
  { name: "White (surface)", var: "--nbi-white", background: "var(--nbi-white)" },
  { name: "Navy", var: "--nbi-navy", background: "var(--nbi-navy)" },
  { name: "Ink", var: "--nbi-ink", background: "var(--nbi-ink)", foreground: "var(--nbi-paper)" },
  { name: "Line", var: "--nbi-line", background: "var(--nbi-line)" },
  { name: "Muted", var: "--nbi-muted", background: "var(--nbi-muted)" },
  { name: "Accent ink", var: "--nbi-accent-ink", background: "var(--nbi-accent-ink)", foreground: "var(--nbi-paper)" },
];

const semanticSwatches: Swatch[] = [
  { name: "Good", var: "--nbi-good", background: "var(--nbi-good)", foreground: "var(--nbi-on-yellow)" },
  { name: "Fair", var: "--nbi-fair", background: "var(--nbi-fair)" },
  { name: "Poor", var: "--nbi-poor", background: "var(--nbi-poor)", foreground: "var(--nbi-on-yellow)" },
  { name: "Unrated", var: "--nbi-unrated", background: "var(--nbi-unrated)" },
];

const vizSurfaceSwatches: Swatch[] = [
  { name: "Chart surface", var: "--viz-surface", background: "var(--viz-surface)" },
  { name: "Chart ink", var: "--viz-ink", background: "var(--viz-ink)", foreground: "var(--viz-surface)" },
  { name: "Grid", var: "--viz-grid", background: "var(--viz-grid)" },
];

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className={styles.swatchGrid}>
      {items.map((item) => (
        <div key={item.var} className={styles.swatch}>
          <div
            className={styles.swatchColor}
            style={{
              background: item.background,
              color: item.foreground ?? "var(--nbi-ink)",
            }}
          />
          <div className={styles.swatchMeta}>
            <span className={styles.swatchName}>{item.name}</span>
            <span className={styles.swatchVar}>{item.var}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VizSpectrum({ name, colors }: { name: string; colors: readonly string[] }) {
  return (
    <div className="nbi-spectrum">
      <div className="nbi-spectrum__head">
        <strong>{name}</strong>
        <small>50 · locked brand step</small>
      </div>
      <div className="nbi-spectrum__colors">
        {colors.map((color, index) => (
          <i
            key={`${name}-${index}`}
            className="nbi-spectrum__color"
            style={{ background: color }}
            title={color}
          >
            <span>{index * 10}</span>
          </i>
        ))}
      </div>
    </div>
  );
}

function PaletteSet({ name, colors }: { name: string; colors: readonly string[] }) {
  return (
    <div className="nbi-palette-set">
      <div className="nbi-palette-set__head">
        <strong>{name}</strong>
        <code>{colors.length} colors</code>
      </div>
      <div className="nbi-palette-set__colors">
        {colors.map((color, index) => (
          <i key={`${name}-${index}`} style={{ background: color }} title={color} />
        ))}
      </div>
    </div>
  );
}

function CatalogSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? <p className={styles.sectionDesc}>{description}</p> : null}
      {children}
    </section>
  );
}

const NAV = [
  { href: "#themes", label: "Themes" },
  { href: "#colors", label: "Colors" },
  { href: "#palette", label: "Palette" },
  { href: "#typography", label: "Typography" },
  { href: "#layout", label: "Layout" },
  { href: "#patterns", label: "Patterns" },
  { href: "#buttons", label: "Buttons" },
  { href: "#components", label: "Components" },
];

export function StyleGuidePage() {
  return (
    <div className={`${styles.page} catalog-prose`}>
      <header className={styles.header}>
        <span className="nbi-eyebrow">Style guide / Catalog</span>
        <h1>NBI Rook design system</h1>
        <p className={styles.lead}>
          Light and dark theme from the Observable <strong>nbi-rook</strong> project: tokens, chart
          palette, and every <code>.nbi-*</code> pattern. Ship from this package; sync{" "}
          <code>css/nbi/</code> and <code>js/nbi/</code> into Observable <code>src/lib/</code>.
        </p>
        <ThemeControls />
      </header>

      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Catalog sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div>
          <CatalogSection
            id="themes"
            title="Themes"
            description="Four named presets in this package (two families × light/dark). Pick one to preview the full page; registry also lists Observable platform themes for reference."
          >
            <ThemeCatalog />
            <div className={styles.row} style={{ marginTop: "1.5rem" }}>
              <span className="status-info">Info</span>
              <span className="status-success">Success / good</span>
              <span className="status-warning">Warning / fair</span>
              <span className="status-error">Error / poor</span>
            </div>
            <p className={styles.sectionDesc} style={{ marginTop: "1rem" }}>
              When <strong>Rook Legacy</strong> is active, NBI-specific layout classes (
              <code>.nbi-kpi</code>, etc.) below may not match production — switch back to{" "}
              <strong>NBI Rook</strong> to review those patterns.
            </p>
          </CatalogSection>

          <CatalogSection
            id="colors"
            title="Colors"
            description="Brand surfaces and semantic roles from nbi-theme.css. Chart canvas uses --viz-surface."
          >
            <h3>Brand & UI</h3>
            <SwatchGrid items={nbiBrandSwatches} />
            <h3>Semantic (condition)</h3>
            <SwatchGrid items={semanticSwatches} />
            <h3>Visualization</h3>
            <SwatchGrid items={vizSurfaceSwatches} />
          </CatalogSection>

          <CatalogSection
            id="palette"
            title="Visualization palette"
            description="Foundation ramps and curated sets from js/nbi/palette.js (Plot / Observable)."
          >
            <div className="nbi-spectrum-list">
              <VizSpectrum name="Neutral" colors={foundation.neutral} />
              <VizSpectrum name="Yellow" colors={foundation.yellow} />
            </div>
            <div className="nbi-palette-sets">
              <PaletteSet name="Pair" colors={categoricalSets[2]} />
              <PaletteSet name="Four categories" colors={categoricalSets[4]} />
              <PaletteSet name="Extended categorical" colors={categoricalSets[10]} />
              <PaletteSet name="Condition (5-step)" colors={sequentialSets.condition5} />
            </div>
            <div className="nbi-swatches">
              {(
                [
                  ["Good", semantic.good],
                  ["Fair", semantic.fair],
                  ["Poor", semantic.poor],
                  ["Unrated", semantic.unrated],
                ] as const
              ).map(([label, color]) => (
                <div key={label} className="nbi-swatch">
                  <i style={{ background: color }} />
                  <strong>{label}</strong>
                  <small>{color}</small>
                </div>
              ))}
            </div>
          </CatalogSection>

          <CatalogSection
            id="typography"
            title="Typography"
            description="Inter for prose; ui-monospace eyebrows and labels match Observable pages."
          >
            <div className="nbi-intro" style={{ marginTop: 0 }}>
              <div>
                <span className="nbi-eyebrow">Sample eyebrow</span>
                <h1 style={{ margin: ".5rem 0 0" }}>Display heading</h1>
              </div>
              <p>Supporting copy uses muted foreground for comfortable reading on cream or near-black.</p>
            </div>
            <div className={styles.typeSample}>
              <h2>Heading level 2</h2>
              <p>Section titles for dashboards and analysis pages.</p>
            </div>
            <div className={styles.typeSample}>
              <h3>Heading level 3</h3>
              <p>Accent bar on the left in brand yellow (catalog prose).</p>
            </div>
            <div className={styles.typeSample}>
              <h4>Heading level 4</h4>
              <p>Uppercase label style for subsections.</p>
            </div>
            <p>
              Inline <a href="#colors">link</a> uses <code>--nbi-accent-ink</code> in light mode.
            </p>
          </CatalogSection>

          <CatalogSection
            id="layout"
            title="Layout blocks"
            description="KPI strip, panels, and section headers used on the nbi-rook dashboard."
          >
            <div className="nbi-kpis">
              <div className="nbi-kpi">
                <span>Bridges tracked</span>
                <strong>624k</strong>
                <small>National Inventory</small>
              </div>
              <div className="nbi-kpi nbi-kpi--accent">
                <span>Good share</span>
                <strong>42%</strong>
                <small>Condition rating 7+</small>
              </div>
              <div className="nbi-kpi">
                <span>States</span>
                <strong>56</strong>
                <small>Including DC</small>
              </div>
              <div className="nbi-kpi">
                <span>Updated</span>
                <strong>2024</strong>
                <small>Reporting year</small>
              </div>
            </div>
            <div className="nbi-grid-2">
              <div className="nbi-panel">
                <div className="nbi-panel__head">
                  <h2>Panel title</h2>
                  <span>Ref</span>
                </div>
                <p style={{ margin: 0, color: "var(--nbi-muted)" }}>
                  Card surface on <code>--nbi-white</code> with hairline border.
                </p>
              </div>
              <div className="nbi-panel">
                <span className="nbi-eyebrow">Secondary</span>
                <h2>Compact panel</h2>
              </div>
            </div>
            <div className="nbi-section-head">
              <div>
                <span className="nbi-eyebrow">Section</span>
                <h2>Section head</h2>
              </div>
              <p>Yellow top rule and optional description column.</p>
            </div>
          </CatalogSection>

          <CatalogSection
            id="patterns"
            title="Data & navigation patterns"
            description="Condition bars, catalog cards, state focus, flow, and callouts from nbi-rook tools."
          >
            <div className="nbi-condition-bar" aria-hidden>
              <span className="is-good" style={{ flex: 4 }} />
              <span className="is-fair" style={{ flex: 2 }} />
              <span className="is-poor" style={{ flex: 1 }} />
              <span className="is-unrated" style={{ flex: 1 }} />
            </div>
            <div className="nbi-condition-legend">
              <div>
                <i className="good" />
                <span>Good</span>
                <strong>42%</strong>
              </div>
              <div>
                <i className="fair" />
                <span>Fair</span>
                <strong>31%</strong>
              </div>
              <div>
                <i className="poor" />
                <span>Poor</span>
                <strong>18%</strong>
              </div>
              <div>
                <i className="unrated" />
                <span>Unrated</span>
                <strong>9%</strong>
              </div>
            </div>

            <div className="nbi-catalog" style={{ marginTop: "2rem" }}>
              <a className="nbi-catalog-card" href="#patterns">
                <div>
                  <span className="nbi-status">Live</span>
                </div>
                <h3>Catalog card</h3>
                <p>Linked tile for analyses, tools, and methods index pages.</p>
                <strong>Open →</strong>
              </a>
              <a className="nbi-catalog-card" href="#patterns">
                <div>
                  <span className="nbi-status">Prototype</span>
                </div>
                <h3>Second card</h3>
                <p>Hover lifts and accent border.</p>
                <strong>Open →</strong>
              </a>
              <a className="nbi-catalog-card" href="#patterns">
                <div>
                  <span className="nbi-status">Live</span>
                </div>
                <h3>Third card</h3>
                <p>Three-up grid on wide viewports.</p>
                <strong>Open →</strong>
              </a>
            </div>

            <div className="nbi-state-focus" style={{ marginTop: "2rem" }}>
              <div className="nbi-state-code">TX</div>
              <div className="nbi-state-primary">
                <strong>Texas</strong>
                <small>Focused state · State Explorer</small>
              </div>
              <dl className="nbi-state-facts">
                <div>
                  <dt>Bridges</dt>
                  <dd>54,432</dd>
                </div>
                <div>
                  <dt>Good %</dt>
                  <dd>38</dd>
                </div>
                <div>
                  <dt>Poor %</dt>
                  <dd>12</dd>
                </div>
              </dl>
            </div>

            <div className="nbi-flow">
              <div>
                <strong>Input</strong>
                <p>Filter or selection step.</p>
              </div>
              <span aria-hidden>→</span>
              <div>
                <strong>Transform</strong>
                <p>Notebook or tool logic.</p>
              </div>
              <span aria-hidden>→</span>
              <div>
                <strong>View</strong>
                <p>Chart or table output.</p>
              </div>
            </div>

            <div className="nbi-callout">
              <p>
                <strong>Callout.</strong> Yellow-soft background for methods notes and caveats.
              </p>
            </div>

            <div className="nbi-tool-controls">
              <div>
                <span className="nbi-eyebrow">Control</span>
                <p style={{ margin: ".5rem 0 0" }}>Tool filter slot</p>
              </div>
              <div>
                <span className="nbi-eyebrow">Control</span>
                <p style={{ margin: ".5rem 0 0" }}>Tool filter slot</p>
              </div>
              <div>
                <span className="nbi-eyebrow">Control</span>
                <p style={{ margin: ".5rem 0 0" }}>Tool filter slot</p>
              </div>
            </div>
          </CatalogSection>

          <CatalogSection
            id="buttons"
            title="Buttons"
            description="Utility classes from nbi-utilities.css for apps outside Observable."
          >
            <div className={styles.row}>
              <button type="button" className="btn-primary">
                Primary
              </button>
              <button type="button" className="btn-secondary">
                Secondary
              </button>
              <button type="button" className="nbi-theme-switch" style={{ position: "static", boxShadow: "none" }}>
                Theme switch
              </button>
            </div>
          </CatalogSection>

          <CatalogSection
            id="components"
            title="Components"
            description="React model card plus plain HTML card pattern."
          >
            <div className={styles.cardStack}>
              <article className="card" style={{ maxWidth: "18rem" }}>
                <h3>Card</h3>
                <p>Bordered surface using theme <code>.card</code>.</p>
                <a href="#components">Learn more</a>
              </article>
              <ModelCard
                title="Model card"
                description="React wrapper using CSS modules + token aliases."
                meta="Application"
                actionHref="#components"
                actionLabel="Open application"
              />
            </div>
          </CatalogSection>
        </div>
      </div>
    </div>
  );
}
