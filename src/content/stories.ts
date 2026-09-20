/* ============================================================================
   THE STORIES.

   Every project gets an opening told the way I would tell it out loud: what I
   saw, what I tried, what broke, what I did about it. The technical detail
   still arrives — it just arrives after you already care.

   Rule: no sentence here states a capability that is not receipted further
   down its own page.
   ========================================================================== */

export const STORIES: Record<string, string[]> = {
  aaina: [
    `A friend sent me one of those relationship quizzes. It told her she was "78% compatible" with someone she
     had been with for two years. I went looking for where that number comes from and found the answer is:
     nowhere. In 2017 three researchers threw over a hundred measures at exactly this question across thousands
     of couples and found that the compatibility part — the bit that is about these two specific people —
     predicted almost none of the variance. The number on the screen is decoration.`,
    `So I built the version that refuses. Aaina will not score you. What it does instead is hold your own
     answers against each other and show you where they disagree. You say you are allowed to take up space; you
     also say your needs come after everyone else's. It does not resolve that for you — it puts both sentences
     next to each other, with the questions they came from, and lets you sit with it.`,
    `The hard part was not the psychology. It was stopping the language model from being charming. Ask any model
     for relationship feedback and it produces horoscope prose that people rate as *more* accurate the moment you
     tell them it was written for them. So the model in Aaina is not allowed to think. Every number, every
     contradiction, every verdict is computed in TypeScript first; the model receives a sealed bundle of that
     evidence and may only write the connective sentences — and any paragraph whose citations do not resolve is
     thrown away in three separate places on the way to your screen.`,
  ],

  braillix: [
    `A blind student learning maths has a problem nobody in the room can see. Mathematical braille is not the
     alphabet in dots — it is a whole grammar, where one cell means "a number starts here" in one position and
     "the fraction closes here" in another. If the translation is wrong, the teacher cannot tell, because they
     do not read braille. And the student cannot tell, because they have nothing to compare it to. The error
     just sits there being learned.`,
    `That is the failure I built everything around: not "be accurate", but "never be confidently wrong". So
     Braillix checks its own work by reading it backwards. A completely separate engine — sharing no code with
     the one that produced the dots — reconstructs what the dots say and compares it to what the teacher wrote.
     And when that reader hits a cell it has no rule for, it does not guess. It returns a third answer:
     unchecked. This comparison proves nothing. Most systems would have quietly called that a pass.`,
    `Then the constraints stacked up. The hardware team did not know yet how many braille cells their device
     would have, so I made it structurally impossible for any part of the software to assume a number — the
     build greps its own source and fails if a file hard-codes one. Student work cannot leave the room, so the
     whole thing runs offline in a browser, including a 76 MB vision model. And a teacher's line can mix
     three braille codes at once. I built it in a single fifty-one-hour run, including throwing the first
     version away halfway through.`,
  ],

  uruthi: [
    `Here is a problem software usually cannot touch. An Indian staffing agency sends candidates to a hiring
     manager who has never met them, will never log into the agency's tool, and has excellent reasons to be
     sceptical — this is a market with fake job postings that harvest résumés and people who send someone else
     to the interview. The agency says "this person has five years of Java". The manager thinks "sure you do".`,
    `You cannot fix that with a nicer dashboard. The only thing that moves it is making the claim checkable by
     a stranger, on a phone, in ten seconds, without an account. So Uruthi sends one link. On it, every
     requirement is marked Met, Partial or Not met — and each mark carries the exact line from the résumé it
     came from. A Met with nothing quoted behind it automatically downgrades itself to unverified. You cannot
     show a green tick with nothing under it.`,
    `Then I stamped it. When a lineup is sent, the app fingerprints exactly what the client will see, and the
     receipt page recomputes that fingerprint every time it loads — so if anything changed afterwards, the page
     says so out loud. I am careful about what that does and does not prove: there is no third party and no
     private key, so it is tamper-evident, not cryptographic. It means the agency cannot *quietly* change a
     profile after you have seen it. That is the actual problem, and I would rather describe it exactly than
     dress it up.`,
    `The part I am most pleased with is the ranking, because of what it does not have. It sorts candidates and
     then throws the score away. You get reasons in words — "5 of 5 must-haves in profile", "notice 90 days,
     cap 30" — and a test that fails if any reason string ever contains the word "score", a percentage or the
     word "points". Nobody can dismiss it as a black box, because there is no box.`,
  ],

  'sehat-saarthi': [
    `Punjab's health problem is not treatment, it is detection. Roughly half the specialist posts are empty and
     many rural clinics have no lab at all, so a generalist doctor sees a hundred patients a day and has to
     decide, from very little, who needs to travel to the district hospital. I wanted to build the thing that
     helps with that decision — for a health worker on a cheap Android, in Punjabi, over unreliable internet,
     for zero rupees.`,
    `I got nine models working. Chest X-ray, liver, diabetes, heart, breast, anaemia, skin — and two image
     models for Alzheimer's and diabetic retinopathy. Then I did something that I think matters more than any
     of the accuracy numbers: I opened my own live app and fed the Alzheimer's module an MRI of a completely
     healthy brain. It told me 80% dementia.`,
    `I deleted it that night. Both image models — including the Alzheimer's one, which was descended from the
     project that had won me a hackathon at IIT Ropar. The reason I wrote down is the thing I learned:
     <em>tabular models cannot be fooled by domain shift, because a glucose of 200 is 200 everywhere; image
     models can.</em> And I answered the obvious objection — why not just add a warning? — with why it does not
     work. A family still reads "80% dementia". For them, the number itself is the harm.`,
    `Everything else in it follows from that. The disclaimer is a required field on the response schema, not a
     UI convention. There is no language model anywhere near the medical text. If a model fails to load, it
     falls back to something deliberately meaningless and flags itself, so a broken deployment can never be
     mistaken for a working screening. And it is honest in writing that it over-flags — high recall bought with
     low specificity, which it tells the patient in Punjabi.`,
  ],

  jarvis: [
    `Tony Stark is the reason I started building things. Not the suit — the workshop. A man who could point
     himself at any problem and have something working by morning, because he had JARVIS holding the whole thing
     in its head while he did the thinking. I have wanted that since I was a kid. So in September I stopped
     admiring it and built one.`,
    `The first version was bad in an instructive way. I said "open youtube and play stand up video" and it tried
     to launch an application literally called <em>youtube and play stand up video</em>. I said "movie scene by
     karan aujla" and it typed that into Spotify's search box instead of finding the song already sitting in my
     library. Both failures had the same cause: the thing had <em>captured</em> my words instead of
     <em>looking them up</em>.`,
    `And underneath that was a worse problem. Every assistant puts a model in the hot path. I measured it on my
     own laptop: one cold model turn takes twenty-three seconds. Nothing you say after a twenty-three second
     pause sounds intelligent, no matter how clever the answer is. Speed is not a nice-to-have here — speed
     <em>is</em> the intelligence.`,
    `So I rebuilt it in three layers, each only handing upward what it genuinely cannot do. The bottom layer is
     pure code with no model anywhere near it: it takes your sentence, splits it into clauses, and looks each
     target up against a live catalogue of every app, folder, setting and site actually on the machine. Because
     it looks things up, a target can never swallow the rest of the sentence. Worst case across five thousand
     test sentences: twelve and a half milliseconds. Median: under one.`,
    `The middle layer is where it learns. Ask for something it cannot do and a model writes a recipe — but only
     out of forty-three verified building blocks, never raw shell commands. The recipe runs, the machine checks
     the thing actually happened, and only a recipe that <em>verified</em> gets saved. Ask again tomorrow and it
     replays as plain code, no model, no network. It genuinely gets faster the more you use it.`,
    `Two details I am quietly proud of. It speaks Hinglish as a first language — "youtube kholo aur stand up
     comedy chalao" resolves exactly like the English, because verbs are matched anywhere in a clause rather than
     assumed to sit at the front. And it can drive apps nobody wrote support for, by reading the window's own
     accessibility tree and clicking controls by name. Word, Discord, VS Code, Settings — no code per app.`,
    `The hardest engineering was the ears. A laptop that listens all the time hears its own speakers, so I feed
     what the machine is playing back in as a reference and subtract it from the microphone before anything
     downstream hears a thing — twelve decibels of my own audio removed, for two milliseconds of CPU per tenth
     of a second. And it learns my voice from how I already use it, switching on only once six clips agree, and
     built so it can never lock me out of my own computer.`,
  ],

  reckoner: [
    `Every analytics tool you have ever used will answer you. That is the problem with all of them.`,
    `I pointed one at a real retailer's ledger — a million transaction lines — and asked the most ordinary
     question in business: what happened to revenue last month. It said revenue fell 57.6%. That number is
     arithmetically perfect. It is also completely wrong, and no dashboard on earth would have told me so.`,
    `It is wrong because "last month" in that file is nine days long. The data stops on the ninth. Comparing nine
     days against a full month measures the calendar, not the company. Somewhere right now a real person is
     walking into a real board meeting with exactly that number, because the query was correct and the data was
     correct and nothing in between was paid to be sceptical.`,
    `So I built the thing that is paid to be sceptical. Reckoner computes that same −57.6% — and then
     <em>refuses to publish it</em>. It checks whether the two periods are even comparable before it attempts
     any explanation, and when they are not it says so, shows you the day counts, and proposes the comparison you
     should have asked for instead: November against November, one year apart, both complete, seasonality held
     constant. One period out of twenty-five fails that gate — and it is the one everybody would have reported.`,
    `The honest answer turns out to be plus 2.7%. Which is also not the finding, because "roughly flat" is a
     disguise. Underneath it, four hundred and eighty-four thousand pounds of brand-new products is being eaten alive by
     two hundred and forty-five thousand of lost volume, a hundred and thirty-eight of mix and a hundred and
     thirty-five of lines that were discontinued. So it breaks
     the movement into named pieces — volume, price, mix, new products, discontinued — and the pieces add back up
     to the totals exactly. That is the sentence a CEO actually needs: not "we are flat", but "we are flat
     because a new range is carrying a shrinking old one".`,
    `Two things I insisted on. The data-quality check runs <em>first</em>, before any finding, not as a footnote
     underneath one — because if your file is wrong this will faithfully explain a wrong number, and you need to
     know that before you read the answer. And a million rows never leave your laptop; the whole thing runs in
     the browser, no server, no upload, no account. If you want to point a tool at a real ledger without emailing
     it to a vendor, that is the entire ballgame.`,
  ],

  gloaming: [
    `I wanted to make a co-op horror board game where the board itself is the enemy — no human running the
     monster, the game running it. I got it working. Every rule fired correctly, the numbers went up and down
     exactly as designed, and it was completely unfrightening. It played, as I wrote at the time, like a
     spreadsheet in a horror skin.`,
    `So I threw it out and rebuilt it on one rule: <em>if a mechanic is a hidden number doing arithmetic,
     replace it with a thing that visibly moves, grows, shrinks or gets eaten.</em> The night meter became tiles
     actually turning to void from the outside in. The currency became a torch that burns down, and at zero you
     become a drifting wisp. Progress became three lanterns you physically carry — and drop where you fall.`,
    `Then I had to prove the game was worth playing well, which is a harder question than whether it works. So
     I wrote a smart bot that reads the monster's telegraphed route and protects whoever is carrying a lantern,
     and a greedy bot that just grabs, and played them against each other on identical seeded games so the only
     variable was decisions. The first run came back flat — skill was not paying. That result changed the
     design: the torch went from eight to seven, and stepping on frayed ground went from costing one to costing
     two. Now a skilled bot scores sixteen points higher than a greedy one over the same seeded games, and I can
     show you the number.`,
  ],
};
