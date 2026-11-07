import { defineConfig, mergeConfig } from "vite";
import path from "node:path";
import base from "./vite.config.ts";

// Build da demonstração pública: sem servidor, sem Electron, dados fictícios e sem marca de terceiros.
const demo = (p: string) => path.resolve(__dirname, "src/demo", p);
const logo = demo("brand/logo.svg");
const placeholder = demo("brand/placeholder.svg");

const textSwaps: [RegExp | string, string][] = [
  ["<strong>AcessaNet</strong> Workspace", "<strong>Workscape</strong>"],
  ["acessanet\\.sgp\\.net\\.br", "sgp\\.demo\\.invalid"],
  [/acessanet\.sgp\.net\.br/gi, "sgp.demo.invalid"],
  [/acessanet\.com\.br/gi, "nexa.example"],
  [/Acessa Net/g, "Nexa Telecom"],
  ["Acessa Workspace", "Workscape"],
  [/AcessaNet/g, "Nexa Telecom"],
  [/Acessanet/g, "Nexa"],
  [/ACESSANET/g, "NEXA"],
  [/Assistente Acessa/g, "Assistente Workscape"],
];

export default mergeConfig(base, defineConfig({
  base: "./",
  define: { "import.meta.env.VITE_DEMO": JSON.stringify("1") },
  plugins: [{
    name: "workscape-demo",
    enforce: "pre",
    resolveId(source) {
      if (source === "socket.io-client") return demo("fakeIo.ts");
      if (/(^|\/)agendaDeployment(\.ts)?$/.test(source)) return demo("agendaDeployment.ts");
      if (/logo-acessanet\.png$|legacy\/assets\/logo\.(png|ico)$|\/assets\/logo\.(png|ico)$/.test(source)) return logo;
      if (/motions\/web\/.+\.(jpg|mp4)$|(harry-404|ednesio|pedro|bacterio)\.(png|webp)$|corrida-ccnav7\.png$/.test(source)) return placeholder;
      if (/data\/novidades(\.js)?$/.test(source)) return demo("novidades.ts");
      return null;
    },
    transform(code, id) {
      if (/node_modules/.test(id) || /[\/]src[\/]demo[\/]/.test(id) || !/\.(tsx?|jsx?)$/.test(id)) return null;
      let out = code;
      for (const [from, to] of textSwaps) out = typeof from === "string" ? out.split(from).join(to) : out.replace(from, to);
      return out === code ? null : { code: out, map: null };
    },
    transformIndexHtml: (html) => html.replace("Acessa Workspace", "Workscape"),
  }],
  build: { outDir: "dist-demo", emptyOutDir: true, sourcemap: false },
}));
