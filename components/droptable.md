# DropTable

Band merch platform. Standalone business built first, integrated into SoundSteak when the investor cut layer is ready.

**Domain:** droptable.music (available, not yet purchased)
**Stack:** Next.js · Netlify · Supabase (reactivate SoundSteak project, `merch` schema) · Stripe · Printful API · Resend

---

## What It Does

Two distinct modes on one platform:

**Pre-order store (online)**
Fan browses products → Stripe checkout → Printful auto-fulfills → ships directly to fan. Band never handles inventory. Revenue goes to band minus platform fee.

**Gig inventory (physical)**
Band orders their own stock through the platform → Printful ships to the band → band sells at the show and keeps 100% of gig revenue. No upfront cash required beyond the Printful order.

---

## The SoundSteak Connection

At the standalone stage, all revenue goes to the band. When integrated into SoundSteak:
- Stripe Connect routes investor cut at checkout (taken upfront, no waiting)
- Revenue flows into the SoundSteak `revenue_events` ledger
- Investor dashboard shows merch earnings in real time
- No physical inventory can be stolen because investors are already settled

This proves SoundSteak's core revenue distribution model in a low-stakes environment before securities law is involved.

---

## Monetization

| Tier | Price | What's Included |
|---|---|---|
| Free | $0/mo + 3–5% per sale | Online store, unlimited products, Printful fulfillment |
| Gig | ~$15–20/mo | Everything free + mobile POS app, Stripe Tap to Pay, sales analytics |
| SoundSteak | TBD | Investor cut routing, revenue ledger sync |

Platform also captures margin from Printful volume discounts at scale — invisible to bands.

---

## Printful Economics

Printful charges per item fulfilled, no monthly fee. Typical margins for bands:

- **T-shirt** at $30 retail: ~$13.25 Printful base + $1.17 Stripe fee + ~$1.50 platform fee = **~$14 band profit (47%)**
- **Gig inventory** (30 shirts at $14.75 cost, sold at $30): **~$457 profit per gig**
- Printful membership ($24.99/mo) gives 20–30% product discounts — worthwhile once a band hits ~50+ items/month

Tradeoff vs. local screen printing: Printful costs ~$5/shirt more but requires zero upfront cash and zero unsold inventory risk.

---

## Gig POS App

React Native (iOS first). The unique product no competitor has.

- Inventory list for the current show
- Quick-sale buttons (item → quantity → payment)
- **Stripe Terminal Tap to Pay** — band member's iPhone IS the card reader, no hardware needed
- CashApp / Venmo / PayPal: display band's QR code → fan pays in their app → band taps confirm
- Offline-degraded mode for bad-signal venues (fall back to manual confirm)
- End-of-night sales summary

---

## Known Constraints

- **Printful delivery is 3–5 days.** UI must show a hard cutoff warning if a gig inventory order won't arrive before show date.
- **App Store approval** takes 2–4 weeks minimum. Don't promise a launch date tied to a specific show.
- **Differentiation is the gig POS, not the store.** Fourthwall already offers a free band merch store. DropTable's value is the in-person selling layer.
- **Band onboarding must be under 20 minutes** — bands are not e-commerce people.
- **Successful bands eventually outgrow Printful** (bulk local printing is cheaper at scale). SoundSteak integration is what retains them past that point.

---

## Beta Plan

Three existing Netlify band sites serve as real-world test cases before any public launch:

| Band | Why |
|---|---|
| Liquid Courage | Donovan's own band — direct first-person gig POS test |
| Formals | Jordan Ellington, friend/bandmate — easy loop-in |
| The Big Sad | Free site build — free early platform access is a natural offer |

Merch store embeds as a subdomain (`merch.bandname.com`) or dedicated page on each existing site.

---

## Build Order

**Sprint 1 — Web platform**
- Reactivate SoundSteak Supabase, create `merch` schema
- Band account creation + product management dashboard
- Printful API integration (product sync, mockup generation, order creation)
- Fan-facing embeddable store page
- Stripe checkout with platform fee
- Resend order confirmation + QR ticket emails

**Sprint 2 — Gig app**
- React Native iOS app
- Stripe Terminal Tap to Pay
- CashApp / Venmo / PayPal QR + manual confirm flow
- Inventory view, quick-sale flow, end-of-night summary
- Offline/degraded signal mode

**Sprint 3 — SoundSteak integration**
- Stripe Connect for investor cut routing at checkout
- Revenue events piped into SoundSteak ledger
- Investor-facing earnings dashboard
