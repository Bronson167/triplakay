import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import Formation from "./pages/Formation"
import ScrollToTop from "./components/ScrollToTop.jsx";

import Layout from "./components/Layout";
import Home from "./pages/Home";

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  return (
    <HelmetProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Toaster />

        <Routes>
          {/* ✅ LAYOUT GLOBAL */}
          <Route
            element={<Layout theme={theme} setTheme={setTheme} />}
          >
            {/* ✅ PAGE UNIQUE */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Formation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;