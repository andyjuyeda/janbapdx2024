import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Hero from "./Hero/Hero";
import Header from "./Header/Header";
import Information from "./Information";
import Schedule from "./Schedule/Schedule";
import Contact from "./Contact";
import Footer from "./Footer";

import Dashboard from "./Dashboard/dashboard";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Header />
              <div className="px-5 sm:px-5 md:px-10 lg:px-20">
                <Information />
                <Schedule />
                <Contact />
                <Footer />
              </div>
              <Analytics />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
