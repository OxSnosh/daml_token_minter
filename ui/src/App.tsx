import React, { useState } from 'react'
import DamlLedger from '@daml/react'
import Dashboard from './components/Dashboard'

// ---------------------------------------------------------------------------
// Dev-mode token — works with: daml start (--allow-insecure-tokens, no sig check)
// ---------------------------------------------------------------------------

function b64url(obj: object): string {
    return btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

function devToken(party: string): string {
    const header = b64url({ alg: 'HS256', typ: 'JWT' })
    const payload = b64url({
        'https://daml.com/ledger-api': {
            ledgerId: 'sandbox',
            actAs: [party],
            readAs: [party],
            applicationId: 'spcx-app',
        },
    })
    // Signature is not verified in dev mode (--allow-insecure-tokens).
    return `${header}.${payload}.dev`
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
                                onClick={() => {
                                    setToken(useCustomToken ? customToken : devToken(p))
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
