import { repoUrl, type Project } from './types';

/* ============================================================================
   Two projects that were missing from the site entirely.

   JARVIS — a private repo, 84 commits, a desktop assistant that runs a Windows
   laptop by voice. It closes the Stark thread the brief asks for: he does not
   just admire the idea of JARVIS, he built one.

   RECKONER — live, no public repo. A data tool that computes the answer every
   dashboard would report and then refuses to publish it. The analytics lead.

   Both are private/repo-less, so receipts point at the live artefact or state
   plainly that the source is closed. No receipt is allowed to 404.
   ========================================================================== */

const RECKONER_URL = 'https://reckoner-ten-eta.vercel.app';

/* -------------------------------------------------------------------------- */

export const JARVIS: Project = {
  id: 'jarvis',
  name: 'JARVIS',
  repo: 'jarvis',
  tagline: 'It runs my laptop by voice, and gets faster the more I use it.',
  hook: 'A desktop assistant that opens apps, plays the exact song I asked for, changes Windows settings and learns new abilities on demand — in English or Hinglish, with no API key, no subscription, and no cloud.',
  dek: 'Three layers, and the model is only allowed in the middle one. Median time from my sentence to the machine moving: under a millisecond.',
  year: 'Sep 2026',
  accent: 'gold',
  hardProblem:
    'Voice assistants feel stupid for two reasons, and neither is the size of the model. First, they put a model in the hot path — one cold model turn on this laptop takes 23 seconds, and nothing said after a 23-second gap sounds intelligent. Second, they match what you said with rigid patterns, so "open youtube and play stand up video" becomes a request to launch an application literally named "youtube and play stand up video". Both are solvable, but only by refusing to let the model anywhere near the things the machine already knows how to do.',
  mechanism: [
    {
      text: 'It works in three layers and each one only passes upward what it genuinely cannot handle. The reflex arc is pure code and answers in under 30 milliseconds. Above it, a model writes a new skill exactly once. Above that, it just talks to you.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: '84 commits. The architecture, the decision log and the audit scripts are all in it.' }],
    },
    {
      text: 'The reflex layer never captures what you said — it looks it up. Your words are matched against a live catalogue of every installed app, settings page, folder and site on the machine, so a target can never swallow the rest of the sentence. Later clauses inherit the earlier target, which is what turns "open youtube and play stand up video" into two correct orders instead of one impossible one.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Catalogue lookup rather than regex capture — the specific fix for the defect class that broke the previous version.' }],
    },
    {
      text: 'It speaks Hinglish natively, not as a translation layer. "youtube kholo aur stand up comedy chalao" resolves identically to the English, because verbs are matched anywhere in the clause rather than assumed to be at the front.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Hindi word order handled in the resolver itself.' }],
    },
    {
      text: 'Ask for something it cannot do and a model writes a recipe from a fixed vocabulary of 43 verified building blocks. The recipe runs, the machine checks the result actually happened, and only a recipe that verified gets saved. Ask again and it replays as plain code — no model, no network. It literally gets faster the more you use it.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: '43 primitives in a registry; a plan may only name registry entries, never a shell command.' }],
    },
    {
      text: 'It is not a list of apps someone remembered to support. Anything the catalogue does not know gets driven through the accessibility tree — it reads the window\'s named controls and clicks them by name. That works in Word, Discord, VS Code, Settings, anything. No code per application.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Accessibility-tree driving, with the window verified to be in front before any input is sent.' }],
    },
    {
      text: 'The hardest part was the ears. A laptop listening all the time hears its own speakers, so the system subtracts whatever the machine is playing out of the microphone before anything downstream hears it. And it learns your voice from how you already use it — holding the talk key, clapping it awake — switching on only once six clips agree, and built so it can never lock you out.',
      receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Loopback echo cancellation plus a speaker-embedding gate that self-enrols and degrades to off with a visible badge.' }],
    },
  ],
  figures: [
    { value: '12.5', unit: 'ms', label: 'worst case to understand a command — median under 1 ms', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Measured across 5,052 sentences generated from this machine\'s own catalogue.' }] },
    { value: '5,052', label: 'sentences swept, English and Hinglish, every one resolving correctly', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'An audit script generates them from the real catalogue; a test is the gate.' }] },
    { value: '43', label: 'verified building blocks a new skill may be composed from — and nothing else', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'A plan may only name registry primitives, never a shell. A learned skill cannot become a learned mistake.' }] },
    { value: '12.3', unit: ' dB', label: 'of its own speakers removed from the microphone, at 2.3 ms of CPU per 100 ms of audio', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'WASAPI loopback as the far-end reference into echo cancellation.' }] },
    { value: '23s → 0.0125s', label: 'the gap it closes: a cold model turn versus the reflex arc', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Measured on the same laptop — the reason a model is never in the hot path.' }] },
    { value: '0', label: 'API keys, subscriptions or cloud calls needed to use it', receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'Single user, runs on the machine, works with no key at all.' }] },
  ],
  restraint: {
    text: 'The first version of the resolver was fixed the way everyone fixes these — say a sentence, watch it break, patch that sentence. So I wrote a sweep that generates every phrasing the machine could possibly be asked, out of its own catalogue, and ran all 5,052 at once. The first run found six entire classes of bug in one go: a question\'s own words ending up inside the argument, a two-word Hindi command cut in half, a bracket in an app\'s name killing the lookup, a longer name resolving to a shorter one hiding inside it, a verb hiding at the start of a name, and — my favourite — "my desktop kholo" opening the gesture that minimises every window, because the possessive had been stripped as politeness. You cannot find those one sentence at a time.',
    receipts: [{ label: 'source is private', href: repoUrl('jarvis'), proves: 'The catalogue sweep and the six defect classes it caught on its first run.' }],
  },
  stack: ['Python', 'Windows accessibility APIs', 'WASAPI loopback', 'WebRTC echo cancellation', 'speaker embeddings', 'local wake word', 'no cloud'],
  shots: [],
  limits: [
    'Windows only, and built for one person — mine. It enrols my voice, learns my catalogue, and is not multi-user.',
    'The source is private for now.',
    'Anything irreversible is refused rather than confirmed, so it will not delete or send things for you. That is deliberate.',
    'Both the echo cancellation and the voice gate degrade to off with a visible badge rather than silently — neither can stop the app starting.',
  ],
};

/* -------------------------------------------------------------------------- */

export const RECKONER: Project = {
  id: 'reckoner',
  name: 'Reckoner',
  repo: 'reckoner',
  live: RECKONER_URL,
  tagline: 'It refuses to answer when it cannot prove the answer.',
  hook: 'Give it a million rows of transactions and ask why a number moved. It shows the arithmetic, names what actually caused the change — and when the comparison is rubbish, it refuses to publish a finding at all.',
  dek: 'Every analytics tool you have ever used will answer you. This one checks first whether your question deserved an answer.',
  year: 'Sep 2026',
  accent: 'verify',
  hardProblem:
    'Every analytics tool ever built will answer you. That is the problem. Run a correct query over correct data and you get "revenue fell 57.6% last month" — arithmetically perfect and completely wrong, because last month is only nine days long in the file. No dashboard on earth would tell you that. The hard part is not computing the number; it is building something that computes the number, sees why it is meaningless, and declines to show it to your CEO.',
  mechanism: [
    {
      text: 'Before it explains anything, a gate checks whether the periods you are comparing are even comparable. In the sample ledger, one period out of twenty-five fails that check — December 2011, which holds nine calendar days and eight trading days against a typical month of twenty-six. The refusal is issued before any explanation is attempted.',
      receipts: [{ label: 'see it refuse', href: RECKONER_URL, proves: 'Act Two is the refusal, with the day counts and the reason, and a better comparison suggested in its place.' }],
    },
    {
      text: 'Then it proposes the comparison you should have asked for. November 2010 against November 2011 — same month, one year apart, so seasonality is held constant, and both fully observed. The real answer turns out to be plus 2.7%, not minus 57.6%.',
      receipts: [{ label: 'see the real finding', href: RECKONER_URL, proves: 'Act Three: the honest comparison, and why that specific pair.' }],
    },
    {
      text: 'And "plus 2.7%" is not the finding either — it is the disguise. Underneath, £484k of new products is being almost entirely cancelled out by £245k of lost volume. It decomposes the movement into volume, price, mix, new products and discontinued lines, and the pieces reconcile exactly back to the totals.',
      receipts: [{ label: 'see the decomposition', href: RECKONER_URL, proves: 'A waterfall from £1.46m to £1.50m through five named effects that sum exactly.' }],
    },
    {
      text: 'It runs a data-quality exhibit first, before any finding, rather than as a footnote afterwards — because if the source file is wrong this will faithfully explain a wrong number, and that needs saying before you read the answer, not after.',
      receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'Data quality is stated before any finding, on purpose.' }],
    },
    {
      text: 'A million rows and nothing leaves your machine. The whole analysis runs in the browser — no server on the data path, no account, no upload. For anyone who would like to point an analytics tool at a real ledger without emailing it to a vendor, that is the entire ballgame.',
      receipts: [{ label: 'see it live', href: RECKONER_URL, proves: '"Data sent to a server: None. Ever." — stated in the header and true of the architecture.' }],
    },
  ],
  figures: [
    { value: '1,033,036', label: 'transaction rows analysed, entirely in the browser', receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'Row count printed in the header alongside the period covered.' }] },
    { value: '−57.6% → +2.7%', label: 'the difference between the answer every tool gives and the true one', receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'Act One computes the first, Act Two refuses it, Act Three earns the second.' }] },
    { value: '1 of 25', label: 'periods that fail the comparability gate — and it is the one everybody would have reported', receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'The gate runs across every period, not just the one you asked about.' }] },
    { value: '5', label: 'named effects the movement decomposes into, reconciling exactly to the totals', receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'Volume, price, mix and interaction, new products, discontinued.' }] },
    { value: '0', label: 'bytes of your data sent anywhere', receipts: [{ label: 'see it live', href: RECKONER_URL, proves: 'No server on the data path and no account.' }] },
  ],
  restraint: {
    text: 'It only supports one shape of question: two periods, one money metric. I considered forecasting, cohort retention and multi-metric models, and cut all three rather than ship them shallow — a narrow tool that is right beats a broad one that is plausible. And the limits are written on the page itself, including the ones that cost me: the sample ledger is real but it is from 2009 to 2011 and the interface says so on every exhibit rather than quietly implying freshness; two periods are two points, so a movement between them is not a trend and nothing here should be read as one; and no actual CEO has evaluated it, which I say plainly rather than letting anyone assume otherwise.',
    receipts: [{ label: 'read the limits', href: RECKONER_URL, proves: 'Every one of those caveats is printed on the live page, not buried in a README.' }],
  },
  stack: ['TypeScript', 'in-browser analysis', 'no backend', 'print/PDF export', 'UCI Online Retail II (CC BY 4.0)'],
  shots: [
    { file: 'reckoner/act-1.png', alt: 'A panel headed "Act One — what every other tool reports", showing revenue fell 57.6% in December 2011, with a bar chart where the final bar is highlighted in red.', caption: 'Act One. The number every dashboard would give you — arithmetically correct, and completely wrong.' },
    { file: 'reckoner/act-2.png', alt: 'A panel headed "Act Two — we refuse to publish it", explaining that December 2011 contains only 9 calendar days and 8 trading days against a typical 26-day month.', caption: 'Act Two. It computed the answer, then refused to show it as a finding — and told you exactly which comparison to make instead. I have never seen another analytics tool do this.' },
    { file: 'reckoner/act-3.png', alt: 'A waterfall chart decomposing a revenue change into volume, price, mix and interaction, new products and discontinued lines.', caption: 'Act Three. The honest comparison looks flat at +2.7% — until you see £484k of new products being cancelled out by £245k of lost volume underneath it.' },
    { file: 'reckoner/ledger.png', alt: 'A panel headed "The ledger", showing eight named countries carrying the movement and 11.1% of it sitting outside them across twenty-three others.', caption: 'Where the money actually moved. Eight countries carry it; the remaining 11.1% is spread across twenty-three more, and it says so rather than rounding them away.' },
    { file: 'reckoner/defects.png', alt: 'A panel headed "Before you trust any of it", listing five defects found in the source file, each with the number of rows affected.', caption: 'This runs BEFORE the finding, not as a footnote under it. Five defects in the file, each one big enough to have moved the numbers above — because if your data is wrong, a good tool will explain a wrong answer beautifully.' },
    { file: 'reckoner/proof.png', alt: 'A panel headed "The proof" listing the checks a finding must pass before it is allowed to render, each with a pass state.', caption: 'Every check the finding had to survive before it was allowed on screen. These run at render time in your browser, so you are watching the real gate, not a screenshot of one.' },
    { file: 'reckoner/evidence.png', alt: 'A table headed "The evidence" with columns for check, scale and result, including a bridge reconciliation row.', caption: 'What was actually run, and what came back. The bridge reconciles to the movement exactly — if it ever did not, the finding would not render.' },
    { file: 'reckoner/method.png', alt: 'A panel headed "Method", describing four mechanisms by which the numbers can be verified, in descending order of strength.', caption: 'Four ways to check the numbers without taking my word for anything, ordered by how strong each one is. The weakest is listed as the weakest.' },
    { file: 'reckoner/limits.png', alt: 'A panel headed "The limits", stating plainly what the product cannot do and where it could still mislead.', caption: 'The limits, written into the product rather than into a README nobody opens. A tool that cannot say what it is bad at should not be trusted about what it is good at.' },
    { file: 'reckoner/your-turn.png', alt: 'A panel headed "Your turn" inviting the visitor to upload their own CSV, stating that the data never leaves the browser.', caption: 'Point it at your own ledger. A million rows, no upload, no account, no server on the data path — which is the only reason anyone would ever try it with real numbers.' },
  ],
  limits: [
    'One question shape only: two periods, one money metric. Forecasting, cohorts and multi-metric models were considered and cut rather than shipped shallow.',
    'The sample ledger is genuine but historical — 2009 to 2011 — and the interface says so on every exhibit.',
    'Two periods are two points. A movement between them is not a trend.',
    'If the source file is wrong, it will faithfully explain a wrong number. That is why the data-quality exhibit runs first.',
    'No real executive has evaluated it. It has been driven end to end in a browser at desktop and phone widths and audited against published research on what executives reject — which is the strongest evaluation available without access to one, and not the same thing.',
  ],
};
