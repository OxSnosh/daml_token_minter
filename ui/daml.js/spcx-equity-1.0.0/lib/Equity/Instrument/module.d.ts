// Generated from Equity/Instrument.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type Burn = {
};

export declare const Burn:
  damlTypes.Serializable<Burn> & {
  }
;


export declare type Merge = {
  otherCid: damlTypes.ContractId<EquityHolding>;
};

export declare const Merge:
  damlTypes.Serializable<Merge> & {
  }
;


export declare type EquityHolding = {
  issuer: damlTypes.Party;
  owner: damlTypes.Party;
  ticker: string;
  amount: damlTypes.Numeric;
};

export declare interface EquityHoldingInterface {
  Merge: damlTypes.Choice<EquityHolding, Merge, damlTypes.ContractId<EquityHolding>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<EquityHolding, undefined>>;
  Archive: damlTypes.Choice<EquityHolding, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<EquityHolding, undefined>>;
  Burn: damlTypes.Choice<EquityHolding, Burn, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<EquityHolding, undefined>>;
}
export declare const EquityHolding:
  damlTypes.Template<EquityHolding, undefined, '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:EquityHolding'> &
  damlTypes.ToInterface<EquityHolding, never> &
  EquityHoldingInterface;

export declare namespace EquityHolding {
  export type CreateEvent = damlLedger.CreateEvent<EquityHolding, undefined, typeof EquityHolding.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityHolding, typeof EquityHolding.templateId>
  export type Event = damlLedger.Event<EquityHolding, undefined, typeof EquityHolding.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityHolding, undefined, typeof EquityHolding.templateId>
}



export declare type RevokeAllowlist = {
};

export declare const RevokeAllowlist:
  damlTypes.Serializable<RevokeAllowlist> & {
  }
;


export declare type AllowlistEntry = {
  issuer: damlTypes.Party;
  ticker: string;
  party: damlTypes.Party;
};

export declare interface AllowlistEntryInterface {
  RevokeAllowlist: damlTypes.Choice<AllowlistEntry, RevokeAllowlist, {}, AllowlistEntry.Key> & damlTypes.ChoiceFrom<damlTypes.Template<AllowlistEntry, AllowlistEntry.Key>>;
  Archive: damlTypes.Choice<AllowlistEntry, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, AllowlistEntry.Key> & damlTypes.ChoiceFrom<damlTypes.Template<AllowlistEntry, AllowlistEntry.Key>>;
}
export declare const AllowlistEntry:
  damlTypes.Template<AllowlistEntry, AllowlistEntry.Key, '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:AllowlistEntry'> &
  damlTypes.ToInterface<AllowlistEntry, never> &
  AllowlistEntryInterface;

export declare namespace AllowlistEntry {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3<damlTypes.Party, string, damlTypes.Party>
  export type CreateEvent = damlLedger.CreateEvent<AllowlistEntry, AllowlistEntry.Key, typeof AllowlistEntry.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<AllowlistEntry, typeof AllowlistEntry.templateId>
  export type Event = damlLedger.Event<AllowlistEntry, AllowlistEntry.Key, typeof AllowlistEntry.templateId>
  export type QueryResult = damlLedger.QueryResult<AllowlistEntry, AllowlistEntry.Key, typeof AllowlistEntry.templateId>
}



export declare type MintShares = {
  recipient: damlTypes.Party;
  amount: damlTypes.Numeric;
  allowlistCid: damlTypes.ContractId<AllowlistEntry>;
};

export declare const MintShares:
  damlTypes.Serializable<MintShares> & {
  }
;


export declare type AllowlistParty = {
  party: damlTypes.Party;
};

export declare const AllowlistParty:
  damlTypes.Serializable<AllowlistParty> & {
  }
;


export declare type EquityInstrument = {
  issuer: damlTypes.Party;
  ticker: string;
  name: string;
  description: string;
};

export declare interface EquityInstrumentInterface {
  AllowlistParty: damlTypes.Choice<EquityInstrument, AllowlistParty, damlTypes.ContractId<AllowlistEntry>, EquityInstrument.Key> & damlTypes.ChoiceFrom<damlTypes.Template<EquityInstrument, EquityInstrument.Key>>;
  MintShares: damlTypes.Choice<EquityInstrument, MintShares, damlTypes.ContractId<EquityHolding>, EquityInstrument.Key> & damlTypes.ChoiceFrom<damlTypes.Template<EquityInstrument, EquityInstrument.Key>>;
  Archive: damlTypes.Choice<EquityInstrument, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, EquityInstrument.Key> & damlTypes.ChoiceFrom<damlTypes.Template<EquityInstrument, EquityInstrument.Key>>;
}
export declare const EquityInstrument:
  damlTypes.Template<EquityInstrument, EquityInstrument.Key, '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:EquityInstrument'> &
  damlTypes.ToInterface<EquityInstrument, never> &
  EquityInstrumentInterface;

export declare namespace EquityInstrument {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityInstrument, typeof EquityInstrument.templateId>
  export type Event = damlLedger.Event<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
}


