# NTRPY — The Entropy Engine

### Utility design for a free NFT collection on Robinhood Chain
*Companion to [NTRPY_CONCEPT.md](NTRPY_CONCEPT.md). Built on the research in `message.txt`, which is solid — this doc does not repeat it. Compiled August 7, 2026.*

---

## 0. The unfair advantage nobody else on that chain has

Read the two teardowns again and notice what both collections had to do: **invent a reason to burn things.**

Chain Mancers needed you to burn HOODL or SLOP, so they built a "forge" and wrote lore around it. StonkBrokers needed activation demand, so they added a tiered fee that burns 50%. In both cases the burn is a **tokenomic device wearing a costume.** The art is pixel PFPs; the burn is a supply mechanic; the connection between them is marketing.

NTRPY's entire doctrine — written months before you'd ever heard of this chain — is:

> **Solve et coagula. Dissolve, then reconstitute. No system reorganizes at a higher order without first passing through a state less ordered than the one it left.**

You do not need to invent a reason to burn. **Burning is your thesis.** The caterpillar digests itself into soup. The snake sheds. Entropy is the toll transformation charges.

That is not a small thing. It means every mechanic below is simultaneously a game mechanic and a doctrinal statement, and the two never fight. When Chain Mancers says "burn to activate," it's a fee. When NTRPY says it, it's the point.

**The strategic read:** don't compete on yield. StonkBrokers wins that — they have ERC-6551 wallets full of tokenized stocks and seven months of head start. Compete on being **the only collection on the chain where the mechanics and the meaning are the same object.** That is not copyable by a pixel-PFP team, because it requires having had something to say first.

---

## 1. The core insight: the bestiary is already a mechanics system

This is the single most valuable idea in this document, so it goes first.

Your concept doc defines the bestiary as **a taxonomy of modes of transformation** — each animal answers "how does a thing change?" with a different biological mechanism. You wrote that as art direction. It is also, without modification, **a trait system where each trait is a different game mechanic.**

| Animal | Biological mechanism | On-chain mechanic |
|---|---|---|
| **BUTTERFLY** | Metamorphosis — total dissolution | Burn to fully transform into a higher chapter. Highest cost, highest weight gain, irreversible |
| **SNAKE** | Ecdysis — shedding a layer | Shed cheaply and repeatedly. Lower gain per action, but no cooldown. The grinder |
| **LION** | Refusal — kills "Thou Shalt" | Can **refuse decay** once per cycle. Holds its weight without paying. The tank |
| **MOTH** | Attraction to false light | Gambles: burn for a randomized multiplier that can also zero out. High variance |
| **SCARAB** | Autogenesis — life from waste | Earns a bonus share from **other people's** burns in the Void. The scavenger |
| **SPIDER** | Structure from the self | Compounds — weight grows passively per cycle held while active. The slow builder |
| **CROW** | Nigredo — arrives at endings | Yield weight scales with total supply burned that week. Profits from destruction |
| **JELLYFISH** | Reversal — reverts to polyp | Can revert one chapter to undo a bad decision. The only "undo" in the system |
| **KOI** | Persistence against flow | Never decays. Lowest ceiling, zero maintenance. The passive holder's pick |

**Why this is genuinely strong:**

1. **The lore is the mechanics.** Not lore *justifying* mechanics. The scarab earns from waste because Khepri makes life from dung. The lion resists decay because Nietzsche's lion exists to say *I will*. Someone reading your concept doc can predict the mechanics, and someone reading the contract can reconstruct the doctrine.
2. **It creates real strategy without new art.** Nine animals × six chapters = 54 states from nine drawings. Players argue about which animal is best. Arguments are engagement.
3. **It's a moat.** A competitor can copy `burn → weight++`. They cannot copy nine coherent mechanics derived from a philosophy of transformation, because they'd have to write the philosophy first.
4. **It makes the free mint feel like a draft, not a giveaway.** Which animal you roll determines how you play. That's a reason to care about a free asset.

---

## 2. The negentropy engine — the mechanic no one on the chain has

Here is the original contribution, and it's the piece I'd bet on.

Every yield NFT on that chain works the same way: **pay once, earn forever.** StonkBrokers' activation is one-time. Chain Mancers' soft-stake is one-time. Both reset on transfer, and that's the only ongoing pressure.

NTRPY's doctrine says something different and harder:

> **Order is not found. It is paid for. The instant you stop paying, you dissolve.**

That's Schrödinger's negentropy — an organism survives only by continuously drawing negative entropy from its environment. So:

### **Activated NFTs decay.**

Your yield weight decreases every cycle. To hold your position you must **feed it** — burn a small amount to restore weight. Stop feeding, and your weight slides back toward zero. The NFT is never destroyed and never leaves your wallet. Only the *claim* decays.

**What this buys you that one-time activation cannot:**

| | One-time activation (both incumbents) | Negentropy decay (NTRPY) |
|---|---|---|
| Token demand | One purchase per holder, ever | **Recurring, forever** |
| Return visits | Never after activation | Weekly |
| Supply sink | Front-loaded, then dead | **Perpetual** |
| Yield per active NFT | Falls as more activate | **Rises** as inattentive holders decay out |
| Story | "I paid a fee" | "I am holding order against the second law" |

That fourth row is the important one. In a one-time system, every new activation dilutes you forever. In a decay system, **the inattentive continuously return their share to the attentive.** Your yield goes up when other people stop paying attention. That is a fundamentally better position for a committed holder, and it's a mechanic that literally cannot exist without the entropy concept behind it.

### Making decay feel like art instead of a tax

Decay is the highest-risk idea here. Done badly it reads as a rent-seeking timer and people revolt. Done well it's the most memorable thing on the chain. The difference is **whether the decay is visible and beautiful.**

**Your specimen visibly corrodes on-chain.** The SVG reads current weight and renders accordingly: a fully-fed specimen is mirror chrome; a decaying one tarnishes, pits, loses definition, and finally goes matte and dark. Feed it and the chrome returns.

The precedent is already the closest living practice named in your concept doc: **Daniel Arsham's *Eroding and Reforming Bust of Rome*** — a dynamic NFT that visibly decays and reforms over a year, with editions running on timeframes up to a millennium. Arsham made erosion the medium. You'd be making erosion *interactive* — the first collection where the collector decides whether the artwork survives.

That reframes the whole thing. It is not a maintenance fee. **It is a piece of art that dies without you, and the chain records who let theirs die.** Make a public gallery of the fully-decayed — call it the Nigredo, or just The Lost. People will pay to stay off it.

**Tuning (be conservative):**
- Decay slowly — full slide from max to zero over **~10–12 weeks**, not days
- Restoration should cost meaningfully less than the yield earned in that period, or you've built a treadmill nobody rationally runs
- Weight floors at a **non-zero base**, so a neglected NFT still earns a trickle and is never bricked
- KOI exists specifically as the opt-out for people who hate this. Let them opt out

---

## 3. The fee source — where the money actually comes from

The research doc's most important line: *a "passive income NFT" is only sustainable if the NFT is a toll booth on something people already want to do.* Everything below is judged on that.

### Primary: **THE VOID** — burn-as-a-service

The furnace idea (#6 in the research, scored 7/difficulty 1) is a **10/10 thematic fit for NTRPY** and a Saturday build.

Anyone can send dead tokens or abandoned NFTs into the Void for a small ETH fee. They receive a **Relic** — an on-chain SVG record of what died: ticker, supply destroyed, date of death, and the wallet that performed the rite. Fees flow to the reward vault.

**Why this is right for NTRPY specifically and wrong for everyone else:**
- StonkBrokers running a furnace is a random side product. NTRPY running a furnace is *the brand delivering its core service.* Entropy, as a service.
- It's the **SCARAB** made literal — Khepri, who makes life out of waste. That animal is already in your bestiary.
- It's chaos→order in one transaction: worthless dead asset in, permanent beautiful artifact out. Your slogan, executed.
- **Every dead project on the chain is free distribution.** Their holders burn together, screenshot the funeral, and post it. You are the only one who profits from other people's failures, and you do it with dignity instead of mockery.
- The chain is five weeks old and already accumulating corpses. That supply only grows.

**Honest ceiling:** modest. This alone will not make anyone rich. Treat it as the **front door and the narrative engine**, not the P&L.

### Secondary: **THE TOLL** — a skim on routed swaps

The research doc's #1 (score 9). Thematically it's better than it looks: **the second law says every energy transfer loses something to entropy.** A router that takes a small skim off every swap is that law, implemented. "Every transaction pays entropy" is an on-brand, honest, and memorable pitch.

Real fee source, external, large. But the risk in the research doc is correct and severe: **you only earn from your own frontend, and distribution is the whole game.** Undercutting Anvil's 10–15% swap fee is the softest target on the chain, but you're still fighting for swap traffic.

**Do not build this in the weekend.** Build it in week three, once the Void has given you an audience to route.

### What to refuse

**Do not build a pure staking-rewards collection** (research #12, score 2). If the reward pot is funded by recycled proceeds and emissions, you have built a countdown wearing a fee stream's clothes. NTRPY's entire doctrine is that order must be *paid for* from real energy input. A closed system running down is, definitionally, the thing you named the brand after. Building one would be self-refuting.

---

## 4. The chapters as the progression system

Your six chapters map onto burn-to-concentrate with zero modification.

| Chapter | State | Mechanic |
|---|---|---|
| **I. LARVA** | Order, inherited | Mint state. Base weight. Cannot yet earn |
| **II. SOLVE** | Chaos | Burn to enter. **Weight drops to near zero.** The dissolution is real |
| **III. IMAGINAL** | Chaos, organizing | Weight climbs back past the starting point. First real yield |
| **IV. COAGULA** | Order, chosen | Requires burning a second NFT (2→1 merge). Supply deflation |
| **V. IMAGO** | Order, new | Full weight. Best art state |
| **VI. THE FLAP** | Chaos, again | **Terminal.** Burn an Imago → permanent max weight, but the NFT is gone from supply and the holder receives a non-transferable claim |

**Chapter II is the mechanic that will make people talk.** To progress, your weight must first *drop*. You pay, and you get temporarily worse. Every other collection's upgrade path is monotonic. Yours requires a genuine trough, because the doctrine says the chrysalis is not a rest — it's a liquefaction.

That is a real, honest, memorable design decision, and it's the kind of thing that gets written about. It also filters perfectly: only people who understood the concept will pass through Solve.

**Chapter VI is the endgame and the deflation valve.** The Flap removes an NFT from supply permanently while preserving its claim, so the fee stream stays constant while the denominator shrinks. Yield per remaining NFT rises forever. Publish `yieldPerSpecimen = weeklyFees / activeWeight` on the front page, live. As the research doc says: that number is your entire marketing budget.

---

## 5. The mint

Free, per your requirement, and gated by a burn — which is both the chain precedent and your doctrine's opening move.

**The problem to solve honestly:** StonkBrokers gated on burning *their own three prior collections.* They had a captive audience. Chain Mancers gated on HOODL, SLOP, and Slonks — harvesting from **other people's** communities, with separate burn contracts on both Robinhood Chain and Ethereum.

You have no chain presence. **So you must do what Chain Mancers did, not what StonkBrokers did.** Gate on burning assets that active communities already hold, and you import their holders. Pick 3–4 live assets with real holder counts; verify each is actually still active before committing.

**Frame it doctrinally and it stops being a tokenomics gate:** you cannot enter NTRPY without dissolving something first. Chapter I is called Larva because you arrive as what your environment made you. The forge is where you stop being that. Call it **The Forge**, or just **SOLVE**.

**Supply and reserve.** 4,444 or 5,000, following the chain's convention. **Hold back 20–25% as an Anvil-style liquidity reserve** — the Chain Mancers trick of paying for your own order book in printed inventory. It costs nothing and it kills the "can I get out?" objection on day one.

**Sealed reveal.** Chain Mancers got a second free attention spike days after mint by sealing the art. Take it — and yours is better, because the reveal isn't just which JPEG you got, it's **which mechanic you drew.**

---

## 6. Scoreboard — NTRPY-specific

Scored on fit-to-brand × real fee source × weekend feasibility.

| # | Component | Fee source real? | Difficulty | Brand fit | Score |
|---|---|---|---|---|---|
| 1 | **Bestiary-as-mechanics** (9 animals, 9 mechanics) | n/a — it's the product | 2 | 10/10 | **10** |
| 2 | **The Void** (burn-as-a-service furnace) | ✅ Real, modest | 1 | 10/10 | **9** |
| 3 | **Negentropy decay + corroding art** | n/a — demand driver | 3 | 10/10 | **9** |
| 4 | **The Chapters** (burn-to-concentrate) | n/a — deflation | 2 | 10/10 | **8** |
| 5 | **The Ouroboros** (ETH backing, burn-to-redeem) | ⚠️ Needs inflow | 2 | 9/10 | **8** |
| 6 | **The Toll** (swap router skim) | ✅ Real, large | 3 | 8/10 | **7** — week 3 |
| 7 | **Buyback machine** pointed at own floor | ⚠️ Depends on 2/6 | 3 | 7/10 | **6** — bolt-on |
| 8 | Registrar / .hood namespace | ✅ Real, recurring | 2 | 2/10 | **4** — great idea, wrong brand |
| 9 | StonkBrokers clone (ERC-6551 + stocks) | ✅ Real | 4 | 3/10 | **3** — and you can't legally test it |
| 10 | Pure staking rewards | ❌ None | 1 | 0/10 | **1** — self-refuting |

**Note on #8:** the Registrar is the research doc's top pick and that assessment is correct *in general*. For NTRPY it's wrong — a namespace land-grab has nothing to do with transformation, and you'd be putting your art on someone else's idea. If you want to build the Registrar, build it as a separate unbranded project. Don't spend NTRPY on it.

---

## 7. The weekend build

**Scope hard. Ship 1 + 2 + 4. Add 3 in week two, once you've watched real holders behave.**

Shipping decay on day one is the most likely way to poison the launch — you get one chance at first impressions, and a mechanic that takes value back is the worst thing to be wrong about. Launch with static weights, prove the fee stream, *then* introduce decay as "Chapter II is now open."

### Contracts
```
Specimen.sol     ERC721A + Merkle allowlist. Animal + chapter packed in one uint256
Forge.sol        burn-to-mint: accepts approved assets, writes allowlist spot
Void.sol         burn-as-a-service: takes ERC20/ERC721 → 0xdEaD, mints Relic, fee → vault
RewardVault.sol  pull-based accRewardPerShare accumulator, denominated in WETH
Chapters.sol     chapter advancement, 2→1 merge, soft-stake activation
Renderer.sol     on-chain SVG — reads animal + chapter + weight, renders state
```

**The one thing you must get right** (the research doc is emphatic and correct): rewards are **pull-based, never push**. MasterChef accumulator — global `accRewardPerShare`, per-token `rewardDebt`, `pending = weight * acc - debt`. If you ever loop over holders to pay them, you've shipped a contract that dies at scale.

Everything else: OpenZeppelin or Solady, `murky` for Merkle, `ReentrancyGuard` on anything that moves ETH, dust always rounds *into* the vault.

### Art — go fully on-chain
Your renders are 3D chrome, which does not fit in a contract. So the on-chain collection needs a **native SVG interpretation** of the bestiary, not a downscale of your existing art.

This is a feature, not a compromise. Design the specimens as **chrome line-work on the void** — your logo's visual language, not your renders'. Gradients, strokes, and a palette lookup compress well, the animals are already silhouette-legible, and "100% on-chain, no IPFS" is a real signal on a five-week-old chain where metadata rot is a live fear.

Keep the 3D renders for the website, the reveal, and the 1/1s. Two registers, one brand.

### Schedule
- **Friday (4h)** — Write the reward math on paper before any code. Where does the ETH come from, what's a realistic weekly figure, what's yield-per-specimen at full activation? If that number is unimpressive, change the plan Friday, not Sunday. Scaffold Foundry, deploy a stub to testnet.
- **Saturday (10h)** — Specimen + Void + RewardVault. Test the accumulator properly; reward bugs are unrecoverable post-launch. SVG renderer. Full end-to-end claim on testnet.
- **Sunday AM (4h)** — Frontend: forge, mint, activate, claim, and a live stats panel. The stats panel *is* the marketing.
- **Sunday PM (3h)** — Read every value-moving function out loud once. Deploy mainnet, verify on Blockscout, seed the reserve.
- **Sunday night (2h)** — Submit to OpenSea and RhinoMarket. **Announce the burn window, not the mint.** The scarcity is in the forge.

---

## 8. Honest risks

**1. You have no audience on that chain.** This is the biggest gap between you and both incumbents, and no mechanic fixes it. StonkBrokers had three prior collections to harvest; Chain Mancers had a partnership with Clutch and harvested two chains. Your entire distribution plan has to be the burn gate pulling from existing communities plus the Void giving dead projects a reason to talk about you. Budget more time for distribution than for contracts.

**2. The market is smaller than the headlines.** Seven Robinhood Chain NFT projects at ~1,500 ETH *combined* volume is a real but modest market, and the research doc is right that some of the eye-catching figures are self-referential — when 70% of trading fees return to holders, holders are incentivized to manufacture volume. Don't model off $55M.

**3. Decay will make someone angry.** Someone will lose weight while on vacation and post about it. Mitigate with a generous timescale, a non-zero floor, KOI as an opt-out, and an obvious visual warning state. Do not ship it in week one.

**4. Securities exposure is real and you're a U.S. person.** The research doc's framing is right: *paid for doing something* is meaningfully safer than *paid for holding something*. NTRPY is unusually well positioned here — yield requires burning, feeding, advancing chapters, and merging. It is closer to a game than a dividend. But "closer to a game" is not a legal opinion. **Talk to a crypto-literate securities attorney before real money moves.** Also skip anything involving Robinhood Stock Tokens, which you cannot legally receive.

**5. Free means no launch capital.** You'll be funding the reward vault entirely from Void fees at the start, which will be small. Say so publicly rather than implying a yield you can't pay. Publish the fee address and let people verify. On a chain this young, verifiability *is* the marketing.

**6. Scope creep will kill this.** Everything in §1–4 is coherent and it is also four systems. The failure mode is shipping all of it half-working. Ship the Void and the bestiary. Nothing else on that chain has nine mechanics derived from a real philosophy — that alone is the differentiator, and it doesn't need decay, chapters, or a router to land.

---

## 9. Recommendation

**Ship THE VOID with the bestiary-as-mechanics, and nothing else.**

It is a genuine Saturday build. The fee source is real. Every dead project on the chain markets it for you. It is the only collection on Robinhood Chain where a holder can read a philosophy document and correctly predict the smart contract — and that coherence is the thing StonkBrokers and Chain Mancers structurally cannot copy, because they'd need to have meant something first.

Then, in order, as the audience proves out:
- **Week 2:** negentropy decay + corroding art (the retention engine and the press hook)
- **Week 3:** the Ouroboros backing vault (the hard floor)
- **Week 4+:** the Toll router (the real revenue ceiling)

One last thing, and it matters more than any mechanic: **the collection must not be where the brand lives.** ntrpy.ai is the permanent asset — the doctrine, the bestiary, the archive. The collection is an artifact *from* that world. If the chain cools off, the site is still standing. If you invert that and make the site a mint page, you've traded a canon for a countdown.

---

## Sources

**Precedents and mechanics**
- [Daniel Arsham — *Eroding and Reforming Bust of Rome*, the dynamic decay NFT precedent](https://www.designboom.com/art/daniel-arsham-nft-non-fungible-token-eroding-reforming-bust-rome-05-20-2021/)
- [Arsham eroding NFT — Highsnobiety](https://www.highsnobiety.com/p/daniel-arsham-eroding-nft/)
- [Dynamic NFTs: on-chain state driving metadata](https://starkware.co/blog/dynamic-nfts-and-their-potential/)
- [Building a dynamic on-chain SVG NFT (data: URI + base64 JSON)](https://jadenkore.medium.com/creating-a-dynamic-nft-that-updates-in-real-time-based-on-chain-data-3d989c04f137)

**Chain and market state, August 2026**
- [Robinhood Chain NFTs: seven projects at ~1,500 ETH combined volume](https://www.kucoin.com/news/flash/robinhood-chain-nfts-surge-in-activity-seven-projects-hit-1500-eth-in-trading-volume)
- [Robinhood Chain collections on OpenSea](https://opensea.io/collections/chain/robinhood)
- [Clutch Markets / Anvil AMM ecosystem](https://www.clutch.markets/)
- [StonkBrokers](https://www.stonkbrokers.vip/home/) · [Anvil NFT AMM docs](https://www.stonkbrokers.cash/)
- [Robinhood Chain mainnet announcement](https://robinhood.com/us/en/newsroom/robinhood-accelerates-global-expansion-robinhood-chain-mainnet-stock-tokens-agentic-trading/)

*Chain parameters, fee figures, and burn-gate assets in `message.txt` are ~5 weeks old and were compiled from project documentation. Verify every one live before writing a contract against it. Not legal or financial advice.*
