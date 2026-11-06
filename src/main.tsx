import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LangProvider } from "./lib/i18n";
import { SmoothScroll } from "./lib/smoothScroll";
import "./styles/base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>,
);
