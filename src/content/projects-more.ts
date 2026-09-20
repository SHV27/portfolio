import { src, repoUrl, type Project } from './types';

export const SEHAT: Project = {
  id: 'sehat-saarthi',
  name: 'Sehat Saarthi',
  native: 'ਸਿਹਤ ਸਾਰਥੀ',
  repo: 'sehat-saarthi',
  live: 'https://sehat-saarthi-punjab.vercel.app',
  hook: 'A Punjabi-first screening assistant I built for rural government clinics — and the project where I deleted two working models of my own because they lied convincingly.',
  dek: 'Nine models built, seven shipped. The two I deleted at midnight are the reason I would trust the seven.',
  tagline: 'The decision always belongs to the doctor. The saarthi only guides the way.',
  year: 'Jun 2026',
  accent: 'ember',
  hardProblem:
    'Punjab’s health bottleneck is detection, not treatment: roughly 47% of specialist posts vacant, 62% rural staff shortage, many clinics with no lab at all. The user is a generalist doctor seeing a hundred patients a day, or a health worker on a cheap Android with unreliable internet, serving low-literacy Punjabi-speaking families — so a language toggle is itself a literacy test, and the real downstream artefact is a piece of paper the patient carries to the district hospital. On a zero-rupee budget with no GPU, every model is a small-public-dataset baseline. Which made my real problem not accuracy but calibrated honesty.',
  mechanism: [
    {
      lead: 'There is no AI writing anything a patient reads. Every sentence comes from a template a human wrote and checked, in both languages.',
      text: 'I put no language model anywhere in this system. Every sentence a patient reads comes from a reviewed bilingual template, because I locked a rule forbidding free-form generation of medical text before I wrote a line of it.',
      receipts: [{ label: 'content.py', href: src('sehat-saarthi', 'backend/app/content.py'), proves: 'Reviewed report blocks loaded from JSON; no generation path exists.' }],
    },
    {
      lead: 'The “this is not a diagnosis” line is not a design choice somebody could quietly drop. A result cannot physically come back without one attached.',
      text: 'The disclaimer is a required field on the response schema, not a UI convention. A result physically cannot be returned without one.',
      receipts: [{ label: 'schemas.py:21', href: src('sehat-saarthi', 'backend/app/schemas.py', [21, 36]), proves: 'probability, label, confidence, recall_note, disclaimer, report, demo — all required.' }],
    },
    {
      lead: 'When something breaks it does not hand back a plausible-looking number. It hands back a deliberately meaningless one and announces that it is broken, the whole way to the screen.',
      text: 'If a model fails to load, it degrades to a deterministic stub that is clinically meaningless — and flags itself as demo through the entire response chain, so a broken deployment can never be mistaken for a working screening.',
      receipts: [
        { label: 'registry.py:93', href: src('sehat-saarthi', 'backend/app/registry.py', [93, 124]), proves: 'StubModel fallback with a logged reason.' },
        { label: 'models.py:40', href: src('sehat-saarthi', 'backend/app/models.py', [40, 48]), proves: 'A SHA-256 hash of the inputs — deterministic, and deliberately meaningless.' },
      ],
    },
    {
      lead: 'A model that is loud is not a model that is correct, and in a clinic the loud number is the one that does the damage — a family reads “80%” and stops arguing. So no probability reaches the screen until it has been bent back into line with how often that model is actually right.',
      text: 'I calibrated every tabular model isotonically, because uncalibrated confidence on out-of-distribution input is confident nonsense — and in a clinic that is the dangerous failure, not the inaccurate one.',
      receipts: [{ label: 'training/', href: `${repoUrl('sehat-saarthi')}/tree/main/training`, proves: 'CalibratedClassifierCV with isotonic regression, cv=5, across all five tabular modules.' }],
    },
    {
      lead: 'The Punjabi was written first and the English added after. Gurmukhi is the main line and English the subtitle, on every single element — which is the exact opposite of how these apps normally get built.',
      text: 'I authored the Punjabi rather than translating it. Gurmukhi is the primary string and English the secondary, rendered together on every element, with a self-hosted font and no machine translation anywhere. If the phone has no Punjabi voice, the interface says so instead of silently falling back.',
      receipts: [{ label: 'i18n/strings.ts', href: src('sehat-saarthi', 'frontend/src/i18n/strings.ts'), proves: 'A single bilingual map, Gurmukhi first.' }],
    },
    {
      lead: 'The real product is a piece of paper. Black on white, both languages, blank lines sized for a pen — because what actually happens in a rural clinic is that somebody is handed something to carry to the district hospital.',
      text: 'The product is the printed referral slip — black on white, bilingual, with blank fields that print as handwriting lines, because the real workflow is paper carried to a district hospital.',
      receipts: [{ label: 'PrintableReferral.tsx', href: src('sehat-saarthi', 'frontend/src/components/PrintableReferral.tsx'), proves: 'Print-only markup with the boxed result, meaning, next step and disclaimer in both languages.' }],
    },
  ],
  figures: [
    { value: '9 → 7', label: 'models built, then deliberately reduced to the ones that could be trusted', receipts: [{ label: 'registry.ts:29', href: src('sehat-saarthi', 'frontend/src/modules/registry.ts', [29, 33]), proves: 'Two working modules are present in the repo but withheld from the live app.' }] },
    { value: '0.997', label: 'chest X-ray recall — 389 of 390 caught', receipts: [{ label: 'metadata.json', href: src('sehat-saarthi', 'backend/app/models_store/chest-xray/metadata.json'), proves: 'Confusion matrix: 1 false negative.' }] },
    { value: '0.543', label: 'the specificity behind that recall — it over-flags, and says so', receipts: [{ label: 'metadata.json', href: src('sehat-saarthi', 'backend/app/models_store/chest-xray/metadata.json'), proves: 'Published beside the recall, not hidden.' }] },
    { value: '0.19', label: 'test separation on the retinopathy model — the number that got it deleted', receipts: [{ label: 'MODEL_ANALYSIS.md', href: src('sehat-saarthi', 'docs/MODEL_ANALYSIS.md'), proves: 'Mean sick probability minus mean healthy probability.' }] },
    { value: '0 of 9', label: 'report texts signed off by a clinician — stated openly, not buried', receipts: [{ label: 'reports/', href: `${repoUrl('sehat-saarthi')}/tree/main/backend/app/reports`, proves: 'Every file carries reviewed_by: "" pending human review.' }] },
    { value: '5.3 GB', label: 'the TB dataset that would not finish downloading — so that module was not shipped at all', receipts: [{ label: 'EXPERIMENTS.md', href: src('sehat-saarthi', 'docs/EXPERIMENTS.md'), proves: '"Refused to force a half-trained module."' }] },
  ],
  restraint: {
    text: 'I fed my own live app an MRI of a healthy brain and it returned 80% dementia. I pulled both image models that night — including the Alzheimer’s one descended from the project that won me a hackathon. What I wrote down as the root cause is the line I am proudest of: tabular models cannot be fooled by domain shift, because a glucose reading of 200 is 200 everywhere; image models can. And I answered the obvious objection — why not just add a warning? — with the reason it does not work: a family still sees "80% dementia", and for that family the number itself does the harm.',
    receipts: [
      { label: 'MODEL_ANALYSIS.md', href: src('sehat-saarthi', 'docs/MODEL_ANALYSIS.md'), proves: 'The healthy-brain test, the reasoning, and the decision to remove both modules.' },
      { label: 'anemia-v0.1.md', href: src('sehat-saarthi', 'docs/MODEL_CARDS/anemia-v0.1.md'), proves: 'A model scoring a perfect 1.000 whose own card explains why that is not an achievement — anaemia is defined by a haemoglobin threshold, so the model recovered the cut-off rule, nothing more.' },
    ],
  },
  stack: ['Python', 'FastAPI', 'scikit-learn', 'ONNX Runtime', 'React', 'Vite', 'Hugging Face Spaces', 'Noto Sans Gurmukhi'],
  shots: [
    { file: 'sehat/home.png', alt: 'The Sehat Saarthi screening menu, headed in Gurmukhi with English beneath, a phulkari diamond border, a banner reading "Proof-of-concept — pending clinical validation", and a note saying voice is not available on this phone.', caption: 'Gurmukhi first, English second, on every single element — and the honest banner is in the masthead, not buried in a footer. Note the line on the right: when the phone has no Punjabi voice, it says so rather than silently failing.' },
    { file: 'sehat/module.png', alt: 'A screening module in Sehat Saarthi showing bilingual input fields with units and ranges.', caption: 'Each screening is a config entry, not a code path — which is what made nine of them possible on a zero-rupee budget, and what made deleting two of them a one-line change.' },
  ],
  limits: [
    'Proof of concept, pending clinical validation and regulatory review. Not approved, certified, or fit for unsupervised clinical use — the repository’s own words.',
    'Trained on small public datasets with no external validation. Domain shift is untested.',
    'High recall is bought with low specificity. Hepatitis-C specificity is 0.147 at the escalation cutoff, and the app tells the patient in Punjabi that it will sometimes send a healthy person for further testing.',
    'All nine report texts still await sign-off by a clinician and a Punjabi speaker.',
    'There are no automated tests in this repository.',
  ],
};

export const GLOAMING: Project = {
  id: 'gloaming',
  name: 'Gloaming',
  repo: 'gloaming-game',
  live: 'https://gloaming-murex.vercel.app',
  tagline: 'The board that plays back.',
  hook: 'A co-operative horror board game I built for the browser, where the board itself is the opponent — the dark eats it from the edges inward while you try to get everyone out.',
  dek: 'Version one worked perfectly and frightened nobody. So I threw it away and rebuilt every rule as something you can watch move.',
  year: 'Jun – Jul 2026',
  accent: 'gold',
  hardProblem:
    'A co-op game where the board is the antagonist normally needs a human to run the antagonist’s bookkeeping, which caps how clever it can be. But the deeper problem arrived in the middle of the build: everything worked mechanically and it still played like a spreadsheet in a horror skin. Numbers went up and down correctly and none of it was frightening. So I tore it down and rebuilt it on a single rule — if a mechanic is a hidden number doing arithmetic, replace it with a thing that visibly moves, grows, shrinks, or gets eaten.',
  mechanism: [
    {
      lead: 'The board is rings inside rings, and the dark eats them from the outside in. Where you are standing IS the clock — there is no timer anywhere on screen.',
      text: 'The board is a graph of concentric rings, and the dark consumes the outermost surviving ring inward. The geometry is the mechanic: which act you are in is read off how deep the dark has eaten, not from a counter.',
      receipts: [{ label: 'gloaming-game', href: repoUrl('gloaming-game'), proves: 'Ring-graph board with the dark advancing inward as the act structure.' }],
    },
    {
      lead: 'Every hidden number became a thing you can watch move. The clock became tiles going dark. Money became a torch burning down. Hit zero and you are a drifting wisp.',
      text: 'I replaced every abstraction with an object. The night meter became tiles turning to void; a currency became a torch that burns down, and at zero you become a drifting wisp; progress became three lanterns you physically carry, and drop where you fall.',
      receipts: [{ label: 'README', href: src('gloaming-game', 'README.md'), proves: 'The session-five teardown and the rule it was rebuilt around.' }],
    },
    {
      lead: 'The monster shows you exactly where it is going before it goes, and visibly changes its mind when it picks a new target. The dread is in watching it decide.',
      text: 'The monster telegraphs its entire route before it moves, and visibly changes its mind when it re-targets. The fear comes from watching it decide, not from a dice roll you cannot see.',
      receipts: [{ label: 'README', href: src('gloaming-game', 'README.md'), proves: 'Telegraphed movement, evolving by act; the Gate is sanctuary it cannot enter.' }],
    },
    {
      lead: 'Two players or six, it squeezes just as hard. Otherwise a full table is an easy table.',
      text: 'I normalise pace by player count, so a two-player game and a six-player game feel the same rather than one being trivially easy.',
      receipts: [{ label: 'PROGRESS.md', href: src('gloaming-game', 'PROGRESS.md'), proves: 'Per-round accumulators divided by party size.' }],
    },
    {
      lead: 'You cannot cheat by clicking fast. The rules live inside the game itself rather than in whether a button happened to look clickable — checked across 1,272 turns of play.',
      text: 'Out-of-order input is rejected by the engine, not hidden by the interface — asserted across 1,272 turns. A disabled button is a suggestion; a reducer that refuses is a guarantee.',
      receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'The UI-state contract, verified over 1,272 turns.' }],
    },
    {
      lead: 'There is not one sound file in the whole project. Every noise you hear is built by the browser, live, out of nothing.',
      text: 'Every sound in the game is synthesised at runtime. There is not a single audio file in the repository.',
      receipts: [{ label: 'package.json', href: src('gloaming-game', 'package.json'), proves: 'Howler driving procedurally generated tones — zero audio assets.' }],
    },
  ],
  figures: [
    { value: '+16', unit: ' pts', label: 'how much better a skilled bot does than a greedy one, on identical seeded games', receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'Measured at two players and positive at every player count.' }] },
    { value: '53–55%', label: 'win rate across 2, 3 and 4 players — tuned, not guessed', receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'Measured win-rate band with random heroes.' }] },
    { value: '2.4', unit: ' pts', label: 'spread between the best and worst hero — the gate allowed 8', receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'Per-hero balance measurement.' }] },
    { value: '150', label: 'chaos games at 2–6 players, all of which terminate', receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'Referee assertions H1–H17 plus randomised full games.' }] },
    { value: '0', label: 'softlocks, and zero console errors in production', receipts: [{ label: 'PROGRESS.md:17', href: src('gloaming-game', 'PROGRESS.md', [17, 20]), proves: 'Verified locally and against the deployed site.' }] },
    { value: '0', label: 'API keys, network calls or runtime secrets — it is entirely self-contained', receipts: [{ label: 'README:142', href: src('gloaming-game', 'README.md', 142), proves: '"Runtime AI: None. Fully self-contained — no LLM, no network, no secrets at runtime."' }] },
  ],
  restraint: {
    text: 'My skill gap came out flat on the first measurement — a good player was winning no more often than a greedy one, which meant the decisions did not matter. Rather than shipping and hoping, I tightened two numbers until they did — one fewer turn of torch, one more point of cost for careless footing. Squeezing the margin is what turned reading the monster’s telegraph from a nicety into the difference between finishing and not. I tuned it until skill provably paid, and left the proof in the repository.',
    receipts: [{ label: 'PROGRESS.md:36', href: src('gloaming-game', 'PROGRESS.md', [36, 37]), proves: 'The flat result, the two changes, and the re-measurement.' }],
  },
  stack: ['boardgame.io', 'React 19', 'Vite', 'TypeScript', 'Framer Motion', 'Howler (synthesised audio)', 'puppeteer-core'],
  shots: [
    { file: 'live/gloaming-title.png', alt: 'The Gloaming title card: the word GLOAMING in gold serif capitals, glowing faintly out of near-total darkness, with the words TAP TO SKIP in small type at the bottom.', caption: 'The first thing you see, and it is deliberately almost nothing — a word barely emerging from the dark. The whole game is about light losing to darkness, so the title card had better lose first.' },
    { file: 'gloaming/heroes-UNCROPPED.png', alt: 'The Gloaming hero-selection screen, headed “Choose your heroes”, showing five characters — the Swift, the Lamplighter, the Ember-Hearted, the Unseen and the Stubborn Flame — each with one rule it is allowed to break.', caption: 'Five heroes, and every one of them breaks exactly one rule of the game: the Swift always moves one extra square, the Lamplighter carries lanterns without slowing, the Stubborn Flame burns at half speed. “Every hero breaks one rule. No one gets out alone — the team does.” That sentence is the entire co-op design in twelve words.' },
    { file: 'gloaming/board.png', alt: 'A dark game board of concentric hexagonal nodes with a glowing amber gate at its centre, a vertical gauge on the left reading “THE DARK — DUSK”, a party panel, and a chronicle log.', caption: 'The board mid-game. The gauge on the left is not a number going up — it is a record of how many rings the dark has already eaten.' },
    { file: 'gloaming/deep.png', alt: 'The same board almost entirely consumed, roughly twenty black void tiles ringing a small island of light around the central gate.', caption: 'Act two. Everything black was a tile you could stand on twenty minutes ago.' },
    { file: 'gloaming/legibility.png', alt: 'A banner reading “THE HOLLOW ONE catches Ash”, above an escape checklist and gold spokes radiating from the central gate.', caption: 'Cause and effect stated plainly. You always know what just happened to you and why — which is what makes the dread land rather than confuse.' },
  ],
};

export const ALL_MORE: Project[] = [SEHAT, GLOAMING];
