import React, { useEffect, useState } from 'react'
import { useParties, useDisplayName } from '../PartiesContext'
import {
    queryAs,
    USDC_TID,
    EQUITY_TID,
    UsdcHolding,
    EquityHolding,
    Contract,
} from '../ledger'

// Polls the ledger (as the Issuer, who is signatory on every holding) for all
// USDC and equity balances so every party's wallet is always visible.
export default function Balances() {
    const parties = useParties()
    const displayName = useDisplayName()
    const issuer = parties.find((p) => p.displayName === 'Issuer')

    const [usdc, setUsdc] = useState<Contract<UsdcHolding>[]>([])
    const [equity, setEquity] = useState<Contract<EquityHolding>[]>([])

    useEffect(() => {
        if (!issuer) return
        let active = true
        const load = async () => {
            try {
                const [u, e] = await Promise.all([
                    queryAs<UsdcHolding>(issuer.identifier, [USDC_TID]),
                    queryAs<EquityHolding>(issuer.identifier, [EQUITY_TID]),
                ])
                if (active) {
                    setUsdc(u)
                    setEquity(e)
                }
            } catch {
                /* ignore transient polling errors */
            }
        }
        load()
        const t = setInterval(load, 2500)
        return () => {
            active = false
            clearInterval(t)
        }
    }, [issuer])

    // Aggregate USDC per owner.
    const usdcByOwner: Record<string, number> = {}
    for (const c of usdc) {
        usdcByOwner[c.payload.owner] =
            (usdcByOwner[c.payload.owner] ?? 0) + parseFloat(c.payload.amount)
    }

    // Aggregate equity per owner+ticker.
    const tickers = Array.from(new Set(equity.map((c) => c.payload.ticker))).sort()
    const equityByOwner: Record<string, Record<string, number>> = {}
    for (const c of equity) {
        const o = c.payload.owner
        equityByOwner[o] = equityByOwner[o] ?? {}
        equityByOwner[o][c.payload.ticker] =
            (equityByOwner[o][c.payload.ticker] ?? 0) + parseFloat(c.payload.amount)
    }

    const fmt = (n: number) =>
        n.toLocaleString(undefined, { maximumFractionDigits: 2 })

    return (
        <section className="card holdings-card">
            <h2>Token Balances — All Parties</h2>
            <table>
                <thead>
                    <tr>
                        <th>Party</th>
                        <th>USDC</th>
                        {tickers.map((t) => (
                            <th key={t}>{t}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {parties.map((p) => (
                        <tr key={p.identifier}>
                            <td><strong>{displayName(p.identifier)}</strong></td>
                            <td>{fmt(usdcByOwner[p.identifier] ?? 0)}</td>
                            {tickers.map((t) => (
                                <td key={t}>
                                    {fmt(equityByOwner[p.identifier]?.[t] ?? 0)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="muted" style={{ marginTop: '0.5rem' }}>
                Live — refreshes every 2.5s.
            </p>
        </section>
    )
}
