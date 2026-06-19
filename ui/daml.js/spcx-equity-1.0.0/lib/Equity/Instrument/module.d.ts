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
  damlTypes.Template<EquityHolding, undefined, 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:EquityHolding'> &
  damlTypes.ToInterface<EquityHolding, never> &
  EquityHoldingInterface;

export declare namespace EquityHolding {
  export type CreateEvent = damlLedger.CreateEvent<EquityHolding, undefined, typeof EquityHolding.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityHolding, typeof EquityHolding.templateId>
  export type Event = damlLedger.Event<EquityHolding, undefined, typeof EquityHolding.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityHolding, undefined, typeof EquityHolding.templateId>
}



export declare type CancelIOI = {
};

export declare const CancelIOI:
  damlTypes.Serializable<CancelIOI> & {
  }
;


export declare type Allocate = {
  dealPrice: damlTypes.Numeric;
  sharesToAllocate: damlTypes.Numeric;
};

export declare const Allocate:
  damlTypes.Serializable<Allocate> & {
  }
;


export declare type IOI = {
  issuer: damlTypes.Party;
  investor: damlTypes.Party;
  ticker: string;
  maxPrice: damlTypes.Numeric;
  sharesDesired: damlTypes.Numeric;
  escrowed: damlTypes.Numeric;
};

export declare interface IOIInterface {
  Allocate: damlTypes.Choice<IOI, Allocate, AllocationResult, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<IOI, undefined>>;
  CancelIOI: damlTypes.Choice<IOI, CancelIOI, damlTypes.ContractId<UsdcHolding>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<IOI, undefined>>;
  Archive: damlTypes.Choice<IOI, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<IOI, undefined>>;
}
export declare const IOI:
  damlTypes.Template<IOI, undefined, 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:IOI'> &
  damlTypes.ToInterface<IOI, never> &
  IOIInterface;

export declare namespace IOI {
  export type CreateEvent = damlLedger.CreateEvent<IOI, undefined, typeof IOI.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<IOI, typeof IOI.templateId>
  export type Event = damlLedger.Event<IOI, undefined, typeof IOI.templateId>
  export type QueryResult = damlLedger.QueryResult<IOI, undefined, typeof IOI.templateId>
}



export declare type AllocationResult = {
  sharesCid: damlTypes.Optional<damlTypes.ContractId<EquityHolding>>;
  refundCid: damlTypes.Optional<damlTypes.ContractId<UsdcHolding>>;
  proceedCid: damlTypes.Optional<damlTypes.ContractId<UsdcHolding>>;
};

export declare const AllocationResult:
  damlTypes.Serializable<AllocationResult> & {
  }
;


export declare type PlaceIOI = {
  investor: damlTypes.Party;
  usdcCid: damlTypes.ContractId<UsdcHolding>;
  maxPrice: damlTypes.Numeric;
  sharesDesired: damlTypes.Numeric;
};

export declare const PlaceIOI:
  damlTypes.Serializable<PlaceIOI> & {
  }
;


export declare type Offering = {
  issuer: damlTypes.Party;
  investors: damlTypes.Party[];
  ticker: string;
  priceTalk: string;
  description: string;
};

export declare interface OfferingInterface {
  PlaceIOI: damlTypes.Choice<Offering, PlaceIOI, damlTypes.ContractId<IOI>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<Offering, undefined>>;
  Archive: damlTypes.Choice<Offering, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<Offering, undefined>>;
}
export declare const Offering:
  damlTypes.Template<Offering, undefined, 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:Offering'> &
  damlTypes.ToInterface<Offering, never> &
  OfferingInterface;

export declare namespace Offering {
  export type CreateEvent = damlLedger.CreateEvent<Offering, undefined, typeof Offering.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Offering, typeof Offering.templateId>
  export type Event = damlLedger.Event<Offering, undefined, typeof Offering.templateId>
  export type QueryResult = damlLedger.QueryResult<Offering, undefined, typeof Offering.templateId>
}



export declare type LaunchOffering = {
  investors: damlTypes.Party[];
  priceTalk: string;
  offeringDescription: string;
};

export declare const LaunchOffering:
  damlTypes.Serializable<LaunchOffering> & {
  }
;


export declare type EquityInstrument = {
  issuer: damlTypes.Party;
  ticker: string;
  name: string;
  description: string;
};

export declare interface EquityInstrumentInterface {
  LaunchOffering: damlTypes.Choice<EquityInstrument, LaunchOffering, damlTypes.ContractId<Offering>, EquityInstrument.Key> & damlTypes.ChoiceFrom<damlTypes.Template<EquityInstrument, EquityInstrument.Key>>;
  Archive: damlTypes.Choice<EquityInstrument, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, EquityInstrument.Key> & damlTypes.ChoiceFrom<damlTypes.Template<EquityInstrument, EquityInstrument.Key>>;
}
export declare const EquityInstrument:
  damlTypes.Template<EquityInstrument, EquityInstrument.Key, 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:EquityInstrument'> &
  damlTypes.ToInterface<EquityInstrument, never> &
  EquityInstrumentInterface;

export declare namespace EquityInstrument {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<EquityInstrument, typeof EquityInstrument.templateId>
  export type Event = damlLedger.Event<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
  export type QueryResult = damlLedger.QueryResult<EquityInstrument, EquityInstrument.Key, typeof EquityInstrument.templateId>
}



export declare type MergeUsdc = {
  otherCid: damlTypes.ContractId<UsdcHolding>;
};

export declare const MergeUsdc:
  damlTypes.Serializable<MergeUsdc> & {
  }
;


export declare type TransferUsdc = {
  newOwner: damlTypes.Party;
  transferAmount: damlTypes.Numeric;
};

export declare const TransferUsdc:
  damlTypes.Serializable<TransferUsdc> & {
  }
;


export declare type UsdcHolding = {
  issuer: damlTypes.Party;
  owner: damlTypes.Party;
  amount: damlTypes.Numeric;
};

export declare interface UsdcHoldingInterface {
  TransferUsdc: damlTypes.Choice<UsdcHolding, TransferUsdc, damlTypes.ContractId<UsdcHolding>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<UsdcHolding, undefined>>;
  MergeUsdc: damlTypes.Choice<UsdcHolding, MergeUsdc, damlTypes.ContractId<UsdcHolding>, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<UsdcHolding, undefined>>;
  Archive: damlTypes.Choice<UsdcHolding, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined> & damlTypes.ChoiceFrom<damlTypes.Template<UsdcHolding, undefined>>;
}
export declare const UsdcHolding:
  damlTypes.Template<UsdcHolding, undefined, 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:UsdcHolding'> &
  damlTypes.ToInterface<UsdcHolding, never> &
  UsdcHoldingInterface;

export declare namespace UsdcHolding {
  export type CreateEvent = damlLedger.CreateEvent<UsdcHolding, undefined, typeof UsdcHolding.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<UsdcHolding, typeof UsdcHolding.templateId>
  export type Event = damlLedger.Event<UsdcHolding, undefined, typeof UsdcHolding.templateId>
  export type QueryResult = damlLedger.QueryResult<UsdcHolding, undefined, typeof UsdcHolding.templateId>
}


