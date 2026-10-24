import { ModelCard } from "../components/ModelCard";
import { ThemeToggle } from "../components/ThemeToggle";
import styles from "./catalog.module.css";

type Swatch = {
  name: string;
  var: string;
  background: string;
  foreground?: string;
};

const brandSwatches: Swatch[] = [
  { name: "Kiewit yellow", var: "--kiewit-yellow", background: "var(--kiewit-yellow)", foreground: "#111" },
  { name: "Black", var: "--kiewit-black", background: "var(--kiewit-black)" },
  { name: "Dark gray", var: "--kiewit-dark-gray", background: "var(--kiewit-dark-gray)" },
  { name: "Medium gray", var: "--kiewit-medium-gray", background: "var(--kiewit-medium-gray)" },
  { name: "Red", var: "--kiewit-red", background: "var(--kiewit-red)" },
  { name: "Orange", var: "--kiewit-orange", background: "var(--kiewit-orange)", foreground: "#111" },
  { name: "Blue", var: "--kiewit-blue", background: "var(--kiewit-blue)" },
  { name: "Green", var: "--kiewit-green", background: "var(--kiewit-green)" },
];

const surfaceSwatches: Swatch[] = [
  { name: "Page", var: "--kw-page", background: "var(--kw-page)" },
  { name: "Panel", var: "--kw-panel", background: "var(--kw-panel)" },
  { name: "Panel elevated", var: "--kw-panel-elevated", background: "var(--kw-panel-elevated)" },
  { name: "Border", var: "--kiewit-border", background: "var(--kiewit-border)" },
];

const portableSwatches: Swatch[] = [
  { name: "Primary", var: "--color-primary", background: "var(--color-primary)", foreground: "var(--color-primary-fg)" },
  { name: "Primary hover", var: "--color-primary-hover", background: "var(--color-primary-hover)", foreground: "#111" },
  { name: "Link", var: "--color-link", background: "var(--kw-page)", foreground: "var(--color-link)" },
];

const riskBands = [
  { label: "Very low", bg: "var(--sw-risk-very_low-bg)", fg: "var(--sw-risk-very_low-fg)", border: "var(--sw-risk-very_low-border)" },
  { label: "Low", bg: "var(--sw-risk-low-bg)", fg: "var(--sw-risk-low-fg)", border: "var(--sw-risk-low-border)" },
  { label: "Medium", bg: "var(--sw-risk-medium-bg)", fg: "var(--sw-risk-medium-fg)", border: "var(--sw-risk-medium-border)" },
  { label: "High", bg: "var(--sw-risk-high-bg)", fg: "var(--sw-risk-high-fg)", border: "var(--sw-risk-high-border)" },
  { label: "Very high", bg: "var(--sw-risk-very_high-bg)", fg: "var(--sw-risk-very_high-fg)", border: "var(--sw-risk-very_high-border)" },
  { label: "N/A", bg: "var(--sw-risk-na-bg)", fg: "var(--sw-risk-na-fg)", border: "var(--sw-risk-na-border)" },
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
              color: item.foreground ?? "var(--kw-text)",
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
  { href: "#typography", label: "Typography" },
  { href: "#buttons", label: "Buttons" },
  { href: "#components", label: "Components" },
  { href: "#risk", label: "Risk bands" },
];

export function StyleGuidePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Style guide catalog</h1>
        <p className={styles.lead}>
          Living reference for the Kiewit / Rook theme: tokens, light and dark surfaces, and shared UI
          patterns. Observable sites and Vite apps should pull from the same <code>style-guide</code>{" "}
          package.
        </p>
        <ThemeToggle />
      </header>

      <div className={styles.layout}>
        <nav className={styles.nav} aria-label="Catalog sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div>
          <CatalogSection
            id="themes"
            title="Themes"
            description='Dark is default. Light mode uses html[data-kiewit-theme="light"] — toggle with the button above (same storage key as Rook).'
          >
            <div className={styles.row}>
              <span className="status-info">Info</span>
              <span className="status-success">Success</span>
              <span className="status-warning">Warning</span>
              <span className="status-error">Error</span>
            </div>
          </CatalogSection>

          <CatalogSection id="colors" title="Colors" description="Brand, surfaces, and portable aliases from variables.css.">
            <h3>Brand</h3>
            <SwatchGrid items={brandSwatches} />
            <h3>Surfaces</h3>
            <SwatchGrid items={surfaceSwatches} />
            <h3>Portable aliases</h3>
            <SwatchGrid items={portableSwatches} />
          </CatalogSection>

          <CatalogSection id="typography" title="Typography" description="Inter stack from the Rook theme; heading rules match Observable pages.">
            <div className={styles.typeSample}>
              <h1>Heading level 1</h1>
              <p>Body text uses muted foreground for comfortable reading on dark or light canvas.</p>
            </div>
            <div className={styles.typeSample}>
              <h2>Heading level 2</h2>
              <p>Section titles for dashboards and analysis pages.</p>
            </div>
            <div className={styles.typeSample}>
              <h3>Heading level 3</h3>
              <p>Accent bar on the left in brand yellow.</p>
            </div>
            <div className={styles.typeSample}>
              <h4>Heading level 4</h4>
              <p>Uppercase label style for subsections.</p>
            </div>
            <p>
              Inline <a href="#colors">link</a> and <code>monospace</code> from theme tokens.
            </p>
          </CatalogSection>

          <CatalogSection id="buttons" title="Buttons" description="Classes from kiewit-theme.css — use in HTML or className in React.">
            <div className={styles.row}>
              <button type="button" className="btn-primary">Primary</button>
              <button type="button" className="btn-secondary">Secondary</button>
            </div>
          </CatalogSection>

          <CatalogSection id="components" title="Components" description="Documented patterns; promote shared CSS to the package when stable.">
            <div className={styles.cardStack}>
              <article className="card" style={{ maxWidth: "18rem" }}>
                <h3 style={{ marginTop: 0 }}>Card</h3>
                <p>Bordered surface using theme <code>.card</code>.</p>
                <a href="#components">Learn more</a>
              </article>
              <ModelCard
                title="Model card"
                description="React wrapper using CSS modules + tokens."
                meta="Application"
                actionHref="#components"
                actionLabel="Open application"
              />
            </div>
          </CatalogSection>

          <CatalogSection id="risk" title="Risk bands" description="Shared risk / quality scale used in Rook tables and charts.">
            <div className={styles.riskRow}>
              {riskBands.map((band) => (
                <span
                  key={band.label}
                  className={styles.riskChip}
                  style={{
                    background: band.bg,
                    color: band.fg,
                    borderColor: band.border,
                  }}
                >
                  {band.label}
                </span>
              ))}
            </div>
          </CatalogSection>
        </div>
      </div>
    </div>
  );
}
