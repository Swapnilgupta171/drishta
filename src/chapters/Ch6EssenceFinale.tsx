import StrokeText from '../components/reactbits/StrokeText/StrokeText';
import BlurText from '../components/reactbits/BlurText/BlurText';
import Magnet from '../components/reactbits/Magnet/Magnet';
import { ArtLayer } from '../components/ArtLayer';
import { CHAPTERS } from '../components/FolioHeader';

export function Ch6EssenceFinale() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <section
        id="chapter-essence"
        data-chapter="6"
        aria-labelledby="essence-title"
        className="pt-20 pb-24 lg:py-28 relative text-center"
      >
        <div className="folio-wrap">
          <header className="flex items-center justify-center gap-4 mb-4">
            <span
              className="px-3 py-1 border border-[var(--border-gold-subtle)] bg-[#c59b27]/10 text-[var(--gold-leaf)] text-xs tracking-[0.26em] uppercase"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              <StrokeText
                text="VI"
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
              Resolution &amp; Harmony
            </span>
          </header>

          <h2 id="essence-title" className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-normal mb-6">
            Preserve the <em className="italic text-[var(--gold-leaf)]">Human Essence</em>
          </h2>

          {/* Dedicated Celestial Crest Dock right between "Preserve the Human Essence" and the portal/text below */}
          <div
            className="relative flex items-center justify-center gap-5 max-w-[380px] mx-auto mb-10"
            aria-hidden="true"
          >
            <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-patina)]/55 to-[var(--gold-leaf)]" />
            <div
              className="relative w-14 h-14 rounded-full border border-[var(--border-gold)] bg-[#0d1c15]/85 flex items-center justify-center shrink-0"
              style={{ boxShadow: '0 0 28px rgba(224, 189, 88, 0.24)' }}
            >
              <span
                data-motif-stop="6"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 pointer-events-none"
              />
              <svg viewBox="0 0 44 44" className="w-9 h-9 opacity-45" fill="none">
                <circle cx="22" cy="22" r="18" stroke="#c59b27" strokeWidth="0.65" strokeDasharray="1.5 3" />
              </svg>
            </div>
            <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[var(--gold-patina)]/55 to-[var(--gold-leaf)]" />
          </div>

          {/* Monumental Sanctuary Portal Arch (2:3 Ratio — full stone frame & corner roses preserved) */}
          <div
            className="relative w-full max-w-[540px] aspect-[2/3] mx-auto mb-12 rounded-[6px] overflow-hidden border border-[var(--border-gold-bright)] bg-[#070e0a]"
            style={{ boxShadow: 'var(--shadow-paper), 0 0 46px rgba(224, 189, 88, 0.22)' }}
          >
            <ArtLayer
              asset="sanctuary-portal-arch.png"
              alt="Monumental stone sanctuary archway ascending into a starry botanical infinity"
              fallbackKind="sanctuary"
            />

            {/* Closing Manifesto Inscription in dark quiet lower third */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 pt-20 pb-8 bg-gradient-to-t from-[#070e0a] via-[#070e0a]/92 to-transparent">
              <blockquote
                className="text-xl sm:text-2xl italic leading-snug text-[var(--text-parchment)] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-[var(--gold-leaf)] mr-1" aria-hidden="true">
                  “
                </span>
                <BlurText
                  text="Art is not merely pixels assembled in sequence; it is a confession of the living soul."
                  animateBy="words"
                  effect="focus"
                  trigger="view"
                  delay={45}
                  stepDuration={0.35}
                  className="inline justify-center"
                />
                <span className="text-[var(--gold-leaf)] ml-1" aria-hidden="true">
                  ”
                </span>
              </blockquote>
              <cite
                className="not-italic text-xs uppercase tracking-[0.22em] text-[var(--gold-leaf)] block"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                — Drishta Manifesto
              </cite>
            </div>
          </div>

          <p className="drop-cap text-base sm:text-lg text-[var(--text-parchment)] max-w-[58ch] mx-auto text-left mb-10">
            As the frontier of machine intelligence expands, may we hold fast to the tenderness of the
            human hand, the depth of lived memory, and the quiet courage to see through the eyes of
            artists.
          </p>

          <Magnet padding={32} magnetStrength={2.5} maxOffset={8} scale={1.02}>
            <a
              href="#chapter-world"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('chapter-world');
              }}
              className="folio-btn inline-flex items-center gap-3 min-h-[46px] px-7 py-3 border border-[var(--border-gold)] bg-[#c59b27]/10 text-[var(--gold-highlight)] hover:bg-[var(--gold-leaf)] hover:text-[var(--bg-abyssal)] text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              <span>Return to the Frontispiece</span>
              <span aria-hidden="true">↑</span>
            </a>
          </Magnet>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
           PRIVATE-PRESS EXHIBITION COLOPHON FOOTER (Kelmscott / Museum Folio)
           ═══════════════════════════════════════════════════════════════════ */}
      <footer
        role="contentinfo"
        className="relative bg-[#060d09] border-t border-[var(--border-gold-subtle)] pt-12 pb-12"
      >
        <div className="folio-wrap relative">
          {/* Top Ornamental Art Nouveau Frieze Centered Inside Colophon Head */}
          <div
            className="flex justify-center mb-10 pointer-events-none select-none"
            aria-hidden="true"
          >
            <svg viewBox="0 0 360 44" className="w-72 sm:w-80 h-11 overflow-visible" fill="none">
              <path
                d="M0 22 C80 22 120 5 180 22 C240 39 280 22 360 22"
                stroke="#c59b27"
                strokeWidth="0.95"
              />
              <path
                d="M25 22 C95 36 130 8 180 22 C230 36 265 8 335 22"
                stroke="#4a6b5b"
                strokeWidth="0.85"
                strokeOpacity="0.8"
              />
              <circle cx="180" cy="22" r="15" fill="#060d09" stroke="#e0bd58" strokeWidth="0.9" />
              <path
                d="M180 11 C182 18 184 20 191 22 C184 24 182 26 180 33 C178 26 176 24 169 22 C176 20 178 18 180 11 Z"
                fill="#e0bd58"
              />
            </svg>
          </div>

          {/* Asymmetric 12-Column Editorial Colophon Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pb-14 border-b border-[var(--border-gold-subtle)]">
            {/* Left Column: Printer's Mark & Dedication */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <circle cx="20" cy="20" r="18" stroke="#c59b27" strokeWidth="0.8" strokeOpacity="0.6" />
                    <path
                      d="M20 6 C21.5 14 26 18.5 34 20 C26 21.5 21.5 26 20 34 C18.5 26 14 21.5 6 20 C14 18.5 18.5 14 20 6 Z"
                      fill="#e0bd58"
                    />
                  </svg>
                  <span
                    className="text-lg font-semibold uppercase tracking-[0.3em] text-[var(--text-parchment)]"
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    DRISHTA
                  </span>
                </div>

                <p
                  className="text-[clamp(1.35rem,2.3vw,1.9rem)] italic leading-[1.32] text-[var(--text-parchment)] max-w-[28ch] mb-6"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  A nocturnal sanctuary for the trembling line, the mortal hand, and{' '}
                  <span className="text-[var(--gold-leaf)]">the unbroken lineage of human vision.</span>
                </p>
              </div>

              {/* Wax-Seal Edition Stamp */}
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-[var(--border-gold-subtle)] bg-[#0c1a14] w-fit">
                <span
                  aria-hidden="true"
                  className="w-3 h-3 rounded-full bg-[var(--accent-madder)] border border-[var(--gold-leaf)]"
                />
                <span
                  className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Digital Monograph · Edition MMXXVI
                </span>
              </div>
            </div>

            {/* Center Column: Folio Index */}
            <div className="lg:col-span-3">
              <p
                className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--gold-leaf)] pb-2.5 mb-5 border-b border-[var(--border-gold-subtle)]"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Index of Chapters
              </p>
              <nav aria-label="Colophon Chapter Navigation">
                <ul className="flex flex-col gap-1">
                  {CHAPTERS.map((ch) => (
                    <li key={ch.id}>
                      <a
                        href={`#${ch.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(ch.id);
                        }}
                        className="group inline-flex items-baseline gap-3 min-h-[44px] py-1.5 text-[var(--text-parchment)] hover:text-[var(--gold-highlight)] transition-all duration-300 hover:translate-x-2"
                      >
                        <span
                          className="text-xs tracking-[0.18em] text-[var(--gold-patina)] group-hover:text-[var(--gold-highlight)] w-6"
                          style={{ fontFamily: 'var(--font-editorial)' }}
                        >
                          {ch.numeral}
                        </span>
                        <span
                          className="text-lg group-hover:italic"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {ch.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Right Column: Private Press Materiality & Honest Scope */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <p
                className="text-[0.7rem] uppercase tracking-[0.24em] text-[var(--gold-leaf)] pb-2.5 mb-1 border-b border-[var(--border-gold-subtle)]"
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                Colophon &amp; Craft Notes
              </p>

              <div>
                <span
                  className="block text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent-lichen-light)] mb-1"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Typography &amp; Medium
                </span>
                <p className="text-sm text-[var(--text-muted)] m-0">
                  Set digitally in Playfair Display, Cinzel, and Lora over abyssal malachite, burnt gold leaf, and cotton-rag fiber grain.
                </p>
              </div>

              <div>
                <span
                  className="block text-[0.68rem] uppercase tracking-[0.18em] text-[var(--accent-lichen-light)] mb-1"
                  style={{ fontFamily: 'var(--font-editorial)' }}
                >
                  Conceptual Integrity
                </span>
                <p className="text-sm text-[var(--text-muted)] m-0">
                  Drishta is a poetic, educational exploration of human craft and art-historical lineage. It does not claim or perform automated AI-image detection.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Colophon Ledger */}
          <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
            <span
              className="uppercase tracking-[0.18em]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              &copy; 2026 DRISHTA — All Rights Reserved
            </span>
            <span className="italic text-[var(--gold-patina)]" style={{ fontFamily: 'var(--font-display)' }}>
              Seeing Through the Eyes of Artists
            </span>
            <button
              type="button"
              onClick={() => scrollTo('chapter-world')}
              className="min-h-[44px] px-3 uppercase tracking-[0.18em] text-[var(--gold-leaf)] hover:text-[var(--gold-highlight)] cursor-pointer transition-colors"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
