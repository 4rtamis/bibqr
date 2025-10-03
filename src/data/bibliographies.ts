export type BibliographyConfig = {
  /** Display name for the header, etc. */
  title: string;
  /** File under public/ to fetch (no slashes). */
  file: string;
};

/**
 * Whitelisted bibliographies by slug. Add new entries here.
 * The empty key "" is used for the root path "/".
 */
export const BIBLIOGRAPHIES: Record<string, BibliographyConfig> = {
  "disruptech-ukraine": {
    title: "The Role of Disruptive Technologies in the War in Ukraine",
    file: "disruptech-ukraine.json",
  },
  // Add more:
  // "my-course-s23": { title: "My Course S23", file: "my-course-s23.json" },
};

export function resolveBibliography(slug?: string): BibliographyConfig | null {
  if (!slug) return BIBLIOGRAPHIES[""];
  return BIBLIOGRAPHIES[slug] ?? null;
}
