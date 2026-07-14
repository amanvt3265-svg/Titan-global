// Titan Global Transport eagle crest — pure vector, renders crisp at
// any size. Geometry mirrors scripts/brand.mjs (single source of truth):
//   six-feather swept wings = power + speed · angular brow + hooked
//   beak = raptor, not mascot · tapered chest w/ panel lines = container
//   built into the eagle's own silhouette. Keep the two in sync.
export function TitanGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="32 86 448 288"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="tgGold" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#E4C766" />
          <stop offset="0.5" stopColor="#C9A227" />
          <stop offset="1" stopColor="#9E7F1C" />
        </linearGradient>
      </defs>
      <g fill="url(#tgGold)">
        {/* right wing: six sharply-tapered feathers, fanned */}
        <path d="M262 208 L470 96 L462 124 L272 224 Z" />
        <path d="M260 222 L452 132 L446 158 L266 240 Z" />
        <path d="M258 236 L426 166 L422 190 L262 252 Z" />
        <path d="M256 248 L394 196 L392 218 L258 262 Z" />
        <path d="M254 258 L356 222 L356 242 L254 272 Z" />
        <path d="M252 266 L314 244 L316 262 L252 280 Z" />
        {/* left wing (mirrored) */}
        <g transform="translate(512,0) scale(-1,1)">
          <path d="M262 208 L470 96 L462 124 L272 224 Z" />
          <path d="M260 222 L452 132 L446 158 L266 240 Z" />
          <path d="M258 236 L426 166 L422 190 L262 252 Z" />
          <path d="M256 248 L394 196 L392 218 L258 262 Z" />
          <path d="M254 258 L356 222 L356 242 L254 272 Z" />
          <path d="M252 266 L314 244 L316 262 L252 280 Z" />
        </g>
        {/* angular brow ridge */}
        <path d="M236 130 L276 130 L288 150 L224 150 Z" />
        {/* hooked beak, tapering to a sharp point */}
        <path d="M232 150 L280 150 L268 178 L256 206 L244 178 Z" />
        {/* chest tapers to a shield point: container plate built into the eagle's own body */}
        <path d="M232 206 L280 206 L292 222 L286 270 L272 320 L256 364 L240 320 L226 270 L220 222 Z" />
        {/* integrated container panel lines */}
        <rect x="238" y="238" width="36" height="4" rx="1.5" fill="#0F0F10" opacity="0.45" />
        <rect x="235" y="256" width="42" height="4" rx="1.5" fill="#0F0F10" opacity="0.45" />
        <rect x="233" y="274" width="46" height="4" rx="1.5" fill="#0F0F10" opacity="0.4" />
        <rect x="238" y="292" width="36" height="4" rx="1.5" fill="#0F0F10" opacity="0.35" />
      </g>
      {/* brow shadow line */}
      <path fill="#0F0F10" opacity="0.5" d="M234 148 L278 148 L280 150 L232 150 Z" />
    </svg>
  );
}
