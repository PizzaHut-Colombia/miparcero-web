import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogDemoPage from "./pages/CatalogDemoPage";
import CrmDemoPage from "./pages/CrmDemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/catalogo" element={<CatalogDemoPage />} />
        <Route path="/demo/crm" element={<CrmDemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
