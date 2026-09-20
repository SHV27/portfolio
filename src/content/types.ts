/* ============================================================================
   THE EVIDENCE MODEL

   This file encodes the site's one law: every factual claim carries a receipt
   that a reader can open. A `Claim` without at least one `Receipt` does not
   type-check as publishable — see `assertReceipted()` below, which runs as a
   build gate (`npm run verify:facts`).

   This is not decoration. It is the same rule Shaurya's own Sifarish enforces
   at src/lib/compile/compiler.ts:284, where a bullet with zero ledgerIds throws.
   The portfolio obeys the rule it describes.
   ========================================================================== */

/** Repos use different default branches — four are `master`. A wrong branch
 *  silently 404s, which is exactly the class of error this site exists to avoid. */
export const REPO_BRANCH: Record<string, string> = {
  sifarish: 'main',
  aaina: 'main',
  braillix: 'main',
  'sehat-saarthi': 'main',
  'PRANA-Sustainable-AI': 'main',
  'galaxy-morphology-transfer': 'main',
  'gloaming-game': 'master',
  frbprint: 'master',
  voidseer: 'master',
  stellarrift: 'master',
};

export const GH_USER = 'SHV27';

/** Deep-link to an exact file (and optionally an exact line) in a repo. */
export function src(repo: string, path: string, line?: number | [number, number]): string {
  const branch = REPO_BRANCH[repo];
  if (!branch) throw new Error(`Unknown repo "${repo}" — add it to REPO_BRANCH.`);
  const hash = Array.isArray(line) ? `#L${line[0]}-L${line[1]}` : line ? `#L${line}` : '';
  return `https://github.com/${GH_USER}/${repo}/blob/${branch}/${path}${hash}`;
}

export function repoUrl(repo: string): string {
  return `https://github.com/${GH_USER}/${repo}`;
}

/** A pointer to the thing that proves a claim. */
export interface Receipt {
  /** What the reader sees on the chip, e.g. "compiler.ts:284". Keep it short. */
  label: string;
  /** Where it leads. Always a real, reachable URL. */
  href: string;
  /** One line: what this source actually proves. Shown on open. */
  proves: string;
}

/** A sentence that asserts something, plus the evidence for it. */
export interface Claim {
  text: string;
  receipts: Receipt[];
}

/** A headline figure with its provenance. `derivable` means we recomputed it
 *  ourselves from the repo rather than trusting a README. */
export interface Figure {
  value: string;
  unit?: string;
  label: string;
  receipts: Receipt[];
  derivable?: boolean;
}

export interface Shot {
  /** Path under /assets/source-shots, resolved by the image pipeline. */
  file: string;
  alt: string;
  caption: string;
  /** object-position focal point, so a crop never severs a head or a key detail. */
  focal?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Rendered in Devanagari/native script beside the name where it exists. */
  native?: string;
  repo: string;
  live?: string;
  /** One line a non-technical recruiter understands completely. */
  hook: string;
  /**
   * The line under the title on the project's own page. Never the hook — you
   * arrived here by clicking the hook, and reading it twice is a small insult.
   * This one assumes you are already interested and gets sharper.
   */
  dek?: string;
  /** The tagline in his own product's voice, where the repo has one. */
  tagline?: string;
  year: string;
  /** 2-4 sentences: what is genuinely hard here. */
  hardProblem: string;
  /** The real mechanism. Each one is a Claim — receipted. */
  mechanism: Claim[];
  figures: Figure[];
  /** What he chose NOT to do, and why. This is the strongest signal on the site. */
  restraint?: Claim;
  stack: string[];
  shots: Shot[];
  /** Honest limits, in the repo's own framing. Never omitted where they exist. */
  limits?: string[];
  accent?: 'gold' | 'ember' | 'verify';
}

/* ---- BUILD GATE ---------------------------------------------------------- */

export class UncitedClaimError extends Error {}

/** Refuses to let an uncited claim ship. Called by scripts/verify-facts.mjs. */
export function assertReceipted(where: string, claims: Claim[]): void {
  for (const c of claims) {
    if (!c.receipts?.length) {
      throw new UncitedClaimError(
        `UNCITED CLAIM in ${where}: "${c.text.slice(0, 72)}…" has no receipts. ` +
          `Every sentence on this site carries its evidence, or it does not ship.`,
      );
    }
  }
}
