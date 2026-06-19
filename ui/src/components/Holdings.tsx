import React from 'react'
import { useStreamQueries } from '@daml/react'
import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'
import { useDisplayName } from '../PartiesContext'

interface Props {
    party: string
}

export default function Holdings({ party }: Props) {
    const displayName = useDisplayName()
    const name = displayName(party)
    const { contracts, loading } = useStreamQueries(Instrument.EquityHolding)

    // Group holdings by ticker
    const byTicker: Record<string, number> = {}
    for (const c of contracts) {
        const t = c.payload.ticker
        byTicker[t] = (byTicker[t] ?? 0) + parseFloat(c.payload.amount)
    }

    return (
        <section className="card holdings-card">
            <h2>Holdings — {name}</h2>
            {loading && <p className="muted">Loading…</p>}
            {!loading && contracts.length === 0 && (
                <p className="muted">No holdings found for {name}.</p>
            )}
            {!loading && Object.keys(byTicker).length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Total Shares</th>
                            <th>Individual Lots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(byTicker).map(([ticker, total]) => (
                            <tr key={ticker}>
                                <td><strong>{ticker}</strong></td>
                                <td>{total.toLocaleString()}</td>
                                <td>
                                    {contracts
                                        .filter((c) => c.payload.ticker === ticker)
                                        .map((c, i) => (
                                            <span key={c.contractId} className="lot-badge">
                                                {i + 1}: {parseFloat(c.payload.amount).toLocaleString()}
                                            </span>
                                        ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    )
}
