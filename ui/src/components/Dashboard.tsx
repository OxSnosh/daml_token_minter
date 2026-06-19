import React from 'react'
import CreateInstrument from './CreateInstrument'
import AllowlistParty from './AllowlistParty'
import MintShares from './MintShares'
import Holdings from './Holdings'
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
                    <span className="logo">SPCX Equity</span>
                    <span className="party-badge">Logged in as: <strong>{name}</strong></span>
                </div>
                <button className="logout-btn" onClick={onLogout}>Switch Party</button>
            </header>

            <main className="dash-main">
                <Holdings party={party} />

                {isIssuer && (
                    <>
                        <CreateInstrument issuer={party} />
                        <AllowlistParty issuer={party} />
                        <MintShares issuer={party} />
                    </>
                )}

                {!isIssuer && (
                    <div className="info-box">
                        <p>You are viewing as <strong>{name}</strong>. Holdings above show shares you own.</p>
                        <p>Switch to <strong>Issuer</strong> to create instruments, allowlist parties, and mint shares.</p>
                    </div>
                )}
            </main>
        </div>
    )
}
