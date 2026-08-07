# The Plain English Version

### What these NFT mechanics actually are, and whether NTRPY should build any of them

*Companion to [NTRPY_UTILITY.md](NTRPY_UTILITY.md), which has the design and the build plan. This one has no jargon and answers the question underneath all of it: what's the point.*

---

## The problem all of this exists to solve

Normal NFT: you own a JPEG. To sell it you list it on OpenSea and **wait for a human to want it**. Might be a day, might be never. So the question hanging over every NFT purchase is *"can I get out?"* — and for 95% of collections the honest answer is no.

Everything clever in StonkBrokers and Chain Mancers is an answer to that one question.

---

## Liquidity: the vending machine

Instead of waiting for a buyer, they build a machine that is **always** willing to trade with you.

It works by pairing the NFT with a regular token at a **fixed, permanent exchange rate**. For Chain Mancers: 1 NFT = 500,000 MANCER tokens, always, enforced by code.

Think of it as breaking a $100 bill into twenties. The NFT is the bill; the token is the change. You can always break it, and you can always reassemble it.

So now:

- **Want out?** Push your NFT into the machine, get 500,000 tokens, sell those on any exchange. Instant.
- **Want in?** Buy 500,000 tokens, push them into the machine, get an NFT out. Instant.

### The trick worth stealing

You'd think you need money to stock that machine. You don't.

Chain Mancers made 5,000 NFTs, sold 3,750, and **kept 1,250 to fill the machine**. They paid for their own order book with inventory they printed out of nothing. No capital raised. That's the single best mechanic in the research.

### The catch nobody says out loud

That "floor price" is denominated in a token **they also control**. Your NFT can never be worth less than 500,000 MANCER — but MANCER itself can go to zero.

It's a floor made of a material you're also manufacturing. This is why comparing it to an independently-bid floor like BAYC's is a category error.

---

## Where the money comes from

Every time someone uses the vending machine, they pay a fee — **10–15%**, which is genuinely predatory by any normal standard. Then roughly 70% of that fee gets paid out to people holding NFTs.

So the pitch is: *hold the NFT → collect a slice of everyone's trading activity.*

**Why does anyone pay a 15% fee?** Because the alternative is listing on OpenSea and waiting a week. On a five-week-old chain, instant beats cheap.

That will not survive competition. Which is exactly why undercutting it is the softest target available to a new entrant.

---

## The question that decides whether any of it works

**Is the fee revenue coming from outside, or is it a circle?**

| | How it works | What it is |
|---|---|---|
| **Circle** | People trade your token → fees → paid to holders → holders trade more to farm fees | Money going round in a loop, leaking every lap. Feels like a business. Is a countdown. |
| **Real** | You take a small cut of something people were going to do anyway | A toll booth on a road with existing traffic |

This is the spine of the whole analysis and it's correct. Most "passive income NFTs" are the first kind, which is why they die in about three weeks.

When you see "$55M volume," ask how much of that is people trading in circles to farm their own reward pool. Some of it definitely is. Don't build projections on it.

---

## Burning

"Burning" means destroying permanently — sending to an address with no keys, so it can never come back. It gets used three ways:

**1. Burn to get in.**
Mint is free, but you must destroy some *other* NFT to qualify. Filters out tourists. But the actual reason is that it lets you **harvest another project's holders** — Chain Mancers made you burn HOODL or SLOP, which imported those communities wholesale.

**2. Burn to switch on earnings.**
You pay in their token to activate rewards. Creates demand for the token beyond pure speculation.

**3. Burn to concentrate.**
Fewer NFTs splitting the same fee stream means more per NFT. Every burn makes everyone else's position better.

### Soft staking

Worth knowing as its own concept. Normally "staking" means locking your NFT into a contract where you can't use it, sell it, or list it — and you have to trust that contract with a valuable asset.

**Soft staking means it never leaves your wallet.** You just flip a switch by paying. Strictly better on every axis, and if you copy one thing from these projects, copy this.

---

## What was proposed for NTRPY, in plain terms

**The Void.**
A crematorium for dead tokens. The chain is accumulating worthless failed projects. You charge a couple dollars to destroy one and hand back a nicely-rendered tombstone recording what died. You earn fees from the chain's garbage.

That's it — that's the whole business. Small, but real. And every dead project's community screenshots their own funeral, which is free marketing.

**The bestiary as mechanics.**
Instead of the nine animals being nine drawings, each one *plays differently*. The snake is cheap and repeatable. The lion can resist decay. The scarab earns from other people's burns. The concept doc already explains why each animal transforms differently — that document is already a game design document, it just wasn't written as one.

**The decay idea.**
Everyone else does pay-once-earn-forever. Instead: your earning power slowly fades unless you top it up.

Two reasons. It creates ongoing demand instead of one-time. And the real one — **people who lose interest stop earning, and their share flows to whoever is still paying attention.** Plus the art visibly corrodes on-chain, which makes it a piece rather than a fee.

---

## So what's the actual point?

Here's the honest version, including the uncomfortable part.

### For most projects on that chain

**The point is that it's a financial game, and the art is a skin.** People buy hoping it goes up. "Utility" is a mechanism that makes holding feel productive rather than speculative.

That's a legitimate business. It just isn't an art project.

### Two real reasons NTRPY might do it anyway

**1. Distribution.** A free mint on a hot new chain puts the work in front of thousands of people who would never find an art site. That's genuinely hard to buy any other way.

**2. Funding.** Fee revenue pays for continuing to make the thing.

### One real reason not to

**NTRPY doesn't need this to be good.** The doctrine, the bestiary, the site — that's the actual work, and it stands on its own. The collection is a distribution layer bolted onto it.

The failure mode is specific and extremely common: three months of writing smart contracts, debugging reward accumulators, and running a Discord about floor prices, and at the end the art project is *worse* than it was at the start. The tokenomics become the product and the art becomes marketing for the tokenomics.

That happens to almost everyone who goes this route.

---

## The test

> **Does the mechanic make the art mean *more*, or just make it worth *more*?**

For NTRPY that test actually passes, which is rare.

An artwork that visibly decays unless you maintain it isn't a fee — it's the thesis of the project made physical. A collection where the snake and the butterfly transform by genuinely different rules isn't tokenomics — it's the bestiary working.

**That's the version worth building.**

The version not worth building is the same collection with the mechanics chosen because they pump the floor.

---

## The call

Build **The Void** as a weekend experiment. It's small, honest, on-theme, and it teaches you what that chain's community actually wants without betting the brand on it.

Keep **ntrpy.ai** as the real asset.

If the collection dies, the work still stands. If you invert that — if the site becomes a mint page — you've traded a canon for a countdown.
