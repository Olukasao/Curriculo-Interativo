import "./env";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { askRouter } from "./ask";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(here, "..", "dist");
const port = Number(process.env.PORT ?? 8787);

const app = express();
app.disable("x-powered-by");
// Behind Nginx or a platform proxy, set TRUST_PROXY=1 so rate limits see the real client IP.
if (process.env.TRUST_PROXY) app.set("trust proxy", Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.use("/api", express.json({ limit: "8kb" }), askRouter);

if (existsSync(dist)) {
  app.use(
    express.static(dist, {
      index: false,
      setHeaders(res, file) {
        if (file.includes(`${path.sep}assets${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        else if (file.includes(`${path.sep}media${path.sep}`)) res.setHeader("Cache-Control", "public, max-age=604800");
      },
    }),
  );
  // Client-side routes (/work/:slug, /cv) resolve to the SPA shell.
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(port, () => {
  const mode = process.env.ANTHROPIC_API_KEY ? "llm" : "demo";
  console.log(`portfolio server on http://localhost:${port}  (assistant: ${mode})`);
});
