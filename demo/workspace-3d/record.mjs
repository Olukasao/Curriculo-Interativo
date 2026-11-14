/**
 * Grava o Workspace 3D real (2D e 3D) para as capas do estudo de caso.
 * Uso: node demo/workspace-3d/record.mjs <pasta-do-Workspace-3d> <pasta-de-saida>
 * Requer o app rodando (npm run dev: web 5173, api 8787) e Chrome ou Edge instalado.
 */
import { createRequire } from "node:module";
import path from "node:path";
import { mkdirSync, readdirSync, renameSync } from "node:fs";

const [repo, out] = process.argv.slice(2);
const require = createRequire(path.join(repo, "package.json"));
const { chromium } = require("playwright-core");
const BASE = "http://127.0.0.1:5173";
mkdirSync(out, { recursive: true });

const browser = await (async () => {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel, headless: true, args: ["--ignore-gpu-blocklist", "--enable-gpu", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
    } catch {}
  }
  throw new Error("Chrome/Edge não encontrado");
})();

const W = 1440, H = 900;
async function session(name, role) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: path.join(out, "_" + name), size: { width: W, height: H } } });
  const p = await ctx.newPage();
  p.setDefaultTimeout(60000);
  await p.goto(BASE + "/");
  await p.click(`[data-account="${role}"]`);
  await p.waitForSelector(".topbar");
  return { ctx, p };
}
async function finish(name, { ctx, p }) {
  const v = p.video();
  await ctx.close();
  const file = await v.path();
  renameSync(file, path.join(out, name + ".webm"));
}
const setMode = async (p, mode) =>
  p.evaluate((m) => fetch("/api/admin/workspace-mode", { method: "PUT", headers: { "content-type": "application/json", "X-Requested-With": "office3d" }, body: JSON.stringify({ mode: m, confirm: true }) }).then((r) => r.status), mode);

// garante 3D para começar
{
  const s = await session("tmp", "admin");
  await setMode(s.p, "3d");
  await s.ctx.close();
}

// ---------- 3D ----------
{
  const s = await session("3d", "admin");
  const { p } = s;
  await p.waitForSelector('[data-engine="three"] canvas', { timeout: 60000 });
  await p.waitForTimeout(5000);
  const box = await p.locator('[data-engine="three"] canvas').boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  // órbita lenta da câmera
  await p.mouse.move(cx, cy);
  await p.mouse.down();
  await p.mouse.move(cx + 260, cy - 40, { steps: 70 });
  await p.mouse.up();
  await p.waitForTimeout(1200);
  // percorre a lista e seleciona postos
  const items = p.locator(".ops-list [role=option], .ops-list button, [role=listbox] [role=option]");
  console.log("itens na lista:", await items.count());
  for (let i = 0; i < Math.min(4, await items.count()); i++) {
    await items.nth(i * 2).click().catch(() => {});
    await p.waitForTimeout(2200);
  }
  await p.mouse.wheel(0, -500);
  await p.waitForTimeout(1500);
  await p.mouse.move(cx, cy);
  await p.mouse.down();
  await p.mouse.move(cx - 380, cy + 30, { steps: 80 });
  await p.mouse.up();
  await p.waitForTimeout(2000);
  await finish("3d", s);
}

// ---------- 2D ----------
{
  const s = await session("2d", "admin");
  const { p } = s;
  await setMode(p, "2d");
  await p.waitForSelector('[data-testid="office2d"]', { timeout: 60000 });
  await p.waitForTimeout(6000);
  for (let i = 0; i < 2; i++) await p.click('[aria-label="Aproximar"]').catch(() => {});
  await p.waitForTimeout(1500);
  await p.keyboard.down("d");
  await p.waitForTimeout(1600);
  await p.keyboard.up("d");
  await p.keyboard.down("s");
  await p.waitForTimeout(1200);
  await p.keyboard.up("s");
  await p.waitForTimeout(1500);
  await p.evaluate(() => window.__office2d?.focusTv?.("o66"));
  await p.waitForTimeout(1800);
  const cv = await p.locator(".office2d-canvas canvas").boundingBox();
  const pt = await p.evaluate(() => window.__office2d?.tvPoint?.("o66"));
  if (pt) await p.mouse.click(cv.x + pt.x, cv.y + pt.y);
  await p.waitForTimeout(2500);
  await p.keyboard.press("Escape");
  for (let i = 0; i < 4; i++) await p.click('[aria-label="Afastar"]').catch(() => {});
  await p.waitForTimeout(3000);
  await setMode(p, "3d");
  await finish("2d", s);
}
await browser.close();
console.log("pronto:", readdirSync(out).join(", "));
