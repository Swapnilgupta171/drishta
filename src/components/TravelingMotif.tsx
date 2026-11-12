import { forwardRef } from 'react';

/**
 * Continuous Traveling Motif (#traveling-motif)
 * Lives in document space inside <main> and glides smoothly along a single
 * non-overlapping MotionPathPlugin spline connecting [data-motif-stop="1".."6"].
 */
export const TravelingMotif = forwardRef<HTMLDivElement>(function TravelingMotif(_, ref) {
  return (
    <div
      id="traveling-motif"
      ref={ref}
      aria-hidden="true"
      className="hidden md:block absolute top-0 left-0 w-12 h-12 pointer-events-none z-[45] will-change-transform"
      style={{
        filter: 'drop-shadow(0 0 14px rgba(244, 216, 135, 0.7))',
      }}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="motifCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#faf6ee" />
            <stop offset="48%" stopColor="#f4d887" />
            <stop offset="100%" stopColor="#c59b27" />
          </radialGradient>

          {/* Morphology targets (centered strictly on 40,40 so center-of-mass never shifts) */}
          <path id="motif-seed" d="M40 16 C47 26 49 40 40 64 C31 40 33 26 40 16 Z" />
          <path id="motif-iris" d="M40 16 C54 16 64 26 64 40 C64 54 54 64 40 64 C26 64 16 54 16 40 C16 26 26 16 40 16 Z" />
          <path id="motif-twin" d="M40 12 L56 40 L40 68 L24 40 Z" />
          <path id="motif-petal" d="M40 15 C53 23 56 43 44 62 C38 68 30 60 27 44 C25 29 31 20 40 15 Z" />
          <path id="motif-compass" d="M40 10 L48 34 L70 40 L48 46 L40 70 L32 46 L10 40 L32 34 Z" />
          <path id="motif-blossom" d="M40 8 C44 25 55 36 72 40 C55 44 44 55 40 72 C36 55 25 44 8 40 C25 36 36 25 40 8 Z" />
        </defs>

        {/* Locked symmetric bounding circle prevents transform origin wobble */}
        <circle cx="40" cy="40" r="36" fill="none" stroke="none" />

        {/* Subtle outer gilt ring */}
        <circle
          cx="40"
          cy="40"
          r="26"
          stroke="#e0bd58"
          strokeWidth="0.75"
          strokeOpacity="0.45"
          strokeDasharray="2 4"
        />

        {/* Active Morphing Star-Flower Path */}
        <path
          id="motif-morph-path"
          d="M40 16 C47 26 49 40 40 64 C31 40 33 26 40 16 Z"
          fill="url(#motifCoreGrad)"
          stroke="#f4d887"
          strokeWidth="0.9"
        />

        {/* Steady luminous core */}
        <circle cx="40" cy="40" r="4" fill="#faf6ee" opacity="0.92" />
      </svg>
    </div>
  );
});
