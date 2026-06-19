import React, { useState } from 'react'
import { useLedger, useStreamQueries } from '@daml/react'
import { ContractId } from '@daml/types'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'

interface Props {
    investor: string
}

// Investor (Alice/Bob) view: browse live offerings, place an Indication of
// Interest (escrowing USDC), and manage existing IOIs.
export default function Marketplace({ investor }: Props) {
    const ledger = useLedger()
    const { contracts: offerings } = useStreamQueries(Instrument.Offering)
    const { contracts: myIois } = useStreamQueries(Instrument.IOI, () => [{ investor }])
    const { contracts: usdc } = useStreamQueries(Instrument.UsdcHolding, () => [{ owner: investor }])

    const totalUsdc = usdc.reduce((s, c) => s + parseFloat(c.payload.amount), 0)

    return (
        <>
            <section className="card">
                <h2>Marketplace — Live Offerings</h2>
                <p className="muted" style={{ marginBottom: '1rem' }}>
                    Your USDC balance: <strong>{totalUsdc.toLocaleString()}</strong>
                </p>
                {offerings.length === 0 && (
                    <p className="muted">No live offerings yet. Check back soon.</p>
                )}
                {offerings.map((o) => (
                    <OfferingCard
                        key={o.contractId}
                        investor={investor}
                        offeringCid={o.contractId}
                        ticker={o.payload.ticker}
                        priceTalk={o.payload.priceTalk}
                        description={o.payload.description}
                        usdc={usdc}
                        ledger={ledger}
                    />
                ))}
            </section>

            {myIois.length > 0 && (
                <section className="card">
                    <h2>My Indications of Interest</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Ticker</th>
                                <th>Max Price</th>
                                <th>Shares</th>
                                <th>Escrowed USDC</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {myIois.map((i) => (
                                <tr key={i.contractId}>
                                    <td><strong>{i.payload.ticker}</strong></td>
                                    <td>{parseFloat(i.payload.maxPrice).toLocaleString()}</td>
                                    <td>{parseFloat(i.payload.sharesDesired).toLocaleString()}</td>
                                    <td>{parseFloat(i.payload.escrowed).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="logout-btn"
                                            onClick={() =>
                                                ledger.exercise(
                                                    Instrument.IOI.CancelIOI,
                                                    i.contractId,
                                                    {},
                                                )
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    )
}

interface OfferingCardProps {
    investor: string
    offeringCid: ContractId<Instrument.Offering>
    ticker: string
    priceTalk: string
    description: string
    usdc: readonly {
        contractId: ContractId<Instrument.UsdcHolding>
        payload: { amount: string }
    }[]
    ledger: ReturnType<typeof useLedger>
}

function OfferingCard({
    investor,
    offeringCid,
    ticker,
    priceTalk,
    description,
    usdc,
    ledger,
}: OfferingCardProps) {
    const [maxPrice, setMaxPrice] = useState('12')
    const [shares, setShares] = useState('10000')
    const [status, setStatus] = useState('')

    // Merge all of the investor's USDC into a single holding that funds escrow.
    const consolidatedUsdc = async (): Promise<ContractId<Instrument.UsdcHolding>> => {
        if (usdc.length === 0) throw new Error('No USDC in wallet. Ask the issuer to mint some.')
        let baseCid = usdc[0].contractId
        for (let i = 1; i < usdc.length; i++) {
            const [merged] = await ledger.exercise(Instrument.UsdcHolding.MergeUsdc, baseCid, {
                otherCid: usdc[i].contractId,
            })
            baseCid = merged
        }
        return baseCid
    }

    const placeIoi = async () => {
        const price = parseFloat(maxPrice)
        const qty = parseFloat(shares)
        if (isNaN(price) || price <= 0) { setStatus('Enter a positive max price.'); return }
        if (isNaN(qty) || qty <= 0) { setStatus('Enter a positive share count.'); return }
        const cost = price * qty
        const have = usdc.reduce((s, c) => s + parseFloat(c.payload.amount), 0)
        if (cost > have) {
            setStatus(`Escrow ${cost.toLocaleString()} USDC exceeds your balance ${have.toLocaleString()}.`)
            return
        }
        setStatus('Placing IOI…')
        try {
            const usdcCid = await consolidatedUsdc()
            await ledger.exercise(Instrument.Offering.PlaceIOI, offeringCid, {
                investor,
                usdcCid,
                maxPrice: price.toFixed(10),
                sharesDesired: qty.toFixed(10),
            })
            setStatus(`✓ IOI placed — escrowed ${cost.toLocaleString()} USDC.`)
        } catch (e: unknown) {
            setStatus(`Error: ${(e as Error).message}`)
        }
    }

    const cost = (parseFloat(maxPrice) || 0) * (parseFloat(shares) || 0)

    return (
        <div className="offering-card">
            <div className="offering-head">
                <span className="offering-ticker">{ticker}</span>
                <span className="offering-price">{priceTalk}</span>
            </div>
            <p className="muted">{description}</p>
            <div className="form-grid" style={{ marginTop: '0.75rem' }}>
                <label>Max price / share</label>
                <input type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                <label>Shares desired</label>
                <input type="number" min="0" value={shares} onChange={(e) => setShares(e.target.value)} />
            </div>
            <p className="muted">
                Escrow required: <strong>{cost.toLocaleString()} USDC</strong>
            </p>
            <button onClick={placeIoi}>Place Indication of Interest</button>
            {status && <p className="status">{status}</p>}
        </div>
    )
}
