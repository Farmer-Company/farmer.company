# Beta Delivery Plan

## Objective

Convert the current showcase-style app into a credible beta for national agricultural trading.

## Workstream 1: Trust and Data

- Replace fake price generation
- Add price source metadata
- Add freshness timestamp
- Add explicit fallback label when data is delayed or indicative

## Workstream 2: Real Workflows

- Convert market actions into actual buy or sell intent submissions
- Add operations queue and status tracking
- Connect UI actions to Firebase or a clean service layer

## Workstream 3: Audience Fit

- Simplify core mobile flows for farmers and field users
- Create a more structured dashboard posture for enterprise users
- Remove confusing or fictional copy in transaction-heavy screens

## Workstream 4: Reliability

- Fix auth and persistence issues
- Add form validation
- Add analytics and error logging
- Add loading, empty, and retry states

## Suggested Ownership

- Product: PRD scope, priorities, launch criteria
- Design: mobile-first core flows plus enterprise dashboard layer
- Engineering: data layer, workflow implementation, bug fixes
- Ops: lead validation process and assisted-trade SOP

## First 4-Week Sequence

### Week 1

- Finalize PRD scope
- Lock core beta user flows
- Remove misleading UI elements

### Week 2

- Implement real price pipeline
- Build lead capture forms
- Add language persistence

### Week 3

- Add ops workflow tracking
- Harden auth and validation
- Improve mobile UX for field users

### Week 4

- Beta QA
- Founder review
- Pilot onboarding with selected sellers and buyers
