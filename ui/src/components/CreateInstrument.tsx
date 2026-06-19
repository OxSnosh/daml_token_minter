import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'

interface Props {
    issuer: string
}

export default function CreateInstrument({ issuer }: Props) {
    const ledger = useLedger()
    const [ticker, setTicker] = useState('SPCX')
    const [name, setName] = useState('SpaceX Inc.')
    const [description, setDescription] = useState(
        'Tokenized equity representing one share of SpaceX common stock on the Canton Network.'
    )
    const [status, setStatus] = useState('')

    const { contracts } = useStreamQueries(Instrument.EquityInstrument, () => [{ issuer }])
    const existing = contracts.find((c) => c.payload.ticker === ticker)

    const handleCreate = async () => {
        if (existing) {
            setStatus('Instrument already exists for this ticker.')
            return
        }
        setStatus('Creating…')
        try {
            await ledger.create(Instrument.EquityInstrument, { issuer, ticker, name, description })
            setStatus(`✓ Created ${ticker} instrument.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <section className="card">
            <h2>1. Create Equity Instrument</h2>
            <div className="form-grid">
                <label>Ticker</label>
                <input value={ticker} onChange={(e) => setTicker(e.target.value)} />

                <label>Company Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />

                <label>Description</label>
                <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={handleCreate} disabled={!!existing}>
                {existing ? `${ticker} already exists` : 'Create Instrument'}
            </button>
            {status && <p className="status">{status}</p>}

            {contracts.length > 0 && (
                <div className="existing-list">
                    <strong>Existing instruments:</strong>
                    <ul>
                        {contracts.map((c) => (
                            <li key={c.contractId}>
                                <code>{c.payload.ticker}</code> — {c.payload.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}

