import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import StrokeText from '../components/reactbits/StrokeText/StrokeText';
import ClickSpark from '../components/reactbits/ClickSpark/ClickSpark';
import { ArtLayer } from '../components/ArtLayer';
import { soundscape } from '../audio/soundscapeEngine';

interface Pillar {
  key: 'memory' | 'emotion' | 'imagination' | 'experience' | 'intention';
  numeral: string;
  label: string;
  quote: string;
  body: string;
  /* Orbital coordinates on desktop SVG & layout */
  xPct: number;
  yPct: number;
}

const PILLARS: Pillar[] = [
  {
    key: 'memory',
    numeral: 'I',
    label: 'Memory',
    quote: '“Memory is not stored in binary tokens; it is steeped in the salt of human grief and nostalgic longing.”',
    body: 'The weathered patina of childhood, ancestral stories, and personal heartbreaks etched into the subconscious — an artist’s accumulated living archive that no training corpus can inhabit.',
    xPct: 50,
    yPct: 11,
  },
  {
    key: 'emotion',
    numeral: 'II',
    label: 'Emotion',
    quote: '“Emotion dictates the pressure of the bristle against the linen — a visceral urgency code cannot feel.”',
    body: 'The trembling force in an impasto stroke or the tender hesitation across a charcoal shadow carries genuine biological vulnerability.',
    xPct: 86,
    yPct: 37,
  },
  {
    key: 'imagination',
    numeral: 'III',
    label: 'Imagination',
    quote: '“Surrealism was born from human delirium and dreams — the mind wandering where probability dare not follow.”',
    body: 'Impossible spires, floating stones, and symbolic worlds are not statistical averages of past imagery, but psychic rebellions against what already exists.',
    xPct: 75,
    yPct: 84,
  },
  {
    key: 'experience',
    numeral: 'IV',
    label: 'Experience',
    quote: '“Every mark carries the weight of a biological heartbeat, weathered by years, joy, and mortality.”',
    body: 'Decades of watching dusk light fall through dust, touching cold river stone, and living through silence translate into an unquantifiable grammar of touch.',
    xPct: 25,
    yPct: 84,
  },
  {
    key: 'intention',
    numeral: 'V',
    label: 'Intention',
    quote: '“Art is intentional rebellion. Every omission is a moral and aesthetic choice.”',
    body: 'The conscious decision to defy symmetry or expectation. Where an algorithm optimizes toward likely consensus, the artist chooses deliberate defiance.',
    xPct: 14,
    yPct: 37,
  },
];

export function Ch2Perspective() {
  const [activeKey, setActiveKey] = useState<Pillar['key']>('memory');
  const sectionRef = useRef<HTMLElement>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);

  const activePillar = PILLARS.find((p) => p.key === activeKey) ?? PILLARS[0];

  const handleSelect = (pillar: Pillar, idx: number) => {
    if (pillar.key === activeKey) return;
    setActiveKey(pillar.key);
    soundscape.playInteractionChime(idx);
  };

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      if (proseRef.current) {
        gsap.fromTo(
          proseRef.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.36, ease: 'power2.out' }
        );
      }

      if (eyeRef.current) {
        gsap.fromTo(
          eyeRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 0.65, ease: 'power2.out' }
        );
      }
    },
    { dependencies: [activeKey], scope: sectionRef }
  );

  return (
    <section
      id="chapter-perspective"
      ref={sectionRef}
      data-chapter="2"
      aria-labelledby="perspective-title"
      className="py-20 lg:py-28 relative"
    >
      <div className="folio-wrap">
        {/* Chapter Header */}
        <header className="flex items-center gap-4 mb-4">
          <span
            className="px-3 py-1 border border-[var(--border-gold-subtle)] bg-[#c59b27]/10 text-[var(--gold-leaf)] text-xs tracking-[0.26em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            <StrokeText
              text="II"
              strokeColor="#e0bd58"
              fillColor="#e0bd58"
              strokeWidth={1}
              fontSize={16}
              fontWeight={600}
              fontFamily="Cinzel, serif"
              letterSpacing={2}
              trigger="scroll"
            />
          </span>
          <span
            className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[var(--accent-lichen-light)]"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            The Inward Architecture
          </span>
        </header>

        <h2
          id="perspective-title"
          className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal mb-5"
        >
          The Human <em className="italic text-[var(--gold-leaf)]">Perspective</em>
        </h2>

        <p className="drop-cap text-base sm:text-lg text-[var(--text-parchment)] max-w-[62ch] mb-12 lg:mb-16">
          Human art is not merely an arrangement of pixels. It is the crystallization of five sacred,
          biological dimensions that latent probability space cannot inhabit.
        </p>

        {/* Illuminated Consciousness Astrolabe + Rag Paper Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Orbital Diagram (Desktop) / Compact Astrolabe + List (Mobile) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <ClickSpark
              sparkColor={['#f4d887', '#e0bd58', '#f2ebe0']}
              sparkSize={9}
              sparkRadius={28}
              sparkCount={7}
              shape="star"
              duration={420}
              className="w-full flex justify-center"
            >
              <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center">
                {/* Outer Astrolabe Celestial Rings */}
                <div
                  className="hidden md:block absolute inset-[9%] rounded-full border border-dashed border-[var(--border-gold-subtle)] pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="hidden md:block absolute inset-[22%] rounded-full border border-[var(--border-gold-subtle)]/50 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Golden SVG Constellation Threads connecting Pupil to Nodes (Desktop) */}
                <svg
                  className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  {PILLARS.map((pillar) => {
                    const isActive = pillar.key === activeKey;
                    return (
                      <line
                        key={pillar.key}
                        x1="50"
                        y1="50"
                        x2={pillar.xPct}
                        y2={pillar.yPct}
                        stroke={isActive ? '#f4d887' : '#c59b27'}
                        strokeWidth={isActive ? '0.65' : '0.3'}
                        strokeDasharray={isActive ? 'none' : '1.4 1.4'}
                        strokeOpacity={isActive ? 1 : 0.42}
                        style={{
                          transition: 'all 320ms cubic-bezier(0.2, 0.8, 0.2, 1)',
                        }}
                      />
                    );
                  })}
                </svg>

                {/* Central Surreal Eye Vessel (1:1 Ratio — frames its painted astrolabe ring cleanly) */}
                <div
                  ref={eyeRef}
                  className="relative w-[56%] md:w-[44%] aspect-square rounded-full border border-[var(--border-gold-subtle)] bg-[#0a1510] z-20 overflow-hidden"
                  style={{ boxShadow: '0 0 42px rgba(224, 189, 88, 0.25), var(--shadow-paper)' }}
                >
                  {/* Motif Stop 2: Aligns directly over the pupil of perception */}
                  <span
                    data-motif-stop="2"
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  />
                  <ArtLayer
                    asset="surreal-eye-vessel.png"
                    alt="The Surreal Eye of Perception inside an antique gilded astrolabe"
                    objectFit="cover"
                    objectPosition="center center"
                    fallbackKind="eye"
                  />
                </div>

                {/* Desktop Orbital Constellation Nodes (zero rectangular cards, >=44px hit targets) */}
                {PILLARS.map((pillar, idx) => {
                  const isActive = pillar.key === activeKey;
                  return (
                    <button
                      key={pillar.key}
                      type="button"
                      onClick={() => handleSelect(pillar, idx)}
                      aria-pressed={isActive}
                      style={{
                        left: `${pillar.xPct}%`,
                        top: `${pillar.yPct}%`,
                        transform: 'translate(-50%, -50%)',
                        fontFamily: 'var(--font-editorial)',
                      }}
                      className={`hidden md:inline-flex folio-btn absolute z-30 items-center gap-2 min-h-[44px] min-w-[44px] px-4 py-2 rounded-full border cursor-pointer text-xs uppercase tracking-[0.16em] ${
                        isActive
                          ? 'border-[var(--gold-highlight)] bg-[#192c23] text-[var(--gold-highlight)] shadow-[0_0_24px_rgba(224,189,88,0.4)]'
                          : 'border-[var(--border-gold)] bg-[#0c1a14]/95 text-[var(--text-parchment)] hover:border-[var(--gold-leaf)]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-[var(--gold-highlight)]' : 'bg-[var(--gold-patina)]'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="text-[0.68rem] text-[var(--gold-leaf)]">{pillar.numeral}</span>
                      <span>{pillar.label}</span>
                    </button>
                  );
                })}
              </div>
            </ClickSpark>

            {/* Mobile/Tablet Accessible Recomposition (>=44px touch targets with 8px+ gap) */}
            <div className="flex md:hidden flex-wrap justify-center gap-2.5 mt-6" role="group" aria-label="Dimensions of Human Perspective">
              {PILLARS.map((pillar, idx) => {
                const isActive = pillar.key === activeKey;
                return (
                  <button
                    key={pillar.key}
                    type="button"
                    onClick={() => handleSelect(pillar, idx)}
                    aria-pressed={isActive}
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className={`folio-btn inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full border text-xs uppercase tracking-[0.15em] cursor-pointer ${
                      isActive
                        ? 'border-[var(--gold-highlight)] bg-[#192c23] text-[var(--gold-highlight)]'
                        : 'border-[var(--border-gold-subtle)] bg-[#0f1f18] text-[var(--text-muted)]'
                    }`}
                  >
                    <span className="text-[var(--gold-leaf)]">{pillar.numeral}</span>
                    <span>{pillar.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Asymmetric Rag-Paper Editorial Plate */}
          <div className="lg:col-span-5">
            <article
              ref={proseRef}
              aria-live="polite"
              className="relative p-7 sm:p-9 border border-[var(--border-gold)] bg-gradient-to-br from-[#172820] to-[#0d1914] paper-relief"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(23, 40, 32, 0.94), rgba(13, 25, 20, 0.96)), url('/assets/art/Aged%20Handmade%20Paper%20Texture.png')",
                backgroundBlendMode: 'normal, soft-light',
                backgroundSize: 'cover, 280px 280px',
              }}
            >
              {/* Fine corner gold hairlines */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border-gold-subtle)]">
                <span
                  className="text-xs uppercase tracking-[0.22em] text-[var(--gold-leaf)]"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Dimension {activePillar.numeral} — {activePillar.label}
                </span>
                <span className="text-[var(--gold-patina)] text-xs" aria-hidden="true">
                  ✦
                </span>
              </div>

              <blockquote
                className="text-lg sm:text-xl italic leading-relaxed text-[var(--gold-highlight)] mb-5"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {activePillar.quote}
              </blockquote>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed m-0">
                {activePillar.body}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
