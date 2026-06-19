import * as Instrument from '@daml.js/spcx-equity-1.0.0/lib/Equity/Instrument'

// ---------------------------------------------------------------------------
// Shared JSON API helpers. Dev-mode only: tokens are unsigned (the sandbox
// runs without enforced auth) but must carry the ledgerId and the full
// namespaced party identifier, e.g. "Issuer::1220abc…".
// ---------------------------------------------------------------------------

export const LEDGER_ID = 'sandbox'
// Same-origin so requests go through the Vite proxy → no CORS.
export const JSON_API_URL = window.location.origin + '/'

function b64url(obj: object): string {
    return btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
}

export function devToken(partyId: string): string {
    const header = b64url({ alg: 'HS256', typ: 'JWT' })
    const payload = b64url({
        'https://daml.com/ledger-api': {
            ledgerId: LEDGER_ID,
            actAs: [partyId],
            readAs: [partyId],
            applicationId: 'spcx-app',
        },
    })
    return `${header}.${payload}.dev`
}

export interface Contract<T> {
    contractId: string
    payload: T
}

/** Run a /v1/query as a given party and return matching contracts. */
export async function queryAs<T>(
    partyId: string,
    templateIds: string[],
): Promise<Contract<T>[]> {
    const res = await fetch(JSON_API_URL + 'v1/query', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${devToken(partyId)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ templateIds }),
    })
    const data = await res.json()
    return (data.result ?? []) as Contract<T>[]
}

// Template id strings (packageId:Module:Entity) from the generated bindings.
export const USDC_TID = Instrument.UsdcHolding.templateId
export const EQUITY_TID = Instrument.EquityHolding.templateId

export interface UsdcHolding {
    issuer: string
    owner: string
    amount: string
}

export interface EquityHolding {
    issuer: string
    owner: string
    ticker: string
    amount: string
}
