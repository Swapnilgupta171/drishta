import { useState, type CSSProperties } from 'react';

export type ArtAssetKey =
  | 'hero-sky-backdrop.png'
  | 'hero-muse-foreground.png'
  | 'flora-breakout-vines.png'
  | 'surreal-eye-vessel.png'
  | 'dialectic-human-realm.png'
  | 'dialectic-latent-realm.png'
  | 'hand-cradling-bloom.png'
  | 'watercolor-flaw-stain.png'
  | 'dream-architecture-tapestry.png'
  | 'sanctuary-portal-arch.png'
  | 'rag-paper-texture.png';

const ASSET_FILES: Record<ArtAssetKey, string> = {
  'hero-sky-backdrop.png': 'Gothic Castle Above the Clouds.png',
  'hero-muse-foreground.png': 'Art Nouveau Floral Muse.png',
  'flora-breakout-vines.png': 'Art Nouveau Lily Vine on Dark Green.png',
  'surreal-eye-vessel.png': 'Mystical Eye in an Antique Astrolabe.png',
  'dialectic-human-realm.png': 'Classical Marble Bust in the Atelier.png',
  'dialectic-latent-realm.png': 'Crystalline Astral Renaissance Bust.png',
  'hand-cradling-bloom.png': 'Antique Hand Holding Crimson Rose.png',
  'watercolor-flaw-stain.png': 'watercolor-splash-alpha.png',
  'dream-architecture-tapestry.png': 'Mystical Eye Over the Golden Ruins.png',
  'sanctuary-portal-arch.png': 'Starry Garden Portal.png',
  'rag-paper-texture.png': 'Aged Handmade Paper Texture.png',
};

interface ArtLayerProps {
  asset: ArtAssetKey;
  alt: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  loading?: 'eager' | 'lazy';
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  fallbackKind?:
    | 'hero-sky'
    | 'hero-muse'
    | 'vines'
    | 'eye'
    | 'human-bust'
    | 'latent-bust'
    | 'hand'
    | 'watercolor'
    | 'tapestry'
    | 'sanctuary';
}

/**
 * Loads the mapped artwork from `/assets/art/` while rendering an editorial SVG
 * stand-in until load completes (or if an image is missing).
 */
export function ArtLayer({
  asset,
  alt,
  className = '',
  imgClassName = '',
  style,
  loading = 'lazy',
  objectFit = 'cover',
  objectPosition = 'center center',
  fallbackKind = 'hero-sky',
}: ArtLayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const srcUrl = encodeURI(`/assets/art/${ASSET_FILES[asset]}`);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
      {!loaded && (
        <div className="absolute inset-0 w-full h-full" aria-hidden={alt === ''}>
          <ArtStandIn kind={fallbackKind} />
        </div>
      )}

      {!errored && (
        <img
          src={srcUrl}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ objectFit, objectPosition }}
          className={`block w-full h-full transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}

function ArtStandIn({ kind }: { kind: NonNullable<ArtLayerProps['fallbackKind']> }) {
  switch (kind) {
    case 'hero-sky':
      return (
        <svg viewBox="0 0 600 800" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <rect width="600" height="800" fill="#0a1510" />
        </svg>
      );
    case 'hero-muse':
    case 'vines':
    case 'watercolor':
      return <div className="w-full h-full" />;
    case 'eye':
    case 'human-bust':
    case 'latent-bust':
    case 'hand':
    case 'tapestry':
    case 'sanctuary':
      return <div className="w-full h-full bg-[#0a1510]" />;
  }
}
