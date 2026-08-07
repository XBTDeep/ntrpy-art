# NTRPY — Chapter I

3,333 identical eyes. Free mint, 10 per wallet, timed window.

The contract is deliberately minimal: it contains **only what cannot be added later.**
Everything else — vaults, staking, chapters, an Anvil market — is a separate
contract that reads this one. None of it requires touching this.

---

## What's here and why

| Piece | Unlocks later | Why it can't wait |
|---|---|---|
| `startTimestamp` (via ERC721A) | Time-held accrual, the Turtles model | If it isn't recorded from block one, that history is gone forever |
| `ERC721ABurnable` | Every burn mechanic | Not burnable at launch = never burnable |
| `ERC2981` | The royalty vault | Marketplaces read this at listing time |
| Swappable `renderer` | Character art, chapters, dynamic state | Locked metadata = locked forever |
| Plain ERC-721 surface | Anvil, OpenSea, every wallet | Anvil wraps any ERC-721. Non-standard = incompatible |

**Not** an ERC-404. ERC-404 burns and remints NFTs as fractional balances move,
which destroys token persistence — and token persistence is the entire concept.

### `heldSince` is free

ERC721A packs ownership into one storage slot:

```
bits   0–159  owner address
bits 160–223  startTimestamp   <- heldSince
bit      224  burned
bits 232–255  extraData (24 bits, unused, reserved for chapter state)
```

`startTimestamp` is when the *current* owner acquired the token and resets on
every transfer. No extra mapping, no extra gas.

---

## Gas

| | Gas |
|---|---|
| `mint(1)` | 64,534 |
| `mint(10)` | 66,068 |
| per token in a batch of 10 | 6,606 |

Minting 10 costs ~2% more than minting 1. Vanilla ERC-721 would be ~500k for
the same batch.

---

## Test

```bash
forge test
```

30 tests. The ones that matter most:

- `test_BurningDoesNotRefreshWalletAllowance` — a wallet can't mint-burn-repeat past 10
- `test_BurningDoesNotReopenSupply` — burns don't reopen the 3,333 cap
- `test_HeldSinceCorrectAcrossBatchAfterPartialTransfer` — transferring one token
  out of a batch must not corrupt its neighbours' timestamps. This is the ERC721A
  edge case that would silently break a future accrual vault.

---

## Deploy

Upload the eye to Arweave first, then fill `metadata/eye.json` with the poster
image and mp4 transaction IDs, upload that too, and use its `ar://` URI below.

```bash
export TOKEN_URI="ar://<metadata-tx-id>"
export ROYALTY_RECEIVER="0xYourAddress"
export ROYALTY_BPS=500          # 5%
export PRIVATE_KEY="0x..."

# testnet first — always
forge script script/Deploy.s.sol:Deploy \
  --rpc-url rh_testnet --private-key $PRIVATE_KEY --broadcast
```

The mint window is intentionally **not** set at deploy. The contract ships closed.
Open it with `setMintWindow(opens, closes)` when you're ready, and `closeMint()`
kills it immediately if you need to stop.

### Verify

```bash
forge verify-contract <address> src/NTRPY.sol:NTRPY \
  --chain-id 4663 --rpc-url rh_mainnet \
  --verifier blockscout \
  --verifier-url https://robinhoodchain.blockscout.com/api/
```

Unverified contracts on a young chain read as a rug. Verify everything.

---

## Chain

| | Mainnet | Testnet |
|---|---|---|
| Chain ID | 4663 | 46630 |
| RPC | `https://rpc.mainnet.chain.robinhood.com` | `https://rpc.testnet.chain.robinhood.com` |
| Explorer | robinhoodchain.blockscout.com | explorer.testnet.chain.robinhood.com |
| Gas token | ETH | — |

Note: the sequencer orders first-come-first-served by arrival time — **priority
fees do not jump the queue.** A mint here is a speed race, not a gas war.

---

## Adding things later

- **Burns** — a contract that calls `burn()`. Nothing here changes.
- **Character art** — `setURI()`, or point `setRenderer()` at a contract.
- **Time-based yield** — a vault reading `heldSince()`. Budget real testing time
  for the reward accumulator; those bugs are unrecoverable.
- **Royalty vault** — deploy it, then `setDefaultRoyalty(vault, bps)`.
- **Anvil market** — ~15 min and ~1 ETH via their factory, whenever volume
  justifies it. Requires no change here.
