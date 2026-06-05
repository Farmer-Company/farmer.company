/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LocationPanel } from './components/LocationPanel';
import { HeroSection } from './components/Home/HeroSection';
import { SocialProofSection } from './components/Home/SocialProofSection';
import { InteractiveDemo } from './components/Home/InteractiveDemo';
import { RoleStripSection } from './components/Home/RoleStripSection';
import { EcosystemSection } from './components/Home/EcosystemSection';
import { AgentSection } from './components/Home/AgentSection';
import { ComparisonSection } from './components/Home/ComparisonSection';
import { TestimonialsSection } from './components/Home/TestimonialsSection';
import { TrustSection } from './components/Home/TrustSection';
import { FAQSection } from './components/Home/FAQSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './lib/LanguageContext';
import { AuthProvider } from './lib/AuthContext';
import { MarketPage } from './components/Pages/Market';
import { PricesPage } from './components/Pages/Prices';
import { InsightsPage } from './components/Pages/Insights';
import { ConfigurePage } from './components/Pages/Configure';
import { AuthFlow } from './components/AuthFlow';
import { SupplyCRMPage } from './components/Pages/SupplyCRM';
import { FarmersPage } from './components/Pages/FarmersPage';
import { VendorsPage } from './components/Pages/VendorsPage';
import { LogisticsPage } from './components/Pages/LogisticsPage';
import { CustomersPage } from './components/Pages/CustomersPage';
import { RetailersPage } from './components/Pages/RetailersPage';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';
import { StoryPage } from './components/Pages/Story';
import { ResearchersPage } from './components/Pages/ResearchersPage';
import { AgentsPage } from './components/Pages/AgentsPage';
import { DemoPage } from './components/Pages/DemoPage';

const HomePage = () => (
<main>
 <HeroSection />
 <InteractiveDemo />
 <RoleStripSection />
 <EcosystemSection />
 <AgentSection />
 <ComparisonSection />
 <SocialProofSection />
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
 <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
 <ErrorBoundary>
 <Navbar />
 <LocationPanel />
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
 
 <Footer />
 </ErrorBoundary>
 </div>
 </AuthProvider>
 </LanguageProvider>
 </Router>
 );
}


