# Screen Requirements & PRD Checklist

## Core Beta Screens

### 1. Home (`/`)

- Explain value proposition in one screen
- Clear navigation to core modules (Market, Prices, Insights, Supply CRM, Configure)
- Dynamic hero section with B2B agricultural context
- Social proof and platform statistics
- Authentication / Get Started CTA

### 2. Market (`/market`)

- Unified marketplace view for buyers and sellers
- Real-time order book / active listings
- **Sell Intent:** Commodity, Quantity, Location, Expected price, Harvest window, Contact preference
- **Buy Requirement:** Commodity, Grade, Quantity, Delivery location/window, Contact details
- Filtering and sorting by commodity, region, and volume

### 3. Prices (`/prices`)

- Commodity search and comparison
- Market filter (by region/mandi)
- Real-time price tracking and historical trends
- Last updated timestamp and source label
- Warning label if indicative only

### 4. Insights (`/insights`)

- Short summary cards for price forecasts, risk alerts, and policy compliance
- Region and commodity filters
- Trend view with "Active Pulse" data
- Clear disclaimer and source references

### 5. Supply CRM (`/supply-crm`)

- B2B supply-side asset management dashboard
- Active contracts and trade compliance tracking
- Institutional procurement and RFQ (Request for Quote) management
- Lead Detail: Counterparty summary, quality notes, status timeline, internal ops notes
- Logistics and origin certification generation

### 6. Configure (`/configure`)

- User profile and business verification settings
- Notification preferences (alerts for prices, leads, compliance)
- Custom workspace layout options
- API integrations and webhooks setup

### 7. Authentication (`/signin`, `/get-started`)

- Phone/OTP or Email login
- Role selection (Farmer, Buyer, Agent)
- Onboarding flow for new businesses

---

## PRD (Product Requirements Document) Checklist

### User Experience & Interface

- [ ] All primary user flows (Buy, Sell, Track) are mapped and tested
- [ ] UI components follow the "Digital Orchard" dark theme aesthetic consistently
- [ ] Mobile responsiveness verified across all screens
- [ ] Empty states and error boundaries designed and implemented
- [ ] Loading screens and transitions optimized
- [ ] Accessibility standards (WCAG) checked

### Functionality & Data

- [ ] Core data models defined (User, Order, Commodity, Price Record)
- [ ] Search and filter functionality working for Market and Prices pages
- [ ] CRM pipeline accurately reflects contract statuses
- [ ] Pricing API / mocked real-time data integration completed
- [ ] Analytics and usage tracking scoped and implemented

### Security & Compliance

- [ ] Authentication flows secured
- [ ] Role-based access control (RBAC) enforced for CRM and Configure pages
- [ ] Data privacy policies and Terms of Service linked
- [ ] Institutional compliance and certification workflows defined

### Engineering & DevOps

- [x] Cross-browser compatibility confirmed
- [x] Linting and type-checking pass without critical errors
- [x] Performance metrics (LCP, CLS, FID) within acceptable limits
- [x] Production hosting and deployment pipeline (e.g. Cloudflare Pages) configured
