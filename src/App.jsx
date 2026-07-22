import { Routes, Route, Navigate } from "react-router-dom";
import { NAV } from "./content/nav.js";
import Layout from "./components/Layout.jsx";
import Foundations from "./pages/Foundations.jsx";
import VisualBrand from "./pages/VisualBrand.jsx";
import Stub from "./pages/Stub.jsx";
import { Doc, Placeholder } from "./pages/Doc.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/foundations" replace />} />
        {NAV.flatMap((section) => {
          const routes = [];
          if (section.children) {
            routes.push(
              <Route
                path={section.path}
                element={
                  section.id === "foundations" ? (
                    <Foundations />
                  ) : section.id === "visual-brand" ? (
                    <VisualBrand />
                  ) : (
                    <Stub title={section.label} />
                  )
                }
                key={section.path}
              />
            );
            for (const child of section.children)
              child.hash ||
                routes.push(
                  <Route
                    path={child.path}
                    element={<Doc eyebrow={section.label} title={child.label} lede={child.blurb ?? ""}>{<Placeholder />}</Doc>}
                    key={child.path}
                  />
                );
          } else {
            routes.push(<Route path={section.path} element={<Stub title={section.label} />} key={section.path} />);
          }
          return routes;
        })}
        <Route path="*" element={<Navigate to="/foundations" replace />} />
      </Route>
    </Routes>
  );
}
