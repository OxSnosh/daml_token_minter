import React from 'react'
import CreateInstrument from './CreateInstrument'
import LaunchOffering from './LaunchOffering'
import MintUsdc from './MintUsdc'
import IoiBook from './IoiBook'
import Marketplace from './Marketplace'
import Balances from './Balances'
import { useDisplayName } from '../PartiesContext'

interface Props {
    party: string
    onLogout: () => void
}

export default function Dashboard({ party, onLogout }: Props) {
    const displayName = useDisplayName()
    const name = displayName(party)
    const isIssuer = name === 'Issuer'

    return (
        <div className="dashboard">
            <header className="dash-header">
                <div>
                    <span className="logo">SPCX Marketplace</span>
                    <span className="party-badge">Logged in as: <strong>{name}</strong></span>
                </div>
                <button className="logout-btn" onClick={onLogout}>Switch Party</button>
            </header>

            <main className="dash-main">
                <Balances />

                {isIssuer ? (
                    <>
                        <MintUsdc issuer={party} />
                        <CreateInstrument issuer={party} />
                        <LaunchOffering issuer={party} />
                        <IoiBook issuer={party} />
                    </>
                ) : (
                    <Marketplace investor={party} />
                )}
            </main>
        </div>
    )
}
