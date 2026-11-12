import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';
import StrokeText from '../components/reactbits/StrokeText/StrokeText';
import FoldText from '../components/reactbits/FoldText/FoldText';
import { ArtLayer } from '../components/ArtLayer';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP);

interface CatalogEntry {
  numeral: string;
  title: string;
  prose: string;
  hasInkLine?: boolean;
  hasWatercolor?: boolean;
}

const CATALOG_ENTRIES: CatalogEntry[] = [
  {
    numeral: 'I',
    title: 'The Trembling Line',
    prose:
      'The slight hesitation of a quill or brush is not digital noise — it is the physical seismograph of a breathing pulse and fleeting doubt, a biological tremor no optimization function can inhabit.',
    hasInkLine: true,
  },
  {
    numeral: 'II',
    title: 'Serendipitous Flaws',
    prose:
      'When pigment bleeds unexpectedly across cold-press rag paper, the artist pauses and embraces the accident, converting error into revelation. The stain becomes twilight; the drip becomes grief.',
    hasWatercolor: true,
  },
  {
    numeral: 'III',
    title: 'Tactile Friction',
    prose:
      'Oil has drag; charcoal has grit; copperplate resists the burin. Bodily struggle against physical matter creates unrepeatable textural honesty — an impasto ridge, a thumbprint pressed into wet clay.',
  },
  {
    numeral: 'IV',
    title: 'The Finite Pulse',
    prose:
      'Human art carries gravity because time is scarce. Every canvas represents irreplaceable hours borrowed from a singular mortal life — mortality distilled into permanence.',
  },
];

export function Ch4HumanTouch() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const inkPath = section.querySelector('.trembling-ink-stroke');
      if (inkPath) {
        gsap.set(inkPath, { drawSVG: '0%' });
        gsap.to(inkPath, {
          drawSVG: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: inkPath,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="chapter-human-touch"
      ref={sectionRef}
      data-chapter="4"
      aria-labelledby="craft-title"
      className="py-20 lg:py-28 relative"
    >
      <div className="folio-wrap">
        <header className="flex items-center gap-4 mb-4">
          <span
            className="px-3 py-1 border border-[var(--border-gold-subtle)] bg-[#c59b27]/10 text-[var(--gold-leaf)] text-xs tracking-[0.26em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            <StrokeText
              text="IV"
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
            The Fingerprint of Mortality
          </span>
        </header>

        <h2 id="craft-title" className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal mb-5">
          What Makes Art <em className="italic text-[var(--gold-leaf)]">Human?</em>
        </h2>

        <p className="drop-cap text-base sm:text-lg text-[var(--text-parchment)] max-w-[62ch] mb-12 lg:mb-16">
          Perfection is sterile. True human resonance lives in the trembles, the accidental washes,
          the deckled edges, and the unmistakable vulnerability of finite existence.
        </p>

        {/* Exhibition Folio of Tactile Relics (Zero Cards!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Torn Rag-Paper Relic (3:4 Ratio, artwork carries authentic deckled borders) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
            {/* Motif Stop 4: Falling petal floats cleanly in the open gutter above the hand & catalog spine */}
            <span
              data-motif-stop="4"
              aria-hidden="true"
              className="hidden lg:block absolute -top-6 -right-4 w-1 h-1 pointer-events-none z-20"
            />
            <div
              className="relative w-full max-w-[440px] aspect-[3/4] rounded-[4px] overflow-hidden border border-[var(--border-gold-subtle)] bg-[#0a1510]"
              style={{ boxShadow: 'var(--shadow-paper)' }}
            >
              <ArtLayer
                asset="hand-cradling-bloom.png"
                alt="Pigment-smudged artist hand cradling a blooming wild rose with falling petals on torn handmade rag parchment"
                objectFit="cover"
                fallbackKind="hand"
              />
            </div>
          </div>

          {/* Right: Four Sequential Catalog Plates Along One Gold Spine */}
          <ol className="lg:col-span-7 flex flex-col gap-10 border-l border-[var(--border-gold-subtle)] pl-7 sm:pl-10">
            {CATALOG_ENTRIES.map((entry) => (
              <li key={entry.numeral} className="relative">
                {/* Circular Roman Numeral Folio Marker */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[45px] sm:-left-[57px] top-0.5 w-8 h-8 rounded-full bg-[#0a1510] border border-[var(--border-gold)] text-[var(--gold-leaf)] text-[0.7rem] flex items-center justify-center"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  {entry.numeral}
                </span>

                {/* Plate II Authentic Alpha Watercolor Bleed Behind Prose */}
                {entry.hasWatercolor && (
                  <div
                    className="absolute -top-6 -left-6 w-80 h-56 pointer-events-none opacity-45 z-0"
                    aria-hidden="true"
                  >
                    <ArtLayer
                      asset="watercolor-flaw-stain.png"
                      alt=""
                      objectFit="contain"
                      fallbackKind="watercolor"
                    />
                  </div>
                )}

                <h3 className="relative z-10 text-2xl sm:text-[1.65rem] font-normal text-[var(--text-parchment)] mb-2.5">
                  <FoldText
                    text={entry.title}
                    splitBy="word"
                    hinge="top"
                    foldStyle="paper"
                    duration={0.6}
                    stagger={0.06}
                    trigger="scroll"
                    color="var(--text-parchment)"
                  />
                </h3>

                {/* Plate I Self-Drawing Trembling Ink Line */}
                {entry.hasInkLine && (
                  <svg
                    viewBox="0 0 320 22"
                    className="relative z-10 w-64 sm:w-72 h-5 my-2 overflow-visible"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      className="trembling-ink-stroke"
                      d="M0 11 Q16 3,32 11 Q48 19,64 11 Q80 4,96 12 Q112 20,128 10 Q144 2,160 13 Q176 21,192 11 Q208 2,224 12 Q240 20,256 10 Q272 3,288 13 Q304 20,320 11"
                      stroke="#e0bd58"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                <p className="relative z-10 text-sm sm:text-base text-[var(--text-muted)] max-w-[54ch] m-0">
                  {entry.prose}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
