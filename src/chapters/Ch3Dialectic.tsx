import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import StrokeText from '../components/reactbits/StrokeText/StrokeText';
import WebThreads from '../components/reactbits/WebThreads/WebThreads';
import { ArtLayer } from '../components/ArtLayer';
import { soundscape } from '../audio/soundscapeEngine';

interface Ch3Props {
  enableWebGL: boolean;
}

export function Ch3Dialectic({ enableWebGL }: Ch3Props) {
  const [splitPct, setSplitPct] = useState(50);
  const [loupeActive, setLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);

  const quickXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickYRef = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!loupeRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      quickXRef.current = gsap.quickTo(loupeRef.current, 'x', { duration: 0.25, ease: 'power2.out' });
      quickYRef.current = gsap.quickTo(loupeRef.current, 'y', { duration: 0.25, ease: 'power2.out' });
    },
    { scope: sectionRef }
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const relX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const relY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    const pctX = (relX / rect.width) * 100;
    const pctY = (relY / rect.height) * 100;

    setLoupeActive(true);
    setLoupePos({ x: pctX, y: pctY });

    quickXRef.current?.(relX);
    quickYRef.current?.(relY);
  };

  const handlePointerLeave = () => {
    setLoupeActive(false);
  };

  const setPreset = (pct: number, idx: number) => {
    setSplitPct(pct);
    setLoupeActive(false);
    soundscape.playInteractionChime(idx);
  };

  // Clip-path reveals Latent layer either inside cursor loupe (when hovering) or cleanly on the right of splitPct
  const latentClipPath = loupeActive
    ? `circle(94px at ${loupePos.x}% ${loupePos.y}%)`
    : `inset(0 0 0 ${splitPct}%)`;

  return (
    <section
      id="chapter-duality"
      ref={sectionRef}
      data-chapter="3"
      aria-labelledby="duality-title"
      className="py-20 lg:py-28 relative"
    >
      <div className="folio-wrap">
        {/* Centered Header */}
        <header className="flex items-center justify-center gap-4 mb-4">
          <span
            className="px-3 py-1 border border-[var(--border-gold-subtle)] bg-[#c59b27]/10 text-[var(--gold-leaf)] text-xs tracking-[0.26em] uppercase"
            style={{ fontFamily: 'var(--font-editorial)' }}
          >
            <StrokeText
              text="III"
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
            Process &amp; Synthesis
          </span>
        </header>

        <h2
          id="duality-title"
          className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal text-center mb-12"
        >
          Two Ways of <em className="italic text-[var(--gold-leaf)]">Creating</em>
        </h2>

        {/* Staggered Editorial Prose Framing Both Realms */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-10 items-start">
          {/* Motif Stop 3: Resting cleanly in open central corridor below the two prose realms */}
          <span
            data-motif-stop="3"
            aria-hidden="true"
            className="hidden md:block absolute -bottom-5 left-1/2 w-1 h-1 -translate-x-1/2 pointer-events-none"
          />
          <div className="border-l border-[var(--border-gold)] pl-6">
            <span
              className="block text-xs uppercase tracking-[0.22em] text-[var(--gold-leaf)] mb-2"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              The Biological Origin
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal mb-3">
              The Friction of the Hand
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-[48ch] m-0">
              Born from biological doubt, the physical resistance of raw pigment, and patient communion with the material world. Each mark carries the trembling persistence of mortal consciousness channeled through warm linen and stone.
            </p>
          </div>

          <div className="border-l md:border-l-0 md:border-r border-[#72dec2]/45 pl-6 md:pl-0 md:pr-6 md:text-right">
            <span
              className="block text-xs uppercase tracking-[0.22em] text-[#72dec2] mb-2"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              The Synthetic Lattice
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal mb-3">
              The Boundless Loom of Probability
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-[48ch] md:ml-auto m-0">
              Born from multidimensional vectors, matrix tessellations, and rapid combinatorial interpolation across billions of visual artifacts—echoing humanity’s shared archive in fractions of a second.
            </p>
          </div>
        </div>

        {/* Full-Width Living Dialectic Canvas (16:9 Registered Twin Artworks) */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full aspect-[16/9] border border-[var(--border-gold)] bg-[#08110d] overflow-hidden paper-relief select-none"
          role="region"
          aria-label="Interactive Dialectic Canvas comparing Human Craft and Synthetic Latent Space"
        >
          {/* Base Layer: Biological Human Realm (16:9) */}
          <div className="absolute inset-0">
            <ArtLayer
              asset="dialectic-human-realm.png"
              alt="Classical sculpted marble profile rendered in warm oil impasto and candlelight"
              fallbackKind="human-bust"
            />
          </div>

          {/* Revealed Twin Layer: Synthetic Latent Realm (16:9) + WebThreads */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: latentClipPath,
              transition: loupeActive ? 'none' : 'clip-path 240ms cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {enableWebGL && (
              <div className="absolute inset-0 opacity-35 mix-blend-screen z-10" aria-hidden="true">
                <WebThreads
                  colors={['#72dec2', '#e0bd58']}
                  coreColor="#faf6ee"
                  threadCount={10}
                  speed={0.4}
                  opacity={0.75}
                  mouseInteraction={false}
                />
              </div>
            )}
            <ArtLayer
              asset="dialectic-latent-realm.png"
              alt="Silhouette-aligned crystalline wireframe and voxel translation of the classical sculpture"
              fallbackKind="latent-bust"
            />
          </div>

          {/* Threshold Divider Line (Visible when not in Loupe Hover mode) */}
          {!loupeActive && (
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[var(--gold-highlight)] to-transparent pointer-events-none z-20"
              style={{
                left: `${splitPct}%`,
                boxShadow: '0 0 18px rgba(244, 216, 135, 0.7)',
                transition: 'left 240ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
            />
          )}

          {/* Cursor-Tracked Gilded Magnifying Loupe (Mouse Hover) */}
          <div
            ref={loupeRef}
            aria-hidden="true"
            className={`hidden md:block absolute top-0 left-0 w-[188px] h-[188px] -ml-[94px] -mt-[94px] rounded-full pointer-events-none z-30 transition-opacity duration-200 ${
              loupeActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              border: '1.5px solid var(--gold-highlight)',
              boxShadow: '0 0 28px rgba(244, 216, 135, 0.45), inset 0 0 22px rgba(114, 222, 194, 0.25)',
            }}
          >
            <span className="absolute top-1/2 -left-2 right-[-8px] h-[1px] bg-[var(--gold-highlight)]/45" />
            <span className="absolute left-1/2 -top-2 bottom-[-8px] w-[1px] bg-[var(--gold-highlight)]/45" />
          </div>
        </div>

        {/* Accessible Touch & Keyboard Threshold Controls (Always usable without mouse hover) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-gold-subtle)] pt-5">
          <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Dialectic Threshold Presets">
            {[
              { label: 'Human Origin', pct: 100 },
              { label: 'Threshold 50/50', pct: 50 },
              { label: 'Latent Loom', pct: 0 },
            ].map((btn, idx) => {
              const active = !loupeActive && splitPct === btn.pct;
              return (
                <button
                  key={btn.label}
                  type="button"
                  onClick={() => setPreset(btn.pct, idx)}
                  aria-pressed={active}
                  style={{ fontFamily: 'var(--font-editorial)' }}
                  className={`folio-btn min-h-[44px] px-4 py-2 border text-xs uppercase tracking-[0.16em] cursor-pointer ${
                    active
                      ? 'border-[var(--gold-highlight)] bg-[#192c23] text-[var(--gold-highlight)]'
                      : 'border-[var(--border-gold-subtle)] bg-[#0d1914] text-[var(--text-muted)] hover:border-[var(--gold-leaf)]'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto sm:min-w-[260px]">
            <label
              htmlFor="dialectic-scrub"
              className="text-xs uppercase tracking-[0.16em] text-[var(--gold-leaf)] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Aperture
            </label>
            <input
              id="dialectic-scrub"
              type="range"
              min={0}
              max={100}
              value={splitPct}
              onChange={(e) => {
                setLoupeActive(false);
                setSplitPct(Number(e.target.value));
              }}
              aria-label="Adjust threshold between human craft and synthetic latent weave"
              className="w-full h-11 accent-[var(--gold-leaf)] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

