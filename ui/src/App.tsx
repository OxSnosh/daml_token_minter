import React, { useEffect, useState } from 'react'
import DamlLedger from '@daml/react'
import Dashboard from './components/Dashboard'
import { PartiesContext, PartyInfo } from './PartiesContext'
import { devToken, JSON_API_URL } from './ledger'

// Bootstrap token used only to list/allocate parties. The /v1/parties
// endpoints accept any structurally valid token in dev mode.
function bootstrapToken(): string {
    return devToken('bootstrap')
}

// Parties the demo expects to exist on the ledger.
const REQUIRED_PARTIES = ['Issuer', 'Alice', 'Bob']

async function allocateParty(hint: string): Promise<void> {
    await fetch(JSON_API_URL + 'v1/parties/allocate', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${bootstrapToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifierHint: hint, displayName: hint }),
    })
}

async function loadParties(): Promise<PartyInfo[]> {
    const res = await fetch(JSON_API_URL + 'v1/parties', {
        headers: { Authorization: `Bearer ${bootstrapToken()}` },
    })
    const data = await res.json()
    return (data.result ?? [])
        .filter((p: { displayName?: string }) => !!p.displayName)
        .map((p: { displayName: string; identifier: string }) => ({
            displayName: p.displayName,
            identifier: p.identifier,
        }))
}

export default function App() {
    const [parties, setParties] = useState<PartyInfo[]>([])
    const [loadError, setLoadError] = useState('')
    const [party, setParty] = useState<string | null>(null)
    const [token, setToken] = useState('')
    const [customToken, setCustomToken] = useState('')
    const [useCustomToken, setUseCustomToken] = useState(false)

    useEffect(() => {
        ; (async () => {
            try {
                let list = await loadParties()
                // Auto-allocate any missing demo parties so the app is
                // self-bootstrapping after a fresh sandbox start.
                const missing = REQUIRED_PARTIES.filter(
                    (name) => !list.some((p) => p.displayName === name),
                )
                if (missing.length > 0) {
                    await Promise.all(missing.map(allocateParty))
                    list = await loadParties()
                }
                setParties(list)
                if (list.length === 0) {
                    setLoadError('No named parties found. Is the JSON API running on port 7575?')
                }
            } catch (e) {
                setLoadError(`Could not load parties: ${(e as Error).message}`)
            }
        })()
    }, [])

    if (!party) {
        return (
            <div className="login-wrapper">
                <div className="login-card">
                    <h1>SPCX Equity</h1>
                    <p className="subtitle">Canton Network — Tokenized Stock Demo</p>

                    <h2>Select a party</h2>
                    {loadError && <p className="status">{loadError}</p>}
                    <div className="party-buttons">
                        {parties.map((p) => (
                            <button
                                key={p.identifier}
                                onClick={() => {
                                    setToken(useCustomToken ? customToken : devToken(p.identifier))
                                    setParty(p.identifier)
                                }}
                            >
                                {p.displayName}
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
        <PartiesContext.Provider value={parties}>
            <DamlLedger party={party} token={token} httpBaseUrl={JSON_API_URL}>
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
        </PartiesContext.Provider>
    )
}
