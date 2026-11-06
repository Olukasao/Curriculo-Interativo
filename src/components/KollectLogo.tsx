import "./KollectLogo.css";

/**
 * The O of WORLD sits at (878, 455) with radius 134 in the layers' 1776×628 space
 * (logo-meta.json: O centre 535,747.5 r 67 in reference px, layers at 2× from 96,520).
 * The globe PNG carries a 3/76 margin around the sphere.
 *
 * The KOLLECT YOUR WORLD lockup, stacked from its original layers.
 * Brand rule: the mascot (the O in KOLLECT) is never modified or animated —
 * so this component is deliberately static. Animate around it, never on it.
 */
export function KollectLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`kollect-logo ${className}`} role="img" aria-label="Kollect your world">
      {["shadow", "your", "world", "kollect"].map((layer) => (
        <img key={layer} src={`/brand/kollect/logo-${layer}.png`} alt="" loading="lazy" decoding="async" />
      ))}
      {/* The O of WORLD in its resting state (the globe), keyed from the identity film. */}
      <img className="kollect-logo__o" src="/brand/kollect/logo-o-globe.png" alt="" loading="lazy" decoding="async" />
    </div>
  );
}
