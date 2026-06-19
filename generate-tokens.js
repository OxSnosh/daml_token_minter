#!/usr/bin/env node
/**
 * generate-tokens.js
 *
 * Generates HS256-signed JWT tokens for the local sandbox (started with
 * --auth-jwt-hs256-unsafe secret).
 *
 * Usage:
 *   node generate-tokens.js
 *
 * Requires: npm install jsonwebtoken  (run once from repo root)
 */

const jwt = require('jsonwebtoken')

const SECRET = 'secret'   // matches --auth-jwt-hs256-unsafe secret
const APP_ID = 'spcx-app'
const PARTIES = ['Issuer', 'Alice', 'Bob']

console.log('=== SPCX Equity — Party JWT Tokens ===\n')

for (const party of PARTIES) {
  const token = jwt.sign(
    {
      'https://daml.com/ledger-api': {
        actAs: [party],
        readAs: [party],
        applicationId: APP_ID,
      },
    },
    SECRET,
    { algorithm: 'HS256', noTimestamp: true }
  )
  console.log(`${party}:\n${token}\n`)
}
