
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from '@/components/common/ScrollToTop';

// Import main pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact"; // Import directly, no lazy loading
import VerifyUser from "./pages/VerifyUser";
import TermsOfService from "./pages/TermOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Impressum from "./pages/Impressum";
import RefundAndCookies from "./pages/RefundAndCookies";
import EmailVerificationNotice from "./pages/EmailVerificationNotice";

// Lazy load other pages for better performance
const EstatesAgency = lazy(() => import("./pages/EstatesAgency"));
const Research = lazy(() => import("./pages/ResearchAndConsultancy"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const Agriculture = lazy(() => import("./pages/AgriBusiness"));
const AgricultureProductDetails = lazy(() => import("./pages/AgricultureProductDetails"));
const Founder = lazy(() => import("./pages/Founder"));
const Publications = lazy(() => import("./pages/Publications"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Enterprise = lazy(() => import("./pages/Enterprise"));
const ConsultationPage = lazy(() => import("./pages/ConsultationForm"));

// Loading fallback component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-mikado border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Create a client with updated React Query v5 configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Improve performance by disabling refetching on window focus
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache data for 30 minutes (updated from cacheTime)
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Core routes in navigation order - Index is not lazy loaded for faster initial render */}
            <Route path="/" element={<Index />} />

            {/* Contact is now directly imported, not lazy loaded */}
            <Route path="/contact" element={<Contact />} />

            {/* Lazy loaded routes */}
            <Route path="/estates/*" element={
              <Suspense fallback={<PageLoading />}>
                <EstatesAgency />
              </Suspense>
            } />
            <Route path="/frci/*" element={
              <Suspense fallback={<PageLoading />}>
                <Research />
              </Suspense>
            } />
            <Route path="/agriculture/*" element={
              <Suspense fallback={<PageLoading />}>
                <Agriculture />
              </Suspense>
            } />
            <Route path="/enterprise/*" element={
              <Suspense fallback={<PageLoading />}>
                <Enterprise />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<PageLoading />}>
                <About />
              </Suspense>
            } />
            <Route path="/founder" element={
              <Suspense fallback={<PageLoading />}>
                <Founder />
              </Suspense>
            } />

            {/* Supporting routes */}
            <Route path="/consultation" element={
              <Suspense fallback={<PageLoading />}>
                <ConsultationPage />
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={<PageLoading />}>
                <Login />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<PageLoading />}>
                <Register />
              </Suspense>
            } />
            <Route path="/email-verification-notice" element={
              <Suspense fallback={<PageLoading />}>
                <EmailVerificationNotice />
              </Suspense>
            } />
            <Route
              path="/verify-user/:uid/:token"
              element={<VerifyUser />}
            />

            <Route path="/dashboard" element={
              <Suspense fallback={<PageLoading />}>
                <Dashboard />
              </Suspense>
            } />

            <Route
              path="/properties" element={
                <Suspense fallback={<PageLoading />}>
                  <Properties />
                </Suspense>
              }
            />
            <Route
              path="terms-of-service"
              element={
                <Suspense fallback={<PageLoading />}>
                  <TermsOfService />
                </Suspense>
              }
            />
            <Route path="/impressum" element={
              <Suspense fallback={<PageLoading />}>
                <Impressum />
              </Suspense>
            } />

            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<PageLoading />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />

            <Route
              path="/refund-and-cookies-policy"
              element={
                <Suspense fallback={<PageLoading />}>
                  <RefundAndCookies />
                </Suspense>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
