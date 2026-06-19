import { createContext, useContext } from 'react'

export interface PartyInfo {
    displayName: string
    identifier: string
}

/** List of parties allocated on the ledger (full namespaced identifiers). */
export const PartiesContext = createContext<PartyInfo[]>([])

export function useParties(): PartyInfo[] {
    return useContext(PartiesContext)
}

/** Returns a function mapping a full party identifier to its display name. */
export function useDisplayName(): (identifier: string) => string {
    const parties = useParties()
    return (identifier: string) =>
        parties.find((p) => p.identifier === identifier)?.displayName ?? identifier
}
