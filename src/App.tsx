/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LocationPanel } from './components/LocationPanel';
import { HeroSection } from './components/Home/HeroSection';
import { InteractiveDemo } from './components/Home/InteractiveDemo';
import { RoleStripSection } from './components/Home/RoleStripSection';
import { EcosystemSection } from './components/Home/EcosystemSection';
import { AgentSection } from './components/Home/AgentSection';
import { ComparisonSection } from './components/Home/ComparisonSection';
import { NetworkMetricsSection } from './components/Home/NetworkMetricsSection';
import { AgriOSIntelligenceSection } from './components/Home/AgriOSIntelligenceSection';
import { TestimonialsSection } from './components/Home/TestimonialsSection';
import { TrustSection } from './components/Home/TrustSection';
import { FAQSection } from './components/Home/FAQSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './lib/LanguageContext';
import { AuthProvider } from './lib/AuthContext';
import { Footer } from './components/Footer';

const MarketPage = lazy(() => import('./components/Pages/Market').then(m => ({ default: m.MarketPage })));
const PricesPage = lazy(() => import('./components/Pages/Prices').then(m => ({ default: m.PricesPage })));
const InsightsPage = lazy(() => import('./components/Pages/Insights').then(m => ({ default: m.InsightsPage })));
const ConfigurePage = lazy(() => import('./components/Pages/Configure').then(m => ({ default: m.ConfigurePage })));
const AuthFlow = lazy(() => import('./components/AuthFlow').then(m => ({ default: m.AuthFlow })));
const SupplyCRMPage = lazy(() => import('./components/Pages/SupplyCRM').then(m => ({ default: m.SupplyCRMPage })));
const FarmersPage = lazy(() => import('./components/Pages/FarmersPage').then(m => ({ default: m.FarmersPage })));
const VendorsPage = lazy(() => import('./components/Pages/VendorsPage').then(m => ({ default: m.VendorsPage })));
const LogisticsPage = lazy(() => import('./components/Pages/LogisticsPage').then(m => ({ default: m.LogisticsPage })));
const CustomersPage = lazy(() => import('./components/Pages/CustomersPage').then(m => ({ default: m.CustomersPage })));
const RetailersPage = lazy(() => import('./components/Pages/RetailersPage').then(m => ({ default: m.RetailersPage })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const StoryPage = lazy(() => import('./components/Pages/Story').then(m => ({ default: m.StoryPage })));
const ResearchersPage = lazy(() => import('./components/Pages/ResearchersPage').then(m => ({ default: m.ResearchersPage })));
const AgentsPage = lazy(() => import('./components/Pages/AgentsPage').then(m => ({ default: m.AgentsPage })));
const DemoPage = lazy(() => import('./components/Pages/DemoPage').then(m => ({ default: m.DemoPage })));
const DigipinGuidePage = lazy(() => import('./components/Pages/DigipinGuidePage').then(m => ({ default: m.DigipinGuidePage })));

const HomePage = () => (
<main>
 <HeroSection />
 <InteractiveDemo />
 <EcosystemSection />
 <RoleStripSection />
 <AgentSection />
 <ComparisonSection />
 <NetworkMetricsSection />
 <AgriOSIntelligenceSection />
 <TestimonialsSection />
 <TrustSection />
 <FAQSection />
</main>
);

export default function App() {
 return (
 <Router>
 <LanguageProvider>
 <AuthProvider>
 <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden">
 <ErrorBoundary>
 <Navbar />
 <LocationPanel />
 <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-foreground"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>}>
   <Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/story" element={<StoryPage />} />
   <Route path="/researchers" element={<ResearchersPage />} />
   <Route path="/agents" element={<AgentsPage />} />
   <Route path="/market" element={<MarketPage />} />
   <Route path="/prices" element={<PricesPage />} />
   <Route path="/insights" element={<InsightsPage />} />
   <Route path="/configure" element={<ConfigurePage />} />
   <Route path="/supply-crm" element={<SupplyCRMPage />} />
   <Route path="/digipin" element={<DigipinGuidePage />} />
   <Route path="/farmers" element={<FarmersPage />} />
   <Route path="/vendors" element={<VendorsPage />} />
   <Route path="/logistics" element={<LogisticsPage />} />
   <Route path="/retailers" element={<RetailersPage />} />
   <Route path="/customers" element={<CustomersPage />} />
   <Route path="/signin" element={<AuthFlow />} />
   <Route path="/get-started" element={<AuthFlow />} />
   <Route path="/demo" element={<DemoPage />} />
   <Route path="*" element={<NotFound />} />
   </Routes>
 </Suspense>
 
 <Footer />
 </ErrorBoundary>
 </div>
 </AuthProvider>
 </LanguageProvider>
 </Router>
 );
}


