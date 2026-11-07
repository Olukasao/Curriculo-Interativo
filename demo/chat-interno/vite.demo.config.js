import { defineConfig, mergeConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import base from "./vite.config.js";

// Prévia no portfólio: servida em /apps/chat-interno/, rotas por hash, sem servidor, dados fictícios e sem marca de terceiros.
const here = path.dirname(fileURLToPath(import.meta.url));
const demo = (p) => path.resolve(here, "src/demo", p);
const BASE = "/apps/chat-interno/";
const logo = demo("brand/logo.svg");
const placeholder = demo("brand/placeholder.svg");

const textSwaps = [
  [/acessanet\.sgp\.net\.br/gi, "sgp.demo.invalid"],
  [/acessanet\.oltcloud\.co/gi, "olt.demo.invalid"],
  [/Dias Gestão/g, "Nexa Telecom"],
  [/acessanet\.com\.br/gi, "nexa.example"],
  [/Acessa Net/g, "Nexa Telecom"],
  [/AcessaNet/g, "Nexa Telecom"],
  [/Acessanet/g, "Nexa"],
  [/ACESSANET/g, "NEXA"],
  [/acessanet-logo\.png/g, "acessanet-logo.svg"],
  [/(["'`])\/(sounds|videos|design-system|email-signatures)\//g, `$1${BASE}$2/`],
  [/BrowserRouter/g, "HashRouter"],
];

export default mergeConfig(base, defineConfig({
  base: BASE,
  define: { "import.meta.env.VITE_DEMO": JSON.stringify("1"), "import.meta.env.VITE_API_URL": JSON.stringify("/api") },
  plugins: [{
    name: "chat-demo",
    enforce: "pre",
    resolveId(source) {
      if (source === "socket.io-client") return demo("fakeIo.ts");
      if (/\/assets\/logo\.(png|ico)$|logo-acessanet\.png$/.test(source)) return logo;
      if (/motions\/web\/.+\.(jpg|mp4)$|competicao-ccna\/.+\.png$|(harry-404|ednesio|pedro|bacterio)\.(png|webp)$/.test(source)) return placeholder;
      if (/data\/novidades(\.js)?$/.test(source)) return demo("novidades.ts");
      return null;
    },
    transform(code, id) {
      if (/node_modules/.test(id) || /[\/]src[\/]demo[\/]/.test(id) || !/\.(tsx?|jsx?)$/.test(id)) return null;
      let out = code;
      for (const [from, to] of textSwaps) out = out.replace(from, to);
      return out === code ? null : { code: out, map: null };
    },
    transformIndexHtml: (html) => html.replace("Acessanet - Chat interno", "Chat interno").replace(/<script[^>]*aviso-app-intranet[^>]*><\/script>/, ""),
  }],
  build: { outDir: "dist-demo", emptyOutDir: true, sourcemap: false },
}));
