# SoundSteak — Master Plan

**Part 4 of 10: The Contextual Data Engine, Profiles, Fan Economy & Marketplaces**

[← Full index](00-index.md)

---

## The Contextual Data Engine

Every other music catalog is a horizontal slice: many songs, minimal context per song. Waveform, streaming metadata, and whatever sparse information made it onto a liner note or a Spotify artist bio. The audio exists. The meaning behind it does not.

SoundSteak builds something categorically different: a **vertical core sample** through each release — every layer from first idea to post-release market behavior, with the artist's own voice narrating the journey in real time. The recording is the least interesting thing in the dataset. What surrounds it is what no competitor can replicate.

This is not a data product bolted onto a label. It is a label whose operating structure produces a data product by default — because the signing process, the documentation pipeline, the milestone framework, and the artist relationship all generate context that has commercial value independent of the music itself.

### Why Stolen Catalogs Can Never Compete

AI companies training on scraped music get the audio. They do not get:

- Why the song was written or what it is actually about
- What the artist borrowed from their influences and what they deliberately rejected
- What emotional register the artist was aiming for and whether they feel they achieved it
- The chord progression, the song structure, the tuning, the arrangement decisions
- How the lyrics changed between first draft and final recording — and why
- Who played what, where, on what gear, in what room
- The production references the artist handed to their engineer
- How the audience responded, where they discovered it, where they dropped off, what they shared
- What the sync placement was used for and what scene it was matched to

Every one of those data points exists inside SoundSteak's operating pipeline. Not as a separate data collection effort — as a natural output of running a label properly. The artist relationship, the signing contract, the year-long milestone documentation, and the platform's own Voice Layer all produce this context continuously. It does not cost anything extra to capture. It costs nothing to structure. It is simply the exhaust of doing this well.

A competitor building a music catalog to rival this would have to go back to every artist they ever worked with and ask them to reconstruct their creative process from memory. SoundSteak captures it at the moment it exists.

### The Three-Layer Context Engine

**Layer 1 — Profile Tasks with Compensation**

Contextual data requests surface on the artist's dashboard as completable tasks — exactly like milestones. Each task has a label, a plain-language prompt, a response format (text, voice note, or AI interview), and a payout drawn from the context fund.

The artist sees tasks like:

> **"Describe your drum arrangement"** — Walk us through the percussion on this track. What is the kick pattern doing? What did you leave out on purpose? → *$12.00 from the context fund*

> **"Annotate your bridge"** — What is the bridge doing emotionally that the verse and chorus don't? Why did this section need to exist? → *$8.00*

> **"Your primary influence on this song"** — Name one artist whose work directly shaped how you approached this single. Describe specifically what you borrowed from them. → *$6.00*

> **"Where were you when you wrote this?"** — Not just geography. What was the environment, the time of day, the emotional state. → *$5.00*

> **"Production reference"** — What song did you tell your producer to make this feel like, and what specifically were you pointing at — the tonal quality, the arrangement, the vocal treatment, the space? → *$7.00*

> **"Lyric intent"** — Pick one line from the chorus and explain what it means to you. Is it autobiographical, narrative, or metaphorical? → *$5.00*

The **context fund** is a ring-fenced portion of developer console revenue — the commercial users of the data fund the collection of it. The more the console earns, the more tasks get funded. Artists who complete more tasks have richer profiles that command higher per-use rates in the console. SteakHolders have a direct financial interest in their artist completing every task — richer context means higher licensing revenue flowing through the LLC. The incentive is completely self-reinforcing.

Uncompleted tasks stay on the dashboard indefinitely. They do not expire. An artist who completes a task two years after the release still enriches the catalog and still gets paid for it. The profile is never finished. It just keeps getting richer.

**Layer 2 — The AI Interview**

Not every artist thinks in structured fields. A prompt like "describe your chord progression" produces a blank stare from half the musicians alive. The AI interview solves this.

Instead of forms, the platform hands the artist to a conversational AI — potentially the same AI partner whose data needs shaped the questions being asked — that conducts the interview the way a skilled music journalist would. The artist talks. The AI listens, asks follow-ups, and extracts structured data from natural conversation.

> *"Tell me about the chord progression in the chorus — I'm hearing something unusual in the second chord. What were you going for there?"*

> *"You mentioned the song is about your father. Is that explicit in the lyrics or more of a feeling underneath them?"*

> *"You said the production reference was Phoebe Bridgers. Was it the tonal quality, the sparse arrangement, the vocal treatment, or something else?"*

> *"What did you leave out of this song that you almost kept?"*

The output is not a transcript. It is structured, tagged, queryable data — genre markers, emotional descriptors, production notes, lyrical annotations, influence relationships — extracted from natural conversation and mapped to profile fields automatically. The artist never sees a spreadsheet. They just had a conversation about something they care about deeply.

This is a natural extension of the Voice Layer already at the core of the platform. The platform's conversational intelligence already knows who every artist is, where they are in their journey, what their release looks like, and what their SteakHolders need to know. Turning that same interface toward contextual data collection is a mode, not a new system.

**If an AI company is the engine running these interviews** — optimized to extract exactly the data fields their training pipeline needs, structured in the format their models consume — the partnership stops being a licensing deal and becomes a product collaboration. The AI partner shapes the questions. The platform delivers the answers. The catalog that results is the most AI-native music dataset in existence, built from the ground up in collaboration with the company that will use it.

**Layer 3 — "Need More Context" in the Developer Console**

Described in the developer console section above. The key implication for the data engine:

Every context request answered becomes a permanent addition to the profile. The catalog grows smarter over time based on what the market actually needs to know — not what someone predicted at intake. Demand drives enrichment. The most commercially valuable questions get asked first, funded by the people who need the answers. The catalog's intelligence compounds automatically.

### What the Full Data Profile Looks Like Per Release

**At application:**
- Live performance video — unproduced, timestamped, the song before any label involvement
- Self-declared genre and subgenre
- Geographic origin and scene
- Career stage and audience size
- Their story in their own words — application text as submitted

**At signing:**
- BPM, key, time signature
- Song structure with emotional annotation per section
- Chord progression (optional but captured if provided)
- Full lyrics at signing date — the song as it existed the day the contract was signed
- Lyrical metadata: themes, point of view, tense, language, autobiographical vs. narrative
- Three to five influence declarations with artist explanation of what was borrowed from each
- One reference track with a specific note on what was being pointed at
- Production references handed to the engineer
- Intended instrumentation and sonic character
- Intended audience description in the artist's own words
- Intended emotional register and target response
- Life context at time of writing — opt-in, anonymized for non-consenting use
- World context timestamp — what was happening culturally when the song was written
- AI licensing preference with specific use-case permissions and restrictions

**During the recording year:**
- Demo recording — the song before production begins
- Artist notes on the demo: what is placeholder, what is intentional, what might change
- Milestone checkpoint notes — a paragraph at each documented milestone describing what happened and what changed
- Lyric revision log — final lyrics with a diff against the signing-day version and a note on what changed and why
- Stem library on completion: drums, bass, guitar/keys, lead vocal, backing vocals, additional elements — labeled and documented
- Production credits: recording engineer, mixing engineer, mastering engineer, session players with specific contributions, producer with role distinction, studio name and location
- Equipment and software notes (optional — for producers who document this)
- Cover art final file + brief — what the artist asked for and what inspired the visual direction
- Music video metadata if produced — director, location, visual themes, color direction

**At release and post-release:**
- Stream curves — how engagement built, peaked, and settled
- Geographic breakdown — where the music landed vs. where the artist is from
- Listener retention data — where in the song attention peaks, drops, or replays
- Platform breakdown — how audience behavior differed across DSPs
- Attribution chain — what drove discovery (influencer, fan share, press, organic)
- Fan pledge timing — who backed it early vs. late
- Sync placement metadata — what the music was licensed for, what mood or scene it was matched to
- AI console usage — which use cases consumed this track and at what volume
- Revenue source evolution — how the income mix changed as the release aged

### What This Means for an AI Company

A frontier AI lab building music-aware models — for composition assistance, lyric generation, mood matching, voice protection, style transfer, or training data — needs two things that no existing catalog provides together: **legal certainty** and **contextual depth**.

Legal certainty: every SoundSteak release has documented ownership, registered rights, and artist-defined licensing terms built into the contract. There is no dispute about who owns what or whether a use is permitted. The catalog is the only licensed music dataset at scale where provenance is structural, not assembled retroactively.

Contextual depth: the data profile per release is orders of magnitude richer than anything available from streaming metadata, liner notes, or web scraping. The model doesn't just know how the music sounds. It knows what decisions produced it, why those decisions were made, and how the audience responded. That produces better outputs because the model understands creativity — not just acoustics.

For sync matching tools, this is the ground truth that makes models accurate.
For lyric generation models, this is the annotated corpus that teaches emotional register.
For style transfer tools, this is the stem library with documented provenance.
For music intelligence applications, this is the only dataset where the artist's own voice is part of the record.

**The partnership play:** A frontier AI lab engaged as a platform partner in Year 1 helps design the intake questionnaire, the AI interview format, and the profile data schema — optimizing the architecture for what their models actually need, before the first artist is signed. In exchange, they get preferred console access, a co-development relationship, and optionally an equity position in the platform. They become the engine running the AI interviews. The catalog that results is the most AI-native, most contextually rich, most legally clean music dataset ever assembled — and they helped build it.

This is not a feature the music industry is missing. This is a category that does not exist yet. SoundSteak is not disrupting the music industry. It is building the infrastructure the modern music industry will run on.

### The Compounding Moat

Every artist signed deepens the catalog. Every task completed enriches it. Every console request answered grows it. Every AI interview conducted structures it further. Every sync placement, stream curve, and attribution data point adds a layer of post-release intelligence that no competitor can access without the same artist relationship and documentation pipeline.

The catalog is not a fixed asset. It is an appreciating one. And unlike most appreciating assets, it appreciates faster the more it is used — because every use generates feedback, attribution data, and console requests that make the next use more valuable.

Year 3 of a SoundSteak release is worth more than Year 1 — not because the music got better, but because the world spent two years telling the platform what the music means to them, and the platform captured every word of it.

---

### Distribution Logic
Every dollar that enters the system is automatically split according to:
1. Platform operating percentage
2. Artist retained ownership percentage
3. Founding equity holders (pledge round) — their cut
4. Product investors (investment round, per product) — their dividends
5. Individual band member splits (locked at onboarding) — each person's cut, paid directly

### Tax Handling
The platform pays individuals directly, making it the **payer of record**. This means the platform generates **1099s automatically** at year end for every person who earns above the IRS threshold. Most artists dread tax season because their income is fragmented across dozens of sources with no documentation. This platform consolidates everything and handles the paperwork automatically. That's a feature, not a burden — and a significant part of the artist protection story.

---

## The Flywheel — Why the Platform Grows Itself

Every action inside the platform pulls someone new into it. You cannot participate from the outside. You cannot be voted on, hired, paid, or collaborated with without a profile. Joining is not optional if you want to be part of what's happening.

**The loop:**
Shareholders vote on a producer → producer gets invited → producer joins to accept the work → producer's network discovers the platform → more artists, more investors, more votes, more invites → repeat.

The value of being inside grows every time someone new joins. The cost of staying outside grows at the same rate. This is the core growth engine — not advertising.

### The Invite as a Product Feature
When someone is nominated in a shareholder vote, they receive a notification: *"Your name came up in a shareholder vote for [Artist]. Here's what that means and how to join."* That is one of the most compelling cold invites in the industry. It signals reputation, demand, and opportunity — not just another signup request.

---

## Individual Profile Architecture

Every person on the platform — not every band — is the atomic unit. Money never pools inside a band account. It flows directly from the revenue source to each individual simultaneously.

### Who Gets a Profile
- Every band member
- Session musicians documented on a recording
- Producers and engineers with an agreed stake
- Co-writers with publishing splits
- Solo artists
- Venue owners, show organizers, studio owners
- Investors
- Fans

### Profile Types Are Tags, Not Boxes
A person is not one thing. The studio owner is also a session bassist. The producer also engineers. The artist also co-writes for other acts. Profiles carry a **tag system** representing every capacity a person operates in — not a locked single role.

**Role tags (any combination):**
- Artist (band member, solo act)
- Session musician (instrument sub-tags: bass, drums, keys, guitar, etc.)
- Producer
- Engineer (mixing, mastering, live sound)
- Songwriter / co-writer
- Music video director
- Photographer
- Venue owner
- Show organizer
- Recording studio owner / operator
- Investor
- Fan

**Searchability:** Every tag makes a person discoverable in that category. A studio owner who is also a session bassist appears in searches for recording studios AND searches for session bassists. Shareholders voting on who to hire can filter and browse by any tag combination.

**Verification layer:** Tags become verifiable over time through credited platform projects, collaborator reviews, and documented work history. A producer with five successful platform projects carries visible, system-generated proof of track record — not self-reported, recorded as it happened. This builds a reputation economy inside the platform and eventually makes platform credits the industry's de facto credential.

### What Each Profile Contains
- Personal identity and verification — including a profile photo. Every person on the platform has a face. Artists, fans, engineers, investors — no one is anonymous. The photo is identity, not a credential, and is not subject to verification. It is the one thing a profile holder supplies freely.
- Individual payment method (direct deposit, ACH, etc.)
- Personal earnings dashboard — real-time revenue across all projects
- Ownership documentation — every stake held, in every band, on every product
- Verified credits — automatically generated from platform projects
- Tax information — 1099 generation handled by platform
- **AI context data** (artist profiles) — themes, influences, mood, instrumentation, geographic origin, audience descriptor, production notes added throughout the release year. This data is the source of SoundSteak's developer console advantage and is never surfaced to AI systems without the artist's documented consent.

### Why This Matters
- A member leaving a band does not freeze anyone's money — their profile continues receiving their documented cut of everything recorded while they were a member
- No one has to ask for their cut — it arrives automatically
- No one person controls the band's money
- Eliminates the single most common source of band conflict and legal disputes
- Session players and collaborators are protected the same as full members

**The principle:** The band entity exists as a legal and creative wrapper. Money never lives inside it. It is a pass-through only.

---

## The Fake Fan Economy — and Why SoundSteak Ends It

The music industry's social proof problem is not a bug. It's an ecosystem.

Bot farms. Purchased followers. Streaming fraud. Label-funded fake plays. Coordinated listener manipulation that inflates numbers to trigger algorithmic promotion. An influencer industry where six-figure follower counts are for sale on a dozen websites and the buyers are operating in plain sight. This is the rational endpoint of any system that made quantity the only measurable signal and then attached career outcomes to that signal. When you can't verify who's real, you optimize for numbers. And numbers get gamed.

The platforms know. The labels know. The industry knows. Nobody has fixed it because the fake economy is profitable — it sells services, it moves product, it creates the illusion of demand that funds the next round of promotion spend. The incentives to maintain the fiction are stronger than the incentives to dismantle it.

**SoundSteak doesn't fix this through moderation. It makes fakery architecturally impossible.**

Every person on the platform has a verified identity tied to a real payment method. Every pledge is a real dollar from a real person making a real economic decision. Every Founding SteakHolder badge was earned by showing up before the gong rang — a moment in time that cannot be retroactively manufactured. Every review was extracted from a real conversation, consent-approved, and carries the full documented history of who said it and why they were in a position to say it.

You cannot bot-farm a $1 pledge from a verified identity. You cannot purchase Founding SteakHolder #23. You cannot manufacture provenance.

**300 real fans vs. 300,000 fake ones:**

Three hundred people who pledged real money, hold a real stake, have a documented relationship to the artist, and have shown up through every stage of the release are not comparable to three hundred thousand bot accounts inflating a stream count. They are a different category of thing entirely. The first group can be mobilized, attributed, converted, and grown. The second group is noise that costs money to generate and produces nothing real.

SoundSteak's fan base is small by design in the early stages. It is also the most verifiably real fan base any independent artist has ever had. Every number on the platform means something. Every signal is a person. Every badge is a documented moment that actually happened.

That is a competitive advantage that a streaming platform with a billion users cannot replicate — because scale and verification are in fundamental tension. The bigger the platform, the harder it is to know who's real. SoundSteak is built from the ground up to know exactly who is real, always.

---

## Band Member Protection

- Band agreement required before any raise opens — no exceptions
- Documents: each member's ownership percentage, IP ownership splits, what happens if a member leaves, buyout clauses
- Platform-standard template reviewed once by music attorney — cost amortized across all artists, free to each individual band
- Agreement is locked on the platform and visible to all investors
- Protects members from being cut out; protects investors from band disputes destroying their investment

---

## The Professional Ecosystem Marketplace

Five signed artists per cohort means five simultaneous sets of open professional needs — recording studio, engineer, mixing, mastering, photographer, music video director, graphic designer, and more. Every cohort year activates the entire professional ecosystem to compete for those opportunities.

### The Call to Action
The moment five artists are signed, the platform surfaces a public prompt to every professional in the music industry:

*"Five artists just signed their first recording contracts. They need a studio. They need an engineer. They need a photographer. They need a director. Start your profile today and let them — and their investors — know why it should be you."*

This message goes to every existing platform member and gets shared publicly into the music community. It is a real opportunity with real funded artists behind it. It recruits professionals without the platform making a single cold call.

### Why Professionals Compete Differently Here
Shareholders vote on who the artists work with. That changes the professional pitch entirely. It is not "hire me" — it is "here's why your investment performs better if you choose me." Professionals are making their case to a community of investors who have financial skin in the outcome. That accountability raises the quality of every pitch and every delivery.

### The Compounding Credential
A studio that wins the work from a SoundSteak artist earns a verified platform credit. If that artist's single performs well, that credit compounds in value publicly. The studio that recorded the breakthrough artist of the cohort has a credential no resume can replicate — documented, public, and tied to real performance data that everyone can see.

### Self-Populating by Design
The platform does not recruit studios and engineers cold. The existence of five funded, investor-backed artists with open needs does the recruiting automatically. Every cohort year brings a new wave of professionals onto the platform. Every professional who joins to pitch one cohort is in the system permanently — visible to future cohorts, discoverable by existing artists, building reputation over time.

### Services-for-Equity Arrangements

Some professionals — recording studios, mastering engineers, mixing engineers, videographers, photographers — may be willing to take a percentage of the release LLC instead of an upfront cash payment. This is a standard arrangement in early-stage industries (common in tech, film, and independent production) and fits cleanly into the SoundSteak structure. The LLC already exists to receive equity investment. The professional's contribution is just a different form of consideration: labor and expertise instead of cash.

**Why this matters to both sides:**

For artists with limited cash: top-quality collaborators become accessible without requiring the raise to fully fund every service upfront. The recording doesn't have to wait until every dollar is raised.

For professionals: they gain a stake in the music's long-term success — streams, sync, live, AI licensing, all of it. A mastering engineer who took 1.5% of a single that eventually places in a major sync is earning from that decision for years. Their work and their upside are permanently linked.

**How it works mechanically:**

1. The professional lists their services-for-equity availability on their profile — an opt-in signal that they're open to the arrangement.
2. The artist browses professionals who have opted in and initiates a negotiation Cue — the platform sends the professional an offer specifying the percentage proposed in exchange for their service.
3. The professional accepts, declines, or counter-proposes. If they counter, the Cue loop continues. If agreement isn't reached, the platform surfaces a mediation workflow — the same kind used for band split disputes.
4. Once both parties agree, each signs through their profiles via the platform's Cue system. No separate email chain. No external contract wrangling.
5. The LLC issues the professional their equity stake. It appears on their profile the same way cash-backed stakes appear for SteakHolders.

**What their profile shows:**

Their SoundSteak profile is the only place in the industry where a collaborator's credit and their investment stake appear in the same verified record. "I mixed this record" and "I own 1.5% of what it earns" are the same entry. The platform documents both at the same moment because they're the same transaction.

**Profile dual-role:**

These professionals are simultaneously a credited collaborator and a SteakHolder. Their role tags reflect both capacities. They appear in searches for mixing engineers AND as an investor in that artist's release. Their earnings dashboard shows service income from other projects alongside equity income from this one.

**The alignment effect:**

A videographer who owns 2% of the release LLC has a different relationship to the music video they're about to shoot than one who gets paid flat and moves on. Professionals with a stake in the outcome work differently. SoundSteak makes that alignment contractual and automatic — not dependent on personal goodwill or side agreements that don't survive a business relationship changing.

**Legal note — requires review:**

Services-for-equity is not a cash investment and likely falls outside Reg CF. The mechanism for issuing equity to a professional in exchange for services (valuation of services, LLC unit issuance, tax treatment for both parties) needs legal guidance. The platform should have a standard template for this arrangement — similar to the template operating agreement — reviewed by a music and startup attorney before offering it. Key questions: how are the services valued? Is the equity a separate class from cash investor equity, or the same class? What are the 1099 or W-2 implications for the professional? These are solvable but must be defined before the arrangement goes live.

### Open Questions — Professional Marketplace
- [ ] Is there a vetting or minimum standard for professionals listing on the platform?
- [ ] Can professionals be rated or reviewed after a project completes?
- [ ] Does the platform take a transaction fee on professional services booked through it?
- [ ] Are there preferred partner tiers for studios and professionals with strong track records?
- [ ] Services-for-equity legal framework: how are services valued, what class of equity, tax implications for the professional?
- [ ] Does the platform facilitate the negotiation Cue loop, or only the final signing?
- [ ] Can a professional take a hybrid arrangement — partial cash, partial equity?

---

## The Influencer & Promotion Marketplace

The music industry has always run on word of mouth. The person who told their friends about a band before anyone knew them, who shared the link, who brought people to the show — they are the reason careers happen. The platform has never paid them for it. SoundSteak does.

### The Core Idea
Any person with a profile can become a documented participant in an artist's success. When their promotion leads to a measurable outcome — a stream, a pledge, a ticket sale, a merch purchase — the system tracks the attribution and pays them their cut. Automatically. Through their profile. The same way it pays everyone else.

This is not an affiliate program bolted on as an afterthought. It is the same payment architecture that protects the bassist extended to the person who shared the song. The principle does not change. The participant type does.

### Who This Covers

**Everyone with a profile. No exceptions. No tiers.**

The system does not distinguish between a fan with 80 followers and an influencer with 800,000. The payment architecture is identical. If you have a profile, you have a trackable referral link. If that link drives a measurable outcome — a stream, a pledge, an investment, a ticket sale, a merch purchase, a new signup — the system records it and pays you for it. Automatically. At whatever value has been assigned to that outcome. The same flow, the same speed, the same dashboard whether you are a teenager who shared a song or a curator with a playlist of 200,000 people.

There is no influencer program to apply for. There is no fan tier that earns less. The only variable is what you drove — the system measures outcomes, not status.

**Everyday fans**
A fan with 80 followers posts about an artist they believe in. Three of their followers click through, listen, and pledge. The system tracks the chain. The fan earns a documented cut of those pledges. Not a thank-you. A payment. Through their profile. On their dashboard.

**Influencers and content creators**
A creator who makes a video featuring an artist's music and drives measurable outcomes earns attribution for exactly what they moved. A TikTok creator whose video uses a signed artist's sound and causes it to go viral is part of the story — and gets paid like it. Their profile accumulates a verified track record of what they've driven — documented outcomes, not follower counts.

**Music bloggers, playlist curators, and tastemakers**
A playlist curator whose playlist drives streams earns a documented cut of those streams. A music blogger whose review drives pledges earns attribution on those pledges. Same system. Same flow. The credential they build on the platform is more valuable than any follower count — because it shows what they actually moved.

**Show promoters and local bookers**
A promoter who puts together a show for a signed artist earns their percentage through the platform. Documented, automatic, transparent. No more chasing the artist after the fact hoping the check arrives. The deal is in the system before the show happens. The payment clears when the ticket revenue flows in.

**The only requirement is a profile and a trackable action.** What you call yourself is irrelevant to the system. What you drove is everything.

**Advertising revenue sharing — distributed equally across the ecosystem**
The platform runs ads. That revenue does not disappear into the platform's operating account. It is shared across the entire ecosystem of active participants — artists, investors, fans, promoters, influencers, professionals — based on their contribution to platform activity. The fan who shared the content that brought the viewer who saw the ad participates in the revenue that ad generated. The engineer whose credit on a popular recording drives profile traffic earns from the ad impressions that traffic generates. The curator whose playlist recommendation brought a new investor to the platform earns from the activity that followed.

This is a model YouTube gestured toward and never fully delivered. SoundSteak builds it as a foundational, default revenue layer — not a separate creator program you have to apply for. If you have a profile and you are active, you participate. That is the policy. The cut flows automatically through the same payment architecture that handles everything else.

The equal sharing of ad revenue is also a statement: the platform does not hoard the upside of its own growth. As the platform gets more valuable — more artists, more investors, more activity, more ad inventory — that value distributes outward to every participant who helped build it. The people who were here early and helped grow the community share in what that community became worth.

### The Influencer Marketplace
Inside the platform, artists can browse and engage influencers and promoters directly. Profiles show verified track records — not follower counts, not self-reported reach, but documented attribution data. This influencer drove 3,200 streams for a similar artist in this cohort. This promoter sold out two shows in this market. This curator has placed five songs that went on to reach 100K streams within 60 days.

Real data. Public. Verified by the system that tracked the outcomes.

Artists and their investors can vote on which promoters and influencers to engage — the same governance model that applies to creative collaborators. SteakHolders have skin in the marketing outcomes too. Their input on who carries the message is legitimate and valuable.

Deals are proposed inside the platform, accepted inside the platform, tracked inside the platform, and paid inside the platform. No DMs, no handshakes, no invoices that may or may not get paid. A documented deal and an automatic payment when the outcome is delivered.

### Why This Expands the Flywheel Dramatically
Every previous flywheel mechanism pulls people in because they want to participate. This one pulls people in because they want to *earn*. That is a different and more powerful motivator.

A fan who shares a link because they love the band is an advocate. A fan who shares a link because they love the band *and get paid when it works* is an advocate with compounding financial incentive. They check their dashboard. They see their attribution earnings. They share again. They tell their friends the platform pays them to do what they were already doing.

The music industry has never offered regular people a transparent, documented, automatic payment for the role they actually play in building careers. SoundSteak does. That changes everything about who joins, why they stay, and how hard they work on behalf of the artists they believe in.

### Open Questions — Influencer & Promotion Marketplace
- [ ] What is the attribution model — last click, first click, weighted chain?
- [ ] What is the minimum payout threshold to keep transaction costs manageable?
- [ ] How is fraudulent attribution detected — click farms, self-referral loops?
- [ ] What percentage of ad revenue is distributed back to participants vs. platform operations?
- [ ] Are influencer deals subject to the same governance voting as creative collaborators?
- [ ] How are deals structured — flat fee, performance-based, or hybrid?
- [ ] Does the influencer marketplace extend to non-music content creators or stay music-native?

---

## The Beat Marketplace

An internal marketplace where producers list beats for sale or license and vocalists or artists purchase them — all inside the system. Every transaction is tracked, every revenue share is documented and automatically routed, and every party involved is already a platform member.

**Why this exists:**
- Solves the revenue leak problem for vocalists buying outside beats
- Keeps producers inside the ecosystem as active members
- Every beat transaction is a new investment in a platform relationship
- Generates platform transaction revenue
- Connects the producer flywheel — a producer whose beat gets purchased by a signed artist gains visibility and reputation inside the system

**How it works:**
- Producer lists a beat — sale price, license terms, revenue share percentage if applicable
- Artist browses, previews, purchases or licenses inside the platform
- If revenue share is part of the deal, the producer's profile is automatically linked to the recording
- When the single earns, the producer's cut routes automatically alongside every other stakeholder
- No outside paperwork, no leaking revenue, no trust required — the system handles it

**Beat types available:**
- **Outright sale** — artist owns the beat fully, producer receives one payment, no ongoing stake
- **Non-exclusive license** — producer can sell to multiple artists, artist pays a license fee, defined revenue share
- **Exclusive license** — artist gets exclusive use, higher price, defined revenue share
- **Co-production** — producer and artist split ownership of the finished recording, both have stakes

**The producer incentive:**
A producer whose beats consistently get picked up by successful artists builds a verified track record inside the platform. Their profile shows every placement, every recording, every earnings stream from every beat they've ever sold on the platform. That reputation compounds over time and makes their future beats more valuable. The platform becomes the producer's portfolio and their primary marketplace simultaneously.

---

## Gamification & Badge System

Every badge on the platform is a documented, system-verified achievement. Nobody can fake it, buy it, or self-report it. In an industry full of inflated resumes and unverifiable claims, a SoundSteak badge means something real happened and the platform witnessed it.

### Artist Badges
- **First Single** — first platform release completed
- **10K / 100K / 1M Streams** — streaming milestone on a platform single
- **Fully Funded** — investment raise hit its target
- **Runaway** — fastest growing artist in their cohort year
- **Sold Out** — first sold out show
- **Sync Placement** — song placed in film, TV, or advertising
- **Playlist Hit** — placed on a playlist above a defined size threshold
- **Cohort Graduate** — completed the full year journey
- **Multi-Cohort** — released a second single on the platform
- **Fan Favorite** — won the community vote in their cohort year

### Investor Badges
- **First Believer** — one of the first ten to pledge on an artist
- **Early Adopter** — invested before an artist hit a major milestone
- **Platinum Backer** — invested in an artist whose single hit platinum
- **Portfolio Builder** — invested in 10 / 25 / 50 / 100 artists
- **Streak** — backed an artist in every cohort since joining
- **Sharp Ear** — backed three artists who became top performers in their cohort
- **Community Voice** — responded to over 50 Cues
- **Gong Ringer** — was chosen to ring the gong at the annual event (one per cohort — legendary rarity)

### Professional Badges
- **Verified** — completed first platform project
- **Platinum Studio / Engineer / Director** — worked on a single that hit platinum
- **Five Star** — received top ratings from five different artists
- **In Demand** — booked by artists from three different cohorts
- **Producer of the Year** — cohort award winner
- **Collab Champion** — most voted for collaborator in a cohort year

### Fan Badges
- **True Believer** — pledged on an artist before they made the final five
- **Day One** — among the first 100 members on the platform
- **Super Fan** — attended the annual event in person
- **Vote Counted** — participated in a live showcase vote that determined a winner

### Cohort Badges
Every participant in every cohort year receives a year-specific badge — Class of 2027 Artist, Class of 2027 Investor, Class of 2027 Studio Partner. These become collectibles over time. Being Class of 2027 in year ten means you were there at the beginning. That has value that only grows.

### The Mechanics That Make It Compelling

**Progress bars** — every badge shows visible progress toward it. An investor who has backed 87 artists sees exactly how close they are to the 100 badge. That bar motivates three more investments.

**Badge rarity tiers** — common, rare, and legendary. The Gong Ringer badge will exist for exactly one person per cohort year. That scarcity makes it meaningful in a way that common badges never can be.

**Badge display** — profiles surface badges prominently, most prestigious first. An investor evaluating a studio can see at a glance whether they have a platinum credit or just created their profile.

**Leaderboards** — top investors by portfolio size, top studios by platinum credits, most active governance participants. Public and real-time. Feeds the competitive instinct without requiring anyone to lose.

**Badge moments as marketing** — every significant badge earned is a shareable moment. "You just became one of 23 people with the Platinum Backer badge." That notification gets posted. That person's network asks what SoundSteak is. New members arrive.

### Open Questions — Gamification
- [ ] What are the exact thresholds for each streaming milestone badge?
- [ ] Are badges permanent or can they be lost — e.g. if a studio receives consistently poor reviews?
- [ ] Is there a badge for the selection panel members who choose the cohort?
- [ ] How are cohort award winner badges determined — data only or community vote component?

---

