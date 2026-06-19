import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import { ContractId } from '@daml/types'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useDisplayName } from '../PartiesContext'

interface Props {
    issuer: string
}

// Issuer view: the order book of investor IOIs. The issuer sets a single
// clearing "deal price" (the same for everyone); only orders whose max price
// is at or above the deal price can be filled, and they settle at that price.
export default function IoiBook({ issuer }: Props) {
    const ledger = useLedger()
    const { contracts: iois } = useStreamQueries(Instrument.IOI, () => [{ issuer }])
    const [dealPrice, setDealPrice] = useState('')
    const [status, setStatus] = useState('')

    const price = parseFloat(dealPrice)
    const priceValid = !isNaN(price) && price > 0
    const isEligible = (maxPrice: string) => priceValid && price <= parseFloat(maxPrice)

    const handleAllocateAll = async () => {
        if (!priceValid) { setStatus('Enter a valid deal price first.'); return }
        const eligible = iois.filter((i) => isEligible(i.payload.maxPrice))
        if (eligible.length === 0) { setStatus('No orders at or above the deal price.'); return }
        setStatus(`Allocating ${eligible.length} order(s) in full at ${price.toLocaleString()}…`)
        try {
            await Promise.all(
                eligible.map((i) =>
                    ledger.exercise(Instrument.IOI.Allocate, i.contractId, {
                        dealPrice: price.toFixed(10),
                        sharesToAllocate: parseFloat(i.payload.sharesDesired).toFixed(10),
                    }),
                ),
            )
            setStatus(`✓ Allocated ${eligible.length} order(s) at ${price.toLocaleString()}.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <section className="card">
            <h2>IOI Book — Allocate Shares</h2>

            <div className="form-grid">
                <label>Deal price (per share, applies to all)</label>
                <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 100.00"
                    value={dealPrice}
                    onChange={(e) => setDealPrice(e.target.value)}
                />
            </div>
            <p className="muted" style={{ marginTop: '0.25rem' }}>
                Everyone fills at this single price. Orders with a max price below it are not eligible.
            </p>
            <button onClick={handleAllocateAll} disabled={!priceValid} style={{ marginBottom: '1rem' }}>
                Allocate all eligible orders in full
            </button>
            {status && <p className="status">{status}</p>}

            {iois.length === 0 && (
                <p className="muted">No indications of interest yet.</p>
            )}
            {iois.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Investor</th>
                            <th>Ticker</th>
                            <th>Max Price</th>
                            <th>Shares Wanted</th>
                            <th>Escrowed</th>
                            <th>Status</th>
                            <th>Allocate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {iois.map((i) => (
                            <IoiRow
                                key={i.contractId}
                                contractId={i.contractId}
                                investor={i.payload.investor}
                                ticker={i.payload.ticker}
                                maxPrice={i.payload.maxPrice}
                                sharesDesired={i.payload.sharesDesired}
                                escrowed={i.payload.escrowed}
                                dealPrice={dealPrice}
                                priceValid={priceValid}
                                eligible={isEligible(i.payload.maxPrice)}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    )
}

interface RowProps {
    contractId: ContractId<Instrument.IOI>
    investor: string
    ticker: string
    maxPrice: string
    sharesDesired: string
    escrowed: string
    dealPrice: string
    priceValid: boolean
    eligible: boolean
}

function IoiRow({
    contractId,
    investor,
    ticker,
    maxPrice,
    sharesDesired,
    escrowed,
    dealPrice,
    priceValid,
    eligible,
}: RowProps) {
    const ledger = useLedger()
    const displayName = useDisplayName()
    const [alloc, setAlloc] = useState(sharesDesired)
    const [status, setStatus] = useState('')

    const handleAllocate = async () => {
        const price = parseFloat(dealPrice)
        if (isNaN(price) || price <= 0) { setStatus('Set a deal price.'); return }
        if (!eligible) { setStatus('Below deal price'); return }
        const n = parseFloat(alloc)
        if (isNaN(n) || n < 0 || n > parseFloat(sharesDesired)) {
            setStatus(`0–${sharesDesired}`)
            return
        }
        setStatus('…')
        try {
            await ledger.exercise(Instrument.IOI.Allocate, contractId, {
                dealPrice: price.toFixed(10),
                sharesToAllocate: n.toFixed(10),
            })
            setStatus('✓')
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    return (
        <tr>
            <td><strong>{displayName(investor)}</strong></td>
            <td>{ticker}</td>
            <td>{parseFloat(maxPrice).toLocaleString()}</td>
            <td>{parseFloat(sharesDesired).toLocaleString()}</td>
            <td>{parseFloat(escrowed).toLocaleString()}</td>
            <td>
                {!priceValid ? (
                    <span className="muted">—</span>
                ) : eligible ? (
                    <span style={{ color: 'var(--success)' }}>Eligible</span>
                ) : (
                    <span className="muted">Below deal price</span>
                )}
            </td>
            <td>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <input
                        type="number"
                        min="0"
                        max={sharesDesired}
                        value={alloc}
                        onChange={(e) => setAlloc(e.target.value)}
                        style={{ width: '110px' }}
                        disabled={!eligible}
                    />
                    <button onClick={handleAllocate} disabled={!eligible}>Allocate</button>
                    {status && <span className="status" style={{ margin: 0 }}>{status}</span>}
                </div>
            </td>
        </tr>
    )
}
