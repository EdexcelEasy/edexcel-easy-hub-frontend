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
import IGCSEModularPastPapers from "./pages/IGCSEModularPastPapers";
import IGCSEPastPaperDetail from "./pages/IGCSEPastPaperDetail";
import IALPastPapers from "./pages/IALPastPapers";
import IALPastPaperDetail from "./pages/IALPastPaperDetail";
import Pricing from "./pages/Pricing";
import BuyCourses from "./pages/BuyCourses";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import PaperOptions from "./pages/PaperOptions";
import SubjectResources from "./pages/SubjectResources";
import IALResourceUnits from "./pages/IALResourceUnits";
import IALUnitResources from "./pages/IALUnitResources";
import Cheatsheets from "./pages/Cheatsheets";
import CheatsheetSubjects from "./pages/CheatsheetSubjects";
import WorksheetUnits from "./pages/WorksheetUnits";
import WorksheetDetail from "./pages/WorksheetDetail";
import FloatingChat from "./components/FloatingChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy-courses" element={<BuyCourses />} />
          <Route path="/igcse-subjects" element={<IGCSESubjects />} />
          <Route path="/igcse/:subject" element={<IGCSESubjectDetail />} />
          <Route path="/ial-subjects" element={<IALSubjects />} />
          <Route path="/ial/:subject" element={<IALSubjectDetail />} />
          <Route path="/igcse-past-papers" element={<IGCSEPastPapers />} />
          <Route path="/igcse-past-papers/:subject" element={<IGCSEPastPaperDetail />} />
          <Route path="/igcse-modular-past-papers" element={<IGCSEModularPastPapers />} />
          <Route path="/ial-past-papers" element={<IALPastPapers />} />
          <Route path="/ial-past-papers/:subject" element={<IALPastPaperDetail />} />
          <Route path="/cheatsheets" element={<Cheatsheets />} />
          <Route path="/cheatsheets/:category" element={<CheatsheetSubjects />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources/:curriculum/:subject" element={<SubjectResources />} />
          <Route path="/resources/ial/:subject/units" element={<IALResourceUnits />} />
          <Route path="/resources/ial/:subject/unit/:unit" element={<IALUnitResources />} />
          <Route path="/worksheets/:curriculum/:subject" element={<WorksheetUnits />} />
          <Route path="/worksheets/:curriculum/:subject/unit/:unit" element={<WorksheetDetail />} />
          <Route path="/:curriculum/:subject/:paper/:year" element={<PaperOptions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
