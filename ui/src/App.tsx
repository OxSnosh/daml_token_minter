import React, { useState } from 'react'
import DamlLedger from '@daml/react'
import Dashboard from './components/Dashboard'

// ---------------------------------------------------------------------------
// Token helpers — HS256-signed via Web Crypto API (no external deps).
// Matches the secret passed to: daml json-api --auth-jwt-hs256-unsafe secret
// ---------------------------------------------------------------------------

const JWT_SECRET = 'secret'

function b64url(obj: object): string {
    return btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

async function makeToken(party: string): Promise<string> {
    const header = b64url({ alg: 'HS256', typ: 'JWT' })
    const payload = b64url({
        'https://daml.com/ledger-api': {
            actAs: [party],
            readAs: [party],
            applicationId: 'spcx-app',
        },
    })
    const sigInput = `${header}.${payload}`
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
        'raw',
        enc.encode(JWT_SECRET),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    )
    const sigBytes = await crypto.subtle.sign('HMAC', key, enc.encode(sigInput))
    const sig = btoa(String.fromCharCode(...new Uint8Array(sigBytes)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
    return `${sigInput}.${sig}`
}

const KNOWN_PARTIES = ['Issuer', 'Alice', 'Bob']
// Use current origin so requests go through Vite proxy → no CORS
const JSON_API_URL = window.location.origin + '/'

export default function App() {
    const [party, setParty] = useState<string | null>(null)
    const [token, setToken] = useState('')
    const [customToken, setCustomToken] = useState('')
    const [useCustomToken, setUseCustomToken] = useState(false)

    if (!party) {
        return (
            <div className="login-wrapper">
                <div className="login-card">
                    <h1>SPCX Equity</h1>
                    <p className="subtitle">Canton Network — Tokenized Stock Demo</p>

                    <h2>Select a party</h2>
                    <div className="party-buttons">
                        {KNOWN_PARTIES.map((p) => (
                            <button
                                key={p}
                                onClick={async () => {
                                    const t = useCustomToken ? customToken : await makeToken(p)
                                    setToken(t)
                                    setParty(p)
                                }}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <details style={{ marginTop: '1rem' }}>
                        <summary style={{ cursor: 'pointer', color: '#888' }}>
                            Use a custom JWT token
                        </summary>
                        <div style={{ marginTop: '0.5rem' }}>
                            <textarea
                                rows={4}
                                style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.7rem' }}
                                placeholder="Paste your JWT here…"
                                value={customToken}
                                onChange={(e) => {
                                    setCustomToken(e.target.value)
                                    setUseCustomToken(true)
                                }}
                            />
                        </div>
                    </details>
                </div>
            </div>
        )
    }

    return (
        <DamlLedger
            party={party}
            token={token}
            httpBaseUrl={JSON_API_URL}
        >
            <Dashboard
                party={party}
                onLogout={() => {
                    setParty(null)
                    setToken('')
                    setUseCustomToken(false)
                    setCustomToken('')
                }}
            />
        </DamlLedger>
    )
}


// ---------------------------------------------------------------------------
// Token helpers
// In sandbox dev-mode the JSON API accepts HS256 tokens signed with "secret".
// The helper below encodes the claims without a real crypto library so the
// prototype has zero extra runtime dependencies.  Use the generate-tokens.js
// script (root of repo) to produce properly-signed tokens when needed.
// ---------------------------------------------------------------------------

function b64url(obj: object): string {
    return btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

/** Build an UNSIGNED dev token (works when sandbox runs with no auth or
 *  with --auth-jwt-hs256-unsafe secret).  For a real HS256-signed token
 *  run `node generate-tokens.js` and paste the output below. */
function devToken(party: string): string {
    const header = b64url({ alg: 'HS256', typ: 'JWT' })
    const payload = b64url({
        'https://daml.com/ledger-api': {
            actAs: [party],
            readAs: [party],
            applicationId: 'spcx-app',
        },
    })
    // Fake signature — only works when sandbox runs with no auth enforcement.
    // Replace with real signature from generate-tokens.js for enforced auth.
    return `${header}.${payload}.dev-mode-no-sig`
}

const KNOWN_PARTIES = ['Issuer', 'Alice', 'Bob']
// Use the current page origin so all /v1/* requests go through the Vite proxy
// (configured in vite.config.ts) and avoid cross-origin CORS issues.
const JSON_API_URL = window.location.origin + '/'

export default function App() {
    const [party, setParty] = useState<string | null>(null)
    const [token, setToken] = useState('')
    const [customToken, setCustomToken] = useState('')
    const [useCustomToken, setUseCustomToken] = useState(false)

    if (!party) {
        return (
            <div className="login-wrapper">
                <div className="login-card">
                    <h1>SPCX Equity</h1>
                    <p className="subtitle">Canton Network — Tokenized Stock Demo</p>

                    <h2>Select a party</h2>
                    <div className="party-buttons">
                        {KNOWN_PARTIES.map((p) => (
                            <button
                                key={p}
                                onClick={() => {
                                    setParty(p)
                                    setToken(useCustomToken ? customToken : devToken(p))
                                }}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <details style={{ marginTop: '1rem' }}>
                        <summary style={{ cursor: 'pointer', color: '#888' }}>
                            Use a custom JWT token
                        </summary>
                        <div style={{ marginTop: '0.5rem' }}>
                            <textarea
                                rows={4}
                                style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.7rem' }}
                                placeholder="Paste your JWT here…"
                                value={customToken}
                                onChange={(e) => {
                                    setCustomToken(e.target.value)
                                    setUseCustomToken(true)
                                }}
                            />
                        </div>
                    </details>
                </div>
            </div>
        )
    }

    return (
        <DamlLedger
            party={party}
            token={token}
            httpBaseUrl={JSON_API_URL}
        >
            <Dashboard
                party={party}
                onLogout={() => {
                    setParty(null)
                    setToken('')
                    setUseCustomToken(false)
                    setCustomToken('')
                }}
            />
        </DamlLedger>
    )
}
