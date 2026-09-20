/** Maps the shot paths used in projects.ts to real imported assets, so Astro's
 *  image pipeline can optimise them at build time. */
import sifPlan from '../assets/shots/sifarish/plan-why-this-page.png';
import sifA from '../assets/shots/sifarish/page-a-babaclick.png';
import sifB from '../assets/shots/sifarish/page-b-ngo.png';
import sifKhabri from '../assets/shots/sifarish/khabri-taleem-radar.png';
import sifGate from '../assets/shots/sifarish/gate.png';
import sifPacket from '../assets/shots/sifarish/packet-casting-sheet.png';
import sifRadar from '../assets/shots/sifarish/radar-scored-roles.png';
import sifBrief from '../assets/shots/sifarish/briefing.png';

import aaReceipt from '../assets/shots/aaina/receipt-desktop.png';
import aaScience from '../assets/shots/aaina/science-desktop.png';
import aaReport from '../assets/shots/aaina/report-desktop.png';
import aaTogether from '../assets/shots/aaina/report-together-desktop.png';
import aaLanding from '../assets/shots/aaina/landing-desktop.png';
import aaSelf from '../assets/shots/aaina/self-report-desktop.png';
import aaJhalak from '../assets/shots/aaina/jhalak-desktop.png';
import aaPlan from '../assets/shots/aaina/plan-desktop.png';

import brBoard from '../assets/shots/braillix/board-hero.jpeg';
import brCoverage from '../assets/shots/braillix/coverage-proof.jpeg';
import brAtlas from '../assets/shots/braillix/cell-atlas.png';
import brReader from '../assets/shots/braillix/reader-validation.png';
import brInk from '../assets/shots/braillix/ink-hero.jpeg';
import brMirror from '../assets/shots/braillix/mirror-two-pods.jpeg';

import glBoard from '../assets/shots/gloaming/board.png';
import glDeep from '../assets/shots/gloaming/deep.png';
import glLegibility from '../assets/shots/gloaming/legibility.png';

import urLineup from '../assets/shots/uruthi/lineup.jpg';
import urReceipt from '../assets/shots/uruthi/receipt.png';
import urCandidate from '../assets/shots/uruthi/candidate.jpg';
import urJoin from '../assets/shots/uruthi/join.jpg';
import urLedger from '../assets/shots/uruthi/ledger.png';
import shHome from '../assets/shots/sehat/home.png';
import shModule from '../assets/shots/sehat/module.png';
import rkAct1 from '../assets/shots/reckoner/act-1.png';
import rkAct2 from '../assets/shots/reckoner/act-2.png';
import rkAct3 from '../assets/shots/reckoner/act-3.png';
import rkLedger from '../assets/shots/reckoner/ledger.png';
import rkProof from '../assets/shots/reckoner/proof.png';
import rkDefects from '../assets/shots/reckoner/defects.png';
import rkTurn from '../assets/shots/reckoner/your-turn.png';
import rkMethod from '../assets/shots/reckoner/method.png';
import rkEvidence from '../assets/shots/reckoner/evidence.png';
import rkLimits from '../assets/shots/reckoner/limits.png';
import asFrb from '../assets/shots/astro/frbprint.png';
import asStellar from '../assets/shots/astro/stellarrift.png';

export const SHOTS: Record<string, ImageMetadata> = {
  'sifarish/plan-why-this-page.png': sifPlan,
  'sifarish/page-a-babaclick.png': sifA,
  'sifarish/page-b-ngo.png': sifB,
  'sifarish/khabri-taleem-radar.png': sifKhabri,
  'sifarish/gate.png': sifGate,
  'sifarish/packet-casting-sheet.png': sifPacket,
  'sifarish/radar-scored-roles.png': sifRadar,
  'sifarish/briefing.png': sifBrief,

  'aaina/receipt-desktop.png': aaReceipt,
  'aaina/science-desktop.png': aaScience,
  'aaina/report-desktop.png': aaReport,
  'aaina/report-together-desktop.png': aaTogether,
  'aaina/landing-desktop.png': aaLanding,
  'aaina/self-report-desktop.png': aaSelf,
  'aaina/jhalak-desktop.png': aaJhalak,
  'aaina/plan-desktop.png': aaPlan,

  'braillix/board-hero.jpeg': brBoard,
  'braillix/coverage-proof.jpeg': brCoverage,
  'braillix/cell-atlas.png': brAtlas,
  'braillix/reader-validation.png': brReader,
  'braillix/ink-hero.jpeg': brInk,
  'braillix/mirror-two-pods.jpeg': brMirror,

  'gloaming/board.png': glBoard,
  'gloaming/deep.png': glDeep,
  'gloaming/legibility.png': glLegibility,

  'uruthi/lineup.jpg': urLineup,
  'uruthi/receipt.png': urReceipt,
  'uruthi/candidate.jpg': urCandidate,
  'uruthi/join.jpg': urJoin,
  'uruthi/ledger.png': urLedger,

  'sehat/home.png': shHome,
  'sehat/module.png': shModule,

  'reckoner/act-1.png': rkAct1,
  'reckoner/act-2.png': rkAct2,
  'reckoner/act-3.png': rkAct3,
  'reckoner/ledger.png': rkLedger,
  'reckoner/proof.png': rkProof,
  'reckoner/defects.png': rkDefects,
  'reckoner/your-turn.png': rkTurn,
  'reckoner/method.png': rkMethod,
  'reckoner/evidence.png': rkEvidence,
  'reckoner/limits.png': rkLimits,

  'astro/frbprint.png': asFrb,
  'astro/stellarrift.png': asStellar,
};

type ImageMetadata = import('astro').ImageMetadata;
