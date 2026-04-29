# Farmer.Company UI/UX Strategy

## Design Challenge

Farmer.Company must serve one of the widest UX ranges possible:

- Farmers, village sellers, and helpers using button phones, shared devices, or low-end Android phones
- Traders and buyers working primarily on WhatsApp, calls, and spreadsheets
- Institutional procurement teams and international asset management firms expecting structured, credible interfaces

The answer is not one single visual density. The answer is a layered product system with clear modes.

## 1. UX Principles

- Start with task clarity, not feature quantity
- Use progressive disclosure instead of showing everything at once
- Make trust visible through source labels, freshness, and verification badges
- Keep core trade actions usable with weak connectivity and low digital confidence
- Provide a more analytical mode for sophisticated users without forcing it on everyone

## 2. Audience Modes

### Field Mode

For farmers, village coordinators, and assisted agents:

- Large tap targets
- Minimal text per screen
- High-contrast cards
- One main CTA per page
- Strong use of local language
- Support for phone-call-based assistance and callback requests

### Trade Desk Mode

For traders, wholesalers, and buyers:

- Faster list scanning
- Filterable tables
- Commodity and market comparison
- RFQ and follow-up workflow visibility

### Intelligence Mode

For enterprise teams and asset managers:

- Confidence-scored data views
- Export-ready summaries
- Regional trend snapshots
- Source transparency and date stamps

## 3. Device Strategy

### Button phone reality

Button phones should be treated as an assisted channel, not a full browser product surface.

Recommended support:

- Missed-call or callback request workflows
- SMS or WhatsApp summaries where appropriate
- Human-assisted onboarding by local coordinators

### Low-end smartphone reality

This is the true primary target for self-serve beta.

Requirements:

- Lightweight pages
- Short forms
- Fast rendering
- Offline-tolerant interactions where possible

### Desktop and large-screen reality

This is where enterprise and operational dashboards can be denser and more data-rich.

## 4. Information Architecture

Recommended top-level navigation:

- Home
- Sell
- Buy
- Prices
- Markets
- Insights
- My Activity
- Admin or Ops

The current structure should evolve away from vague labels where needed. For example, if `Market` mixes discovery and execution too much, split the intent clearly into `Buy` and `Sell`.

## 5. UX Requirements By Segment

### For farmers and small sellers

- Use commodity names in plain language first
- Avoid finance-heavy or trading-jargon copy
- Show "what happens next" after submission
- Offer direct human help options

### For traders and procurement teams

- Show quantity, location, timing, and quality fields prominently
- Make follow-up actions fast
- Avoid burying critical filters

### For asset managers and analysts

- Clearly distinguish platform transaction data from market intelligence
- Provide time series and confidence indicators
- Provide exports and source notes

## 6. Content and Language

- Use simple, locally understandable copy for field actions
- Avoid mixed metaphors or decorative sci-fi copy in core workflows
- Reserve highly branded visual language for marketing surfaces, not transaction-critical screens
- Launch with a strict copy system: simple label, short helper text, next-step confirmation

## 7. Visual Design Guidance

- Use bold contrast and clean typography with excellent legibility
- Prioritize bright-screen readability over ornamental styling
- Use icons only when they reinforce text, not replace it
- Keep color semantics consistent:
  - Green for verified or complete
  - Amber for pending or needs action
  - Red for issue or blocked
  - Blue for information

## 8. Accessibility

- Minimum readable font sizes on mobile
- Clear focus states for keyboard and accessibility tools
- Sufficient contrast in all data tables and buttons
- Avoid relying on color alone to communicate status

## 9. Recommended Beta Deliverables

- Mobile-first sell intent flow
- Mobile-first buy requirement flow
- Operations lead tracker
- Trust-ready prices page with timestamps and source labels
- Enterprise-friendly insights prototype

## 10. UX Smells To Remove From Beta

- Fictional copy that sounds impressive but reduces trust
- Hidden primary actions
- Hard-to-read dense tables on mobile
- Ambiguous button labels like "Settle Node" if the action is not obvious
- Interfaces that assume every user is comfortable with English
