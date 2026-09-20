import type { Project } from './types';

/* ============================================================================
   URUTHI — the project the brief asked for that no public sweep could find,
   because the repository is PRIVATE.

   PUBLISHING CONSTRAINTS, enforced in this file:
   1. The repo is private, so no receipt may link to source — a private link
      404s for every visitor. Receipts point at the live demo, which is where a
      reader can actually check the claim, and the text says the repo is private
      rather than pretending otherwise.
   2. The brief document inside that repo names a real private individual, his
      employer and his employment history. None of that appears here, in any
      form. He is referred to only as a conversation with someone who runs this
      side of the business.
   3. The Supabase project reference, Vercel identifiers and sample link tokens
      are not published.
   4. The "seal" is a content hash, NOT a signature and NOT a third-party
      timestamp. It is described as tamper-evident, never as cryptographic
      proof of authorship. The repo's own README overreaches on this point and
      the overreach is not repeated.
   5. Performance and QA figures that exist only in a markdown file with no
      committed artifact are not published. Only counts derivable from source.
   ========================================================================== */

const LIVE = 'https://uruthi.vercel.app';
const demo = (what: string) => ({
  label: 'see it live',
  href: LIVE,
  proves: what,
});

export const URUTHI: Project = {
  id: 'uruthi',
  name: 'Uruthi',
  native: 'உறுதி',
  repo: 'uruthi',
  live: LIVE,
  tagline: 'Every candidate you send, confirmed.',
  hook: 'The working desk of an Indian IT staffing agency. Paste a job requirement, see who in your own pool fits and why in plain words, then send the hiring manager one phone link where every requirement is marked Met, Partial or Not met — with the exact résumé line that proves it.',
  dek: 'A hiring manager who has never met you, will never log in, and has excellent reasons to doubt you. Ten seconds on a phone to change that.',
  year: 'Sep 2026',
  accent: 'verify',
  hardProblem:
    'A hiring manager will never log in to an agency tool, never sign up, and has good reason to distrust what an agency sends — résumé-harvesting fake postings and proxy interviews are a real problem in this market. So the product has to make a claim checkable by a stranger, on a phone, in about ten seconds, with no account. That forces three things at once: a fingerprint over exactly what the client was shown, a consent record that cannot be bypassed, and a ranking with no score in it that anyone could dismiss as a black box. On top of that it handles candidate personal data under India\'s DPDP Act, so consent, purpose limitation and erasure had to exist on day one rather than be retrofitted.',
  mechanism: [
    {
      lead: 'Every requirement gets a tick, a half tick or a cross — and a tick with nothing quoted underneath it downgrades itself automatically. You cannot show a green tick with nothing behind it.',
      text: 'Every requirement is marked Met, Partial or Not met — and a Met row without a quoted proof line collapses automatically to "unverified". The grid cannot show a green tick with nothing behind it.',
      receipts: [demo('Open the sample lineup and read any profile: each must-have carries its status and the résumé line it came from.')],
    },
    {
      lead: 'The moment a shortlist goes out, the app takes a fingerprint of exactly what the client will see. The page works that fingerprint out again on every single load, so if anything was changed afterwards, the page says so out loud.',
      text: 'When a lineup is sent, the app takes a SHA-256 fingerprint of exactly the fields the client will see — the requirement, the candidate details, the evidence rows, the consent status. The receipt page recomputes that fingerprint on every load and tells you plainly if it no longer matches.',
      receipts: [demo('The receipt page prints the full 64-character hash and either "Seal verified on this load" or an explicit mismatch.')],
    },
    {
      lead: 'It ranks the candidates and then throws the score away. You get reasons in words instead — “5 of 5 must-haves”, “notice 90 days against a cap of 30” — and a test fails if a reason ever smuggles a number back in.',
      text: 'The candidate list is ranked without ever showing a score. It sorts internally, then throws the number away and shows only reasons in words — "5 of 5 must-haves in profile", "notice 90 days, cap 30". A test asserts no reason string can ever contain "score", "%" or "points", and anyone with zero must-have hits is dropped from the list rather than displayed as a weak match.',
      receipts: [demo('The Find screen shows reason chips and an order, and no number anywhere.')],
    },
    {
      lead: 'A candidate who has not consented cannot be sent to a client. Not “the button is greyed out” — there is no sequence of clicks in the entire app that gets there.',
      text: 'Consent is enforced inside the state machine, not on a button. The transition from draft to sent is refused outright when consent is absent, so no code path can send an unconsented profile. A candidate who withdraws consent from their own link disappears from the client\'s lineup and from the export.',
      receipts: [demo('The candidate link offers Confirm and Withdraw; withdrawing removes the person from the live lineup.')],
    },
    {
      lead: 'The AI suggests; a person confirms. Anything not yet confirmed wears a visible “proposed” tag, and the send button stays shut until a human has been through all of it.',
      text: 'An AI proposes the evidence rows; a human ticks every one before anything can be sent. Unconfirmed rows carry a visible "proposed" chip, and the send gate refuses while any remain. With no API key the model layer reports itself as off and the grid is filled in by hand — the app is fully usable either way.',
      receipts: [demo('Every AI-touched surface carries a mode badge naming which engine produced it, or that it is off.')],
    },
    {
      lead: 'You can delete a candidate completely — and it warns you, beforehand, that doing so breaks the seal on every shortlist they ever appeared in. Most tools hide that. It is simply what deleting someone honestly costs.',
      text: 'Erasure is implemented, and its consequence is stated out loud rather than hidden: erasing a candidate breaks the fingerprints on every lineup they appeared in. The interface says so. Breaking a seal is the honest outcome of deleting the thing it described.',
      receipts: [demo('The candidate sheet shows the DPDP erase control alongside what it will and will not undo.')],
    },
  ],
  figures: [
    { value: '8', label: 'pipeline stages, with exactly 14 legal transitions between them', receipts: [demo('The state machine is the spine of the product; every stage change is logged.')] },
    { value: '14', label: 'legal transitions — consent is checked inside the gate, not on the button', receipts: [demo('Sending without consent is refused at the function level.')] },
    { value: '64', unit: ' hex', label: 'the seal: a SHA-256 over exactly the fields the client is shown', receipts: [demo('Printed in full on every receipt page.')] },
    { value: '52', label: 'unit tests, plus a browser harness covering 28 screens at two widths', receipts: [demo('Every screen is captured at 1440px and 390px with no-console-error and no-horizontal-scroll assertions.')] },
    { value: '10', label: 'database tables, row-level security on every one, keyed per agency', receipts: [demo('Multi-tenant from the first migration rather than bolted on.')] },
    { value: '0', label: 'API keys required — with no secrets at all it still runs, and says so', receipts: [demo('Fixture mode renders every screen and disables writes behind a visible badge.')] },
  ],
  restraint: {
    text: 'I will not call this cryptographic proof, because it is not. The fingerprint is computed and stored by the agency\'s own server, so an operator with database access could alter a record and its hash together. What it actually buys you is that the agency cannot *quietly* change a profile after the client has seen it — which is the real-world problem — and the product\'s copy says exactly that and nothing more. The same discipline runs through the rest: the client link is a bearer token and the documentation calls it one rather than implying authentication, and the trust panel lists named checks instead of awarding a badge, with a test asserting the word "verified" never appears on it.',
    receipts: [demo('Read the lineup footer and the trust panel — both describe precisely what they do and do not establish.')],
  },
  stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind 4', 'Supabase Postgres', 'Row-level security', 'Server Actions', 'Groq (optional)', 'Vitest', 'Playwright'],
  shots: [
    { file: 'uruthi/lineup.jpg', alt: 'A printed-letterhead lineup page addressed to a hiring manager, showing a candidate profile table, trust lines, a rotated vermillion SEAL stamp with a hash, and evidence rows quoting the résumé line behind each requirement.', caption: 'What the hiring manager gets on WhatsApp. No login. Every must-have marked, every mark carrying the résumé line it came from, and a seal stamped across it.' },
    { file: 'uruthi/receipt.png', alt: 'A receipt page listing what it proves — time of introduction, consent, integrity, delivery — above an event log and a green line reading "Seal verified on this load", with the full SHA-256 printed beneath.', caption: 'The receipt recomputes the fingerprint every time it loads. If the record changed after sending, it says so rather than staying quiet.' },
    { file: 'uruthi/candidate.jpg', alt: 'A candidate record showing tracker fields with confirmation ticks, a sealed submission card, the full evidence grid, and a sidebar of named trust checks.', caption: 'The evidence grid, with a sidebar of named checks — consent tier, résumé-versus-tracker consistency, documents seen. Named checks, never a badge.' },
    { file: 'uruthi/join.jpg', alt: 'A public registration form for candidates, headed by a Digital Personal Data Protection Act notice, with a required consent checkbox.', caption: 'Candidates register themselves, with the DPDP notice and their own consent on record. The consent is the thing the whole pipeline is gated on.' },
    { file: 'uruthi/ledger.png', alt: 'The Uruthi ledger listing three placements with candidate, client, requirement, fee and payment status, two of them overdue, beside a panel computing that at an average offer of 18.8 lakh and an 8.33% fee, one extra placement every 3.1 months covers a fifty-thousand-rupee monthly subscription. A banner states every person and company shown is fictional and resets nightly.', caption: 'The ledger makes the agency’s own case back to it: at these numbers, one extra placement every 3.1 months pays for the whole subscription. Computed on their rows, never projected — and the sample data says out loud that it is fictional.' },
  ],
  limits: [
    'The repository is private, so the links here go to the running demo rather than to source. Everything in it is a fictional agency with fictional candidates, and it resets nightly.',
    'The seal is tamper-evident, not cryptographic proof: no private key, no third-party timestamp. The agency\'s own server computes and stores it.',
    'The client link is a bearer credential — whoever holds it can open it. The documentation calls it that rather than implying authentication.',
    'The model still occasionally grades a row Partial with a proof line that reads as Met, which is why a human confirms every row before anything is sealed.',
    'No real agency has used it. Every journey has been walked by a test or by me, not by a recruiter, and there are zero real placements behind it.',
    'Security is at a demo tier by design — no email verification, no two-factor. Before any real agency stores strangers\' résumés in it, that needs a proper audit.',
  ],
};
