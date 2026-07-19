import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "./components/Analytics";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesIndexPage = lazy(() => import("./pages/ServicesIndexPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const CaseStudiesIndexPage = lazy(() => import("./pages/CaseStudiesIndexPage"));
const CaseStudyDetailPage = lazy(() => import("./pages/CaseStudyDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <div
      className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
      role="status"
      aria-label="Loading"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Analytics />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage locale="id" />} />
            <Route path="/en" element={<HomePage locale="en" />} />

            <Route path="/tentang-kami" element={<AboutPage locale="id" />} />
            <Route path="/en/about" element={<AboutPage locale="en" />} />

            <Route path="/layanan" element={<ServicesIndexPage locale="id" />} />
            <Route path="/en/services" element={<ServicesIndexPage locale="en" />} />
            <Route path="/layanan/:slug" element={<ServiceDetailPage locale="id" />} />
            <Route path="/en/services/:slug" element={<ServiceDetailPage locale="en" />} />

            <Route path="/studi-kasus" element={<CaseStudiesIndexPage locale="id" />} />
            <Route path="/en/case-studies" element={<CaseStudiesIndexPage locale="en" />} />
            <Route path="/studi-kasus/:slug" element={<CaseStudyDetailPage locale="id" />} />
            <Route path="/en/case-studies/:slug" element={<CaseStudyDetailPage locale="en" />} />

            <Route path="/kontak" element={<ContactPage locale="id" />} />
            <Route path="/en/contact" element={<ContactPage locale="en" />} />

            <Route path="/kebijakan-privasi" element={<PrivacyPage locale="id" />} />
            <Route path="/en/privacy" element={<PrivacyPage locale="en" />} />

            <Route path="/ketentuan-layanan" element={<TermsPage locale="id" />} />
            <Route path="/en/terms" element={<TermsPage locale="en" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
