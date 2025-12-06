import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/useScrollToTop";
import useRevealOnScroll from "./hooks/useRevealOnScroll";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Pages
import HomePage from "../src/pages/Homepage";
import PracticeAreas from "../src/pages/PracticeAreas";
import TeamPage from "../src/pages/TeamPage";
import AboutPage from "../src/pages/AboutPage";
import ConsultPage from "../src/pages/ConsultPage"; // create later

function AppContent() {
  useScrollToTop();
  useRevealOnScroll();

  return (
    <div className="font-sans text-gray-900">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/practice-areas" element={<PracticeAreas />} />
        <Route path="/teampage" element={<TeamPage />} />
        <Route path="/consultpage" element={<ConsultPage />} />
      </Routes>

      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
