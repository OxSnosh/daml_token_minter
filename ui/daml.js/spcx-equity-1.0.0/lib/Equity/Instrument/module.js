"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.Burn = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Merge = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({otherCid: damlTypes.ContractId(exports.EquityHolding).decoder, }); }),
  encode: function (__typed__) {
  return {
    otherCid: damlTypes.ContractId(exports.EquityHolding).encode(__typed__.otherCid),
  };
}
,
};



exports.EquityHolding = damlTypes.assembleTemplate(
{
  templateId: 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:EquityHolding',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, ticker: damlTypes.Text.decoder, amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    owner: damlTypes.Party.encode(__typed__.owner),
    ticker: damlTypes.Text.encode(__typed__.ticker),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
  Merge: {
    template: function () { return exports.EquityHolding; },
    choiceName: 'Merge',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Merge.decoder; }),
    argumentEncode: function (__typed__) { return exports.Merge.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.EquityHolding).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.EquityHolding).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.EquityHolding; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Burn: {
    template: function () { return exports.EquityHolding; },
    choiceName: 'Burn',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Burn.decoder; }),
    argumentEncode: function (__typed__) { return exports.Burn.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.EquityHolding, ['b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3', 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3']);



exports.CancelIOI = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.Allocate = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({dealPrice: damlTypes.Numeric(10).decoder, sharesToAllocate: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    dealPrice: damlTypes.Numeric(10).encode(__typed__.dealPrice),
    sharesToAllocate: damlTypes.Numeric(10).encode(__typed__.sharesToAllocate),
  };
}
,
};



exports.IOI = damlTypes.assembleTemplate(
{
  templateId: 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:IOI',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, investor: damlTypes.Party.decoder, ticker: damlTypes.Text.decoder, maxPrice: damlTypes.Numeric(10).decoder, sharesDesired: damlTypes.Numeric(10).decoder, escrowed: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    investor: damlTypes.Party.encode(__typed__.investor),
    ticker: damlTypes.Text.encode(__typed__.ticker),
    maxPrice: damlTypes.Numeric(10).encode(__typed__.maxPrice),
    sharesDesired: damlTypes.Numeric(10).encode(__typed__.sharesDesired),
    escrowed: damlTypes.Numeric(10).encode(__typed__.escrowed),
  };
}
,
  Allocate: {
    template: function () { return exports.IOI; },
    choiceName: 'Allocate',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Allocate.decoder; }),
    argumentEncode: function (__typed__) { return exports.Allocate.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return exports.AllocationResult.decoder; }),
    resultEncode: function (__typed__) { return exports.AllocationResult.encode(__typed__); },
  },
  CancelIOI: {
    template: function () { return exports.IOI; },
    choiceName: 'CancelIOI',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CancelIOI.decoder; }),
    argumentEncode: function (__typed__) { return exports.CancelIOI.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.UsdcHolding).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.UsdcHolding).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.IOI; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.IOI, ['b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3', 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3']);



exports.AllocationResult = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({sharesCid: damlTypes.Optional(damlTypes.ContractId(exports.EquityHolding)).decoder, refundCid: damlTypes.Optional(damlTypes.ContractId(exports.UsdcHolding)).decoder, proceedCid: damlTypes.Optional(damlTypes.ContractId(exports.UsdcHolding)).decoder, }); }),
  encode: function (__typed__) {
  return {
    sharesCid: damlTypes.Optional(damlTypes.ContractId(exports.EquityHolding)).encode(__typed__.sharesCid),
    refundCid: damlTypes.Optional(damlTypes.ContractId(exports.UsdcHolding)).encode(__typed__.refundCid),
    proceedCid: damlTypes.Optional(damlTypes.ContractId(exports.UsdcHolding)).encode(__typed__.proceedCid),
  };
}
,
};



exports.PlaceIOI = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({investor: damlTypes.Party.decoder, usdcCid: damlTypes.ContractId(exports.UsdcHolding).decoder, maxPrice: damlTypes.Numeric(10).decoder, sharesDesired: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    investor: damlTypes.Party.encode(__typed__.investor),
    usdcCid: damlTypes.ContractId(exports.UsdcHolding).encode(__typed__.usdcCid),
    maxPrice: damlTypes.Numeric(10).encode(__typed__.maxPrice),
    sharesDesired: damlTypes.Numeric(10).encode(__typed__.sharesDesired),
  };
}
,
};



exports.Offering = damlTypes.assembleTemplate(
{
  templateId: 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:Offering',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, investors: damlTypes.List(damlTypes.Party).decoder, ticker: damlTypes.Text.decoder, priceTalk: damlTypes.Text.decoder, description: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    investors: damlTypes.List(damlTypes.Party).encode(__typed__.investors),
    ticker: damlTypes.Text.encode(__typed__.ticker),
    priceTalk: damlTypes.Text.encode(__typed__.priceTalk),
    description: damlTypes.Text.encode(__typed__.description),
  };
}
,
  PlaceIOI: {
    template: function () { return exports.Offering; },
    choiceName: 'PlaceIOI',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.PlaceIOI.decoder; }),
    argumentEncode: function (__typed__) { return exports.PlaceIOI.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.IOI).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.IOI).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.Offering; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.Offering, ['b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3', 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3']);



exports.LaunchOffering = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({investors: damlTypes.List(damlTypes.Party).decoder, priceTalk: damlTypes.Text.decoder, offeringDescription: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    investors: damlTypes.List(damlTypes.Party).encode(__typed__.investors),
    priceTalk: damlTypes.Text.encode(__typed__.priceTalk),
    offeringDescription: damlTypes.Text.encode(__typed__.offeringDescription),
  };
}
,
};



exports.EquityInstrument = damlTypes.assembleTemplate(
{
  templateId: 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:EquityInstrument',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, damlTypes.Text).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, damlTypes.Text).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, ticker: damlTypes.Text.decoder, name: damlTypes.Text.decoder, description: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    ticker: damlTypes.Text.encode(__typed__.ticker),
    name: damlTypes.Text.encode(__typed__.name),
    description: damlTypes.Text.encode(__typed__.description),
  };
}
,
  LaunchOffering: {
    template: function () { return exports.EquityInstrument; },
    choiceName: 'LaunchOffering',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.LaunchOffering.decoder; }),
    argumentEncode: function (__typed__) { return exports.LaunchOffering.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Offering).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Offering).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.EquityInstrument; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.EquityInstrument, ['b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3', 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3']);



exports.MergeUsdc = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({otherCid: damlTypes.ContractId(exports.UsdcHolding).decoder, }); }),
  encode: function (__typed__) {
  return {
    otherCid: damlTypes.ContractId(exports.UsdcHolding).encode(__typed__.otherCid),
  };
}
,
};



exports.TransferUsdc = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({newOwner: damlTypes.Party.decoder, transferAmount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    newOwner: damlTypes.Party.encode(__typed__.newOwner),
    transferAmount: damlTypes.Numeric(10).encode(__typed__.transferAmount),
  };
}
,
};



exports.UsdcHolding = damlTypes.assembleTemplate(
{
  templateId: 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3:Equity.Instrument:UsdcHolding',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, owner: damlTypes.Party.decoder, amount: damlTypes.Numeric(10).decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    owner: damlTypes.Party.encode(__typed__.owner),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
  };
}
,
  TransferUsdc: {
    template: function () { return exports.UsdcHolding; },
    choiceName: 'TransferUsdc',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.TransferUsdc.decoder; }),
    argumentEncode: function (__typed__) { return exports.TransferUsdc.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.UsdcHolding).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.UsdcHolding).encode(__typed__); },
  },
  MergeUsdc: {
    template: function () { return exports.UsdcHolding; },
    choiceName: 'MergeUsdc',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MergeUsdc.decoder; }),
    argumentEncode: function (__typed__) { return exports.MergeUsdc.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.UsdcHolding).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.UsdcHolding).encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.UsdcHolding; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.UsdcHolding, ['b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3', 'b8754779aad106ed3eca03c3a0abb01b819a12e0e5c879d0f58da2e5b4ff5da3']);

