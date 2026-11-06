// Loaded first by server/index.ts so every module sees .env values at import time.
try {
  process.loadEnvFile();
} catch {
  /* no .env file — rely on the real environment */
}
