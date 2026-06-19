import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useParties, useDisplayName } from '../PartiesContext'

interface Props {
    issuer: string
}

export default function AllowlistParty({ issuer }: Props) {
    const ledger = useLedger()
    const allParties = useParties()
    const displayName = useDisplayName()
    const [partyInput, setPartyInput] = useState('')
    const [ticker, setTicker] = useState('SPCX')
    const [status, setStatus] = useState('')

    // Parties that can be allowlisted = everyone except the issuer.
    const selectableParties = allParties.filter((p) => p.identifier !== issuer)

    const { contracts: instruments } = useStreamQueries(Instrument.EquityInstrument, () => [{ issuer }])
    const { contracts: entries } = useStreamQueries(Instrument.AllowlistEntry, () => [{ issuer }])

    const handleAllowlist = async () => {
        const party = partyInput.trim()
        if (!party) { setStatus('Enter a party name.'); return }

        const instrument = instruments.find((c) => c.payload.ticker === ticker)
        if (!instrument) {
            setStatus(`No instrument found for ticker ${ticker}. Create it first.`)
            return
        }

        const alreadyAllowlisted = entries.some(
            (e) => e.payload.party === party && e.payload.ticker === ticker
        )
        if (alreadyAllowlisted) {
            setStatus(`${displayName(party)} is already allowlisted for ${ticker}.`)
            return
        }

        setStatus('Allowlisting…')
        try {
            await ledger.exercise(Instrument.EquityInstrument.AllowlistParty, instrument.contractId, {
                party,
            })
            setStatus(`✓ ${displayName(party)} allowlisted for ${ticker}.`)
            setPartyInput('')
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <section className="card">
            <h2>2. Allowlist a Party</h2>
            <div className="form-grid">
                <label>Ticker</label>
                <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
                    {instruments.map((c) => (
                        <option key={c.contractId} value={c.payload.ticker}>
                            {c.payload.ticker}
                        </option>
                    ))}
                </select>

                <label>Party to allowlist</label>
                <select value={partyInput} onChange={(e) => setPartyInput(e.target.value)}>
                    <option value="">— select party —</option>
                    {selectableParties.map((p) => (
                        <option key={p.identifier} value={p.identifier}>
                            {p.displayName}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleAllowlist}>Allowlist Party</button>
            {status && <p className="status">{status}</p>}

            {entries.length > 0 && (
                <div className="existing-list">
                    <strong>Current allowlist:</strong>
                    <ul>
                        {entries.map((e) => (
                            <li key={e.contractId}>
                                <code>{displayName(e.payload.party)}</code> — {e.payload.ticker}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
