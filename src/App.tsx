import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IGCSESubjects from "./pages/IGCSESubjects";
import IGCSESubjectDetail from "./pages/IGCSESubjectDetail";
import IALSubjects from "./pages/IALSubjects";
import IALSubjectDetail from "./pages/IALSubjectDetail";
import IGCSEPastPapers from "./pages/IGCSEPastPapers";
import IGCSEPastPaperDetail from "./pages/IGCSEPastPaperDetail";
import IALPastPapers from "./pages/IALPastPapers";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/igcse-subjects" element={<IGCSESubjects />} />
          <Route path="/igcse/:subject" element={<IGCSESubjectDetail />} />
          <Route path="/ial-subjects" element={<IALSubjects />} />
          <Route path="/ial/:subject" element={<IALSubjectDetail />} />
          <Route path="/igcse-past-papers" element={<IGCSEPastPapers />} />
          <Route path="/igcse-past-papers/:subject" element={<IGCSEPastPaperDetail />} />
          <Route path="/ial-past-papers" element={<IALPastPapers />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
