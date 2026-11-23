import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogDemoPage from "./pages/CatalogDemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/catalogo" element={<CatalogDemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
