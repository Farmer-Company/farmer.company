/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

const MarketPage = React.lazy(() => import('./components/Pages/Market').then(m => ({ default: m.MarketPage })));
const PricesPage = React.lazy(() => import('./components/Pages/Prices').then(m => ({ default: m.PricesPage })));
const InsightsPage = React.lazy(() => import('./components/Pages/Insights').then(m => ({ default: m.InsightsPage })));
const ConfigurePage = React.lazy(() => import('./components/Pages/Configure').then(m => ({ default: m.ConfigurePage })));
const AuthFlow = React.lazy(() => import('./components/AuthFlow').then(m => ({ default: m.AuthFlow })));
const SupplyCRMPage = React.lazy(() => import('./components/Pages/SupplyCRM').then(m => ({ default: m.SupplyCRMPage })));
const FarmersPage = React.lazy(() => import('./components/Pages/FarmersPage').then(m => ({ default: m.FarmersPage })));
const VendorsPage = React.lazy(() => import('./components/Pages/VendorsPage').then(m => ({ default: m.VendorsPage })));
const LogisticsPage = React.lazy(() => import('./components/Pages/LogisticsPage').then(m => ({ default: m.LogisticsPage })));
const CustomersPage = React.lazy(() => import('./components/Pages/CustomersPage').then(m => ({ default: m.CustomersPage })));
const RetailersPage = React.lazy(() => import('./components/Pages/RetailersPage').then(m => ({ default: m.RetailersPage })));
const StoryPage = React.lazy(() => import('./components/Pages/Story').then(m => ({ default: m.StoryPage })));
const ResearchersPage = React.lazy(() => import('./components/Pages/ResearchersPage').then(m => ({ default: m.ResearchersPage })));
const AgentsPage = React.lazy(() => import('./components/Pages/AgentsPage').then(m => ({ default: m.AgentsPage })));
const DemoPage = React.lazy(() => import('./components/Pages/DemoPage').then(m => ({ default: m.DemoPage })));
const DigipinGuidePage = React.lazy(() => import('./components/Pages/DigipinGuidePage').then(m => ({ default: m.DigipinGuidePage })));

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
 <React.Suspense fallback={<LoadingScreen />}>
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
 </React.Suspense>
 
 <Footer />
 </ErrorBoundary>
 </div>
 </AuthProvider>
 </LanguageProvider>
 </Router>
 );
}


