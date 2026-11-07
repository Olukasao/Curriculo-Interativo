// Primeiro import de main.jsx: estado inicial da demonstração (login automático com ?auto).
import { me } from "./fixtures";
try {
  localStorage.setItem("forceLogoutVersion", "2026-10-10-intro-video");
  if (location.search.includes("auto") || location.hash.includes("auto")) {
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify(me));
  }
} catch { /* sem armazenamento */ }
