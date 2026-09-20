import { src, repoUrl, type Project } from './types';

/* ============================================================================
   Every figure and every mechanism sentence below was verified by reading the
   repository, not the README. Where a README and the code disagreed, the code
   won and the discrepancy is recorded in DECISIONS.md. Claims that could not be
   reproduced were dropped rather than softened.
   ========================================================================== */

export const SIFARISH: Project = {
  id: 'sifarish',
  name: 'Sifarish',
  native: 'सिफ़ारिश',
  repo: 'sifarish',
  live: 'https://sifarish-shv-s-projects.vercel.app',
  tagline: 'Compile truth. Draft everything. Send nothing.',
  hook: 'I built a job-hunt assistant that compiles a résumé out of things I can actually prove — and that is physically incapable of applying on my behalf.',
  dek: 'Seven rooms and one ledger, built across three months, under a rule I gave it on the first day: it may find, draft and prepare — it may never press send.',
  year: 'Jul – Sep 2026',
  accent: 'gold',
  hardProblem:
    'An LLM will happily mint a claim you cannot back, and recruiters now screen for exactly that. So I made "never invents" structural rather than aspirational: the model is never allowed to write the page. It may only select and order facts that already exist, and every choice has to survive a validator that re-checks it against real ledger IDs. The harder half is the inverse — suppression is a lie too. A true, relevant fact quietly dropped for space is the same class of defect as a fabrication, so I made the compiler solve the page-budget constraint instead of trimming.',
  mechanism: [
    {
      lead: 'A sentence with nothing behind it does not get flagged for review. It stops the whole page from building.',
      text: 'An uncited line cannot physically reach the page. Every line passes through one gate, and a bullet carrying zero ledger IDs throws a compile error rather than rendering.',
      receipts: [
        { label: 'compiler.ts:284', href: src('sifarish', 'src/lib/compile/compiler.ts', [284, 285]), proves: 'The I1 gate — CompileError is thrown on a bullet with an empty ledgerIds array.' },
        { label: '13 invariants', href: src('sifarish', 'README.md'), proves: 'I1–I13, each with named enforcing tests.' },
      ],
    },
    {
      lead: 'It reads the job ad the way a cynic would — including the part that says what they do NOT want.',
      text: 'It reads the whole job posting into what the company says it cares about — and what it says it does not — keeping the posting’s literal words. A test asserts that "we do not care about LeetCode" lands in doesNotCare and never in cares.',
      receipts: [
        { label: 'reading.ts', href: src('sifarish', 'src/lib/strategist/reading.ts'), proves: '357 lines parsing a posting into typed cares / doesNotCare quotes.' },
        { label: 'strategist.test.ts', href: src('sifarish', 'tests/strategist.test.ts'), proves: 'The two-sided gate on posting polarity.' },
      ],
    },
    {
      lead: 'For every fact about me it decides: play this one, or leave it on the bench — and it has to write down why, in the company’s own words. Then I get to overrule it when the reason is rubbish.',
      text: 'For every true fact it writes down whether that fact was played or benched, with a reason in the company’s own words. The validator then rejects the model’s bad calls: a bench reason under twelve characters is overruled, education can never be benched, and "page budget" is refused outright because space belongs to the compiler.',
      receipts: [
        { label: 'plan.ts:438', href: src('sifarish', 'src/lib/strategist/plan.ts', 438), proves: 'validatePlan() — each override is noted visibly rather than applied silently.' },
        { label: 'plan.ts:466', href: src('sifarish', 'src/lib/strategist/plan.ts', [466, 487]), proves: 'The rules are dated to a live model failure: "LIVE-CAUGHT (05-Sep-2026, Gemini on Babaclick)".' },
      ],
    },
    {
      lead: 'It is physically incapable of applying on my behalf. Not switched off — the code that could send an email is not in there, and the build goes looking for it every single time.',
      text: '"Send nothing" is a grep over the source tree, not a promise. The build fails if a mail or browser-automation library ever appears, and the Gmail scope is asserted read-only with thirteen send-capable strings banned.',
      receipts: [
        { label: 'invariants.test.ts:85', href: src('sifarish', 'tests/invariants.test.ts', [85, 108]), proves: 'Walks src/ and api/ and fails on nodemailer, smtp, puppeteer, playwright .click().' },
        { label: 'dak.test.ts:118', href: src('sifarish', 'tests/dak.test.ts', [118, 157]), proves: 'Asserts gmail.readonly and bans gmail.send, drafts.create, batchModify and ten more.' },
      ],
    },
    {
      lead: 'After it makes the PDF, it opens the PDF back up and reads it, to check the page really says what the ledger said.',
      text: 'Every exported PDF is read back in. The text layer is re-extracted and each compiled line asserted present, and in order — so what the reader sees is provably what the ledger said.',
      receipts: [
        { label: 'parseback.ts', href: src('sifarish', 'src/lib/export/parseback.ts'), proves: 'Round-trip fidelity via pdfjs-dist with a cursor-advancing order check.' },
      ],
    },
    {
      lead: 'The model may make my sentences better. It may not make them bigger. Invent a number, a company or a technology in a rewrite and the rewrite is binned.',
      text: 'A rephrase that introduces a new number, a new proper noun or a new technology is rejected, with stemming and acronym-expansion awareness so honest rewrites are not false-flagged.',
      receipts: [
        { label: 'factGuard.ts', href: src('sifarish', 'src/lib/polish/factGuard.ts'), proves: '152 lines of drift detection against a 46-entry technology lexicon.' },
      ],
    },
  ],
  figures: [
    { value: '776', label: 'automated gates across 74 test files', derivable: true, receipts: [{ label: 'tests/', href: `${repoUrl('sifarish')}/tree/main/tests`, proves: 'Counted directly from source rather than taken from the README.' }] },
    { value: '1,000', label: 'generated input cases per run, 5,000 on a deep run', receipts: [{ label: 'matrix.test.ts:223', href: src('sifarish', 'tests/matrix.test.ts', [223, 224]), proves: 'A seeded PRNG enumerating ledger × posting × operation.' }] },
    { value: '13', label: 'invariants, each with named enforcing tests', receipts: [{ label: 'README', href: src('sifarish', 'README.md'), proves: 'I1–I13.' }] },
    { value: '168', label: 'decisions logged, append-only, never deleted', receipts: [{ label: 'DECISIONS.md', href: src('sifarish', 'DECISIONS.md'), proves: 'D1–D168 plus two later series.' }] },
    { value: '25,323', label: 'lines of source', receipts: [{ label: 'src/', href: `${repoUrl('sifarish')}/tree/main/src`, proves: 'Measured on the repository.' }] },
    { value: '0', label: 'API keys required — every lane has a deterministic floor', receipts: [{ label: 'routing.json', href: src('sifarish', 'data/config/routing.json'), proves: 'Free tiers only, with a heuristic fallback behind each lane.' }] },
  ],
  restraint: {
    text: 'I diagnosed a structured-output failure by controlled experiment rather than guesswork — JSON-object mode failed 0 of 3 at two different temperatures, JSON-schema mode passed 2 of 3, which proved the mode was the variable and temperature was not. I also wrote down why I had not caught it for two sessions: every caller degraded silently, by my own design. That became a standing rule in everything I have built since — every artefact prints which engine produced it.',
    receipts: [{ label: 'dimaag/core.ts:57', href: src('sifarish', 'src/lib/dimaag/core.ts', [57, 70]), proves: 'The measured probe, with the counts and the conclusion, left in the file.' }],
  },
  stack: ['Vite 8', 'React 19', 'TypeScript', 'Tailwind 4', 'Dexie / IndexedDB', 'pdf-lib + pdfjs', 'WebCrypto AES-256-GCM', 'Vitest', 'Playwright', '11 serverless functions'],
  shots: [
    { file: 'sifarish/plan-why-this-page.png', alt: 'Sifarish’s reasoning panel, headed “why this page looks like this”, listing eleven facts played and two benched, each with a written reason quoting the job posting.', caption: 'The whole thesis in one screen: eleven facts played, two benched, every decision reasoned in the company’s own words — and two struck through beneath the posting’s literal “we do not care about…”.' },
    { file: 'sifarish/page-a-babaclick.png', alt: 'A compiled one-page résumé for a company called Babaclick, ordered Education, then Achievements, then Projects.', caption: 'One dossier, compiled for a company that says it cares about aptitude. Education and the NTSE scholarship lead.' },
    { file: 'sifarish/page-b-ngo.png', alt: 'The same dossier compiled for an NGO posting, ordered Projects, then Positions of Responsibility, then Achievements, with the education section absent.', caption: 'The same dossier, same facts, an NGO posting. Projects and social work lead; education is gone. Nothing was rewritten — only re-decided.' },
    { file: 'sifarish/khabri-taleem-radar.png', alt: 'A panel listing skills the market is asking for that the user’s ledger cannot yet prove, each with the named job postings that asked for it.', caption: 'It also tells you what you cannot prove yet — each gap carrying the named postings that asked for it.' },
    { file: 'sifarish/gate.png', alt: 'The Sifarish entry screen offering two modes side by side: Owner Mode, which verifies an owner code on the server and stores nothing in the browser, and Demo Mode, which runs read-only on a fictional persona.', caption: 'The first screen is a door. Demo mode is read-only, runs on a fictional persona, cannot spend my API budget, and is structurally incapable of sending anything — which is why I can leave it open to the public at all.' },
    { file: 'sifarish/radar-scored-roles.png', alt: 'The Shikaar Radar screen, headed "29 keyless boards · ranked, capped at 15", listing scored roles at Siemens, Open Health Agents, LeadVaultAI, AryaXAI and Netflix, each with a numeric score and a "why this score" link.', caption: 'It reads job boards without a single API key — twenty-nine of them on the day of this capture, thirty-two in the seed list now — ranks eighty-five roles, and then deliberately caps what it shows you at fifteen. Every score opens into its own reasoning. There is no number here you are asked to take on faith.' },
    { file: 'sifarish/briefing.png', alt: 'The Sifarish dashboard greeting the owner by name with four packets compiled and ready, three ranked roles beneath it, and below that the Sach Ledger showing a shipped Gloaming entry and skills marked shipped.', caption: 'The morning briefing, and under it the Sach Ledger — the single place anything about me is written down, each entry either provable or honestly marked as still in the forge. The résumé is compiled out of this. It is never typed.' },
  ],
};

export const AAINA: Project = {
  id: 'aaina',
  name: 'Aaina',
  native: 'आईना',
  repo: 'aaina',
  live: 'https://aaina-two.vercel.app',
  tagline: 'You already know more than you think.',
  hook: 'A relationship and self-assessment I built that refuses to give you a compatibility score — and shows you the receipts for every sentence it writes about you.',
  dek: 'Ninety-one questions and no score at the end. What you get instead is every place your own answers contradict each other, quoted back to you.',
  year: 'Aug – Sep 2026',
  accent: 'ember',
  hardProblem:
    'The easy product is a quiz that returns "you are 72% compatible". That number is the industry standard and it is fabricated: Joel, Eastwick and Finkel threw over a hundred measures at dyad-specific compatibility in 2017 and predicted none of the variance. So the problem I set myself was producing a reading that is specific and emotionally weighty while structurally refusing the one claim everybody wants. The second problem is worse. Ask a language model for relationship feedback and it will hand you a horoscope — and the research is blunt about what happens next: the same paragraph is rated as more accurate the instant somebody is told it was written for them personally.',
  mechanism: [
    {
      lead: 'The model is not allowed to think. Every number and every contradiction is worked out in ordinary code first; the model only gets to write the joining sentences.',
      text: 'I made genericness inexpressible rather than discouraged. Every number, contradiction and verdict is computed in TypeScript; the model receives a closed evidence bundle and may only write connective prose.',
      receipts: [
        { label: 'derive.ts:28', href: src('aaina', 'src/engine/derive.ts', 28), proves: 'One deterministic, fingerprinted function is the sole authority — no component recomputes.' },
      ],
    },
    {
      lead: 'A paragraph that cannot point back at your own answers is thrown away three separate times on its way to your screen — once on the server, once in the browser, and once more at the moment of drawing it.',
      text: 'Any paragraph whose citations do not resolve is discarded in three independent places — in the serverless function, in the client orchestrator, and at the component, which renders nothing for unresolvable evidence.',
      receipts: [
        { label: 'write.ts:139', href: src('aaina', 'api/write.ts', [139, 193]), proves: 'Server-side allowlist built per request from that reader’s own findings.' },
        { label: 'Claim.tsx:48', href: src('aaina', 'src/ui/Claim.tsx', 48), proves: '“A guard that exists in one place is a guard the second call site will bypass.”' },
      ],
    },
    {
      lead: 'It writes from the places where you disagree with yourself. You said you are allowed to take up space. You also said your needs come after everyone else’s.',
      text: 'The report is written from contradictions, not scores — collisions between a person’s own answers, such as rating “I am allowed to take up space” high while rating “my needs come after everyone else’s” low.',
      receipts: [
        { label: 'contradictions.ts:215', href: src('aaina', 'src/engine/contradictions.ts', [215, 264]), proves: 'Seven attitude-versus-behaviour rules, each with the direction it requires.' },
      ],
    },
    {
      lead: 'Wanting to stay and being unable to leave are not the same feeling, so they get two separate axes. That split is the only reason it can ever say: this is being held together by what leaving would cost.',
      text: 'I measure Pull and Hold on separate axes, because Rusbult and Martz found that what predicted staying in abusive relationships was investment and poor alternatives — not satisfaction. That separation is what lets the report reach “this is being held in place by what leaving would cost.” Safety is orthogonal and never moves a number.',
      receipts: [
        { label: 'axes.ts', href: src('aaina', 'src/engine/axes.ts'), proves: 'Quality, Pull, Hold and Safety computed independently.' },
        { label: 'sources.ts', href: src('aaina', 'src/engine/sources.ts'), proves: 'Rusbult, Martz & Agnew 1998 cited with the load it bears.' },
      ],
    },
    {
      lead: 'Disagree with something it said, press the cross, and it does not simply grey the line out — it rebuilds everything that was leaning on it.',
      text: 'Rejecting a claim recomputes the plan. A reader’s ✗ on a finding is treated as new evidence: the finding is dropped and everything leaning on it is rebuilt.',
      receipts: [
        { label: 'derive.ts:170', href: src('aaina', 'src/engine/derive.ts', 170), proves: '“A claim the reader has rejected must not still be holding up a verdict three sections later.”' },
      ],
    },
    {
      lead: 'Two people can compare answers with no server involved anywhere. Both halves ride inside the link itself, and anything either of you said about safety is physically blocked from travelling.',
      text: 'Couple mode has no backend at all. Both halves travel in the URL fragment, which is never sent to a server, and every safety answer is hard-blocked from travelling in either direction — with a test that poisons a link and asserts the disclosure comes out missing.',
      receipts: [
        { label: 'couple.ts:92', href: src('aaina', 'src/engine/couple.ts', 92), proves: 'mayTravel() blocks all 15 safety items outbound and inbound.' },
        { label: 'couple.test.ts:102', href: src('aaina', 'src/engine/couple.test.ts', [102, 124]), proves: 'The adversarial test that tries to smuggle one through.' },
      ],
    },
  ],
  figures: [
    { value: '183', label: 'items in the bank, 145 of them scored', derivable: true, receipts: [{ label: 'src/items/', href: `${repoUrl('aaina')}/tree/main/src/items`, proves: 'Counted and de-duplicated from source.' }] },
    { value: '29', label: 'measured dimensions', receipts: [{ label: 'dimensions.ts:72', href: src('aaina', 'src/engine/dimensions.ts', 72), proves: 'Each with its published weight and lens.' }] },
    { value: '71', label: 'cited sources, each stating what it is load-bearing for', receipts: [{ label: 'sources.ts:23', href: src('aaina', 'src/engine/sources.ts', 23), proves: 'A registry test fails on any citation that does not resolve, and on any source nothing cites.' }] },
    { value: '74', label: 'phrases banned server-side, plus every predictive claim', receipts: [{ label: '_contract.ts:197', href: src('aaina', 'api/_contract.ts', [197, 296]), proves: 'The ban list, with a comment explaining each failure mode.' }] },
    { value: '27', label: 'named published interventions, not advice', receipts: [{ label: 'practices.ts:104', href: src('aaina', 'src/engine/practices.ts', 104), proves: 'Gottman, IBCT, EFT, Bowen, WOOP and more, each cited.' }] },
    { value: '9', label: 'test personas — two built to be nearly identical, on purpose', receipts: [{ label: 'audit.ts:21', href: src('aaina', 'scripts/audit.ts', [21, 23]), proves: 'The transplant problem has to be solved for the hard case, not the obvious one.' }] },
  ],
  restraint: {
    text: 'I refused to reproduce copyrighted instruments. Rather than administering published scales verbatim, it names the published construct and its interpretation rules and writes its own item text. MBTI, the Five Love Languages, the Dyadic Adjustment Scale and the HITS screen I considered and rejected in writing, with my reasons recorded.',
    receipts: [
      { label: 'relationship.ts:3', href: src('aaina', 'src/items/relationship.ts', [3, 12]), proves: 'Every item carries licence: aaina-authored.' },
      { label: 'sources.ts', href: src('aaina', 'src/engine/sources.ts'), proves: 'The rejected instruments are recorded with the reason each was rejected.' },
    ],
  },
  stack: ['Vite 8', 'React 19', 'TypeScript', 'Tailwind 4', 'Zustand', 'one serverless function', 'Groq', 'Vitest', 'Playwright'],
  shots: [
    { file: 'aaina/receipt-desktop.png', alt: 'An open receipt drawer showing “what this is built on — satisfaction, 30%, from 5 answers”, with the reader’s own words quoted back, beneath a banner explaining reduced mode.', caption: 'Open any sentence and it shows its working: which dimension, which score, how many answers, and your own words quoted back at you.' },
    { file: 'aaina/science-desktop.png', alt: 'A page headed “Why there is no compatibility percentage”, citing Joel 2017, Montoya 2008 and Joel 2020.', caption: 'It devotes a whole chapter to explaining why it will not give you the number you came for.' },
    { file: 'aaina/report-desktop.png', alt: 'A report paragraph reading “You are 69% committed to this lasting, and 30% satisfied… here they have separated”, each paragraph tagged with a receipt count.', caption: 'The writing comes from contradictions between your own answers — not from a score.' },
    { file: 'aaina/report-together-desktop.png', alt: 'A couple-mode section showing a prediction marked correct, then the line “You read them correctly — and the two of you are still 50 points apart”.', caption: 'Couple mode runs with no server: both halves travel inside the link itself, and safety answers are blocked from travelling at all.' },
    { file: 'aaina/landing-desktop.png', alt: 'The Aaina landing page headed “You already know more than you think”, with a Company School painting of a green parrot beside it, credited to the Cleveland Museum of Art, and a button reading “Start — two minutes”.', caption: 'The first screen makes the promise the rest of it has to keep: two minutes, no sign-up, no email, nothing saved to any server of mine. Every painting in it is public-domain Company School or Ragamala work, credited where it sits.' },
  ],
  limits: [
    'The current version replaced an earlier careless-responding detector I had built; it now surfaces dwell time and answer revisions instead, and says plainly that no self-report assessment is fake-proof.',
  ],
};

export const BRAILLIX: Project = {
  id: 'braillix',
  name: 'Braillix',
  repo: 'braillix',
  live: 'https://braillix.vercel.app',
  tagline: 'The teacher’s blackboard.',
  hook: 'A maths teacher writes by hand, by typing, or by photographing a textbook — and every line lands as verified mathematical braille on a blind student’s refreshable cells. No account, no server, no internet.',
  dek: 'Fifty-one hours, built around a single fear: that a blind student is being taught something wrong and nobody in the room can tell.',
  year: 'Aug 2026',
  accent: 'gold',
  hardProblem:
    'Nemeth is not a character substitution — it is a grammar, where the same cell means "numeric indicator" in one position and "fraction close" in another. A wrong dot is invisible to the sighted teacher and to the blind student both, so there is no human in the loop who can catch it. On top of that the hardware width is genuinely unknown, so no layer of the software is permitted to know how many cells exist; and a single line of a question can mix three braille codes at once. I made all of it run offline in a browser on a village-school laptop, including a 76 MB vision model, because student work must never leave the room.',
  mechanism: [
    {
      lead: 'It marks its own homework backwards. A completely separate engine looks only at the dots, says what they say, and that gets held against what the teacher actually typed.',
      text: 'I check the braille by reading it back. A second engine, sharing no code with the one that produced the dots, reconstructs meaning from the dots alone and compares it to what the teacher wrote.',
      receipts: [
        { label: 'readback.ts', href: src('braillix', 'app/src/core/readback.ts'), proves: '536 lines of independent Nemeth reconstruction, plus separate engines for Devanagari and English.' },
      ],
    },
    {
      lead: 'The checker is allowed to say “I don’t know”. When it meets a dot pattern it has no rule for, it says so — instead of quietly counting it as a pass.',
      text: 'That check has three verdicts, not two. When the reader meets a cell it has no rule for it returns "unchecked" — because collapsing that into "agrees" would turn a gap in the checker into a clean bill of health for the braille.',
      receipts: [
        { label: 'roundtrip.ts', href: src('braillix', 'app/src/core/roundtrip.ts'), proves: 'agrees | differs | unchecked, with the reasoning in the file.' },
      ],
    },
    {
      lead: 'A line that came out of a photograph of a textbook cannot reach a blind student until a human has confirmed it. Not should not — cannot. The software will not build with an unconfirmed line inside it.',
      text: 'I made a recognised line unrepresentable in the type system without an explicit human confirmation — enforced at compile time, not at runtime.',
      receipts: [
        { label: 'lesson.ts:21', href: src('braillix', 'app/src/lesson.ts', [21, 23]), proves: 'A recognised line requires a literal confirmed: true.' },
        { label: 'lesson.test.ts:88', href: src('braillix', 'app/src/lesson.test.ts', [88, 91]), proves: 'Compile-time tests asserting the unconfirmed variant fails to type-check.' },
      ],
    },
    {
      lead: 'The hardware team had not decided how many braille cells the device would have, so the software is forbidden to guess. Before it ships it searches its own code for a hard-coded number — and plants one first, to prove the search actually works.',
      text: 'The build greps its own source and fails if any file outside two named authorities hard-codes a cell count — and it first proves the guard catches a planted offender, because a guard that can only ever pass is not a guard.',
      receipts: [
        { label: 'invariants.test.ts', href: src('braillix', 'app/src/invariants.test.ts'), proves: 'Two-sided enforcement of the "no layer knows the width" law.' },
      ],
    },
    {
      lead: 'Two braille displays of different sizes, showing the same line: the bigger one blanks its spare cells rather than leaving yesterday’s dots sitting under a student’s fingers. A stale dot is a lie told in braille.',
      text: 'Mirroring across several displays pads a wider device’s spare cells to blank rather than leaving stale dots — because stale dots would be a lie told in braille — and a mirrored group takes the width of its smallest device, never its largest.',
      receipts: [
        { label: 'httppod.ts:169', href: src('braillix', 'app/src/transport/httppod.ts', [169, 183]), proves: 'The blank-padding rule, with the reason in the comment.' },
        { label: 'profile.ts:96', href: src('braillix', 'app/src/core/profile.ts', [96, 105]), proves: 'Smallest-device width enforcement.' },
      ],
    },
    {
      lead: 'It will not ship half-offline. The build checks that all eleven pieces it needs to work with no internet are present — and then checks the live site is really handing them out.',
      text: 'The build refuses to ship without its offline assets, and then checks that the live site is actually serving them.',
      receipts: [
        { label: 'assert-assets.mjs:19', href: src('braillix', 'app/scripts/assert-assets.mjs', [19, 33]), proves: 'Eleven named assets; a missing or truncated one fails the build.' },
        { label: 'check-deployed.mjs', href: src('braillix', 'tools/check-deployed.mjs'), proves: 'Post-deploy verification against production.' },
      ],
    },
  ],
  figures: [
    { value: '232 / 232', label: 'curriculum lines translated and read back cleanly, across 27 topics', receipts: [{ label: 'ACCURACY.md', href: src('braillix', 'docs/ACCURACY.md'), proves: 'Every line listed; zero with anything to report.' }, { label: 'syllabus.ts', href: src('braillix', 'app/src/core/syllabus.ts'), proves: 'The 232 lines themselves, counted from source.' }] },
    { value: '64.2s → 1.25s', label: 'press-to-result, after background model warming', receipts: [{ label: 'store.ts:843', href: src('braillix', 'app/src/store.ts', [843, 871]), proves: 'The warming sequence and the load-race fix it required.' }] },
    { value: '727', label: 'unit tests, plus 101 browser journeys', receipts: [{ label: 'REPORT.md', href: src('braillix', 'docs/REPORT.md'), proves: 'Counts recorded with the run.' }] },
    { value: '390 / 834 / 1440', label: 'pixel widths asserted, each with a no-horizontal-scroll check', receipts: [{ label: 'screens.spec.ts:15', href: src('braillix', 'app/e2e/screens.spec.ts', [15, 19]), proves: 'Responsive behaviour is a test, not an intention.' }] },
    { value: '9', label: 'Indic scripts covered by one Bharati table', receipts: [{ label: 'indic.ts', href: src('braillix', 'app/src/core/indic.ts'), proves: 'Devanagari through Malayalam.' }] },
    { value: '0', label: 'network requests — it is fully offline, including a 76 MB vision model', receipts: [{ label: 'vite.config.ts:31', href: src('braillix', 'app/vite.config.ts', [31, 123]), proves: 'Hand-written service worker; fonts and both recognisers self-hosted, no CDN is ever contacted.' }] },
  ],
  restraint: {
    text: 'One of my tests caught a bug in the expression rather than in the braille. In the sum-of-an-arithmetic-series formula, my segmenter mistook a subscripted term for an English word and left the equals sign stranded at the front of the maths, where it became a fraction numerator. Every braille cell was faithful to the expression it had been handed — the expression was already wrong.',
    receipts: [{ label: 'syllabus.test.ts:77', href: src('braillix', 'app/src/core/syllabus.test.ts', [77, 83]), proves: 'The assertion that a pure-maths line must arrive as one unbroken run of Nemeth.' }],
  },
  stack: ['Vite 8', 'React 19', 'TypeScript', 'Zustand', 'temml', 'speech-rule-engine', 'ONNX Runtime in a Web Worker', 'Tesseract', 'ESP32 / Arduino C++'],
  shots: [
    { file: 'braillix/board-hero.jpeg', alt: 'A dark blackboard interface showing five class-eleven and twelve maths lines including the binomial theorem and Bayes’ theorem, with a rendered six-dot braille cell below and a forty-eight key symbol rail.', caption: 'A blackboard, not an app. The teacher writes as they would on a board; the cell below shows exactly what the student is feeling.' },
    { file: 'braillix/coverage-proof.jpeg', alt: 'A panel reading “232 of 232 curriculum lines translate and read back cleanly, across 27 topics, in 6.3 seconds on this machine”, above a list of per-topic results all in green.', caption: 'The claim is a button. Press it and the whole curriculum is re-translated and re-checked in front of you.' },
    { file: 'braillix/cell-atlas.png', alt: 'A reference sheet showing all sixty-four cam positions as rendered braille cells, each labelled with its dot numbers and its Nemeth meaning.', caption: 'All sixty-four positions a cell can hold, each with its dots and its meaning — the kind of reference sheet you only build if you have actually understood the code.' },
    { file: 'braillix/reader-validation.png', alt: 'A screen showing a quadratic formula, the words “what the dots say — matches what you typed”, and a per-cell table listing dots, meaning and cam position.', caption: 'The three-way check, visible: what was typed, what the dots say when read back independently, and whether they agree.' },
    { file: 'braillix/ink-hero.jpeg', alt: 'The Braillix board showing the equation x squared plus 3x plus 2 equals 0 written by hand, a rendered six-dot braille cell, a reader panel confirming the dots read back as what was written, and a status bar listing speech as degraded while the maths engine, recognition, USB display and offline copy read ready.', caption: 'The teacher writes; the dots appear; a separate engine reads those dots back and states what they say. Along the bottom every subsystem declares its own condition — speech is degraded here, and it says so instead of quietly pretending.' },
    { file: 'braillix/mirror-two-pods.jpeg', alt: 'The Braillix board driving two braille pods at once over Wi-Fi, with a status line reading “2 cells across 2 pods” and a cell counter reading “cells 1–2 of 7”.', caption: 'Two pods on the same board, over Wi-Fi, showing the same cells — and the software genuinely does not know how many there are. The build greps its own source and fails if any file hard-codes a cell count.' },
    { file: 'braillix/tablet-hero.jpeg', alt: 'Braillix on a tablet in portrait, showing five lines of class eleven and twelve mathematics — a quadratic, nCr, the binomial theorem, Bayes’ theorem and integration by parts — above a braille cell reading “cell 1 of 15”, a symbol rail, and a status bar reporting 1,153 half-steps with 1,792 saved, or 61% less motor travel.', caption: 'Five lines of real class-eleven and twelve syllabus, live. The status bar is my favourite part: 1,792 half-steps of motor travel SAVED, 61% less than the naive route. That is a physical braille cell being spared thousands of movements per lesson, which is the difference between hardware that lasts a school year and hardware that does not.' },
    { file: 'braillix/phone-hero.jpeg', alt: 'The same Braillix board running on a phone in landscape, with two equations, a braille cell, the symbol rail and a status bar showing the maths engine, speech, recognition, USB display, display and offline copy all ready.', caption: 'The identical board on a phone. A teacher in a government school is far more likely to have this in their pocket than a laptop on their desk, so every control is thumb-sized and nothing is hidden behind a menu.' },
  ],
  limits: [
    'Handwritten Devanagari words genuinely do not work — the recogniser is trained on print, and no free browser-runnable model existed when this was built. The app says so rather than guessing.',
    'Braille is Grade 1 plus Nemeth; contractions are not implemented.',
    'Multi-device mirroring is verified against emulated hardware, not against two physical devices.',
    'Screen-reader user testing has not been done. Accessibility here is asserted structurally and by automated test only.',
  ],
};

export const PROJECTS: Project[] = [SIFARISH, AAINA, BRAILLIX];
