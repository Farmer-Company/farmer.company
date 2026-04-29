# Farmer.Company Beta PRD

## Document Control

- Product: Farmer.Company
- Version: 1.0
- Status: Draft for founder review
- Last updated: April 28, 2026
- Owners: Founders, Product, Engineering
- Stage: Beta

## 1. Product Summary

Farmer.Company is building an agri-commerce operating platform that connects Indian farmers, aggregators, traders, processors, retailers, exporters, and institutional buyers through a blended online-offline workflow.

The beta should not try to be a full agri-superapp. It should prove one thing clearly:

`Farmer.Company can help a seller and buyer discover, validate, and complete trusted national commodity trades faster than traditional fragmented channels.`

## 2. Business Context

Based on the partnership deed, the current commercial base is national trading of agricultural commodities. The platform scope already allows expansion into logistics, warehousing, packaging, processing, and related services.

The beta should therefore focus on:

- Trusted national trading
- High-signal pricing and market discovery
- Lead capture and RFQ workflows
- Post-match coordination and settlement support

## 3. Problem Statement

Today the agricultural trade flow is fragmented across calls, WhatsApp, local agents, mandi visits, and informal trust networks.

### Seller-side problems

- Farmers and small aggregators do not know fair market ranges outside their immediate geography.
- Low-tech users cannot navigate dense interfaces or English-heavy product flows.
- Many users have intermittent data, low-end Android devices, or only basic-phone access.

### Buyer-side problems

- Traders and institutions struggle to source consistently verified supply.
- Price discovery is noisy and delayed.
- Quality, logistics readiness, and delivery confidence are not standardized.

### Enterprise-side problems

- Large buyers and asset managers need structured market data, trend visibility, and reliable counterparties.
- Current experiences feel too consumer-like and lack operational rigor.

## 4. Users and Segments

### Primary segments for beta

1. Farmers using shared smartphones or low-end Android devices
2. Village aggregators and commission agents
3. Regional traders and wholesalers
4. Retail chains, processors, exporters, and institutional buyers

### Extended segment to prepare for

5. Financial institutions and international asset management firms using agri-market intelligence

## 5. Jobs To Be Done

### Farmers and local sellers

- "Help me know whether today is a good day to sell."
- "Help me find a serious buyer beyond my local mandi."
- "Help me understand what price, quantity, and quality details I must share."

### Traders and buyers

- "Help me discover supply faster and reduce calling time."
- "Help me compare options across states."
- "Help me move from interest to confirmed deal without spreadsheet chaos."

### Enterprise analysts and asset managers

- "Help me see demand, price, and supply movement in a structured dashboard."
- "Help me export clean, credible, decision-ready market intelligence."

## 6. Product Principles

- Trust over flash: every displayed price or market signal must be explainable.
- One platform, multiple interaction modes: same system should serve voice-first and dashboard-first users.
- Progressive complexity: simple first screen, deeper detail only when needed.
- Human-in-the-loop: beta can rely on assisted operations where automation is not ready.
- India-first operational realism: patchy connectivity, language diversity, and offline coordination are normal.

## 7. Beta Goals

### Business goals

- Validate demand for national trade facilitation
- Generate first repeat trading revenue
- Build a qualified buyer and seller network
- Establish a trusted pricing and RFQ flow

### Product goals

- Enable users to search commodities and markets
- Enable creation of supply or demand intents
- Enable assisted trade workflow from match to settlement
- Support multilingual usage for key regional users

### Success metrics

- 100+ qualified seller leads onboarded
- 25+ active institutional or trader buyers
- 20+ completed trade intents in beta period
- 5+ repeat users per week in each core segment
- Less than 5% critical workflow failure rate

## 8. Non-Goals For Beta

- Fully automated escrow
- End-to-end logistics network ownership
- Advanced portfolio analytics for institutions
- Nationwide language coverage on day one
- Complex commodity derivatives or futures tooling

## 9. Scope

### In scope

- Commodity and market discovery
- Real price or clearly marked indicative price display
- RFQ or lead submission
- Buyer-seller matching workflow
- Settlement support workflow
- Admin-assisted onboarding
- CRM-style follow-up for supply and demand
- Role-based views for farmer, trader, buyer, and admin

### Out of scope for initial beta

- Full payments infrastructure
- Automated KYC decisioning
- Real-time logistics fleet optimization
- Enterprise-grade BI suite

## 10. Experience Modes

The product must support two distinct but connected experience modes.

### Mode A: Assisted low-literacy commerce

- Large buttons
- Minimal steps
- Audio/vernacular-friendly copy
- Strong icon and color support
- Optional assisted call-back flow

### Mode B: Professional trading and intelligence

- Dense tables where needed
- Filters, history, exports, comparison views
- Strong confidence indicators and source metadata
- Account-level views for teams

## 11. Core User Flows

### Flow 1: Farmer or aggregator creates a sell intent

1. Select crop
2. Select quantity
3. Select location
4. Add quality notes or photo
5. Choose preferred sale window
6. Submit for buyer match or callback

### Flow 2: Buyer creates a buy requirement

1. Select commodity
2. Select grade or specification
3. Select quantity and delivery window
4. Select origin preference
5. Receive matched leads or assisted outreach

### Flow 3: Operations team validates and advances trade

1. Review submitted lead
2. Validate contact, quantity, and quality
3. Match counterparties
4. Record negotiation status
5. Record settlement milestones

## 12. Functional Requirements

### FR-1 Market and commodity discovery

- Users can browse and search commodities
- Users can browse and filter markets by state or region
- Price data must show source and freshness

### FR-2 Intent capture

- Users can submit sell or buy requirements
- Required fields must vary by role and commodity
- Submission must work well on mobile

### FR-3 CRM and workflow tracking

- Ops team can move a lead through statuses
- Every lead has owner, notes, timestamps, and next action

### FR-4 Authentication and user roles

- Support role-aware authentication
- Preserve preferred language
- Allow assisted onboarding where account creation happens later

### FR-5 Insights

- Show basic trend summaries
- Clearly separate factual data from generated insights
- Enterprise exports can be a later-stage extension behind admin access

## 13. Non-Functional Requirements

- Fast first-load on low-end mobile devices
- Graceful operation on weak networks
- Strong mobile readability under sunlight
- Clear error states and retry paths
- Auditability for prices, edits, and trade status changes
- Baseline accessibility for text size, focus states, and color contrast

## 14. UI/UX Requirements

- Every core flow must be completable on a 360px-wide mobile screen
- Every primary action must have a touch target large enough for low-precision taps
- Language switching must be persistent and visible
- Enterprise dashboards may be denser, but should not degrade mobile core flows
- If a feature cannot be made simple for a farmer, it should move to assisted or admin mode

## 15. Dependencies

- Reliable market data source
- Firebase auth and data model cleanup
- Admin workflow design
- Regional language copy review
- Field operations process for lead verification

## 16. Risks

- Fake or stale prices will destroy trust quickly
- Non-working action buttons create false confidence
- Trying to serve every segment equally in one UI will hurt both ends
- Weak lead verification will create poor buyer retention

## 17. Launch Criteria

- Real or clearly labeled indicative price source in production
- Core sell-intent and buy-intent forms working end to end
- Ops team can track leads to settlement stage
- Language persistence fixed
- Critical bugs from current backlog resolved
- Beta analytics and error monitoring enabled

## 18. Post-Beta Expansion

- Logistics booking
- Warehousing availability
- Quality certification workflow
- Premium analytics for enterprise buyers
- Data products for financial institutions and asset managers

## 19. Open Decisions

- Which market data source becomes the source of truth?
- Which 2-3 languages ship in beta?
- What level of trade execution is handled on-platform vs assisted offline?
- Which enterprise features are visible in beta vs hidden behind pilot access?
