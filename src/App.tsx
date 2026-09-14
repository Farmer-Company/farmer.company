/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
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
const MarketPage = React.lazy(() => import('./components/Pages/Market').then(module => ({ default: module.MarketPage })));
const PricesPage = React.lazy(() => import('./components/Pages/Prices').then(module => ({ default: module.PricesPage })));
const InsightsPage = React.lazy(() => import('./components/Pages/Insights').then(module => ({ default: module.InsightsPage })));
const ConfigurePage = React.lazy(() => import('./components/Pages/Configure').then(module => ({ default: module.ConfigurePage })));
const AuthFlow = React.lazy(() => import('./components/AuthFlow').then(module => ({ default: module.AuthFlow })));
const SupplyCRMPage = React.lazy(() => import('./components/Pages/SupplyCRM').then(module => ({ default: module.SupplyCRMPage })));
const FarmersPage = React.lazy(() => import('./components/Pages/FarmersPage').then(module => ({ default: module.FarmersPage })));
const VendorsPage = React.lazy(() => import('./components/Pages/VendorsPage').then(module => ({ default: module.VendorsPage })));
const LogisticsPage = React.lazy(() => import('./components/Pages/LogisticsPage').then(module => ({ default: module.LogisticsPage })));
const CustomersPage = React.lazy(() => import('./components/Pages/CustomersPage').then(module => ({ default: module.CustomersPage })));
const RetailersPage = React.lazy(() => import('./components/Pages/RetailersPage').then(module => ({ default: module.RetailersPage })));
const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
import { Footer } from './components/Footer';
const StoryPage = React.lazy(() => import('./components/Pages/Story').then(module => ({ default: module.StoryPage })));
const ResearchersPage = React.lazy(() => import('./components/Pages/ResearchersPage').then(module => ({ default: module.ResearchersPage })));
const AgentsPage = React.lazy(() => import('./components/Pages/AgentsPage').then(module => ({ default: module.AgentsPage })));
const DemoPage = React.lazy(() => import('./components/Pages/DemoPage').then(module => ({ default: module.DemoPage })));
const DigipinGuidePage = React.lazy(() => import('./components/Pages/DigipinGuidePage').then(module => ({ default: module.DigipinGuidePage })));

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
 <Suspense fallback={<LoadingScreen />}>
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


