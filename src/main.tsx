import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./Root";
import { initTheme } from "./theme";
import "./styles.css";
import "./pages.css";
import "./tw.css";

initTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
