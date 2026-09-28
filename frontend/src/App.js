import React, { useEffect, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { initLenis, scrollToTop } from "@/lib/lenis";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/Home";
import ServicesPage from "@/pages/Services";
import HowWeWorkPage from "@/pages/HowWeWork";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import Seo from "@/components/Seo";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (!hash) scrollToTop();
    if (!first.current) document.getElementById("main-content")?.focus({ preventScroll: true });
    first.current = false;
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: "instant", block: "start" }));
      return () => cancelAnimationFrame(frame);
    }
  }, [pathname, hash]);
  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="page-error" role="alert" className="wrap flex min-h-[60vh] flex-col justify-center py-24">
          <h1 className="font-serif text-4xl text-ink">Something went wrong.</h1>
          <p className="mt-4 text-inksoft">
            Please reload the page, or{" "}
            <a href="/" data-testid="error-home-link" className="underline underline-offset-4">
              return to the homepage
            </a>
            .
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
function NotFound() {
  return (
    <div data-testid="page-not-found" className="wrap flex min-h-[60vh] flex-col justify-center py-24">
      <Seo title="Page Not Found | ANUYORA" description="Explore ANUYORA’s bookkeeping services or return to the homepage." path="/404" />
      <p className="eyebrow">404</p>
      <h1 className="mt-6 font-serif text-4xl tracking-tight text-ink md:text-5xl">
        This page doesn’t exist.
      </h1>
      <p className="mt-5 max-w-md text-base text-inksoft">
        The page you’re looking for may have moved. Return to the homepage or explore our services.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/" data-testid="notfound-home-link" className="btn-primary">
          Back to Home
        </Link>
        <Link to="/services" data-testid="notfound-services-link" className="btn-outline">
          Our Services
        </Link>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    return initLenis();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <a href="#main-content" data-testid="skip-to-content" className="skip-link">Skip to content</a>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main-content" tabIndex={-1} data-testid="main-content" className="min-w-0 flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/how-we-work" element={<HowWeWorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
