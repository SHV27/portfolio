/** Every project, in his order. Data & Signal is a page of its own, not a
 *  repo-backed Project, so it is inserted by the index and the pager. */
import { SIFARISH, AAINA, BRAILLIX } from './projects';
import { SEHAT, GLOAMING } from './projects-more';
import { URUTHI } from './uruthi';
import { JARVIS, RECKONER } from './new-projects';
import type { Project } from './types';

export const ORDER: Project[] = [SIFARISH, AAINA, JARVIS, BRAILLIX, RECKONER, URUTHI, SEHAT, GLOAMING];
export { SIFARISH, AAINA, JARVIS, BRAILLIX, RECKONER, URUTHI, SEHAT, GLOAMING };
export type { Project };
