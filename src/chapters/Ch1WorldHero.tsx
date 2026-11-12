import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitText from '../components/reactbits/SplitText/SplitText';
import BlurText from '../components/reactbits/BlurText/BlurText';
import Particles from '../components/reactbits/Particles/Particles';
import Magnet from '../components/reactbits/Magnet/Magnet';
import { ArtLayer } from '../components/ArtLayer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Ch1Props {
  enableWebGL: boolean;
}

export function Ch1WorldHero({ enableWebGL }: Ch1Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const portal = portalRef.current;
      if (!section || !portal) return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
        const sky = portal.querySelector('.hero-layer-sky');
        const muse = portal.querySelector('.hero-layer-muse');
        const vines = portal.querySelector('.hero-layer-vines');
        const proseItems = section.querySelectorAll('.hero-reveal-item');

        // Gentle initial settling on load (1.1s total hero choreography)
        gsap.from(portal, {
          scale: 0.96,
          autoAlpha: 0,
          duration: 1.05,
          ease: 'power3.out',
          clearProps: 'transform',
        });

        gsap.from(proseItems, {
          y: 18,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.85,
          delay: 0.25,
          ease: 'power2.out',
          clearProps: 'transform',
        });

        // Subtle 3-layer depth scroll scrub (artwork layers only, never text)
        if (sky) {
          gsap.to(sky, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        if (muse) {
          gsap.to(muse, {
            yPercent: -14,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        if (vines) {
          gsap.to(vines, {
            yPercent: -24,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          });
        }

        // Fine-pointer 60fps cursor depth parallax via gsap.quickTo
        const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!hasFinePointer) return;

        const skyX = sky ? gsap.quickTo(sky, 'x', { duration: 0.9, ease: 'power2.out' }) : null;
        const skyY = sky ? gsap.quickTo(sky, 'y', { duration: 0.9, ease: 'power2.out' }) : null;
        const museX = muse ? gsap.quickTo(muse, 'x', { duration: 0.7, ease: 'power2.out' }) : null;
        const museY = muse ? gsap.quickTo(muse, 'y', { duration: 0.7, ease: 'power2.out' }) : null;
        const vinesX = vines ? gsap.quickTo(vines, 'x', { duration: 0.45, ease: 'power2.out' }) : null;
        const vinesY = vines ? gsap.quickTo(vines, 'y', { duration: 0.45, ease: 'power2.out' }) : null;

        const onPointerMove = (e: PointerEvent) => {
          const dx = (e.clientX / window.innerWidth - 0.5) * 2;
          const dy = (e.clientY / window.innerHeight - 0.5) * 2;
          skyX?.(-dx * 10);
          skyY?.(-dy * 8);
          museX?.(dx * 8);
          museY?.(dy * 6);
          vinesX?.(dx * 18);
          vinesY?.(dy * 14);
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', onPointerMove);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="chapter-world"
      ref={sectionRef}
      data-chapter="1"
      aria-labelledby="hero-title"
      className="relative min-h-[100dvh] pt-[96px] pb-16 flex items-center overflow-hidden"
    >
      {/* Subtle Gilded Atmospheric Particles (desktop / motion-enabled only) */}
      {enableWebGL && (
        <div className="absolute inset-0 pointer-events-none opacity-45" aria-hidden="true">
          <Particles
            particleCount={42}
            particleSpread={12}
            speed={0.08}
            particleColors={['#e0bd58', '#c59b27', '#f2ebe0']}
            moveParticlesOnHover={false}
            alphaParticles={true}
            particleBaseSize={45}
            sizeRandomness={0.8}
            shape="sparkle"
            glow={0.35}
            twinkle={0.4}
            drift="up"
            driftSpeed={0.04}
          />
        </div>
      )}

      <div className="folio-wrap relative z-10 w-full">
        {/* Colossal Asymmetric Editorial Title spanning across top */}
        <div className="mb-4 lg:mb-[-2.5rem] relative z-20 pointer-events-none select-none">
          <div id="hero-title">
            <SplitText
              text="DRISHTA"
              tag="h1"
              splitType="chars"
              effect="rise"
              mask={true}
              trigger="load"
              delay={55}
              duration={1.15}
              textAlign="left"
              className="text-[clamp(3.6rem,10vw,9.4rem)] font-normal uppercase tracking-[0.16em] leading-[0.9] text-[var(--text-parchment)]"
              accentColor="#e0bd58"
            />
          </div>
        </div>

        {/* Two-Column Asymmetric Folio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Prose Column */}
          <div className="lg:col-span-6 lg:pt-12 flex flex-col items-start">
            <div className="hero-reveal-item flex items-center gap-3 mb-6">
              <span className="w-7 h-[1px] bg-[var(--gold-leaf)]" aria-hidden="true" />
              <BlurText
                text="Seeing through the eyes of artists."
                animateBy="words"
                effect="blur"
                direction="bottom"
                trigger="load"
                delay={70}
                stepDuration={0.4}
                className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[var(--gold-leaf)]"
              />
            </div>

            <blockquote
              className="hero-reveal-item mb-7 max-w-[18ch] text-[clamp(1.75rem,3vw,2.65rem)] leading-[1.28] text-[var(--text-parchment)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block">Not everything beautiful</span>
              <span className="block italic text-[var(--gold-highlight)] mb-2">is artificial.</span>
              <span className="block">Not everything artificial</span>
              <span className="block italic text-[var(--gold-highlight)]">is human.</span>
            </blockquote>

            <p className="hero-reveal-item text-base sm:text-lg text-[var(--text-muted)] max-w-[46ch] mb-8">
              An interactive manuscript exploring memory, mortality, and the unbroken lineage of human craft.
            </p>

            <div className="hero-reveal-item mb-10">
              <Magnet padding={36} magnetStrength={2.8} maxOffset={10} scale={1.02}>
                <a
                  href="#chapter-perspective"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('chapter-perspective')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="folio-btn inline-flex items-center gap-3 min-h-[46px] px-7 py-3 border border-[var(--border-gold)] bg-[#c59b27]/12 text-[var(--gold-highlight)] hover:bg-[var(--gold-leaf)] hover:text-[var(--bg-abyssal)] text-xs uppercase tracking-[0.22em]"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  <span>Begin the Inquiry</span>
                  <span aria-hidden="true" className="text-base leading-none">→</span>
                </a>
              </Magnet>
            </div>

            <aside className="hero-reveal-item flex items-center gap-4 pt-4 border-t border-[var(--border-gold-subtle)] max-w-[420px]">
              <span className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--gold-patina)]" style={{ fontFamily: 'var(--font-editorial)' }}>
                Folio I
              </span>
              <p className="text-sm italic text-[var(--text-secondary)] m-0">
                “Art is memory clothed in form, carrying the pulse of its maker.”
              </p>
            </aside>
          </div>

          {/* Right Surrealist 3-Plane Portal Arch (3:4 Ratio) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={portalRef}
              className="relative w-full max-w-[440px] aspect-[3/4]"
              role="img"
              aria-label="Surrealist Art Nouveau arch revealing twilight spires behind a dreaming muse veiled by climbing roses"
            >
              {/* Inner Arched Portal Frame */}
              <div
                className="relative w-full h-full rounded-t-[240px] rounded-b-[12px] overflow-hidden border border-[var(--border-gold-bright)] bg-[#08120c]"
                style={{ boxShadow: 'var(--shadow-paper), var(--shadow-gold-glow)' }}
              >
                {/* Motif Stop 1: Emerging gently near the painted crescent moon */}
                <span
                  data-motif-stop="1"
                  aria-hidden="true"
                  className="absolute top-[18%] right-[22%] w-1 h-1 pointer-events-none"
                />
                {/* Layer 1 (0.1x): Nocturnal Sky & Distant Floating Spires */}
                <div className="hero-layer-sky absolute inset-[-4%] will-change-transform">
                  <ArtLayer
                    asset="hero-sky-backdrop.png"
                    alt=""
                    loading="eager"
                    objectFit="cover"
                    objectPosition="center center"
                    fallbackKind="hero-sky"
                  />
                </div>

                {/* Layer 2 (0.35x): Dreaming Muse Cutout (RGBA Transparent) */}
                <div
                  className="hero-layer-muse absolute inset-x-0 bottom-0 top-[8%] will-change-transform"
                  style={{ filter: 'var(--shadow-cutout)' }}
                >
                  <ArtLayer
                    asset="hero-muse-foreground.png"
                    alt=""
                    loading="eager"
                    objectFit="contain"
                    objectPosition="center bottom"
                    fallbackKind="hero-muse"
                  />
                </div>

                {/* Inner Gold Arch Hairline Accent */}
                <div
                  className="absolute inset-3 rounded-t-[228px] rounded-b-[8px] border border-[var(--border-gold-subtle)] pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Layer 3 (0.65x): Breakout Botanical Vines physically crossing frame boundary */}
              <div
                className="hero-layer-vines absolute -top-4 -left-10 sm:-left-14 w-[44%] h-[106%] pointer-events-none will-change-transform z-20"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.72))' }}
                aria-hidden="true"
              >
                <ArtLayer
                  asset="flora-breakout-vines.png"
                  alt=""
                  loading="eager"
                  objectFit="contain"
                  objectPosition="left center"
                  fallbackKind="vines"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
