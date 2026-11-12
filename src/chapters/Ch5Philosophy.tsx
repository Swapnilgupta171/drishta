import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import StrokeText from '../components/reactbits/StrokeText/StrokeText';
import Topography from '../components/reactbits/Topography/Topography';
import ClickSpark from '../components/reactbits/ClickSpark/ClickSpark';
import { ArtLayer } from '../components/ArtLayer';
import { soundscape } from '../audio/soundscapeEngine';

interface LineageNode {
  id: 'eye' | 'spire' | 'gold' | 'flora';
  shortLabel: string;
  title: string;
  desc: string;
  leftPct: number;
  topPct: number;
  lineage: { artist: string; epoch: string }[];
}

const LINEAGE_NODES: LineageNode[] = [
  {
    id: 'eye',
    shortLabel: 'Mystical Eye',
    title: 'The Mystical Eye of Perception',
    desc: 'The oversized eye emerging from twilight clouds recalls Odilon Redon’s symbolic mysticism — viewing the universe not through objective optics, but through the interior spirit.',
    leftPct: 26.8,
    topPct: 20.5,
    lineage: [
      { artist: 'Odilon Redon', epoch: '1882, L’Œil, comme un ballon' },
      { artist: 'Max Ernst', epoch: '1934, Une semaine de bonté' },
      { artist: 'Leonora Carrington', epoch: '1953, The Giantess' },
    ],
  },
  {
    id: 'spire',
    shortLabel: 'Metaphysical Tower',
    title: 'The Metaphysical Tower & Portals',
    desc: 'Floating gothic turrets and impossible stairways evoke Giorgio de Chirico and René Magritte, translating existential wonder and dream architecture into physical planes.',
    leftPct: 78.9,
    topPct: 29.2,
    lineage: [
      { artist: 'Giorgio de Chirico', epoch: '1914, Metaphysical School' },
      { artist: 'René Magritte', epoch: '1958, Le Banquet' },
      { artist: 'Kay Sage', epoch: '1947, Tomorrow is Never' },
    ],
  },
  {
    id: 'gold',
    shortLabel: 'Secessionist Gilt',
    title: 'Secessionist Gold Leaf & Pigment',
    desc: 'Layered mineral gold and stippled geometric stone pay homage to Gustav Klimt and the Viennese Secession, where human hands fused metallic leaf with raw tempera.',
    leftPct: 15.3,
    topPct: 64.5,
    lineage: [
      { artist: 'Gustav Klimt', epoch: '1908, Golden Phase' },
      { artist: 'Koloman Moser', epoch: '1902, Ver Sacrum' },
      { artist: 'Egon Schiele', epoch: '1911, Expressive Line' },
    ],
  },
  {
    id: 'flora',
    shortLabel: 'Art Nouveau Tendril',
    title: 'The Art Nouveau Tendril',
    desc: 'Sinuous stems and cascading lilies carry the lineage of Alphonse Mucha and Hector Guimard — where botanical curvature was elevated into sacred architectural rhythm.',
    leftPct: 78.5,
    topPct: 77.2,
    lineage: [
      { artist: 'Alphonse Mucha', epoch: '1896, Paris Salon' },
      { artist: 'Hector Guimard', epoch: '1900, Métropolitain' },
      { artist: 'Aubrey Beardsley', epoch: '1894, The Savoy' },
    ],
  },
];

const VOWS = [
  {
    numeral: 'I',
    title: 'Lineage Attribution',
    staggerClass: 'lg:pl-0',
    prose:
      'Every digital aesthetic was first breathed into existence by painters, printmakers, and sculptors. We advocate for remembering and crediting the ancestors of form.',
  },
  {
    numeral: 'II',
    title: 'Sanctity of the Journey',
    staggerClass: 'lg:pl-12',
    prose:
      'An artwork’s meaning is inseparable from the years of discipline, hesitation, and mortal devotion that made its creation possible. The struggle is the signature.',
  },
  {
    numeral: 'III',
    title: 'Creative Sovereignty',
    staggerClass: 'lg:pl-4',
    prose:
      'Tools should amplify the living voice, never erase the sovereign identity of the artists whose lifetimes of vision taught our machines how to see.',
  },
];

interface Ch5Props {
  enableWebGL: boolean;
}

export function Ch5Philosophy({ enableWebGL }: Ch5Props) {
  const [activeId, setActiveId] = useState<LineageNode['id']>('eye');
  const sectionRef = useRef<HTMLElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  const activeNode = LINEAGE_NODES.find((n) => n.id === activeId) ?? LINEAGE_NODES[0];

  const selectBeacon = (node: LineageNode, idx: number) => {
    if (node.id === activeId) return;
    setActiveId(node.id);
    soundscape.playInteractionChime(idx);
  };

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!ribbonRef.current) return;
      gsap.fromTo(
        ribbonRef.current,
        { autoAlpha: 0.45, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out' }
      );
    },
    { dependencies: [activeId], scope: sectionRef }
  );

  return (
    <section
      id="chapter-philosophy"
      ref={sectionRef}
      data-chapter="5"
      aria-labelledby="philosophy-title"
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Subtle Cartographic Contour Map Atmosphere */}
      {enableWebGL && (
        <div className="absolute inset-0 pointer-events-none opacity-25" aria-hidden="true">
          <Topography
            color="#c59b27"
            lineCount={14}
            lineWidth={1}
            speed={0.25}
            glow={0.15}
            opacity={0.4}
            mouseInteraction={false}
          />
        </div>
      )}

      <div className="folio-wrap relative z-10">
        <header className="flex items-center gap-4 mb-4">
          <span
            className="px-3 py-1 border border-[var(--border-gold-subtle)] bg-[#c59b27]/10 text-[var(--gold-leaf)] text-xs tracking-[0.26em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            <StrokeText
              text="V"
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
            Conceptual Framework
          </span>
        </header>

        <h2 id="philosophy-title" className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal mb-5">
          The Drishta <em className="italic text-[var(--gold-leaf)]">Philosophy</em>
        </h2>

        <p className="drop-cap text-base sm:text-lg text-[var(--text-parchment)] max-w-[64ch] mb-12 lg:mb-16">
          Drishta is an artistic inquiry dedicated to tracing the lineage of visual imagination and
          honoring human authorship. It is not an automated detection instrument; it is an invitation
          to remember where beauty comes from.
        </p>

        {/* Genealogical Tapestry of Human Craft */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24">
          {/* Left: Interactive 4:3 Dream Architecture Canvas */}
          <div className="lg:col-span-7">
            <ClickSpark
              sparkColor={['#f4d887', '#c59b27']}
              sparkSize={8}
              sparkRadius={26}
              sparkCount={6}
              shape="star"
              duration={400}
            >
              <div className="relative w-full aspect-[4/3] border border-[var(--border-gold)] bg-[#08110c] overflow-hidden paper-relief">
                <ArtLayer
                  asset="dream-architecture-tapestry.png"
                  alt="Panoramic dream architecture tapestry combining mystic sky eye, metaphysical towers, gold mosaic cliff, and botanical tendrils"
                  fallbackKind="tapestry"
                />

                {LINEAGE_NODES.map((node, idx) => {
                  const active = node.id === activeId;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => selectBeacon(node, idx)}
                      aria-pressed={active}
                      aria-label={`Inspect lineage: ${node.shortLabel}`}
                      style={{
                        left: `${node.leftPct}%`,
                        top: `${node.topPct}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute z-20 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer group"
                    >
                      <span
                        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          active
                            ? 'border-[var(--gold-highlight)] bg-[var(--gold-highlight)]/18 scale-115 shadow-[0_0_26px_rgba(244,216,135,0.9)]'
                            : 'border-[var(--gold-highlight)]/60 bg-transparent group-hover:scale-110 group-hover:border-[var(--gold-highlight)]'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full transition-opacity ${
                            active ? 'bg-[var(--gold-highlight)] opacity-90' : 'opacity-0'
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </ClickSpark>

            <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Art Historical Lineage Landmarks">
              {LINEAGE_NODES.map((node, idx) => {
                const active = node.id === activeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => selectBeacon(node, idx)}
                    aria-pressed={active}
                    style={{ fontFamily: 'var(--font-editorial)' }}
                    className={`folio-btn min-h-[44px] px-3.5 py-2 border text-[0.72rem] uppercase tracking-[0.14em] cursor-pointer ${
                      active
                        ? 'border-[var(--gold-highlight)] bg-[#192c23] text-[var(--gold-highlight)]'
                        : 'border-[var(--border-gold-subtle)] bg-[#0c1a14] text-[var(--text-muted)] hover:border-[var(--gold-leaf)]'
                    }`}
                  >
                    {node.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Unfolding Lineage Ribbon */}
          <div className="lg:col-span-5">
            <article
              ref={ribbonRef}
              aria-live="polite"
              className="p-7 sm:p-9 border border-[var(--border-gold)] bg-gradient-to-br from-[#16271f] to-[#0b1611] paper-relief"
            >
              <span
                className="inline-block text-[0.72rem] uppercase tracking-[0.24em] text-[var(--gold-leaf)] mb-2"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Visual Lineage Trace
              </span>

              <h3 className="text-2xl sm:text-[1.75rem] font-normal text-[var(--text-parchment)] mb-4">
                {activeNode.title}
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-muted)] mb-7">
                {activeNode.desc}
              </p>

              <ul className="flex flex-col gap-3.5" aria-label="Historical Artists">
                {activeNode.lineage.map((item) => (
                  <li key={item.artist} className="flex items-center gap-3">
                    <span
                      className="text-xs sm:text-[0.8rem] tracking-[0.12em] text-[var(--gold-highlight)] whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-editorial)' }}
                    >
                      {item.artist}
                    </span>
                    <span className="flex-1 h-[1px] bg-[var(--border-gold-subtle)]" aria-hidden="true" />
                    <span className="text-xs sm:text-sm italic text-[var(--text-secondary)] whitespace-nowrap">
                      {item.epoch}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
             ILLUMINATED MANUSCRIPT MANIFESTO FOLIO (Zero 3-Box SaaS Grid!)
             ═══════════════════════════════════════════════════════════════ */}
        <div className="relative pt-14 border-t border-[var(--border-gold-subtle)]">
          {/* Bespoke Art Nouveau Whiplash Crest Centered on Top Border (Houses Motif Stop 5!) */}
          <div
            className="relative flex justify-center -mt-[78px] mb-12 pointer-events-none"
            aria-hidden="true"
          >
            <span
              data-motif-stop="5"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 pointer-events-none"
            />
            <svg viewBox="0 0 280 44" className="w-64 h-11 overflow-visible" fill="none">
              <path
                d="M10 22 C60 22 92 6 140 22 C188 38 220 22 270 22"
                stroke="#c59b27"
                strokeWidth="1"
              />
              <path
                d="M10 22 C60 22 92 38 140 22 C188 6 220 22 270 22"
                stroke="#4a6b5b"
                strokeWidth="0.9"
                strokeOpacity="0.85"
              />
              <circle cx="140" cy="22" r="16" fill="#0a1510" stroke="#e0bd58" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Editorial Title & Marginalia */}
            <div className="lg:col-span-5 relative">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[var(--gold-leaf)] text-sm" aria-hidden="true">✦</span>
                <span
                  className="text-xs uppercase tracking-[0.24em] text-[var(--gold-leaf)]"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Illuminated Charter
                </span>
              </div>

              <h3
                className="text-[clamp(2rem,3.4vw,2.9rem)] font-normal leading-[1.15] text-[var(--text-parchment)] mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The Three Vows of <em className="italic text-[var(--gold-highlight)]">Visual Authorship</em>
              </h3>

              <div className="border-l border-[var(--accent-madder)] pl-5 py-1 max-w-[40ch]">
                <p className="text-sm sm:text-base italic text-[var(--text-muted)] m-0">
                  “Not an arbiter of machines, nor an instrument of suspicion — an inquiry into who
                  dreamed the form first.”
                </p>
              </div>
            </div>

            {/* Right Asymmetric Staggered Manuscript Entries */}
            <ol className="lg:col-span-7 flex flex-col gap-10">
              {VOWS.map((vow, idx) => (
                <li
                  key={vow.numeral}
                  className={`group relative pb-10 ${
                    idx < VOWS.length - 1 ? 'border-b border-[var(--border-gold-subtle)]/70' : ''
                  } ${vow.staggerClass}`}
                >
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span
                      aria-hidden="true"
                      className="text-4xl sm:text-5xl italic font-normal leading-none text-[var(--gold-patina)]/75 group-hover:text-[var(--gold-highlight)] transition-colors duration-300 select-none pt-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {vow.numeral}
                    </span>
                    <div>
                      <h4
                        className="text-xl sm:text-2xl font-normal text-[var(--text-parchment)] group-hover:text-[var(--gold-highlight)] transition-colors duration-300 mb-2.5"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {vow.title}
                      </h4>
                      <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-[48ch] m-0">
                        {vow.prose}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
