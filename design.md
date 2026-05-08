# Digital Orchard OS Design System

```yaml
version: 1.0
name: Digital Orchard OS (Carbon Engineered)
description: "An infrastructure-first design system merging Digital Orchard OS colors with IBM Carbon flat geometry and light-weight IBM Plex Sans typography. No rounded corners, no drop shadows. Precise engineering."

colors:

// Brand Accent

primary: "#4ADE80"
primary-pressed: "#22C55E"
primary-deep: "#16A34A"
on-primary: "#000000"

// Canvas & Surfaces

canvas: "#000000"
surface-1: "#080808"
surface-2: "#0F0F0F"
surface-3: "#141414"
surface-card: "#111111"
surface-hover: "#161616"
surface-elevated: "#1A1A1A"

// Borders & Hairlines

hairline: "rgba(255,255,255,0.06)"
hairline-mid: "rgba(255,255,255,0.10)"
hairline-strong: "rgba(255,255,255,0.18)"
hairline-active: "#4ADE80"

// Text Hierarchy

ink: "#FFFFFF"
ink-secondary: "rgba(255,255,255,0.70)"
ink-tertiary: "rgba(255,255,255,0.45)"
ink-disabled: "rgba(255,255,255,0.25)"

// Semantic & Data

semantic-success: "#4ADE80"
semantic-warning: "#F59E0B"
semantic-error: "#EF4444"
semantic-info: "#38BDF8"
semantic-neutral: "rgba(255,255,255,0.45)"

// Data Visualization (field-condition scale)

data-excellent: "#4ADE80"
data-good: "#86EFAC"
data-moderate: "#F59E0B"
data-stress: "#F97316"
data-critical: "#EF4444"

typography:

// Display tier — SF Pro Display at Apple's signature negative tracking

display-xl:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 64px
fontWeight: 600
lineHeight: 1.06
letterSpacing: "-0.5px"

display-lg:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 48px
fontWeight: 600
lineHeight: 1.08
letterSpacing: "-0.4px"

display-md:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 36px
fontWeight: 600
lineHeight: 1.11
letterSpacing: "-0.02em"

// Heading tier

heading-lg:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 28px
fontWeight: 500
lineHeight: 1.18
letterSpacing: "-0.018em"

heading-md:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 22px
fontWeight: 500
lineHeight: 1.22
letterSpacing: "-0.015em"

heading-sm:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 17px
fontWeight: 500
lineHeight: 1.29
letterSpacing: "-0.012em"

// Body tier — SF Pro Text

body-lg:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 17px
fontWeight: 400
lineHeight: 1.47
letterSpacing: "0.16px"

body-md:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 15px
fontWeight: 400
lineHeight: 1.47
letterSpacing: "0.16px"

body-sm:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 13px
fontWeight: 400
lineHeight: 1.38
letterSpacing: "0.16px"

// Utility & Micro

label:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 13px
fontWeight: 500
lineHeight: 1.38
letterSpacing: "-0.006em"

caption:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 11px
fontWeight: 400
lineHeight: 1.36
letterSpacing: "0.006em"

eyebrow:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 11px
fontWeight: 500
lineHeight: 1.36
letterSpacing: "0.08em"
textTransform: uppercase

// Interactive

button-lg:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 15px
fontWeight: 500
lineHeight: 1.20
letterSpacing: "0.16px"

button-md:
fontFamily: "-apple-system, BlinkMacSystemFont, "IBM Plex Sans", system-ui, sans-serif"
fontSize: 13px
fontWeight: 500
lineHeight: 1.20
letterSpacing: "-0.006em"

monospace:
fontFamily: ""IBM Plex Mono", 'Fira Code', 'Cascadia Code', monospace"
fontSize: 13px
fontWeight: 400
lineHeight: 1.54
letterSpacing: "0"

rounded:
none: 0px
xs: 4px
sm: 8px
md: 12px
lg: 16px
xl: 20px
xxl: 24px
pill: 9999px
circle: 9999px

spacing:
xxs: 4px
xs: 8px
sm: 12px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
xxxl: 64px
section: 96px
hero: 128px

components:

// ── BUTTONS ──────────────────────────────────────────────────────────────────

button-primary:
backgroundColor: "{colors.primary}"
textColor: "{colors.on-primary}"
typography: "{typography.button-lg}"
rounded: "{rounded.pill}"
padding: "10px 20px"
height: 40px

button-primary-pressed:
backgroundColor: "{colors.primary-pressed}"
textColor: "{colors.on-primary}"
rounded: "{rounded.pill}"

button-secondary:
backgroundColor: "transparent"
textColor: "{colors.ink}"
typography: "{typography.button-lg}"
rounded: "{rounded.pill}"
padding: "9px 19px"
height: 40px
border: "1px solid {colors.hairline-strong}"

button-secondary-pressed:
backgroundColor: "{colors.surface-hover}"
textColor: "{colors.ink}"
border: "1px solid {colors.hairline-strong}"

button-ghost:
backgroundColor: "transparent"
textColor: "{colors.primary}"
typography: "{typography.button-md}"
rounded: "{rounded.pill}"
padding: "7px 14px"

button-danger:
backgroundColor: "{colors.semantic-error}"
textColor: "#ffffff"
typography: "{typography.button-lg}"
rounded: "{rounded.pill}"
padding: "10px 20px"
height: 40px

button-disabled:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink-disabled}"
rounded: "{rounded.pill}"

// ── NAVIGATION ───────────────────────────────────────────────────────────────

top-nav:
backgroundColor: "rgba(0,0,0,0.80)"
textColor: "{colors.ink-secondary}"
typography: "{typography.body-md}"
height: 44px
backdropFilter: "blur(20px) saturate(180%)"
borderBottom: "1px solid {colors.hairline}"

sidebar-nav:
backgroundColor: "{colors.surface-1}"
textColor: "{colors.ink-tertiary}"
typography: "{typography.label}"
width: 220px
borderRight: "1px solid {colors.hairline}"

sidebar-nav-item-active:
backgroundColor: "{colors.surface-3}"
textColor: "{colors.ink}"
rounded: "{rounded.md}"

breadcrumb:
textColor: "{colors.ink-tertiary}"
typography: "{typography.caption}"
separatorColor: "{colors.ink-disabled}"

// ── SURFACE HIERARCHY ────────────────────────────────────────────────────────

feature-card:
backgroundColor: "{colors.surface-card}"
textColor: "{colors.ink}"
typography: "{typography.body-md}"
rounded: "{rounded.xl}"
padding: 24px
border: "1px solid {colors.hairline}"

feature-card-hover:
backgroundColor: "{colors.surface-hover}"
border: "1px solid {colors.hairline-mid}"

stat-card:
backgroundColor: "{colors.surface-card}"
textColor: "{colors.ink}"
rounded: "{rounded.xl}"
padding: "20px 24px"
border: "1px solid {colors.hairline}"

data-card:
backgroundColor: "{colors.surface-1}"
textColor: "{colors.ink}"
typography: "{typography.body-md}"
rounded: "{rounded.lg}"
padding: 16px
border: "1px solid {colors.hairline}"

hero-card:
backgroundColor: "{colors.canvas}"
textColor: "{colors.ink}"
typography: "{typography.display-xl}"
rounded: "{rounded.none}"
padding: "128px 48px"

cta-banner:
backgroundColor: "{colors.surface-1}"
textColor: "{colors.ink}"
typography: "{typography.heading-lg}"
rounded: "{rounded.xxl}"
padding: "48px 40px"
border: "1px solid {colors.hairline}"

alert-card:
backgroundColor: "{colors.surface-card}"
rounded: "{rounded.lg}"
padding: "14px 16px"
border: "1px solid {colors.hairline-mid}"

// ── DASHBOARD ────────────────────────────────────────────────────────────────

dashboard-panel:
backgroundColor: "{colors.surface-1}"
rounded: "{rounded.xl}"
padding: "20px"
border: "1px solid {colors.hairline}"

metric-tile:
backgroundColor: "{colors.surface-card}"
rounded: "{rounded.lg}"
padding: "16px 20px"
border: "1px solid {colors.hairline}"

chart-container:
backgroundColor: "{colors.surface-1}"
rounded: "{rounded.xl}"
padding: "20px 24px"
border: "1px solid {colors.hairline}"

field-map-overlay:
backgroundColor: "rgba(0,0,0,0.72)"
rounded: "{rounded.lg}"
backdropFilter: "blur(12px)"
border: "1px solid {colors.hairline-mid}"

data-table-row:
backgroundColor: "transparent"
textColor: "{colors.ink-secondary}"
typography: "{typography.body-md}"
padding: "12px 16px"
borderBottom: "1px solid {colors.hairline}"

data-table-row-active:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"

// ── INPUTS & FORMS ───────────────────────────────────────────────────────────

text-input:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"
typography: "{typography.body-lg}"
rounded: "{rounded.pill}"
padding: "10px 16px"
height: 40px
border: "1px solid {colors.hairline-mid}"

text-input-focused:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"
border: "1px solid {colors.primary}"
outline: "3px solid rgba(74,222,128,0.15)"

text-input-error:
border: "1px solid {colors.semantic-error}"
outline: "3px solid rgba(239,68,68,0.12)"

text-area:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"
typography: "{typography.body-lg}"
rounded: "{rounded.md}"
padding: "12px 16px"
border: "1px solid {colors.hairline-mid}"

select-input:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"
typography: "{typography.body-lg}"
rounded: "{rounded.pill}"
padding: "10px 16px"
height: 40px
border: "1px solid {colors.hairline-mid}"

search-bar:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink}"
typography: "{typography.body-md}"
rounded: "{rounded.pill}"
padding: "8px 14px"
height: 36px
border: "1px solid {colors.hairline}"

date-picker:
backgroundColor: "{colors.surface-card}"
textColor: "{colors.ink}"
rounded: "{rounded.lg}"
border: "1px solid {colors.hairline-mid}"
padding: "10px 16px"
height: 40px

// ── SEGMENTATION CONTROLS ────────────────────────────────────────────────────

tab:
backgroundColor: "transparent"
textColor: "{colors.ink-tertiary}"
typography: "{typography.label}"
rounded: "{rounded.none}"
padding: "8px 0px"
borderBottom: "2px solid transparent"

tab-active:
textColor: "{colors.ink}"
borderBottom: "2px solid {colors.primary}"

pill-tab:
backgroundColor: "{colors.surface-2}"
textColor: "{colors.ink-secondary}"
typography: "{typography.button-md}"
rounded: "{rounded.pill}"
padding: "6px 14px"

pill-tab-active:
backgroundColor: "{colors.surface-elevated}"
textColor: "{colors.ink}"
border: "1px solid {colors.hairline-strong}"

filter-chip:
backgroundColor: "transparent"
textColor: "{colors.ink-tertiary}"
typography: "{typography.caption}"
rounded: "{rounded.pill}"
padding: "4px 10px"
border: "1px solid {colors.hairline}"

filter-chip-active:
backgroundColor: "{colors.primary}"
textColor: "{colors.on-primary}"
border: "1px solid transparent"

// ── STATUS SIGNALS ───────────────────────────────────────────────────────────

badge-success:
backgroundColor: "rgba(74,222,128,0.12)"
textColor: "{colors.semantic-success}"
typography: "{typography.eyebrow}"
rounded: "{rounded.pill}"
padding: "3px 8px"

badge-warning:
backgroundColor: "rgba(245,158,11,0.12)"
textColor: "{colors.semantic-warning}"
typography: "{typography.eyebrow}"
rounded: "{rounded.pill}"
padding: "3px 8px"

badge-error:
backgroundColor: "rgba(239,68,68,0.12)"
textColor: "{colors.semantic-error}"
typography: "{typography.eyebrow}"
rounded: "{rounded.pill}"
padding: "3px 8px"

badge-info:
backgroundColor: "rgba(56,189,248,0.12)"
textColor: "{colors.semantic-info}"
typography: "{typography.eyebrow}"
rounded: "{rounded.pill}"
padding: "3px 8px"

badge-neutral:
backgroundColor: "{colors.surface-3}"
textColor: "{colors.ink-secondary}"
typography: "{typography.eyebrow}"
rounded: "{rounded.pill}"
padding: "3px 8px"

// ── MODALS & OVERLAYS ────────────────────────────────────────────────────────

modal:
backgroundColor: "{colors.surface-1}"
rounded: "{rounded.xxl}"
padding: "28px"
border: "1px solid {colors.hairline-mid}"
shadow: "0 32px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.04)"

drawer:
backgroundColor: "{colors.surface-1}"
borderLeft: "1px solid {colors.hairline}"
padding: "24px"

tooltip:
backgroundColor: "{colors.surface-elevated}"
textColor: "{colors.ink-secondary}"
typography: "{typography.caption}"
rounded: "{rounded.sm}"
padding: "6px 10px"
border: "1px solid {colors.hairline-mid}"

dropdown-menu:
backgroundColor: "{colors.surface-elevated}"
rounded: "{rounded.lg}"
padding: "6px"
border: "1px solid {colors.hairline-mid}"
shadow: "0 8px 32px rgba(0,0,0,0.60)"

dropdown-menu-item:
backgroundColor: "transparent"
textColor: "{colors.ink-secondary}"
typography: "{typography.body-md}"
rounded: "{rounded.sm}"
padding: "7px 10px"

dropdown-menu-item-hover:
backgroundColor: "{colors.surface-hover}"
textColor: "{colors.ink}"

// ── NOTIFICATIONS ────────────────────────────────────────────────────────────

notification-toast:
backgroundColor: "{colors.surface-elevated}"
rounded: "{rounded.lg}"
padding: "14px 16px"
border: "1px solid {colors.hairline-mid}"
shadow: "0 8px 24px rgba(0,0,0,0.60)"

alert-banner:
backgroundColor: "{colors.surface-2}"
rounded: "{rounded.md}"
padding: "12px 16px"
border: "1px solid {colors.hairline-mid}"

// ── FOOTER ───────────────────────────────────────────────────────────────────

footer:
backgroundColor: "{colors.surface-1}"
textColor: "{colors.ink-tertiary}"
typography: "{typography.body-sm}"
borderTop: "1px solid {colors.hairline}"
padding: "48px 32px"

---

## Overview

Digital Orchard OS is a precision agriculture platform — a professional operational system, not a consumer marketing surface. The design language reflects this: every surface, every component, every typographic choice is built to serve operators who spend hours inside the interface making high-stakes decisions about crops, logistics, and field conditions.

The system runs on two surfaces: **pure black canvas** (`{colors.canvas}` — `#000000`) for immersive hero and full-screen dashboard chapters, and a family of near-black elevated surfaces (`{colors.surface-1}` through `{colors.surface-elevated}`) for card and panel tiers. These two modes alternate down the page in a predictable rhythm — not for decoration, but because they encode a semantic distinction: black canvas means "you are inside the data," elevated surface means "here is an operational panel."

**Orchard Green** (`{colors.primary}` — `#4ADE80`) is the system's single accent. It carries every primary CTA, every active data signal, every confirmation badge, and the one decorative rule that matters: field health is good when the number is green. Nothing else competes for attention in this color.

**SF Pro** carries the entire typographic hierarchy. Display sizes (64 / 48 / 36px) run at weight 600 with Apple's signature negative tracking (`-0.03em` to `-0.02em`). This is not decorative — tight tracking at large sizes is how SF Pro was designed to be used, and it communicates the premium, precision-instrument character of the software. Body type is `SF Pro Text` at 17px / `1.47` line-height / `-0.022em` tracking — exactly Apple's documented body specification for information density at screen resolution.

**Key Characteristics:**

- Two-surface system: pure black canvas (`{colors.canvas}`) for hero/immersive chapters; near-black elevated surfaces for UI panels and cards
- Single accent: `{colors.primary}` Orchard Green for every primary action, active state, and positive data signal — used sparingly and with intent
- SF Pro Display / SF Pro Text across the entire hierarchy — no secondary typeface, no decorative font pairing
- Negative tracking from `-0.03em` (64px hero) to `-0.006em` (13px label) — the Apple tracking curve applied consistently
- Pill-shaped interactive controls (`{rounded.pill}`) for all buttons, inputs, and filter chips
- Hairline borders (`rgba(255,255,255,0.06)` to `rgba(255,255,255,0.18)`) carry all card hierarchy — no drop shadows on resting surfaces
- Monochrome data visualization scale using `{colors.data-excellent}` through `{colors.data-critical}` — field health encoded in a single semantic range

---

## Colors

### Brand & Accent

- **Orchard Green** (`{colors.primary}` — `#4ADE80`): The system's single chromatic accent. Primary CTA fills, active tab underlines, success states, positive data points, the field-health "excellent" indicator, and the subtle outline on focused inputs. If something is green, it means "good" or "act here."
- **Green Pressed** (`{colors.primary-pressed}` — `#22C55E`): Pressed and hovered state for primary buttons and active elements.
- **Green Deep** (`{colors.primary-deep}` — `#16A34A`): Deeply-pressed or high-density context (e.g., filled badge on dark surface where the standard green reads too bright).
- **On Primary** (`{colors.on-primary}` — `#000000`): Black type on green buttons — high contrast, consistent with the OS aesthetic.

### Canvas & Surfaces

The system uses a stepped dark surface scale. Each step is a precisely measured increment — not arbitrary.

- **Canvas** (`{colors.canvas}` — `#000000`): Pure black. The hero chapter, the full-screen map view, the authentication splash. Used full-bleed for immersive moments.
- **Surface 1** (`{colors.surface-1}` — `#080808`): The default page body between canvas chapters and the sidebar background. Barely lifted off black — perceptible in context, invisible in isolation.
- **Surface 2** (`{colors.surface-2}` — `#0F0F0F`): Input field fill and alternating section backgrounds.
- **Surface 3** (`{colors.surface-3}` — `#141414`): Active sidebar items, selected states.
- **Surface Card** (`{colors.surface-card}` — `#111111`): Feature cards, stat cards, data cards — the default panel fill.
- **Surface Hover** (`{colors.surface-hover}` — `#161616`): Hovered card state.
- **Surface Elevated** (`{colors.surface-elevated}` — `#1A1A1A`): Dropdowns, tooltips, modals — the topmost z-layer surface.

### Borders

All separation is carried by hairline borders at varying opacity — never by shadow at rest.

- **Hairline** (`{colors.hairline}` — `rgba(255,255,255,0.06)`): Default card border and section divide. Barely visible — just enough to define the edge.
- **Hairline Mid** (`{colors.hairline-mid}` — `rgba(255,255,255,0.10)`): Slightly more assertive; used for inputs, dropdowns, and elevated components.
- **Hairline Strong** (`{colors.hairline-strong}` — `rgba(255,255,255,0.18)`): Active elements, secondary button outlines, hovered card states.
- **Hairline Active** (`{colors.hairline-active}` — `#4ADE80`): Focused input outline and active tab underline — the single accent border.

### Text

- **Ink** (`{colors.ink}` — `#FFFFFF`): Primary headlines, primary body, active UI labels.
- **Ink Secondary** (`{colors.ink-secondary}` — `rgba(255,255,255,0.70)`): Body copy, sidebar labels, table cell values, card descriptions.
- **Ink Tertiary** (`{colors.ink-tertiary}` — `rgba(255,255,255,0.45)`): Placeholder text, metadata, helper copy, inactive tab labels.
- **Ink Disabled** (`{colors.ink-disabled}` — `rgba(255,255,255,0.25)`): Disabled controls and de-emphasized captions.

### Semantic

- **Success** (`{colors.semantic-success}` — `#4ADE80`): Identical to primary — healthy crop signals, confirmed actions, "online" indicators.
- **Warning** (`{colors.semantic-warning}` — `#F59E0B`): Soil moisture stress, temperature alerts, expiring thresholds.
- **Error** (`{colors.semantic-error}` — `#EF4444`): Critical crop failure, system errors, destructive confirmations.
- **Info** (`{colors.semantic-info}` — `#38BDF8`): Informational callouts, weather data overlays, neutral notifications.

### Data Visualization Scale

A purpose-built 5-stop field-health scale, used in map overlays, condition heatmaps, and crop status dashboards.

| Token                     | Value     | Condition                        |
| ------------------------- | --------- | -------------------------------- |
| `{colors.data-excellent}` | `#4ADE80` | Optimal — no intervention needed |
| `{colors.data-good}`      | `#86EFAC` | Healthy — monitor only           |
| `{colors.data-moderate}`  | `#F59E0B` | Suboptimal — schedule review     |
| `{colors.data-stress}`    | `#F97316` | Stress — intervention required   |
| `{colors.data-critical}`  | `#EF4444` | Critical — immediate action      |

---

## Typography

### Font Family

**SF Pro** is Apple's system typeface, available on all Apple devices and on macOS/iOS through the system font stack. It is accessed via the CSS system font stack:

```css
-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif
```

Two optical sizes are used:

- **SF Pro Display** (40px+): Optimized for large sizes with tighter spacing. Used for `display-xl`, `display-lg`, `display-md`.
- **SF Pro Text** (below 40px): Optimized for reading density. Used for all heading, body, label, and caption roles.

**SF Mono** for monospace: sensor readings, coordinates, crop counts, system values — any numeric or code context where character alignment matters.

### Hierarchy

| Token                     | Size | Weight | Line Height | Tracking | Use                                        |
| ------------------------- | ---- | ------ | ----------- | -------- | ------------------------------------------ |
| `{typography.display-xl}` | 64px | 300    | 1.06        | -0.03em  | Hero headline, full-bleed chapter title    |
| `{typography.display-lg}` | 48px | 300    | 1.08        | -0.025em | Section-opener headline                    |
| `{typography.display-md}` | 36px | 300    | 1.11        | -0.02em  | Dashboard panel headline, modal title      |
| `{typography.heading-lg}` | 28px | 500    | 1.18        | -0.018em | Card group heading, section title          |
| `{typography.heading-md}` | 22px | 500    | 1.22        | -0.015em | Card title, sidebar section header         |
| `{typography.heading-sm}` | 17px | 500    | 1.29        | -0.012em | In-card label heading, form section title  |
| `{typography.body-lg}`    | 17px | 400    | 1.47        | -0.022em | Primary body copy, hero paragraph          |
| `{typography.body-md}`    | 15px | 400    | 1.47        | -0.016px | Default card body, table cells             |
| `{typography.body-sm}`    | 13px | 400    | 1.38        | -0.01em  | Metadata, secondary descriptions           |
| `{typography.label}`      | 13px | 500    | 1.38        | -0.006em | Form labels, data field labels             |
| `{typography.caption}`    | 11px | 400    | 1.36        | 0.006em  | Timestamps, footnotes, helper text         |
| `{typography.eyebrow}`    | 11px | 500    | 1.36        | 0.08em   | Section eyebrows, badge labels (UPPERCASE) |
| `{typography.button-lg}`  | 15px | 500    | 1.20        | -0.016px | Primary and secondary button labels        |
| `{typography.button-md}`  | 13px | 500    | 1.20        | -0.006em | Compact button and pill tab labels         |
| `{typography.monospace}`  | 13px | 400    | 1.54        | 0        | Sensor values, coordinates, counts, IDs    |

### Principles

- **Negative tracking at all display sizes is required.** SF Pro Display was designed with tight negative tracking in mind. Leaving tracking at 0 on 64px headlines produces visually loose, generic output. The tracking values in the token table are the correct Apple-specified values — do not remove them.
- **Weight 600 (semibold) is the maximum display weight.** Weight 700 or 800 reads as generic bold on SF Pro and breaks the premium, precision-instrument character. The system never uses `font-weight: 700` in headlines.
- **Body at 17px / 1.47 / -0.022em is Apple's documented body specification.** It is not arbitrary. This exact combination is what makes SF Pro readable at information density without feeling cramped.
- **Monospace for numbers in data contexts.** Any displayed value that represents a sensor reading, coordinate, percentage, crop count, or system quantity uses `{typography.monospace}`. This ensures columnar alignment in tables and dashboards.
- **Eyebrows are uppercase and tracked out (`0.08em`).** This is the only context where positive tracking and uppercase are used. Eyebrows signal section category — they never appear on body copy or headings.
- **No italic.** The interface never uses italic weight — not in error states, not in editorial pull-quotes, not in captions. SF Pro Italic is for prose documents; this is a data system.

---

## Layout

### Spacing System

Base unit is **4px**. All spacing tokens are multiples of this base.

| Token               | Value | Use                                           |
| ------------------- | ----- | --------------------------------------------- |
| `{spacing.xxs}`     | 4px   | Icon-to-label gap, tight inline               |
| `{spacing.xs}`      | 8px   | Badge internal padding, compact row gap       |
| `{spacing.sm}`      | 12px  | Card internal spacing, input vertical pad     |
| `{spacing.md}`      | 16px  | Default row gap, card grid gutter             |
| `{spacing.lg}`      | 24px  | Card grid gutter (desktop), section inner pad |
| `{spacing.xl}`      | 32px  | Card padding (large), section gap             |
| `{spacing.xxl}`     | 48px  | Section padding, modal padding                |
| `{spacing.xxxl}`    | 64px  | Between major page sections                   |
| `{spacing.section}` | 96px  | Full section rhythm on marketing surfaces     |
| `{spacing.hero}`    | 128px | Hero chapter padding                          |

### Grid & Container

- **Marketing pages**: Max content width 1200px. 12-column grid. 24px gutters at desktop, collapsing to 16px at tablet.
- **Dashboard / OS surfaces**: Full-bleed sidebar layout. Sidebar 220px fixed. Content area flex. No max-width constraint on the canvas — the interface fills the viewport.
- **Card grids**: 3-up at desktop (≥1280px), 2-up at tablet (768–1279px), 1-up at mobile (<768px). Gap: `{spacing.md}` (16px).
- **Stat card row**: 4-up at desktop, 2-up at tablet, 2-up at mobile.
- **Data tables**: Full-width within their container panel. Column widths defined by content type — numeric columns right-aligned.

### Whitespace Philosophy

Whitespace in this system is structural and semantic. On marketing surfaces, `{spacing.section}` (96px) separates major chapters — the negative space reads as the transition between the "world of the data" (black canvas) and the "world of the interface" (surface-1 panels). On dashboard surfaces, spacing is tighter by design: operators expect information density. `{spacing.md}` (16px) between rows; `{spacing.lg}` (24px) within cards. The interface does not breathe for aesthetic reasons — it breathes because the eye needs separation to parse hierarchy.

---

## Elevation & Depth

The system is flat. Depth is encoded by surface color and border weight — not by drop shadow.

| Level              | Treatment                                                 | Use                                                      |
| ------------------ | --------------------------------------------------------- | -------------------------------------------------------- |
| 0 — Canvas         | `{colors.canvas}` — no border                             | Hero chapters, full-screen map view, authentication      |
| 1 — Panel          | `{colors.surface-1}` + 1px `{colors.hairline}`            | Page body, sidebar, main content area                    |
| 2 — Card           | `{colors.surface-card}` + 1px `{colors.hairline}`         | Feature cards, stat cards, data cards                    |
| 3 — Input / Active | `{colors.surface-2}` + 1px `{colors.hairline-mid}`        | Input fields, active states                              |
| 4 — Elevated       | `{colors.surface-elevated}` + 1px `{colors.hairline-mid}` | Dropdowns, tooltips                                      |
| 5 — Modal          | `{colors.surface-1}` + shadow                             | Modals only — the single place where shadow is permitted |

### Exceptions

- **Modals** use `box-shadow: 0 32px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.04)`. The shadow separates the modal from the content it overlays. This is the only permitted use of drop shadow.
- **Dropdowns** use `box-shadow: 0 8px 32px rgba(0,0,0,0.60)` — they must read as floating above the page.
- **No card-hover shadows.** Hover state on cards is a background color shift to `{colors.surface-hover}` and a hairline shift to `{colors.hairline-mid}`. Adding a hover shadow creates an inconsistent vocabulary with the rest of the flat system.

### The Navigation Bar

The global nav uses `backdrop-filter: blur(20px) saturate(180%)` with `background: rgba(0,0,0,0.80)`. This is the system's only glassmorphism-adjacent treatment, and it is intentional — the nav must remain legible as it scrolls over both pure black hero chapters and elevated surface panels. The blur creates perceptual separation without introducing an opaque colored bar that would visually sever the hero from the navigation layer.

---

## Shapes

### Border Radius Scale

| Token              | Value  | Use                                            |
| ------------------ | ------ | ---------------------------------------------- |
| `{rounded.none}`   | 0px    | Hero bands, full-bleed sections, data tables   |
| `{rounded.xs}`     | 4px    | Micro-controls, tiny UI indicators             |
| `{rounded.sm}`     | 8px    | Tooltips, dropdown items, small badges         |
| `{rounded.md}`     | 12px   | Alert cards, small panel insets                |
| `{rounded.lg}`     | 16px   | Data cards, filter panels                      |
| `{rounded.xl}`     | 20px   | Feature cards, stat cards, chart containers    |
| `{rounded.xxl}`    | 24px   | CTA banners, modals, large surface containers  |
| `{rounded.pill}`   | 9999px | All buttons, all text inputs, all filter chips |
| `{rounded.circle}` | 9999px | Avatars, status dots, circular icon buttons    |

### Shape Philosophy

The shape system has two registers: **pill** (for all interactive controls) and **rectangular with radius** (for all containers). This separation is semantic — if it responds to clicks and the user initiates an action, it is pill-shaped. If it is a surface that holds data, it is a rectangle with a consistent rounding appropriate to its size (larger container → larger radius).

There is no mixing: buttons are never square, cards are never pill-shaped.

---

## Components

### Buttons

**`button-primary`** — the system's primary action. Used for "Create Report", "Export Data", "Add Field", "Confirm".

- Background `{colors.primary}`, text `{colors.on-primary}` (black), type `{typography.button-lg}`, height 40px, padding `10px 20px`, rounded `{rounded.pill}`.
- Pressed state: `button-primary-pressed` — background drops to `{colors.primary-pressed}` (`#22C55E`).
- `active:scale-95` micro-interaction on press — the single permitted scale transform in the system.

**`button-secondary`** — used for "Learn more", "View details", "Cancel".

- Background transparent, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`, type `{typography.button-lg}`, height 40px, rounded `{rounded.pill}`.
- Pressed state: background shifts to `{colors.surface-hover}`.

**`button-ghost`** — inline text-link style CTA. "View all fields →", "See history".

- Background transparent, text `{colors.primary}`, type `{typography.button-md}`, rounded `{rounded.pill}`.
- No border. The green text is the affordance.

**`button-danger`** — destructive actions only: "Delete Farm", "Remove sensor", "Revoke access".

- Background `{colors.semantic-error}`, text white, type `{typography.button-lg}`, height 40px, rounded `{rounded.pill}`.

**`button-disabled`** — any button in an unavailable state.

- Background `{colors.surface-2}`, text `{colors.ink-disabled}`, `cursor: not-allowed`.

### Navigation

**`top-nav`** — the 44px global navigation bar. Permanently visible across all routes.

- `background: rgba(0,0,0,0.80)`, `backdrop-filter: blur(20px) saturate(180%)`, `border-bottom: 1px solid {colors.hairline}`, height 44px.
- Left: Digital Orchard wordmark. Center: primary navigation links in `{typography.body-md}` `{colors.ink-tertiary}`. Right: search, notification bell, user avatar.
- Active link: `{colors.ink}` with no underline — weight contrast alone carries the active state.

**`sidebar-nav`** — the 220px persistent left rail on dashboard and OS surfaces.

- Background `{colors.surface-1}`, `border-right: 1px solid {colors.hairline}`, width 220px.
- Section headers in `{typography.eyebrow}` `{colors.ink-disabled}`. Nav items in `{typography.label}` `{colors.ink-tertiary}`.
- Active item: `sidebar-nav-item-active` — background `{colors.surface-3}`, text `{colors.ink}`, rounded `{rounded.md}`, left-edge accent `3px solid {colors.primary}`.

### Cards

**`feature-card`** — the default content tile. Feature explanations, onboarding steps, integration docs.

- Background `{colors.surface-card}`, border `1px solid {colors.hairline}`, rounded `{rounded.xl}`, padding 24px.
- Hover state: background `{colors.surface-hover}`, border `1px solid {colors.hairline-mid}`.

**`stat-card`** — single KPI display. Used in 4-up dashboard header rows ("Active Fields", "Avg. Yield / acre", "Sensor Alerts", "Reports this month").

- Background `{colors.surface-card}`, border `1px solid {colors.hairline}`, rounded `{rounded.xl}`, padding `20px 24px`.
- Layout: `{typography.eyebrow}` label at top, `{typography.display-md}` value in `{colors.ink}` center, `{typography.body-sm}` delta comparison below in semantic color.

**`data-card`** — denser operational panel. Field-level data, sensor readings, weather overlays.

- Background `{colors.surface-1}`, border `1px solid {colors.hairline}`, rounded `{rounded.lg}`, padding 16px.
- More compact than feature-card — designed for dashboard density, not marketing.

**`dashboard-panel`** — the large container that houses charts, tables, and multi-metric views.

- Background `{colors.surface-1}`, border `1px solid {colors.hairline}`, rounded `{rounded.xl}`, padding 20px.

**`cta-banner`** — the "Ready to connect your sensors?" or "Upgrade to Pro" callout at the bottom of marketing pages.

- Background `{colors.surface-1}`, border `1px solid {colors.hairline}`, rounded `{rounded.xxl}`, padding `48px 40px`. Contains `{typography.heading-lg}` headline, `{typography.body-lg}` supporting copy, and a `button-primary`.

### Inputs & Forms

**`text-input`** — standard single-line input. Field name, farm address, email, search.

- Background `{colors.surface-2}`, border `1px solid {colors.hairline-mid}`, rounded `{rounded.pill}`, height 40px, padding `10px 16px`.
- Focused: `text-input-focused` — border becomes `1px solid {colors.primary}`, outline `3px solid rgba(74,222,128,0.15)`.
- Error: `text-input-error` — border `1px solid {colors.semantic-error}`, outline `3px solid rgba(239,68,68,0.12)`.

**`text-area`** — multi-line input. Notes, descriptions, custom sensor rules.

- Background `{colors.surface-2}`, border `1px solid {colors.hairline-mid}`, rounded `{rounded.md}` (not pill — pill-shaped text areas feel incorrect). Min-height 96px.

**`search-bar`** — global search and local panel search.

- Background `{colors.surface-2}`, border `1px solid {colors.hairline}`, rounded `{rounded.pill}`, height 36px, padding `8px 14px`.
- Leading magnifier icon in `{colors.ink-tertiary}`. Placeholder text in `{colors.ink-tertiary}`.

### Tabs & Filters

**`tab`** + **`tab-active`** — primary content segmentation within a panel.

- Default: text `{colors.ink-tertiary}`, border-bottom `2px solid transparent`, padding `8px 0`.
- Active: text `{colors.ink}`, border-bottom `2px solid {colors.primary}`.
- Tabs sit on a `1px solid {colors.hairline}` full-width rule below them.

**`pill-tab`** + **`pill-tab-active`** — alternative tab style for compact inline segmentation.

- Default: background `{colors.surface-2}`, text `{colors.ink-secondary}`, rounded `{rounded.pill}`.
- Active: background `{colors.surface-elevated}`, text `{colors.ink}`, border `1px solid {colors.hairline-strong}`.

**`filter-chip`** + **`filter-chip-active`** — multi-select filter tags above data tables.

- Default: transparent, border `1px solid {colors.hairline}`, text `{colors.ink-tertiary}`.
- Active: background `{colors.primary}`, text `{colors.on-primary}`, no border.

### Badges & Status

All badges use `{typography.eyebrow}` (11px / 500 / uppercase / `0.08em` tracking). All are pill-shaped.

| Component       | Background              | Text color                  | Use                       |
| --------------- | ----------------------- | --------------------------- | ------------------------- |
| `badge-success` | `rgba(74,222,128,0.12)` | `{colors.semantic-success}` | Healthy, optimal, online  |
| `badge-warning` | `rgba(245,158,11,0.12)` | `{colors.semantic-warning}` | Monitor, review needed    |
| `badge-error`   | `rgba(239,68,68,0.12)`  | `{colors.semantic-error}`   | Critical, offline, failed |
| `badge-info`    | `rgba(56,189,248,0.12)` | `{colors.semantic-info}`    | Info, update, in-progress |
| `badge-neutral` | `{colors.surface-3}`    | `{colors.ink-secondary}`    | Draft, inactive, paused   |

### Dashboard-Specific

**`metric-tile`** — the smallest data unit. Used in dense sensor dashboards where 8–16 values appear on a single panel.

- Background `{colors.surface-card}`, border `1px solid {colors.hairline}`, rounded `{rounded.lg}`, padding `16px 20px`.
- Layout: eyebrow label + monospace value + trend indicator.

**`chart-container`** — houses all data visualizations (line charts, area charts, heatmaps, bar charts).

- Background `{colors.surface-1}`, border `1px solid {colors.hairline}`, rounded `{rounded.xl}`, padding `20px 24px`.
- Chart grid lines: `rgba(255,255,255,0.06)`. Chart accent line: `{colors.primary}`. Secondary series: `{colors.semantic-info}`.

**`data-table-row`** + **`data-table-row-active`** — the primary way field-level tabular data is displayed.

- Default row: background transparent, text `{colors.ink-secondary}`, padding `12px 16px`, border-bottom `1px solid {colors.hairline}`.
- Active/selected row: background `{colors.surface-2}`, text `{colors.ink}`.
- Column headers: `{typography.eyebrow}` (uppercase, tracked), text `{colors.ink-tertiary}`.
- Numeric cells: right-aligned, `{typography.monospace}`.

**`field-map-overlay`** — info panels that appear over the full-screen field map view.

- Background `rgba(0,0,0,0.72)`, `backdrop-filter: blur(12px)`, border `1px solid {colors.hairline-mid}`, rounded `{rounded.lg}`.
- Text in `{colors.ink}` and `{colors.ink-secondary}`. Data values in `{typography.monospace}`.

### Modals & Overlays

**`modal`** — any confirmation, form submission, or detailed data view that requires interrupting the current context.

- Background `{colors.surface-1}`, rounded `{rounded.xxl}`, padding 28px, border `1px solid {colors.hairline-mid}`.
- Shadow: `0 32px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.04)`.
- Scrim: `rgba(0,0,0,0.72)` full-screen backdrop.

**`dropdown-menu`** — context menus, action menus, and select option lists.

- Background `{colors.surface-elevated}`, rounded `{rounded.lg}`, padding 6px (around the item list), border `1px solid {colors.hairline-mid}`, shadow `0 8px 32px rgba(0,0,0,0.60)`.

**`tooltip`** — hover-triggered contextual labels for icons, truncated text, and abbreviated field names.

- Background `{colors.surface-elevated}`, border `1px solid {colors.hairline-mid}`, rounded `{rounded.sm}`, padding `6px 10px`, type `{typography.caption}`.

### Footer

**`footer`** — the page-bottom resource block.

- Background `{colors.surface-1}`, border-top `1px solid {colors.hairline}`, padding `48px 32px`.
- 4-column link grid at desktop, 2-column at tablet, single-column at mobile. Column headers in `{typography.heading-sm}` `{colors.ink}`. Links in `{typography.body-sm}` `{colors.ink-secondary}`. Copyright in `{typography.caption}` `{colors.ink-tertiary}`.
- Not inverted to a different color — this is a data platform, not a marketing site. The footer is a navigation resource, not a brand statement.

---

## Do's and Don'ts

### Do

- Use `{rounded.pill}` on every button, every text input, and every filter chip. The pill is the system's interactive-element signature — it is never broken.
- Pair SF Pro at weight 600 with tight negative tracking for display sizes. The combination of semibold + `-0.03em` at 64px is the brand's headline voice. Do not use bold (700+) or remove the tracking.
- Reserve `{colors.primary}` Orchard Green for primary CTAs, active states, positive data signals, and focused input borders. It should never appear as a decorative color, a section background, or an eyebrow color.
- Use `{typography.monospace}` for all sensor readings, crop counts, coordinates, percentages, and any value that represents a measured quantity.
- Encode card hierarchy through surface color progression (`canvas` → `surface-1` → `surface-card`) and hairline weight progression (`hairline` → `hairline-mid` → `hairline-strong`). Never through drop shadow.
- Apply `active:scale-95` to all pill buttons. This is the system's only transform-based micro-interaction.
- Use the global nav blur: `backdrop-filter: blur(20px) saturate(180%)` with `rgba(0,0,0,0.80)` background. It is the only glass treatment permitted.
- Keep eyebrow text uppercase with `0.08em` tracking. Every other text role uses negative or zero tracking.

### Don't

- Don't use drop shadow on resting cards, panels, or navigation. The only permitted shadows are the modal `box-shadow` and the dropdown `box-shadow`.
- Don't introduce a second brand color. Orchard Green is the system's sole accent. Adding teal, purple, or orange "for variety" breaks the single-accent semantic — green means "action" or "healthy."
- Don't round buttons at `{rounded.md}` or `{rounded.lg}`. Buttons are pill-shaped. Any deviation reads as a UI library component that wasn't properly customized.
- Don't bold display headlines. SF Pro at `font-weight: 700` reads as a generic tech startup site. The system uses 600.
- Don't add glassmorphism to card surfaces. The blur treatment is reserved exclusively for the navigation bar.
- Don't use decorative gradients on chrome surfaces. No hero gradient overlays, no card gradient fills, no text-clipped gradients. The only gradient in the system is the optional field-health heatmap overlay (using the data visualization scale), which is data, not decoration.
- Don't use positive letter-spacing on body copy. Only `{typography.eyebrow}` and `{typography.caption}` use positive tracking. Body, label, and heading roles all use negative tracking.
- Don't place body copy in uppercase. Uppercase is reserved for eyebrows and badge labels.
- Don't use italic at any scale. This is an operational data system — italic is a prose convention.
- Don't render table numbers left-aligned. Numeric columns are always right-aligned and use `{typography.monospace}`.

---

## Responsive Behavior

### Breakpoints

| Name    | Width           | Key Changes                                                                                                   |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------------- |
| Mobile  | < 768px         | Single column. Sidebar collapses to bottom tab bar. Display type: `display-xl` 64px → 36px. Stat cards: 2-up. |
| Tablet  | 768px – 1279px  | Two-column card grid. Sidebar 220px + collapsible. Display-xl 64px → 48px.                                    |
| Desktop | 1280px – 1535px | Full layout. 3-up card grid. Full sidebar. All stat cards 4-up.                                               |
| Wide    | ≥ 1536px        | Same as desktop with wider content gutters. Dashboard panels expand to fill.                                  |

### Dashboard Responsiveness

- **Sidebar**: Fixed 220px on desktop. On tablet, collapses to an icon-only 64px rail with tooltips. On mobile, becomes a bottom tab bar with 5 primary destinations.
- **Stat card row**: 4-up on desktop, 2×2 on tablet and mobile.
- **Data tables**: On mobile, tables convert to card-per-row layout with label-value pairs stacked vertically.
- **Chart containers**: Maintain minimum height 200px on mobile; scroll horizontally for dense time-series.
- **Field map**: Full-screen on all breakpoints. Overlay panels stack at the bottom on mobile.

### Touch Targets

- All buttons minimum 44×44px effective tap target (the 40px height expands to 44px via `min-height: 44px` on touch viewports).
- All pill inputs minimum 44px height on touch.
- Sidebar nav items minimum 44px height on touch.
- Table rows minimum 48px height on touch — sparser than desktop to prevent misfire.

---

## Data Display Conventions

Because Digital Orchard OS is primarily a data interface, these conventions apply across all dashboards, reports, and field views.

### Numbers

- All sensor readings, counts, and measured values use `{typography.monospace}` for tabular alignment.
- Positive delta values are prefixed with `↑` in `{colors.data-excellent}`. Negative deltas use `↓` in `{colors.data-stress}`.
- Large numbers (>999) use locale-appropriate thousands separators.
- Percentages are rendered without a space before the `%` symbol.

### Empty States

- Empty table or card states display a centered `{typography.body-md}` message in `{colors.ink-tertiary}` with a `button-primary` "Add your first [item]" CTA below it.
- No illustration, no emoji, no decorative graphic. The empty state is text-only.

### Loading States

- Skeleton screens use `{colors.surface-2}` fill with a subtle `animation: pulse 1.6s ease-in-out infinite` opacity oscillation between `0.4` and `0.7`.
- No spinner components on data cards. Spinners are reserved for full-page or modal loading states only.

### Truncation

- Text truncation always uses CSS ellipsis (`text-overflow: ellipsis`). Never slash-truncate or bracket-truncate.
- Truncated values always have a `{component.tooltip}` revealing the full value on hover.
- Numeric values are never truncated — if a number is too wide for its column, the column is wider.

---

## Development Guidelines

### Tailwind Configuration

All system tokens should be registered in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#4ADE80',
      'primary-pressed': '#22C55E',
      canvas: '#000000',
      'surface-1': '#080808',
      'surface-2': '#0F0F0F',
      'surface-card': '#111111',
      'surface-hover': '#161616',
      'surface-elevated': '#1A1A1A',
    },
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'system-ui', 'sans-serif'],
      mono: ['"SF Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
    },
    letterSpacing: {
      'display': '-0.03em',
      'heading': '-0.02em',
      'body': '-0.022em',
      'eyebrow': '0.08em',
    },
    borderRadius: {
      DEFAULT: '0',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '20px',
      '2xl': '24px',
      pill: '9999px',
    },
  },
}
```

## Component Variants with CVA

All button and badge variants must be managed with `class-variance-authority` to prevent drift:

```ts
const button = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-primary text-black hover:bg-primary-pressed",
        secondary:
          "bg-transparent text-white border border-white/18 hover:bg-surface-hover",
        ghost: "bg-transparent text-primary",
        danger: "bg-red-500 text-white hover:bg-red-600",
        disabled: "bg-surface-2 text-white/25",
      },
      size: {
        lg: "text-[15px] leading-5 px-5 py-2.5 h-10",
        md: "text-[13px] leading-5 px-3.5 py-1.5 h-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);
```

### CSS Custom Properties

Register all semantic tokens as CSS custom properties in `index.css` or a globals file:

```css
:root {
  --color-primary: #4ade80;
  --color-primary-pressed: #22c55e;
  --color-canvas: #000000;
  --color-surface-1: #080808;
  --color-surface-2: #0f0f0f;
  --color-surface-card: #111111;
  --color-surface-hover: #161616;
  --color-surface-elevated: #1a1a1a;
  --color-hairline: rgba(255, 255, 255, 0.06);
  --color-hairline-mid: rgba(255, 255, 255, 0.1);
  --color-hairline-strong: rgba(255, 255, 255, 0.18);
  --color-ink: #ffffff;
  --color-ink-secondary: rgba(255, 255, 255, 0.7);
  --color-ink-tertiary: rgba(255, 255, 255, 0.45);
  --color-ink-disabled: rgba(255, 255, 255, 0.25);
}
```

### No Placeholder Data

All interfaces are built with production data structures. If real data is unavailable, use realistic domain-specific placeholder values:

- Field names: "Block 7 — Fuji Apple", "Sector 3 — Wine Grape"
- Sensor readings: "18.4°C", "72% RH", "pH 6.8"
- Crop counts: "14,823 units", "2.4 T/acre"
- Never: "Lorem ipsum", "John Doe", "Field Name Here"

---

## Known Gaps

- **Animation timing tokens** not yet formalized. Recommended: `150ms ease-out` for hover/active transitions, `250ms ease-in-out` for modal open/close, `80ms ease-out` for `active:scale-95` button press.
- **Light mode** is not part of this version — the system is dark-mode native. A future light-mode token set would need a separate surface scale starting from `#FAFAFA` with adjusted hairline values.
- **Map library theming** (Mapbox / MapLibre) requires custom style definitions that reference `{colors.data-excellent}` through `{colors.data-critical}` — these are documented as data tokens but the specific Mapbox GL style JSON is outside this specification.
- **Icon library** not specified. Recommended: `lucide-react` at 16px (compact) and 20px (standard) sizes, `{colors.ink-secondary}` fill with `{colors.ink}` in active states and `{colors.primary}` for primary action icons.
- **Print / export styles** for PDF crop reports not documented.
