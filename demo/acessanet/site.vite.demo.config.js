import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config.js";

// Prévia embutida no portfólio: servida em /apps/acessanet-site/, rotas por hash, sem backend real.
const BASE = "/apps/acessanet-site/";
export default mergeConfig(base, defineConfig({
  base: BASE,
  define: { "import.meta.env.VITE_ACESSANET_API_URL": JSON.stringify("https://api.demo.invalid") },
  plugins: [{
    name: "preview-paths",
    enforce: "pre",
    transform(code, id) {
      if (id.includes("node_modules") || !/\.(jsx?|tsx?)$/.test(id)) return null;
      let out = code.replace(/(["'`])\/earth\//g, `$1${BASE}earth/`);
      if (id.endsWith("/src/main.jsx")) out = out.replace(/BrowserRouter/g, "HashRouter");
      return out === code ? null : { code: out, map: null };
    },
  }],
  build: { outDir: "dist-demo", emptyOutDir: true },
}));
