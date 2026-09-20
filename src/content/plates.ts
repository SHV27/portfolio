import rho from '../assets/space/rho-ophiuchi.jpg';
import pillars from '../assets/space/pillars.jpg';
import westerlund from '../assets/space/westerlund2.jpg';
import horsehead from '../assets/space/horsehead.jpg';
import quintet from '../assets/space/quintet.jpg';
import ngc2841 from '../assets/space/ngc2841.jpg';
import antennae from '../assets/space/antennae.jpg';
import ngc1275 from '../assets/space/ngc1275.jpg';
import freggs from '../assets/space/freggs.jpg';
import butterfly from '../assets/space/butterfly.jpg';

/* ============================================================================
   One plate per page, each with its own line. Nothing repeats anywhere on the
   site — the same nebula with the same caption on three different pages was
   the laziest thing on it.

   Each line is also chosen to rhyme with the project it sits under, so the
   astronomy is doing a job rather than decorating.

   All ESA, all CC BY 4.0, credited in full on the page as the licence requires.
   ========================================================================== */

export interface Plate {
  src: ImageMetadata;
  credit: string;
  kicker: string;
  line: string;
  sub: string;
  focus?: string;
}
type ImageMetadata = import('astro').ImageMetadata;

const HUBBLE = 'NASA, ESA and the Hubble Heritage Team (STScI/AURA) · CC BY 4.0';

export const PLATES: Record<string, Plate> = {
  // Sifarish compiles a page out of a ledger of separate true things.
  sifarish: {
    src: quintet,
    credit: `Stephan's Quintet · ${HUBBLE}`,
    kicker: "Stephan's Quintet",
    line: 'Four galaxies tearing at each other, and one that only looks like it belongs.',
    sub: 'Four of these are genuinely interacting. The fifth is seven times closer to us and simply happens to sit in the same direction — which you would never know from the picture alone. Checking what is actually related to what is most of the job.',
    focus: '50% 45%',
  },

  // Aaina holds two of your own answers against each other.
  aaina: {
    src: antennae,
    credit: `The Antennae Galaxies · ${HUBBLE}`,
    kicker: 'The Antennae Galaxies',
    line: 'Two galaxies colliding — and the collision is what makes the new stars.',
    sub: 'Almost none of the stars hit anything. It is the gas clouds that collide, and the shock of it triggers the brightest star formation in our neighbourhood. The interesting thing is never either galaxy on its own.',
    focus: '50% 48%',
  },

  // JARVIS: structure that emerges from a simple repeated rule.
  jarvis: {
    src: ngc2841,
    credit: `Flocculent spiral NGC 2841 · ${HUBBLE}`,
    kicker: 'NGC 2841 — a flocculent spiral',
    line: 'No grand arms. Just thousands of small pieces that add up to a shape.',
    sub: 'Most spirals have two sweeping arms. This one has hundreds of short fragments instead, each forming stars on its own schedule, and the structure emerges from the accumulation rather than from any grand design.',
    focus: '50% 46%',
  },

  // Braillix: the same object, read through a different instrument.
  braillix: {
    src: horsehead,
    credit: `The Horsehead Nebula in infrared · ${HUBBLE}`,
    kicker: 'The Horsehead, in infrared',
    line: 'Change the wavelength and a shadow becomes a structure.',
    sub: 'In visible light the Horsehead is a silhouette — an absence. In infrared the same object turns out to be lit from within, full of detail that was always there. Nothing changed but the instrument.',
    focus: '50% 44%',
  },

  // Reckoner: the number everyone reports versus the one that is true.
  reckoner: {
    src: pillars,
    credit: `The Pillars of Creation, Eagle Nebula · ${HUBBLE}`,
    kicker: 'The Pillars of Creation',
    line: 'They may not exist any more. We are looking at seven-thousand-year-old light.',
    sub: 'There is reasonable evidence a supernova destroyed these pillars around six thousand years ago — meaning the image is real, current, correctly captured, and possibly a photograph of something that is already gone. Correct data, wrong conclusion, unless somebody checks.',
    focus: '50% 38%',
  },

  // Uruthi: proof that something is what it claims to be.
  uruthi: {
    src: rho,
    credit: 'Rho Ophiuchi cloud complex · NASA, ESA, CSA, STScI, K. Pontoppidan (STScI), A. Pagan (STScI) · CC BY 4.0',
    kicker: 'Rho Ophiuchi — the nearest stellar nursery',
    line: 'Those jets are the only proof a star has switched on.',
    sub: 'You cannot see into the cloud where the star is forming. What you can see are the jets it fires out of both poles — the visible evidence of an event happening somewhere you have no access to. The whole field reads these to know what is going on inside.',
    focus: '52% 42%',
  },

  // How I work: filaments held together by something you cannot see.
  'how-i-work': {
    src: ngc1275,
    credit: `NGC 1275 · ${HUBBLE}`,
    kicker: 'NGC 1275 — the magnetic monster',
    line: 'These filaments should have dispersed long ago. Something invisible is holding them.',
    sub: 'Threads of gas stretching thousands of light years, far too thin and too hot to survive on their own — held in shape by magnetic fields nobody can photograph. The structure is evidence of a force you can only infer.',
    focus: '50% 48%',
  },

  // Data & Signal: what looks like one thing turns out to be another.
  'data-signal': {
    src: freggs,
    credit: `A frEGGs-plosion of star formation · ${HUBBLE}`,
    kicker: 'frEGGs, in the Cygnus region',
    line: 'Dense knots that survive precisely because they were dense enough to.',
    sub: 'Radiation from nearby giant stars blasts away the loose gas around them, and only the densest clumps hold together — each one now forming a star inside. What survives the measurement is not what was most common. It is what was most robust.',
    focus: '50% 46%',
  },

  // Gloaming: a light going out, and the going out is the beautiful part.
  gloaming: {
    src: butterfly,
    credit: `The Butterfly Nebula, NGC 6302 · ${HUBBLE}`,
    kicker: 'NGC 6302 — the Butterfly Nebula',
    line: 'A star dying, and the dying is the most beautiful thing it ever did.',
    sub: 'The gas in those wings is leaving at nearly a million kilometres an hour, lit from inside by the exposed core of the star that shed it — one of the hottest objects in the galaxy, and already on its way to going out. Nothing here is being destroyed by an enemy. It is just running out.',
    focus: '50% 48%',
  },

  // Sehat Saarthi: a cluster caught mid-decision, and honest about its youth.
  'sehat-saarthi': {
    src: westerlund,
    credit: 'Westerlund 2 · NASA, ESA, the Hubble Heritage Team (STScI/AURA), A. Nota (ESA/STScI) and the Westerlund 2 Science Team · CC BY 4.0',
    kicker: 'Westerlund 2',
    line: 'Three thousand stars, about two million years old — and already reshaping everything around them.',
    sub: 'The brightest stars in this cluster are burning through their fuel so fast they will be gone in a few million years, while carving the gas that made them into the pillars you can see at the edges. Young, powerful, and genuinely dangerous to their own surroundings.',
    focus: '50% 46%',
  },
};
