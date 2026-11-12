import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

interface VineDividerProps {
  variant?: 'default' | 'reverse';
}

export function VineDivider({ variant = 'default' }: VineDividerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const stem = wrap.querySelector('.vine-stem-path');
      const leaves = wrap.querySelectorAll('.vine-leaf-item');
      const bloom = wrap.querySelector('.vine-center-bloom');

      if (!stem) return;

      gsap.set(stem, { drawSVG: '0%' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 86%',
          end: 'top 46%',
          scrub: 0.7,
        },
      });

      tl.to(stem, { drawSVG: '100%', ease: 'none', duration: 1 });
      if (leaves.length) {
        tl.from(
          leaves,
          { scale: 0, transformOrigin: 'center center', stagger: 0.08, duration: 0.4, ease: 'back.out(2)' },
          '-=0.55'
        );
      }
      if (bloom) {
        tl.from(bloom, { scale: 0, transformOrigin: 'center center', duration: 0.45, ease: 'back.out(2.4)' }, '-=0.3');
      }
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="folio-wrap py-6 pointer-events-none select-none" aria-hidden="true">
      <div className="max-w-[780px] mx-auto">
        <svg viewBox="0 0 800 56" className="w-full h-12 overflow-visible" fill="none">
          <path
            className="vine-stem-path"
            d={
              variant === 'reverse'
                ? 'M0 28 C100 44,180 12,280 28 C360 44,440 12,520 28 C620 44,700 12,800 28'
                : 'M0 28 C100 12,180 44,280 28 C360 12,440 44,520 28 C620 12,700 44,800 28'
            }
            stroke="#c59b27"
            strokeWidth="1.15"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
          <path
            className="vine-leaf-item"
            d="M210 27 C216 17,232 19,226 30 C220 37,212 33,210 27 Z"
            fill="#4a6b5b"
          />
          <path
            className="vine-leaf-item"
            d="M398 32 C392 42,376 40,382 29 C388 22,396 26,398 32 Z"
            fill="#4a6b5b"
          />
          <path
            className="vine-leaf-item"
            d="M590 27 C596 17,612 19,606 30 C600 37,592 33,590 27 Z"
            fill="#4a6b5b"
          />
          <g className="vine-center-bloom">
            <circle cx="400" cy="28" r="9" stroke="#c59b27" strokeWidth="0.7" strokeDasharray="1.5 2.5" />
            <circle cx="400" cy="28" r="4" fill="#e0bd58" />
          </g>
        </svg>
      </div>
    </div>
  );
}

