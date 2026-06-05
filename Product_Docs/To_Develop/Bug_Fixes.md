# Farmer.Company Beta - Bug Fixes

**Date:** April 28, 2026  
**Last reviewed:** June 5, 2026
**Focus:** Critical/high-priority product bugs and deployment blockers identified in the current codebase

---

## Latest Deployment Check

**Checked on:** June 5, 2026
**Deployment source:** GitHub Deployments page shared by Arun
**Latest failed deployment:** `Deploy static content to Pages #18` for commit `banner removal` on `main`
**Last known successful deployment:** `Deploy static content to Pages #17` for commit `feat: add programmatic HTTP-to-HTTPS redirect in main.tsx`
**Local verification:** `npm ci` and `npm run build` succeed on the current checkout.
**Workflow fix applied locally:** docs-only pushes are ignored for Pages deploys, and the workflow now validates `dist/index.html`, `dist/404.html`, and `dist/CNAME` before uploading the Pages artifact.
**Current repo state after fetch:** local `main` is ahead of `origin/main` by the README update commit and behind `origin/main` by the remote `banner removal` commit.

**Access note:** GitHub CLI is not installed in the local environment, and unauthenticated GitHub API calls for this private repository return `404`. The exact failed Actions log for run #18 still needs to be checked from the authenticated GitHub UI.

---

## Critical Bugs (Fix Before Beta Launch)

### BUG-001: Hardcoded Prices in Prices.tsx

**Severity:** Critical  
**File:** `src/components/Pages/Prices.tsx` (Lines 130-132)

**Issue:**

```typescript
<td className="py-8 px-8 mono text-2xl font-black text-white/90">
  ₹{(15 + (parseInt(item.code) % 50) + (i % 10)).toFixed(2)}
</td>
```

Prices are calculated using a formula based on commodity code, not real data.

**Impact:** Users see fake prices, destroying trust in the platform.

**Fix:**

```typescript
// Connect to real market data API (Agmarknet/eNAM)
// Or use the market data from markets.ts with actual prices
<td className="py-8 px-8 mono text-2xl font-black text-white/90">
  ₹{item.modalPrice?.toFixed(2) || 'N/A'}
</td>
```

**Status:** 🟢 Fixed (Pricing logic replaced with pending verification state)
**Assigned:** Backend Team  
**ETA:** 2 days

---

### BUG-002: Hardcoded Arbitrage Prices in Market.tsx

**Severity:** Critical  
**File:** `src/components/Pages/Market.tsx` (Lines 140-142)

**Issue:**

```typescript
<div className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
  ₹{((market.total_arrivals % 500) + 2200).toLocaleString()}
  <span className="text-sm opacity-40 ml-1">/Q</span>
</div>
```

"Alpha Bid" prices are fake, calculated from arrivals modulo 500.

**Impact:** Trading decisions based on fake data = legal liability per Partnership Deed.

**Fix:**

```typescript
// Fetch real-time commodity prices from Firebase/Firestore
// Or display "Price Unavailable" if data not yet integrated
<div className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
  ₹{market.modalPrice?.toLocaleString() || 'Loading...'}
  <span className="text-sm opacity-40 ml-1">/Q</span>
</div>
```

**Status:** 🟢 Fixed (Replaced fake prices with real trade signals logic)
**Assigned:** Backend Team  
**ETA:** 2 days

---

### BUG-003: "Settle Node" Button Has No Functionality

**Severity:** Critical  
**File:** `src/components/Pages/Market.tsx` (Line 148)

**Issue:**

```typescript
<Button className="h-14 bg-white text-black font-black uppercase tracking-[3px] text-[10px] px-8 hover:bg-primary transition-all hover:translate-x-1 active:scale-95 shadow-xl">
  Settle Node
</Button>
```

Button has no onClick handler. No transaction processing exists.

**Impact:** Core business function (trading) doesn't work. Revenue model fails.

**Fix:**

```typescript
const handleSettleNode = async (marketId: number) => {
  // Implement transaction flow
  // 1. Check user authentication
  // 2. Show order confirmation modal
  // 3. Process payment via payment gateway
  // 4. Update Firebase with transaction record
};

<Button onClick={() => handleSettleNode(market.node_id)}>
  Settle Node
</Button>
```

**Status:** 🟢 Fixed (Replaced with 'Request Buyer Match' Intent Form)
**Assigned:** Full Stack Team  
**ETA:** 5 days

---

### BUG-004: "Add to Settlement List" Button Non-Functional

**Severity:** High  
**File:** `src/components/Pages/Market.tsx` (Lines 143-146)

**Issue:**

```typescript
<button
  className="h-14 w-14 flex items-center justify-center border border-white/10 hover:border-primary group/icon transition-all bg-white/5 active:scale-95"
  title="Add to Settlement List"
>
  <ShoppingCart size={20} className="text-white/40 group-hover:text-primary transition-colors" />
</button>
```

Shopping cart button has no onClick handler.

**Impact:** Users can't save markets for later comparison/purchase.

**Fix:**

```typescript
const [settlementList, setSettlementList] = useState<number[]>([]);

const addToSettlement = (marketId: number) => {
  setSettlementList((prev) =>
    prev.includes(marketId)
      ? prev.filter((id) => id !== marketId)
      : [...prev, marketId],
  );
};

// Add visual feedback (change cart icon color if added)
```

**Status:** 🟢 Fixed (Uses toggleSavedMarket with localStorage persistence)
**Assigned:** Frontend Team  
**ETA:** 2 days

---

## High-Priority Bugs

### BUG-005: Firebase Configuration Not Validated

**Severity:** High  
**File:** `src/lib/firebase.ts`

**Issue:** No error handling if Firebase config is missing or invalid.

**Impact:** App crashes silently if `.env.local` not configured correctly.

**Fix:**

```typescript
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ... other config
};

// Validate config
if (!firebaseConfig.apiKey) {
  console.error("Firebase config missing. Check .env.local file.");
  throw new Error("Firebase configuration invalid");
}

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export default app;
```

**Status:** 🟠 Open  
**ETA:** 1 day

---

### BUG-006: Language Context Not Persisted

**Severity:** Medium  
**File:** `src/lib/LanguageContext.tsx`

**Issue:** Language selection resets on page refresh (no localStorage).

**Impact:** Poor UX for non-English users.

**Fix:**

```typescript
import { createContext, useContext, useState, useEffect } from "react";

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage on init
    return localStorage.getItem("farmer-company-language") || "en";
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("farmer-company-language", lang);
  };

  // ... rest of context
};
```

**Status:** 🟢 Fixed (Implemented localStorage persistence)
**ETA:** 1 day

---

### BUG-007: AuthContext / Protected Route Audit

**Severity:** High  
**File:** `src/lib/AuthContext.tsx` (44 lines - very minimal)

**Issue:** Auth state management now exists through Firebase `onAuthStateChanged`, but the protected-route policy still needs to be audited. `App.tsx` exposes product routes directly, so the team must decide which routes are public, beta-gated, role-gated, or admin-only.

**Impact:** Sensitive beta workflows may be accessible without the intended login, role, or verification state.

**Fix:**

```typescript
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Status:** 🟠 Open (auth context exists; route protection and role-gating still need review)
**ETA:** 3 days

---

### BUG-008: Large Market Data File Not Optimized

**Severity:** Medium  
**File:** `src/data/Market.json` (111K)

**Issue:** Entire 111KB file loaded on every page load, even when not needed.

**Impact:** Slow initial load, wasted bandwidth.

**Fix:**

```typescript
// Use dynamic import
const loadMarketData = async () => {
  const data = await import("@/data/Market.json");
  return data.default;
};

// Or move to Firebase Firestore and fetch with pagination
```

**Status:** 🟡 Open  
**ETA:** 2 days

---

## Deployment and CI Bugs

### BUG-017: Latest GitHub Pages Deployment Failed

**Severity:** High
**Files:** `.github/workflows/static.yml`, `public/CNAME`, `vite.config.ts`, GitHub Pages environment settings

**Issue:** The latest GitHub Pages deployment shown in GitHub Deployments failed for `Deploy static content to Pages #18` on commit `banner removal`.

**Evidence:**

- GitHub Deployments page shows `banner removal` as the active failed deployment for `github-pages`.
- Previous deployment `#17` for `feat: add programmatic HTTP-to-HTTPS redirect in main.tsx` completed successfully.
- Local `npm run build` succeeds, so the current source can produce a production bundle.
- Remote `origin/main` now points to `750a8b6 banner removal`, which only changes `README.md`.

**Impact:** Production may remain pinned to the previous deployment. README-only or content-only releases can appear failed, creating confusion about release health and making it harder to know what is actually live.

**Investigation Steps:**

1. Open GitHub Actions run `Deploy static content to Pages #18`.
2. Check which step failed: `Install dependencies`, `Build`, `Add SPA fallback`, `Upload artifact`, or `Deploy to GitHub Pages`.
3. If the failure is in `Deploy to GitHub Pages`, inspect the `github-pages` environment, Pages permissions, artifact status, and any GitHub Pages service error.
4. If the failure is transient, rerun workflow #18 from the GitHub UI.
5. If the failure repeats, capture the log snippet and update this bug with the exact root cause.

**Fix Applied Locally:**

```yaml
on:
  push:
    branches: ["main"]
    paths-ignore:
      - "README.md"
      - "Product_Docs/**"
      - "artifacts/**"
      - "design.md"

# The workflow also validates dist/index.html, dist/404.html, and dist/CNAME
# before uploading the GitHub Pages artifact.
```

**Status:** 🟡 Fixed locally - pending GitHub Actions verification after push
**Assigned:** DevOps / Engineering
**ETA:** 0.5 day

---

## Medium-Priority Bugs

### BUG-009: Pagination Resets on Filter Change (Partially Fixed)

**Severity:** Medium  
**File:** `src/components/Pages/Prices.tsx`

**Issue:** Code resets `currentPage` to 1 on filter change (good), but URL doesn't reflect state.

**Impact:** Users can't share filtered/paginated URLs.

**Fix:**

```typescript
// Use URL search params
useEffect(() => {
  const params = new URLSearchParams();
  if (filter) params.set("q", filter);
  if (stateFilter) params.set("state", stateFilter);
  if (currentPage > 1) params.set("page", currentPage.toString());

  window.history.replaceState({}, "", `?${params.toString()}`);
}, [filter, stateFilter, currentPage]);
```

**Status:** 🟡 Open
**ETA:** 1 day

---

### BUG-010: No Keyboard Navigation for Market List

**Severity:** Medium  
**File:** `src/components/Pages/Market.tsx`

**Issue:** Market cards not focusable, no keyboard shortcuts.

**Impact:** Accessibility violation, poor UX for power users.

**Fix:**

```typescript
// Add tabIndex and onKeyDown handlers
<div
  key={market.node_id}
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSettleNode(market.node_id);
  }}
  className="p-8 bg-[#0D0D0D] border border-white/5 hover:border-primary/40 transition-all..."
>
```

**Status:** 🟡 Open  
**ETA:** 2 days

---

### BUG-011: Insights Page Has Static Content

**Severity:** Medium  
**File:** `src/components/Pages/Insights.tsx`

**Issue:** All insights are hardcoded in the array (lines 14-30).

**Impact:** "Predictive Intelligence" page shows fake data.

**Fix:**

```typescript
// Fetch real insights from Firebase/API
const [insights, setInsights] = useState([]);

useEffect(() => {
  const fetchInsights = async () => {
    const data = await getDocs(collection(db, "insights"));
    setInsights(data.docs.map((doc) => doc.data()));
  };
  fetchInsights();
}, []);
```

**Status:** 🟡 Open  
**ETA:** 3 days

---

### BUG-012: No Error Message for Failed Search

**Severity:** Low  
**File:** `src/components/Pages/Market.tsx` and `Prices.tsx`

**Issue:** Search shows "No matching nodes found" but no guidance on what to do next.

**Fix:**

```typescript
{(activeTab === 'commodities' && filteredCommodities.length === 0) && (
  <div className="py-20 text-center">
    <p className="text-foreground-muted uppercase mono text-xs tracking-widest mb-4">
      No matching nodes found in the protocol ledger.
    </p>
    <Button onClick={() => { setFilter(''); setCurrentPage(1); }}>
      Clear Filters
    </Button>
  </div>
)}
```

**Status:** 🟡 Open
**ETA:** 0.5 day

---

## Low-Priority Bugs

### BUG-013: Inconsistent Date Formatting

**Severity:** Low  
**Files:** Multiple

**Issue:** No standardized date formatting across the app.

**Fix:** Create a `formatDate()` utility in `src/lib/utils.ts`

**Status:** 🟡 Open

---

### BUG-014: Missing Alt Text for Images

**Severity:** Low  
**Files:** Future image components

**Issue:** When images are added, ensure alt text is present for accessibility.

**Fix:** Use ESLint plugin `jsx-a11y` to enforce alt text.

**Status:** 🟡 Open

---

### BUG-015: No Loading State for Filters

**Severity:** Low  
**Files:** `Market.tsx`, `Prices.tsx`

**Issue:** When filters change, there's no loading indicator if data were fetched from API.

**Fix:** Add loading skeleton while filter results update.

**Status:** 🟡 Open

---

### BUG-016: Loading Screen Layout Shifts & Text Overlaps

**Severity:** Medium  
**File:** `src/components/LoadingScreen.tsx`

**Issue:** Progress bar absolute positioning overlaps the main typography, and AnimatePresence crossfades cause horizontal layout jumps on the loading steps text. Additionally, title text gets cut off on mobile devices.

**Fix:** Re-architected container structure to anchor progress bar to screen root, implemented fixed-width flex containers for the loading steps, and adjusted flex wrapping logic for the title to prevent overflow clipping.

**Status:** 🟢 Fixed
**Assigned:** Frontend Team

---

## Bug Statistics

| Severity  | Count  | Status |
| --------- | ------ | ------ |
| Critical  | 3      | 3 Fixed, 0 Open |
| High      | 4      | 1 Fixed, 2 Open, 1 Pending verification |
| Medium    | 6      | 2 Fixed, 4 Open |
| Low       | 4      | 0 Fixed, 4 Open |
| **Total** | **17** | **6 Fixed, 10 Open, 1 Pending verification** |

Counts are based on each bug's `Severity` field, not on the section where the bug appears.

---

## Recommended Fix Order for Beta

### Week 1 (Deployment & High Priority)

1. **BUG-017:** Inspect and resolve latest GitHub Pages deployment failure
2. **BUG-005:** Firebase config validation
3. **BUG-007:** AuthContext / protected route audit

### Week 2 (Medium Priority)

1. **BUG-008:** Optimize Market.json loading
2. **BUG-009:** URL state management
3. **BUG-011:** Dynamic Insights page
4. **BUG-010:** Keyboard navigation
5. **BUG-012:** Search error messages

### Week 3 (Remaining)

1. **BUG-013:** Standard date formatting utility
2. **BUG-014:** Image alt text enforcement
3. **BUG-015:** Loading states for filters

---

## Testing Strategy for Bug Fixes

### For Each Bug Fix

1. Write unit test (if applicable)
2. Manual testing on:
   - Chrome (Desktop)
   - Safari (iOS)
   - Chrome (Android)
3. Verify no regression in related features
4. Update documentation if behavior changes

---

## Bug Reporting Template

When new bugs are found, use this template:

```markdown
### BUG-XXX: [Short Description]

**Severity:** Critical/High/Medium/Low  
**File:** path/to/file.tsx (line numbers)

**Issue:**
[Description of the bug]

**Steps to Reproduce:**

1. Go to...
2. Click on...
3. Observe...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshot/Video:**
[If applicable]

**Proposed Fix:**
[Code solution]

**Status:** 🔴/🟠/🟡/🟢 Open/In Progress/Fixed  
**Assigned:** [Name]  
**ETA:** [Date]
```

---

**Prepared by:** goose (AI Assistant)  
**For:** Farmer.Company Development Team

**Contact for Bug Reports:**

- Shri. Arun. V (Partner 1) - Technical Lead
- Shri. Akshay Kumar Nilkar Umakant (Partner 2) - Product Lead
