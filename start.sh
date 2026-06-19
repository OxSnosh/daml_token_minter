#!/usr/bin/env bash
# start.sh — one-command demo launcher
# Starts Canton sandbox, uploads DAR, starts JSON API, then starts React UI.
#
# Prerequisites:
#   - DAML SDK 2.10.4 installed (daml on PATH)
#   - Java 11+ on PATH
#   - Node.js + npm installed
#   - Run `npm install` in ui/ first (or it's handled below)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DAML_DIR="$SCRIPT_DIR/daml"
UI_DIR="$SCRIPT_DIR/ui"
DAR="$DAML_DIR/.daml/dist/spcx-equity-1.0.0.dar"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SPCX Equity — Canton Network Demo"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Build DAML model
echo "[1/4] Building DAML model…"
cd "$DAML_DIR"
daml build

# 2. Start Canton sandbox in background
echo "[2/4] Starting Canton sandbox on port 6865…"
daml sandbox \
  --port 6865 \
  --dar "$DAR" \
  --canton-port-file "$SCRIPT_DIR/.canton-ports" \
  &
SANDBOX_PID=$!
echo "      Sandbox PID: $SANDBOX_PID"

# Wait for sandbox to be ready
echo "      Waiting for sandbox…"
sleep 10

# 3. Start JSON API in background
echo "[3/4] Starting JSON API on port 7575…"
daml json-api \
  --ledger-host localhost \
  --ledger-port 6865 \
  --http-port 7575 \
  --allow-insecure-tokens \
  &
JSON_API_PID=$!
echo "      JSON API PID: $JSON_API_PID"

sleep 3

# 4. Install UI deps & start React dev server
echo "[4/4] Starting React UI on http://localhost:3000 …"
cd "$UI_DIR"
if [ ! -d node_modules ]; then
  echo "      Installing npm packages…"
  npm install --workspaces --include-workspace-root
fi
npm run start &
UI_PID=$!

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  All services running."
echo "  UI:       http://localhost:3000"
echo "  JSON API: http://localhost:7575"
echo "  Ledger:   localhost:6865"
echo ""
echo "  To generate party tokens run:"
echo "    node generate-tokens.js"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop all services."

# Trap Ctrl+C and kill children
trap "echo 'Stopping…'; kill $SANDBOX_PID $JSON_API_PID $UI_PID 2>/dev/null; exit 0" INT TERM

wait
