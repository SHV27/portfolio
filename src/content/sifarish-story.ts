import { src, repoUrl } from './types';

/* ============================================================================
   SIFARISH — the long version.

   The first pass undersold this badly: it described the résumé compiler and
   stopped. What is actually in the repository is a seven-room desk that runs a
   job hunt end to end — it reads the market, hunts roles across live boards,
   compiles a page per company, drafts the outreach, watches the inbox, and
   tracks the pipeline. Written here as the story of how it grew, because the
   growth IS the argument.
   ========================================================================== */

export interface Room {
  no: string;
  name: string;
  native: string;
  what: string;
  body: string;
  receipts: { label: string; href: string; proves: string }[];
}

export const SIFARISH_STORY = {
  opening: [
    `In July 2026 I sat down to apply for internships and realised the whole ritual is broken. You write one
     résumé. You send it to forty companies who want forty different things. Each one gets a document that is
     roughly 30% relevant to them, and you have no idea which 30%. Meanwhile the tools being sold to fix this
     are language models that will happily invent a line about "cross-functional stakeholder alignment" you
     have never done — and recruiters have learned to smell exactly that.`,
    `So I did not build a résumé generator. I built the thing that has to exist underneath one: a ledger of
     facts I can actually prove, and a compiler that assembles a page out of that ledger for one specific
     company, and then writes down why it made every choice it made. The model never writes a word of the
     page. It only decides which true things belong on it.`,
    `Then it kept growing. Because once you have a machine that knows everything true about you, the obvious
     next question is "so what should I apply to" — and after that "what does this company actually want" and
     "what did they reply" and "what can I not prove yet". Seven rooms later it is not a résumé tool. It is a
     desk that runs the entire hunt, and it won first place at the Agentic & GenAI Showcase at IIT Ropar.`,
  ],

  rooms: [
    {
      no: '01',
      name: 'Sach Ledger',
      native: 'सच',
      what: 'The vault of things I can prove',
      body: `Everything starts here. Every project, grade, award and skill is a row with an evidence link and a
             date. Each row is tagged either shipped — with a URL you can open — or honestly marked as still in
             the forge. Nothing else in the system is allowed to invent a fact; it can only reach into this room
             and pick one up. And it reads my GitHub directly, so when I push something new the ledger knows
             about it before I remember to tell it.`,
      receipts: [
        { label: 'the ledger seed', href: src('sifarish', 'seed/ledger.seed.json'), proves: '34 entries — 26 shipped with evidence, 8 honestly marked as in progress.' },
        { label: 'the GitHub reader', href: src('sifarish', 'src/lib/nabz/github.ts'), proves: 'Pulls repositories in and keeps the ledger current. It also deletes projects that have no repo behind them, because those cannot be proven.' },
      ],
    },
    {
      no: '02',
      name: 'Khabri',
      native: 'ख़बरी',
      what: 'The informant',
      body: `Every week it sweeps the market and comes back with what is actually being asked for right now —
             and crucially, what is being asked for that my ledger cannot yet prove. That second list is the
             useful one. It does not say "learn LangChain"; it says "four postings this week wanted orchestration
             and you have nothing that demonstrates it", and it names the four postings so I can go read them.
             It is the difference between career advice and a gap analysis.`,
      receipts: [
        { label: 'the craft library', href: src('sifarish', 'data/ustaad/library.json'), proves: '93 cited sources and 63 craft patterns, built up from real postings rather than generic advice.' },
        { label: 'the vocabulary', href: src('sifarish', 'src/lib/jd/lexicon.ts'), proves: '46 canonical technology terms, 20 banned guarantee phrases, and about 45 slop phrases it will not let through.' },
      ],
    },
    {
      no: '03',
      name: 'Shikaar Radar',
      native: 'शिकार',
      what: 'The hunt',
      body: `It watches 32 real hiring boards — Ashby, Greenhouse, Lever and more — and pulls live openings,
             then ranks them against what I have said I actually want. Every role carries an expandable "why
             this score", so I can disagree with it. It also applies ceilings honestly: a senior role gets
             capped no matter how well the keywords match, and anything stale gets marked down, because a
             two-month-old posting is usually already filled.`,
      receipts: [
        { label: 'the watchlist', href: src('sifarish', 'src/lib/radar/watchlist.seed.ts'), proves: '32 keyless boards seeded — 19 Ashby, 11 Greenhouse, 2 Lever — each probed live before it was included.' },
        { label: 'the scoring ceilings', href: src('sifarish', 'src/lib/radar/score.ts', [244, 266]), proves: 'Hard caps for senior roles, non-intern engineering roles and stale postings.' },
      ],
    },
    {
      no: '04',
      name: 'Packet',
      native: 'दर्ज़ी',
      what: 'The tailor — and the best room in the building',
      body: `Paste a job posting. It reads the whole thing and separates what the company says it cares about
             from what it says it does not, keeping their literal words. Then it writes a game plan: for every
             true fact in my ledger, played or benched, with a reason quoted from the posting. Then the compiler
             executes that plan into a one-page résumé, a cover letter and an outreach note. And a separate
             critic — a hostile-recruiter rubric — reads the finished page and sends it back once if it is not
             good enough. You can read the entire argument it had with itself before it printed anything.`,
      receipts: [
        { label: 'the reading', href: src('sifarish', 'src/lib/strategist/reading.ts'), proves: '357 lines that split a posting into what it cares about and what it explicitly does not.' },
        { label: 'the game plan', href: src('sifarish', 'src/lib/strategist/plan.ts', 438), proves: 'Every fact gets played or benched with a written reason, and the validator overrules the model when it benches something for a bad reason.' },
        { label: 'the compile gate', href: src('sifarish', 'src/lib/compile/compiler.ts', [284, 285]), proves: 'A line with no citation behind it throws rather than rendering. This is the rule the whole product exists to enforce.' },
      ],
    },
    {
      no: '05',
      name: 'Guru',
      native: 'गुरु',
      what: 'The coach that will not flatter you',
      body: `A chat that knows my entire ledger, so it answers about me rather than about candidates in general.
             It has a hard rule: it will never promise an outcome. No "this will get you the job". Twenty
             guarantee phrases are banned outright in code, and the header says plainly that no tool can
             guarantee selection. I tested it against 30 scripted conversations to make sure it holds that line
             even when I push it.`,
      receipts: [
        { label: 'the conversation tests', href: src('sifarish', 'tests/guru.test.ts', [19, 56]), proves: '30 scripted conversations across four versions of the coach.' },
        { label: 'the banned promises', href: src('sifarish', 'src/lib/jd/lexicon.ts', [128, 149]), proves: '20 guarantee phrases it is structurally forbidden from producing.' },
      ],
    },
    {
      no: '06',
      name: 'Dak Khana',
      native: 'डाक',
      what: 'The post room — and the thing I am proudest of',
      body: `It connects to Gmail so the desk knows when a company replies and can move the card itself. And it
             connects with read-only permission, which it proves rather than promises: a test asserts the scope
             string is read-only, bans thirteen send-capable API calls by name, and the build greps the entire
             source tree and fails if a mail library ever appears in it. Sifarish is structurally incapable of
             sending anything from my account. I built the most useful version of the feature and then removed
             its ability to act.`,
      receipts: [
        { label: 'the scope test', href: src('sifarish', 'tests/dak.test.ts', [118, 157]), proves: 'Asserts gmail.readonly and bans send, insert, drafts.create, settings.sendas and nine more by name.' },
        { label: 'the source grep', href: src('sifarish', 'tests/invariants.test.ts', [85, 108]), proves: 'The build walks src/ and api/ and fails on nodemailer, smtp, puppeteer or any browser-automation click.' },
      ],
    },
    {
      no: '07',
      name: 'Morcha',
      native: 'मोर्चा',
      what: 'The board',
      body: `Where everything lands: found, tailored, applied, waiting, interviewing. Each card carries its
             packet, its reply, and a receipt of who did what and when. And there is an apply cockpit — a
             bookmarklet that fills a form for me on the company's own site, with a deny-list that refuses to
             touch anything about gender, ethnicity, disability, caste or visa status. It never presses submit.
             I press submit.`,
      receipts: [
        { label: 'the cockpit gate', href: src('sifarish', 'tests/cockpit.test.ts', [34, 52]), proves: 'The generated bookmarklet is asserted to contain no fetch, no XHR, no submit, no eval, and a demographic deny-list.' },
      ],
    },
  ] as Room[],

  closing: [
    `It runs with no API keys at all. Every lane that uses a model has a deterministic floor underneath it, and
     every artefact prints which engine produced it — because I once spent two sessions with a dead reasoning
     tier that looked exactly like a healthy one, and silent failure is the specific thing I now build against.`,
    `And the whole system is bound by one rule it cannot break: it will draft anything and send nothing. It
     will write the email, fill the form, rank the roles and argue about the résumé. Then it stops and waits
     for me. That was not a limitation I accepted. It was the point.`,
  ],
};
