import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

import Noise from './components/reactbits/Noise/Noise';
import { FolioHeader } from './components/FolioHeader';
import { TravelingMotif } from './components/TravelingMotif';
import { VineDivider } from './components/VineDivider';

import { Ch1WorldHero } from './chapters/Ch1WorldHero';
import { Ch2Perspective } from './chapters/Ch2Perspective';
import { Ch3Dialectic } from './chapters/Ch3Dialectic';
import { Ch4HumanTouch } from './chapters/Ch4HumanTouch';
import { Ch5Philosophy } from './chapters/Ch5Philosophy';
import { Ch6EssenceFinale } from './chapters/Ch6EssenceFinale';
import { soundscape } from './audio/soundscapeEngine';

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, MotionPathPlugin, useGSAP);

export function App() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [soundActive, setSoundActive] = useState(false);
  const [enableMotion, setEnableMotion] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopMq = window.matchMedia('(min-width: 768px)');

    const sync = () => {
      setEnableMotion(!motionMq.matches);
      setIsDesktop(desktopMq.matches);
    };
    sync();

    motionMq.addEventListener('change', sync);
    desktopMq.addEventListener('change', sync);

    return () => {
      motionMq.removeEventListener('change', sync);
      desktopMq.removeEventListener('change', sync);
      soundscape.destroy();
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const mainEl = mainRef.current;
      const motif = motifRef.current;
      if (!root || !mainEl) return;

      const mm = gsap.matchMedia();

      // Chapter compass active tracking across all viewports
      const chapterSections = gsap.utils.toArray<HTMLElement>('[data-chapter]');
      chapterSections.forEach((sec) => {
        const chapterNum = Number(sec.dataset.chapter || 1);
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 48%',
          end: 'bottom 48%',
          onEnter: () => setActiveChapter(chapterNum),
          onEnterBack: () => setActiveChapter(chapterNum),
        });
      });

      // Desktop Traveling Motif: single continuous document-space MotionPath spline (zero overlap / zero shake)
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        if (!motif) return;

        let ctx: gsap.Context | null = null;
        let lastWidth = 0;
        let lastHeight = 0;

        const buildMotifPath = () => {
          ctx?.revert();

          const stopEls = [1, 2, 3, 4, 5, 6]
            .map((n) => mainEl.querySelector<HTMLElement>(`[data-motif-stop="${n}"]`))
            .filter((el): el is HTMLElement => Boolean(el));

          if (stopEls.length < 2) return;

          const mainRect = mainEl.getBoundingClientRect();
          lastWidth = mainRect.width;
          lastHeight = mainRect.height;

          const points = stopEls.map((el) => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left - mainRect.left + r.width / 2,
              y: r.top - mainRect.top + r.height / 2,
            };
          });

          const firstStop = stopEls[0];
          const lastStop = stopEls[stopEls.length - 1];
          const morphPath = motif.querySelector('#motif-morph-path');

          ctx = gsap.context(() => {
            // Lock motif center at exact Stop 1 coordinates
            gsap.set(motif, {
              xPercent: -50,
              yPercent: -50,
              x: points[0].x,
              y: points[0].y,
              scale: 0.85,
              rotation: 0,
              autoAlpha: 1,
            });

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: firstStop,
                start: 'center 30%',
                endTrigger: lastStop,
                end: 'center 72%',
                scrub: 0.25,
              },
            });

            // Single continuous smooth spline from Stop 1 -> Stop 6 (zero overlapping tweens)
            tl.to(
              motif,
              {
                motionPath: {
                  path: points,
                  curviness: 0.65,
                  fromCurrent: false,
                },
                rotation: 360,
                scale: 1.04,
                duration: 1,
                ease: 'none',
              },
              0
            );

            // Non-overlapping sequential SVG shape morphs across the 0..1 timeline
            if (morphPath) {
              tl.to(morphPath, { morphSVG: '#motif-iris', duration: 0.16, ease: 'power1.inOut' }, 0.08)
                .to(morphPath, { morphSVG: '#motif-twin', duration: 0.16, ease: 'power1.inOut' }, 0.28)
                .to(morphPath, { morphSVG: '#motif-petal', duration: 0.16, ease: 'power1.inOut' }, 0.48)
                .to(morphPath, { morphSVG: '#motif-compass', duration: 0.16, ease: 'power1.inOut' }, 0.68)
                .to(morphPath, { morphSVG: '#motif-blossom', duration: 0.14, ease: 'power2.out' }, 0.86);
            }
          }, mainEl);
        };

        // Build after initial layout, and rebuild only on meaningful layout changes
        buildMotifPath();

        let resizeTimer: number | null = null;
        const onResize = () => {
          const rect = mainEl.getBoundingClientRect();
          if (Math.abs(rect.width - lastWidth) < 8 && Math.abs(rect.height - lastHeight) < 8) {
            return;
          }
          if (resizeTimer) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            buildMotifPath();
            ScrollTrigger.refresh();
          }, 180);
        };

        const ro = new ResizeObserver(onResize);
        ro.observe(mainEl);
        window.addEventListener('resize', onResize);

        return () => {
          if (resizeTimer) window.clearTimeout(resizeTimer);
          window.removeEventListener('resize', onResize);
          ro.disconnect();
          ctx?.revert();
        };
      });

      // Reduced Motion: place motif peacefully at rest inside the final crest between title & text
      mm.add('(prefers-reduced-motion: reduce) and (min-width: 768px)', () => {
        if (!motif) return;
        const stop6 = mainEl.querySelector<HTMLElement>('[data-motif-stop="6"]');
        if (!stop6) return;
        const mainRect = mainEl.getBoundingClientRect();
        const r = stop6.getBoundingClientRect();
        const morphPath = motif.querySelector('#motif-morph-path');

        gsap.set(motif, {
          xPercent: -50,
          yPercent: -50,
          x: r.left - mainRect.left + r.width / 2,
          y: r.top - mainRect.top + r.height / 2,
          scale: 1.05,
          rotation: 0,
          autoAlpha: 1,
        });
        if (morphPath) {
          gsap.set(morphPath, { morphSVG: '#motif-blossom' });
        }
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener('load', onLoad);
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  const allowWebGL = enableMotion && isDesktop;

  return (
    <div ref={rootRef} className="relative min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {enableMotion ? (
        <Noise opacity={0.035} size={1} fps={8} blendMode="overlay" contrast={0.35} fixed={true} zIndex={945} />
      ) : (
        <div className="static-paper-grain" aria-hidden="true" />
      )}
      <div className="ambient-vignette" aria-hidden="true" />

      <FolioHeader
        activeChapter={activeChapter}
        soundActive={soundActive}
        onSoundToggle={setSoundActive}
      />

      <main id="main-content" ref={mainRef} tabIndex={-1} className="relative">
        {/* Document-space Traveling Motif gliding along real DOM anchors */}
        <TravelingMotif ref={motifRef} />

        <Ch1WorldHero enableWebGL={allowWebGL} />
        <VineDivider variant="default" />
        <Ch2Perspective />
        <VineDivider variant="reverse" />
        <Ch3Dialectic enableWebGL={allowWebGL} />
        <VineDivider variant="default" />
        <Ch4HumanTouch />
        <VineDivider variant="reverse" />
        <Ch5Philosophy enableWebGL={allowWebGL} />
        <VineDivider variant="default" />
        <Ch6EssenceFinale />
      </main>
    </div>
  );
}

export default App;
