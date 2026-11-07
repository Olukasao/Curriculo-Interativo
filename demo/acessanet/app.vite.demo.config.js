import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config.js";

// Prévia embutida no portfólio: servida em /apps/acessanet-app/, tudo no modo demonstração da Central.
const BASE = "/apps/acessanet-app/";
export default mergeConfig(base({ command: "build" }), defineConfig({
  base: BASE,
  define: { "import.meta.env.VITE_ACESSANET_API_URL": JSON.stringify("https://api.demo.invalid") },
  plugins: [{
    name: "preview-paths",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("node_modules") || !/\.(jsx?|tsx?)$/.test(id)) return null;
      let out = code.replace(/(["'`])\/earth\//g, `$1${BASE}earth/`);
      // Entra direto na Central já em modo demonstração (CPF de demonstração).
      if (id.endsWith("/src/main.jsx")) out = out.replace("async function start() {", `async function start() {\n  if (location.search.includes("auto")) { try { localStorage.setItem("acessanet.customer.accessToken", "demo-access-token"); localStorage.setItem("acessanet.customer.refreshToken", "demo-refresh-token"); } catch {} }`);
      return out === code ? null : { code: out, map: null };
    },
  }],
  build: { outDir: "dist-demo", emptyOutDir: true },
}));
