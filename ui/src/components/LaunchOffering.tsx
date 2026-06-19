import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useParties } from '../PartiesContext'

interface Props {
    issuer: string
}

// Issuer launches an IPO offering for a previously-defined instrument.
export default function LaunchOffering({ issuer }: Props) {
    const ledger = useLedger()
    const parties = useParties()
    const [ticker, setTicker] = useState('SPCX')
    const [priceTalk, setPriceTalk] = useState('$10.00 – $12.00 per share')
    const [description, setDescription] = useState(
        'Initial public offering of tokenized SpaceX equity on the Canton Network.'
    )
    const [status, setStatus] = useState('')

    const investorParties = parties.filter((p) => p.identifier !== issuer)
    const { contracts: instruments } = useStreamQueries(Instrument.EquityInstrument, () => [{ issuer }])
    const { contracts: offerings } = useStreamQueries(Instrument.Offering, () => [{ issuer }])

    const handleLaunch = async () => {
        const instrument = instruments.find((c) => c.payload.ticker === ticker)
        if (!instrument) {
            setStatus(`No instrument found for ${ticker}. Define the token first.`)
            return
        }
        if (offerings.some((o) => o.payload.ticker === ticker)) {
            setStatus(`An offering for ${ticker} already exists.`)
            return
        }
        setStatus('Launching…')
        try {
            await ledger.exercise(Instrument.EquityInstrument.LaunchOffering, instrument.contractId, {
                investors: investorParties.map((p) => p.identifier),
                priceTalk,
                offeringDescription: description,
            })
            setStatus(`✓ Offering launched for ${ticker}.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <section className="card">
            <h2>Launch IPO Offering</h2>
            <div className="form-grid">
                <label>Instrument</label>
                <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
                    {instruments.length === 0 && <option value="">— define a token first —</option>}
                    {instruments.map((c) => (
                        <option key={c.contractId} value={c.payload.ticker}>
                            {c.payload.ticker} — {c.payload.name}
                        </option>
                    ))}
                </select>

                <label>Price talk</label>
                <input value={priceTalk} onChange={(e) => setPriceTalk(e.target.value)} />

                <label>Description</label>
                <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={handleLaunch} disabled={instruments.length === 0}>
                Launch Offering
            </button>
            {status && <p className="status">{status}</p>}

            {offerings.length > 0 && (
                <div className="existing-list">
                    <strong>Live offerings:</strong>
                    <ul>
                        {offerings.map((o) => (
                            <li key={o.contractId}>
                                <code>{o.payload.ticker}</code> — {o.payload.priceTalk}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
