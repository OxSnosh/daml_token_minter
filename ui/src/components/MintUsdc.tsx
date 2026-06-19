import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useParties, useDisplayName } from '../PartiesContext'

interface Props {
    issuer: string
}

const SEED_AMOUNT = '1000000'

// Issuer mints USDC into investor wallets. USDC is signatory-issuer only, so
// the issuer can create holdings directly.
export default function MintUsdc({ issuer }: Props) {
    const ledger = useLedger()
    const parties = useParties()
    const displayName = useDisplayName()
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState(SEED_AMOUNT)
    const [status, setStatus] = useState('')

    const investors = parties.filter((p) => p.identifier !== issuer)

    const mint = async (owner: string, amt: string) => {
        await ledger.create(Instrument.UsdcHolding, { issuer, owner, amount: amt })
    }

    const handleMint = async () => {
        const owner = recipient.trim()
        if (!owner) { setStatus('Select a recipient.'); return }
        const amt = parseFloat(amount)
        if (isNaN(amt) || amt <= 0) { setStatus('Enter a positive amount.'); return }
        setStatus('Minting…')
        try {
            await mint(owner, amt.toFixed(0))
            setStatus(`✓ Minted ${amt.toLocaleString()} USDC to ${displayName(owner)}.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    const seedDemo = async () => {
        setStatus('Seeding demo wallets…')
        try {
            await Promise.all(investors.map((p) => mint(p.identifier, SEED_AMOUNT)))
            setStatus(`✓ Minted ${Number(SEED_AMOUNT).toLocaleString()} USDC to each investor.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <section className="card">
            <h2>Mint USDC</h2>
            <button onClick={seedDemo} style={{ marginBottom: '1rem' }}>
                Seed demo: 1,000,000 USDC → each investor
            </button>
            <div className="form-grid">
                <label>Recipient</label>
                <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                    <option value="">— select party —</option>
                    {investors.map((p) => (
                        <option key={p.identifier} value={p.identifier}>
                            {p.displayName}
                        </option>
                    ))}
                </select>

                <label>Amount (USDC)</label>
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <button onClick={handleMint}>Mint USDC</button>
            {status && <p className="status">{status}</p>}
        </section>
    )
}
