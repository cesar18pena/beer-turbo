import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductLandingPage from "./pages/ProductLandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductLandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
