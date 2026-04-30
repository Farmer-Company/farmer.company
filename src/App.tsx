/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/Home/HeroSection';
import { SocialProofSection } from './components/Home/SocialProofSection';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './lib/LanguageContext';
import { AuthProvider } from './lib/AuthContext';
import { MarketPage } from './components/Pages/Market';
import { PricesPage } from './components/Pages/Prices';
import { InsightsPage } from './components/Pages/Insights';
import { ConfigurePage } from './components/Pages/Configure';
import { AuthFlow } from './components/AuthFlow';
import { LanguagePopup } from './components/LanguagePopup';
import { LoadingScreen } from './components/LoadingScreen';
import { SupplyCRMPage } from './components/Pages/SupplyCRM';
import { NotFound } from './pages/NotFound';
import { AnimatePresence } from 'framer-motion';
import { Footer } from './components/Footer';

const HomePage = () => (
<main>
  <HeroSection />
  <SocialProofSection />
</main>
);

export default function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial sequence
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground relative">
            <ErrorBoundary>
              <AnimatePresence>
                {loading && <LoadingScreen key="loading" />}
              </AnimatePresence>
              <Navbar />
              <LanguagePopup />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/market" element={<MarketPage />} />
                <Route path="/prices" element={<PricesPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/configure" element={<ConfigurePage />} />
                <Route path="/supply-crm" element={<SupplyCRMPage />} />
                <Route path="/signin" element={<AuthFlow />} />
                <Route path="/get-started" element={<AuthFlow />} />
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


