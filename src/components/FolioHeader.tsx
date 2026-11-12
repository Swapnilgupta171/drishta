import { useState, useEffect } from 'react';
import Magnet from './reactbits/Magnet/Magnet';
import { soundscape } from '../audio/soundscapeEngine';

export interface ChapterMeta {
  id: string;
  numeral: string;
  label: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'chapter-world', numeral: 'I', label: 'World' },
  { id: 'chapter-perspective', numeral: 'II', label: 'Perspective' },
  { id: 'chapter-duality', numeral: 'III', label: 'Duality' },
  { id: 'chapter-human-touch', numeral: 'IV', label: 'Craft' },
  { id: 'chapter-philosophy', numeral: 'V', label: 'Philosophy' },
  { id: 'chapter-essence', numeral: 'VI', label: 'Essence' },
];

interface FolioHeaderProps {
  activeChapter: number;
  soundActive: boolean;
  onSoundToggle: (active: boolean) => void;
}

export function FolioHeader({ activeChapter, soundActive, onSoundToggle }: FolioHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggleSound = () => {
    const next = soundscape.toggle();
    onSoundToggle(next);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const navigateTo = (id: string) => {
    setDrawerOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] border-b border-[var(--border-gold-subtle)] bg-[#0a1510]/88 backdrop-blur-md"
        role="banner"
      >
        <div className="folio-wrap flex items-center justify-between h-[74px] gap-4">
          {/* Brand Bookplate Mark */}
          <a
            href="#chapter-world"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('chapter-world');
            }}
            className="inline-flex items-center gap-3 min-h-[44px] py-2 text-[var(--text-parchment)] hover:text-[var(--gold-highlight)] transition-colors"
            aria-label="DRISHTA — Return to Chapter I"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 1.5 C13.2 8 16 10.8 22.5 12 C16 13.2 13.2 16 12 22.5 C10.8 16 8 13.2 1.5 12 C8 10.8 10.8 8 12 1.5 Z"
                fill="currentColor"
                className="text-[var(--gold-leaf)]"
              />
            </svg>
            <span
              className="text-base sm:text-lg font-semibold uppercase tracking-[0.28em]"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              DRISHTA
            </span>
          </a>

          {/* Desktop Illuminated Chapter Compass */}
          <nav className="hidden lg:flex items-center gap-2" aria-label="Chapter Navigation">
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx + 1;
              return (
                <div key={ch.id} className="flex items-center gap-2">
                  <a
                    href={`#${ch.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(ch.id);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative inline-flex items-baseline gap-1.5 min-h-[44px] px-2 items-center text-[0.76rem] uppercase tracking-[0.15em] transition-colors ${
                      isActive
                        ? 'text-[var(--gold-highlight)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--gold-leaf)]'
                    }`}
                    style={{ fontFamily: 'var(--font-editorial)' }}
                  >
                    <span className="text-[0.68rem] text-[var(--gold-patina)]">{ch.numeral}</span>
                    <span>{ch.label}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-highlight)] to-transparent transition-transform duration-300 origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                  {idx < CHAPTERS.length - 1 && (
                    <span className="text-[var(--gold-patina)]/40 text-xs select-none" aria-hidden="true">
                      ·
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions: Gilded Wax-Seal Soundscape + Mobile Folio Toggle */}
          <div className="flex items-center gap-3">
            <Magnet padding={28} magnetStrength={2.5} maxOffset={8} scale={1.02}>
              <button
                type="button"
                onClick={handleToggleSound}
                aria-pressed={soundActive}
                aria-label={soundActive ? 'Mute ambient chimes soundscape' : 'Awaken ambient chimes soundscape'}
                className={`folio-btn inline-flex items-center gap-2.5 min-h-[44px] px-4 rounded-full border text-[0.72rem] uppercase tracking-[0.16em] cursor-pointer ${
                  soundActive
                    ? 'border-[var(--gold-highlight)] bg-[#192f25] text-[var(--gold-highlight)] shadow-[0_0_20px_rgba(224,189,88,0.28)]'
                    : 'border-[var(--border-gold)] bg-[#0f1f18] text-[var(--gold-leaf)] hover:border-[var(--gold-highlight)]'
                }`}
                style={{ fontFamily: 'var(--font-editorial)' }}
              >
                <span
                  aria-hidden="true"
                  className={`relative w-2.5 h-2.5 rounded-full border ${
                    soundActive ? 'border-[var(--gold-highlight)]' : 'border-[var(--gold-patina)]'
                  }`}
                >
                  <span
                    className={`absolute inset-[2px] rounded-full transition-opacity duration-300 ${
                      soundActive ? 'bg-[var(--gold-highlight)] opacity-100 animate-pulse' : 'bg-[var(--gold-patina)] opacity-45'
                    }`}
                  />
                </span>
                <span className="hidden sm:inline">
                  {soundActive ? 'Soundscape: Awakening' : 'Soundscape: Resting'}
                </span>
                <span className="sm:hidden">{soundActive ? 'Chimes On' : 'Chimes'}</span>
              </button>
            </Magnet>

            {/* Mobile Folio Index Trigger */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-folio-index"
              aria-label={drawerOpen ? 'Close chapter index' : 'Open chapter index'}
              className="lg:hidden folio-btn inline-flex items-center justify-center min-w-[44px] min-h-[44px] border border-[var(--border-gold)] bg-[#0f1f18] text-[var(--gold-leaf)] cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                {drawerOpen ? (
                  <path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7H20M4 12H20M4 17H14" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Folio Drawer */}
      {drawerOpen && (
        <div
          id="mobile-folio-index"
          role="dialog"
          aria-modal="true"
          aria-label="Chapter Index"
          className="fixed inset-0 z-[990] bg-[#0a1510]/96 backdrop-blur-lg pt-[92px] pb-10 px-6 flex flex-col justify-between lg:hidden"
        >
          <nav className="flex flex-col gap-3 max-w-md mx-auto w-full" aria-label="Mobile Chapter Navigation">
            <p
              className="text-xs uppercase tracking-[0.22em] text-[var(--gold-patina)] mb-2"
              style={{ fontFamily: 'var(--font-editorial)' }}
            >
              Table of Chapters
            </p>
            {CHAPTERS.map((ch, idx) => {
              const isActive = activeChapter === idx + 1;
              return (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(ch.id);
                  }}
                  className={`flex items-baseline justify-between min-h-[48px] px-4 py-3 border-b border-[var(--border-gold-subtle)] ${
                    isActive ? 'text-[var(--gold-highlight)]' : 'text-[var(--text-parchment)]'
                  }`}
                >
                  <span className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                    {ch.label}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-[var(--gold-leaf)]" style={{ fontFamily: 'var(--font-editorial)' }}>
                    Chapter {ch.numeral}
                  </span>
                </a>
              );
            })}
          </nav>
          <p className="text-center text-xs italic text-[var(--text-secondary)]">
            Seeing through the eyes of artists.
          </p>
        </div>
      )}
    </>
  );
}

