
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


## Demo walkthrough

1. Open http://localhost:3000 → log in as **Issuer**
2. **Create Instrument** → ticker `SPCX`, company `SpaceX Inc.`
3. **Allowlist Party** → select `Alice` from the dropdown
4. **Mint Shares** → select Alice, enter `1000`
5. **Switch Party** → log in as **Alice** → see 1,000 SPCX in Holdings


## Project structure

```
NASDAQ/
├── daml/                        # DAML smart contracts
│   ├── daml.yaml
│   └── Equity/
│       └── Instrument.daml      # EquityInstrument, AllowlistEntry, EquityHolding
├── ui/                          # React + TypeScript frontend
│   ├── src/
│   │   ├── App.tsx              # Login, party discovery + auto-allocation, dev token
│   │   ├── PartiesContext.tsx   # Maps display names ↔ full namespaced party IDs
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