import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CatalogDemoPage from "./pages/CatalogDemoPage";
import CrmDemoPage from "./pages/CrmDemoPage";
import AiAssistantDemoPage from "./pages/AiAssistantDemoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/catalogo" element={<CatalogDemoPage />} />
        <Route path="/demo/crm" element={<CrmDemoPage />} />
        <Route path="/demo/asistente" element={<AiAssistantDemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
