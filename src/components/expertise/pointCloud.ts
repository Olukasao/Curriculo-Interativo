import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";

export type Shape = "engineering" | "intelligence" | "creative";

/** Deterministic pseudo-random, so shapes look the same on every load. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/** Engineering: order. A lattice of evenly spaced points. */
function lattice(n: number) {
  const out = new Float32Array(n * 3);
  const side = Math.ceil(Math.cbrt(n));
  for (let i = 0; i < n; i++) {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side));
    out.set([(x / (side - 1) - 0.5) * 2, (y / (side - 1) - 0.5) * 2, (z / (side - 1) - 0.5) * 2], i * 3);
  }
  return out;
}

/** Intelligence: a shell with dense clusters wired inside, like a network. */
function network(n: number) {
  const out = new Float32Array(n * 3);
  const r = rng(7);
  const shell = Math.floor(n * 0.62);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < shell; i++) {
    const y = 1 - (i / (shell - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    out.set([Math.cos(th) * rad * 1.35, y * 1.35, Math.sin(th) * rad * 1.35], i * 3);
  }
  const hubs = Array.from({ length: 9 }, () => [r() * 1.6 - 0.8, r() * 1.6 - 0.8, r() * 1.6 - 0.8]);
  for (let i = shell; i < n; i++) {
    const a = hubs[i % hubs.length];
    const b = hubs[(i * 5 + 3) % hubs.length];
    const t = r();
    // Points scattered along the links between hubs, denser near the hubs.
    const k = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const j = 0.05;
    out.set(
      [a[0] + (b[0] - a[0]) * k + (r() - 0.5) * j, a[1] + (b[1] - a[1]) * k + (r() - 0.5) * j, a[2] + (b[2] - a[2]) * k + (r() - 0.5) * j],
      i * 3,
    );
  }
  return out;
}

/** Creative: a torus-knot ribbon — one continuous gesture. */
function ribbon(n: number) {
  const out = new Float32Array(n * 3);
  const r = rng(13);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const p = 2;
    const q = 3;
    const rr = 0.55 * (2 + Math.cos(q * t));
    const spread = (r() - 0.5) * 0.28;
    const twist = (r() - 0.5) * 0.28;
    out.set(
      [rr * Math.cos(p * t) * 0.62 + spread, rr * Math.sin(p * t) * 0.62 + twist, -Math.sin(q * t) * 0.55 + (r() - 0.5) * 0.12],
      i * 3,
    );
  }
  return out;
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

export function createPointCloud(canvas: HTMLCanvasElement, opts: { count: number; animate: boolean }) {
  const { count, animate } = opts;
  const shapes: Record<Shape, Float32Array> = {
    engineering: lattice(count),
    intelligence: network(count),
    creative: ribbon(count),
  };

  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 50);
  camera.position.set(0, 0, 5.2);

  const geometry = new BufferGeometry();
  const current = new Float32Array(shapes.engineering);
  geometry.setAttribute("position", new BufferAttribute(current, 3));
  const material = new PointsMaterial({
    size: 0.045,
    map: dotTexture(),
    color: new Color("#ededE8"),
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  points.rotation.set(0.5, 0.6, 0);
  scene.add(points);

  // Each point starts its move with a small delay, so the cloud flows rather than snaps.
  const delays = new Float32Array(count).map((_, i) => ((i * 9301 + 49297) % 233280) / 233280);
  let from = new Float32Array(current);
  let to = shapes.engineering;
  let morphStart = -1;
  const MORPH = 1.7;
  const SPREAD = 0.45;

  let visible = true;
  let raf = 0;
  let pointer = { x: 0, y: 0 };
  let last = performance.now();

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  }

  function stepMorph(now: number) {
    if (morphStart < 0) return false;
    const t = (now - morphStart) / 1000;
    let done = true;
    for (let i = 0; i < count; i++) {
      const local = Math.min(1, Math.max(0, (t - delays[i] * SPREAD) / (MORPH - SPREAD)));
      if (local < 1) done = false;
      const e = local < 0.5 ? 4 * local * local * local : 1 - Math.pow(-2 * local + 2, 3) / 2;
      const k = i * 3;
      current[k] = from[k] + (to[k] - from[k]) * e;
      current[k + 1] = from[k + 1] + (to[k + 1] - from[k + 1]) * e;
      current[k + 2] = from[k + 2] + (to[k + 2] - from[k + 2]) * e;
    }
    geometry.attributes.position.needsUpdate = true;
    if (done) morphStart = -1;
    return true;
  }

  function render() {
    renderer.render(scene, camera);
  }

  function loop(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    stepMorph(now);
    points.rotation.y += dt * 0.12;
    points.rotation.x += (0.45 + pointer.y * 0.35 - points.rotation.x) * 0.05;
    points.rotation.z += (pointer.x * 0.25 - points.rotation.z) * 0.05;
    render();
    if (visible) raf = requestAnimationFrame(loop);
  }

  function start() {
    if (!animate) return render();
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(loop);
  }

  resize();
  start();

  return {
    setShape(shape: Shape) {
      to = shapes[shape];
      if (!animate) {
        current.set(to);
        geometry.attributes.position.needsUpdate = true;
        return render();
      }
      from = new Float32Array(current);
      morphStart = performance.now();
    },
    setVisible(v: boolean) {
      if (v === visible) return;
      visible = v;
      if (v) start();
      else cancelAnimationFrame(raf);
    },
    setPointer(x: number, y: number) {
      pointer = { x, y };
    },
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
