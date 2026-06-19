
# SPCX Equity — Tokenized Stock Marketplace on Canton Network

A DAML smart-contract prototype of a **digital-asset IPO marketplace** on the
Canton Network, using tokenized SpaceX equity (`SPCX`) as the example. Built as
a take-home interview project for NASDAQ.

## What it does

An issuer runs a primary-market IPO that investors subscribe to with escrowed
USDC:

- **Mint USDC** — the issuer seeds investor wallets (1,000,000 USDC each).
- **Define the token** — the issuer creates the `SPCX` equity instrument.
- **Launch an offering** — the issuer announces an IPO with a ticker, price
  talk, and description.
- **Place an Indication of Interest (IOI)** — investors bid a max price and
  share quantity; the exact escrow (`maxPrice × shares`) of USDC is locked.
- **Allocate** — the issuer reviews the IOI book and allocates any or all
  shares per bid. Shares are minted to the investor, sale proceeds flow to the
  issuer's wallet, and unused escrow is refunded — atomically.
- **Live balances** — a dashboard shows every party's USDC and share balances
  at all times.

## Architecture

```
React + @daml/react  ──HTTP──▶  DAML JSON API (port 7575)  ──gRPC──▶  Canton Sandbox (port 6865)
                                                                              │
                                                                         DAML Model (.dar)
                                                                    Equity/Instrument.daml
```

### DAML model (`daml/Equity/Instrument.daml`)

| Template | Purpose |
|----------|---------|
| `UsdcHolding` | Cash token (signatory issuer, observer owner). Owner-controlled `TransferUsdc` / `MergeUsdc`. |
| `EquityInstrument` | Defines a tokenized stock; `LaunchOffering` choice starts an IPO. |
| `Offering` | A live IPO; `PlaceIOI` escrows USDC and creates an `IOI`. |
| `IOI` | An investor bid; `Allocate` settles (shares + proceeds + refund), `CancelIOI` reclaims escrow. |
| `EquityHolding` | Shares of a tokenized equity held by a party. |


## Prerequisites

| Tool | Version |
|------|---------|
| DAML SDK | 2.10.4 |
| Java | 11+ (21 recommended) |
| Node.js | 18+ |
| npm | 9+ |

## Quick start

```bash
# 1. Clone and enter repo
git clone <repo-url> && cd NASDAQ

# 2. Install UI packages (first time only)
cd ui && npm install --workspaces --include-workspace-root && cd ..
```

Then start the two processes below in **two separate terminals**.

> **Note on the DAML SDK version.** The model targets SDK **2.10.4** (pinned in
> `daml/daml.yaml`). Always run the backend commands from inside the `daml/`
> folder so the assistant picks up that version. SDK 3.x removed the standalone
> `daml json-api` command and is **not** compatible with this project.

### Terminal 1 — Canton sandbox + JSON API (run from `daml/`)

```bash
cd daml
daml start --start-navigator=false --json-api-port=7575
```

This single command:

1. Builds the DAML model into `.daml/dist/spcx-equity-1.0.0.dar`
2. Starts the Canton sandbox on port **6865**
3. Uploads the DAR
4. Starts the JSON API on port **7575**

Wait until you see the JSON API report that it is ready before opening the UI.

### Terminal 2 — React UI (run from `ui/`)

```bash
cd ui
npm run start
```

Open **http://localhost:3000** in your browser.

### How parties are set up

Canton allocates parties with **namespaced identifiers** (e.g.
`Issuer::1220e7dc…`), not bare names. On first load the UI:

1. Queries `/v1/parties` for the parties already on the ledger.
2. **Auto-allocates** `Issuer`, `Alice`, and `Bob` if they are missing.
3. Maps each display name to its full identifier and uses that identifier in
   the access token (`actAs` / `readAs`) and in all ledger queries.

Because the sandbox is in-memory, parties (and contracts) are recreated each
time you restart Terminal 1 — the UI re-allocates them automatically, so no
manual setup is required.

### Access tokens

The sandbox runs without enforced authentication, so the UI generates an
**unsigned dev token** whose claim carries the required fields:

```json
{
  "https://daml.com/ledger-api": {
    "ledgerId": "sandbox",
    "actAs": ["Issuer::1220…"],
    "readAs": ["Issuer::1220…"],
    "applicationId": "spcx-app"
  }
}
```

The `ledgerId` (`sandbox`) and the **full namespaced party identifier** are both
required — omitting either results in an HTTP 401 from the JSON API.

### Troubleshooting

| Symptom | Cause / Fix |
|---------|-------------|
| `Invalid argument 'json-api'` | You're on SDK 3.x. Run backend commands from inside `daml/` so SDK 2.10.4 is used. |
| `Unknown option --wall-clock-time` | Legacy sandbox flag removed in Canton — it has been removed from `daml.yaml`. |
| HTTP 401 `ledgerId missing in access token` | Token must include `ledgerId: "sandbox"` (handled by the UI). |
| HTTP 400 on create / "party not known" | Parties weren't allocated, or a bare name was used. The UI now allocates and uses full namespaced IDs automatically. |
| Login screen shows "No named parties found" | The JSON API isn't running on port 7575 — start Terminal 1 first. |


## How to use the app (IPO walkthrough)

The full flow uses three parties: **Issuer** (the company running the IPO) and
**Alice** / **Bob** (investors). Switch between them with the **Switch party**
button in the header — each login is a separate ledger identity.

> **If you changed the DAML model**, restart Terminal 1 (`daml start`) so the new
> `.dar` is uploaded, then reload the browser.

### 1. As the **Issuer** — set up the market

1. Open http://localhost:3000 and log in as **Issuer**.
2. **Seed demo USDC** → click **“Seed demo: 1,000,000 USDC → each investor.”**
   This mints 1,000,000 USDC into Alice's and Bob's wallets. (You can also mint
   a custom amount to a chosen party below.)
3. **Define the token** → in *Create Instrument*, enter ticker `SPCX`, name
   `SpaceX Inc.`, and a description, then create it.
4. **Launch the offering** → in *Launch Offering*, pick the `SPCX` instrument,
   enter **price talk** (e.g. `$95.00 – $105.00`) and a **description**, then
   launch. The IPO is now visible to Alice and Bob.

### 2. As **Alice** / **Bob** — subscribe to the IPO

1. **Switch party** → log in as **Alice** (repeat later for **Bob**).
2. The **Marketplace** lists the live `SPCX` offering and shows your USDC
   balance.
3. Enter a **max price** and the **shares desired**. The card previews the
   escrow cost (`max price × shares`).
4. Click **Place IOI**. That exact amount of USDC is locked into the contract
   as escrow, and your bid appears under **My IOIs** (cancelable until
   allocated).

### 3. As the **Issuer** — allocate shares

1. **Switch party** → log back in as **Issuer**.
2. The **IOI Book** lists every bid from Alice and Bob (investor, ticker, max
   price, shares desired, escrowed USDC).
3. Enter the **shares to allocate** for each bid (defaults to the full request)
   and click **Allocate**. Atomically:
   - `SPCX` shares are minted to the investor,
   - sale proceeds (`shares × max price`) move to the issuer's USDC wallet,
   - any unused escrow is refunded to the investor.

### 4. Watch balances update live

The **Balances** panel at the top of every dashboard shows USDC and per-ticker
share holdings for the Issuer, Alice, and Bob — refreshed continuously, so you
can confirm escrow, allocation, proceeds, and refunds as they settle.

## Project structure

```
NASDAQ/
├── daml/                        # DAML smart contracts
│   ├── daml.yaml
│   └── Equity/
│       └── Instrument.daml      # UsdcHolding, EquityInstrument, Offering, IOI, EquityHolding
├── ui/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx              # Login, party discovery + auto-allocation, dev token
│   │   ├── ledger.ts            # JSON-API helpers, dev token, raw queries
│   │   ├── PartiesContext.tsx   # Maps display names ↔ full namespaced party IDs
│   │   └── components/
│   │       ├── Dashboard.tsx        # Routes Issuer vs investor views
│   │       ├── Balances.tsx         # Live USDC + share balances for all parties
│   │       ├── MintUsdc.tsx         # Issuer: seed / mint USDC
│   │       ├── CreateInstrument.tsx # Issuer: define a tokenized equity
│   │       ├── LaunchOffering.tsx   # Issuer: announce an IPO
│   │       ├── Marketplace.tsx      # Investor: browse offerings, place IOIs
│   │       └── IoiBook.tsx          # Issuer: review IOIs and allocate shares
│   └── daml.js/                 # Generated TypeScript bindings (daml codegen js)
├── generate-tokens.js           # HS256 JWT token generator for sandbox auth
├── start.sh                     # One-command launcher
├── RESEARCHLOG.md
├── SOURCES.md
└── PROMTLOG.md
```

## License

This project is licensed under the Business Source License 1.1.

You may use this repository for personal, educational, evaluation, interview,
testing, development, and non-commercial purposes.

You may not use this project in production, commercially, as a hosted service,
or as part of a paid product or service without a separate written license from
the author.

On June 19, 2029, this project will convert to the Apache License 2.0.