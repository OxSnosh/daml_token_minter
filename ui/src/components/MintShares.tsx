import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useDisplayName } from '../PartiesContext'

interface Props {
    issuer: string
}

export default function MintShares({ issuer }: Props) {
    const ledger = useLedger()
    const displayName = useDisplayName()
    const [ticker, setTicker] = useState('SPCX')
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState('1000')
    const [status, setStatus] = useState('')

    const { contracts: instruments } = useStreamQueries(Instrument.EquityInstrument, () => [{ issuer }])
    const { contracts: entries } = useStreamQueries(Instrument.AllowlistEntry, () => [{ issuer }])

    const handleMint = async () => {
        const party = recipient.trim()
        if (!party) { setStatus('Select a recipient.'); return }
        const amt = parseFloat(amount)
        if (isNaN(amt) || amt <= 0) { setStatus('Enter a positive share amount.'); return }

        const instrument = instruments.find((c) => c.payload.ticker === ticker)
        if (!instrument) {
            setStatus(`No instrument found for ${ticker}. Create it first.`)
            return
        }

        const allowlistEntry = entries.find(
            (e) => e.payload.party === party && e.payload.ticker === ticker
        )
        if (!allowlistEntry) {
            setStatus(`${party} is not allowlisted for ${ticker}. Allowlist them first.`)
            return
        }

        setStatus('Minting…')
        try {
            await ledger.exercise(Instrument.EquityInstrument.MintShares, instrument.contractId, {
                recipient: party,
                amount: amt.toFixed(10),
                allowlistCid: allowlistEntry.contractId,
            })
            setStatus(`✓ Minted ${amt.toLocaleString()} ${ticker} shares to ${displayName(party)}.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    const allowlistedParties = entries
        .filter((e) => e.payload.ticker === ticker)
        .map((e) => e.payload.party)

    return (
        <section className="card">
            <h2>3. Mint Shares</h2>
            <div className="form-grid">
                <label>Ticker</label>
                <select value={ticker} onChange={(e) => setTicker(e.target.value)}>
                    {instruments.map((c) => (
                        <option key={c.contractId} value={c.payload.ticker}>
                            {c.payload.ticker}
                        </option>
                    ))}
                </select>

                <label>Recipient (allowlisted)</label>
                <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                    <option value="">— select party —</option>
                    {allowlistedParties.map((p) => (
                        <option key={p} value={p}>
                            {displayName(p)}
                        </option>
                    ))}
                </select>

                <label>Shares to mint</label>
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button onClick={handleMint}>Mint Shares</button>
            {status && <p className="status">{status}</p>}
        </section>
    )
}
