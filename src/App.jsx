import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProductsPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import VerifyPage from './pages/Verify';
import COAPage from './pages/COA';
import ContactPage from './pages/Contact';
import { PrivacyPage, TermsPage, DisclaimerPage, RefundPage, NotFoundPage } from './pages/Policies';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetailPage /></Layout>} />
        <Route path="/verify" element={<Layout><VerifyPage /></Layout>} />
        <Route path="/coa" element={<Layout><COAPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/privacy" element={<Layout><PrivacyPage /></Layout>} />
        <Route path="/terms" element={<Layout><TermsPage /></Layout>} />
        <Route path="/disclaimer" element={<Layout><DisclaimerPage /></Layout>} />
        <Route path="/refund" element={<Layout><RefundPage /></Layout>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <div className="gradient-bg"></div>
        <div className="glow-mesh"></div>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
