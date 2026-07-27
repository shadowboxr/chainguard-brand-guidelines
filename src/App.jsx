import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Foundations from "./pages/Foundations.jsx";
import VisualBrand from "./pages/VisualBrand.jsx";
import Assets from "./pages/Assets.jsx";

// Visual Brand topics, each its own page under /visual-brand/*.
const VB_PAGES = ["color", "typography", "design-elements", "data-visualization"];

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/foundations" replace />} />

        {/* Foundations + Assets: single pages with in-page (hash) sub-nav */}
        <Route path="/foundations" element={<Foundations />} />
        <Route path="/assets" element={<Assets />} />

        {/* Visual Brand: one page per topic; the base redirects to the first */}
        <Route path="/visual-brand" element={<Navigate to="/visual-brand/color" replace />} />
        {VB_PAGES.map((p) => (
          <Route path={`/visual-brand/${p}`} element={<VisualBrand page={p} key={p} />} key={p} />
        ))}

        <Route path="*" element={<Navigate to="/foundations" replace />} />
      </Route>
    </Routes>
  );
}
