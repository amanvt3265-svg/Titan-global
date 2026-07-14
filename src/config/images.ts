// ═══════════════════════════════════════════════════════════════
//  IMAGE CONFIGURATION
//  ---------------------------------------------------------------
//  Single source of truth for all images. Every image loads from
//  the local public/images/ directory.
//
//  To replace an image:
//    1. Drop your file into the matching public/images/SUBDIR/
//    2. Update the path below to match your filename
//    3. Rebuild the site
//
//  Supported formats: .jpg, .jpeg, .png, .webp, .avif
//  Recommended image sizes (see docs/CONTENT_EDITING_GUIDE.md → "Recommended image sizes by section"):
//    Hero backgrounds:    2400×1600px (3:2)
//    Service/industry:    1200×800px  (3:2)
//    Fleet/gallery:       1200×800px  (3:2)
//    About story:         1200×960px  (4:5)
//
//  Image directories:
//    /images/hero/        — Homepage hero background
//    /images/services/    — Service card photos
//    /images/industries/  — Industry page photos
//    /images/fleet/       — Fleet gallery + stats + coverage
//    /images/about/       — About page story + mission + process
//    /images/gallery/     — Additional page images (add as needed)
// ═══════════════════════════════════════════════════════════════

export const images = {
  // ── Homepage ──────────────────────────────────────────────
  /** Hero background — gantry crane above stacked coloured containers. (2400×1600) */
  hero: "/images/hero/hero.jpg",

  /** CTA band background, gallery — container truck at terminal at sunset. (1200×800) */
  terminalSunset: "/images/fleet/terminal-sunset.jpg",

  // ── Services ──────────────────────────────────────────────
  /** Container transport service card. (1200×800) */
  containerTruck: "/images/services/container-truck.jpg",
  /** Heavy freight service card. (1200×800) */
  shipCrane: "/images/services/ship-crane.jpg",

  // ── Fleet & gallery ───────────────────────────────────────
  /** Coverage image, gallery — line-haul truck on motorway. (1200×800) */
  motorwayTruck: "/images/fleet/motorway-truck.jpg",
  /** Stats background, container movements service card. (1200×800) */
  containersStacked: "/images/fleet/containers-stacked.jpg",

  // ── Port & terminal ───────────────────────────────────────
  /** Industries hero, gallery — ship-to-shore cranes. (1200×800) */
  cranesVessel: "/images/industries/cranes-vessel.jpg",
  /** About story, Why Choose, container cartage card. (1200×800) */
  craneLift: "/images/about/crane-lift.jpg",
  /** About hero, Contact hero, Process background. (1200×800) */
  portOperations: "/images/about/port-operations.jpg",
} as const;

export type ImageKey = keyof typeof images;
