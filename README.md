
# SPCX Equity — Tokenized Stock on Canton Network

A DAML smart contract prototype representing tokenized SpaceX equity (`SPCX`) on the Canton Network, built as a take-home interview project for NASDAQ.

## What it does

- **Create** a `SPCX` equity instrument on-ledger (issuer-controlled)
- **Allowlist** a party to be eligible to receive shares
- **Mint** shares to an allowlisted party
- **View balances** held per party in a live React dashboard

## Architecture

```
React + @daml/react  ──HTTP──▶  DAML JSON API (port 7575)  ──gRPC──▶  Canton Sandbox (port 6865)
                                                                              │
                                                                         DAML Model (.dar)
                                                                    Equity/Instrument.daml
```

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

# 3. Start everything
bash start.sh
```

Open **http://localhost:3000** in your browser.

### Manual startup (if start.sh has issues on Windows)

Open **three separate terminals**:

**Terminal 1 — Canton sandbox**
```bash
cd daml
daml sandbox --port 6865 --dar .daml/dist/spcx-equity-1.0.0.dar
```

**Terminal 2 — JSON API**
```bash
daml json-api \
  --ledger-host localhost \
  --ledger-port 6865 \
  --http-port 7575 \
  --allow-insecure-tokens
```

**Terminal 3 — React UI**
```bash
cd ui
npm run start
```

## Generating party tokens

In sandbox dev-mode the UI auto-generates unsigned dev tokens. For properly-signed HS256 tokens:

```bash
# Start sandbox with known secret
daml sandbox --port 6865 --dar .daml/dist/spcx-equity-1.0.0.dar \
  --canton-help  # add auth config via Canton config file

# Generate tokens
npm install jsonwebtoken   # once, in repo root
node generate-tokens.js
```

Paste the printed token into the "custom JWT token" field on the login screen.

## Demo walkthrough

1. Open http://localhost:3000 → log in as **Issuer**
2. **Create Instrument** → ticker `SPCX`, company `SpaceX Inc.`
3. **Allowlist Party** → enter `Alice`
4. **Mint Shares** → select Alice, enter `1000`
5. Switch party → log in as **Alice** → see 1,000 SPCX in Holdings

## Project structure

```
NASDAQ/
├── daml/                        # DAML smart contracts
│   ├── daml.yaml
│   └── Equity/
│       └── Instrument.daml      # EquityInstrument, AllowlistEntry, EquityHolding
├── ui/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx              # Login / party selector
│   │   └── components/
│   │       ├── Dashboard.tsx
│   │       ├── CreateInstrument.tsx
│   │       ├── AllowlistParty.tsx
│   │       ├── MintShares.tsx
│   │       └── Holdings.tsx
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