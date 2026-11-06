#!/usr/bin/env node
/**
 * Encode a source video into the three web assets the portfolio expects:
 *
 *   public/media/<slug>/preview.mp4  — short, silent, small (hover / autoplay loops)
 *   public/media/<slug>/full.mp4     — full piece with audio, 720p-class
 *   public/media/<slug>/poster.webp  — still frame shown before playback
 *
 * Usage:
 *   npm run media -- <input.mp4> <slug> [--poster 7.5] [--from 2] [--len 6]
 *
 * Requires ffmpeg on PATH.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const [input, slug] = args;
if (!input || !slug) {
  console.error("usage: encode-video.mjs <input> <slug> [--poster s] [--from s] [--len s]");
  process.exit(1);
}
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 ? Number(args[i + 1]) : fallback;
};

const probe = spawnSync("ffprobe", [
  "-v", "error", "-select_streams", "v:0",
  "-show_entries", "stream=width,height:format=duration",
  "-of", "json", input,
], { encoding: "utf8" });
if (probe.status !== 0) {
  console.error(probe.stderr);
  process.exit(1);
}
const meta = JSON.parse(probe.stdout);
const { width, height } = meta.streams[0];
const duration = Number(meta.format.duration);
const portrait = height > width;

// Scale on the long edge, keep even dimensions.
const fit = (long) => (portrait ? `scale=-2:${long}` : `scale=${long}:-2`);

const out = path.join("public", "media", slug);
mkdirSync(out, { recursive: true });

const from = flag("from", Math.min(1, duration * 0.05));
const len = flag("len", Math.min(6, duration - from));
const posterAt = flag("poster", duration * 0.55);

const run = (label, ffArgs) => {
  process.stdout.write(`  ${label} … `);
  const r = spawnSync("ffmpeg", ["-y", "-v", "error", ...ffArgs], { stdio: ["ignore", "inherit", "inherit"] });
  if (r.status !== 0) process.exit(r.status ?? 1);
  console.log("ok");
};

console.log(`${slug}  (${width}×${height}, ${duration.toFixed(1)}s)`);

run("preview", [
  "-ss", String(from), "-t", String(len), "-i", input,
  "-vf", `${fit(720)},fps=30`, "-an",
  "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-profile:v", "high",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart",
  path.join(out, "preview.mp4"),
]);

run("full", [
  "-i", input,
  "-vf", `${fit(1280)},fps=30`,
  "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-profile:v", "high",
  "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart",
  path.join(out, "full.mp4"),
]);

run("poster", [
  "-ss", String(posterAt), "-i", input, "-frames:v", "1",
  "-vf", fit(1280), "-c:v", "libwebp", "-quality", "80",
  path.join(out, "poster.webp"),
]);

for (const f of ["preview.mp4", "full.mp4", "poster.webp"]) {
  const kb = Math.round(statSync(path.join(out, f)).size / 1024);
  console.log(`  ${f.padEnd(12)} ${kb} KB`);
}
