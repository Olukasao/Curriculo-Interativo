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
      if (id.endsWith("/src/main.jsx")) {
        // Dados extras da Central (faturas, chamados, avisos) e entrada automática com ?auto.
        out = 'import "./demo-extra.js";\n' + out;
        out = out.replace(
          "async function start() {",
          'async function start() {\n  if (location.search.includes("auto")) { try { localStorage.setItem("acessanet.customer.accessToken", "demo-access-token"); localStorage.setItem("acessanet.customer.refreshToken", "demo-refresh-token"); } catch {} }',
        );
      }
      if (id.endsWith("/src/cliente/clienteApi.js")) {
        out = out.replace(
          "function resolveDemoRequest(method, fullPath, body) {",
          "function resolveDemoRequest(method, fullPath, body) {\n  { const x = globalThis.__demoExtra?.(method, fullPath, body); if (x !== undefined) return x; }",
        );
      }
      if (id.endsWith("/src/cliente/ClienteArea.jsx")) {
        out = out
          .replace('const [cpf, setCpf] = useState("");', 'const [cpf, setCpf] = useState("123.456.789-09");')
          .replace('const [password, setPassword] = useState("");', 'const [password, setPassword] = useState("demo1234");');
      }
      return out === code ? null : { code: out, map: null };
    },
  }],
  build: { outDir: "dist-demo", emptyOutDir: true },
}));
