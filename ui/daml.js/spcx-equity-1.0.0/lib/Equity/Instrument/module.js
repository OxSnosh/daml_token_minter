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
  templateId: '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:EquityHolding',
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


damlTypes.registerTemplate(exports.EquityHolding, ['5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3', '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3']);



exports.RevokeAllowlist = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({}); }),
  encode: function (__typed__) {
  return {
  };
}
,
};



exports.AllowlistEntry = damlTypes.assembleTemplate(
{
  templateId: '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:AllowlistEntry',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Text, damlTypes.Party).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Text, damlTypes.Party).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({issuer: damlTypes.Party.decoder, ticker: damlTypes.Text.decoder, party: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    issuer: damlTypes.Party.encode(__typed__.issuer),
    ticker: damlTypes.Text.encode(__typed__.ticker),
    party: damlTypes.Party.encode(__typed__.party),
  };
}
,
  RevokeAllowlist: {
    template: function () { return exports.AllowlistEntry; },
    choiceName: 'RevokeAllowlist',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.RevokeAllowlist.decoder; }),
    argumentEncode: function (__typed__) { return exports.RevokeAllowlist.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.AllowlistEntry; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
}

);


damlTypes.registerTemplate(exports.AllowlistEntry, ['5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3', '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3']);



exports.MintShares = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({recipient: damlTypes.Party.decoder, amount: damlTypes.Numeric(10).decoder, allowlistCid: damlTypes.ContractId(exports.AllowlistEntry).decoder, }); }),
  encode: function (__typed__) {
  return {
    recipient: damlTypes.Party.encode(__typed__.recipient),
    amount: damlTypes.Numeric(10).encode(__typed__.amount),
    allowlistCid: damlTypes.ContractId(exports.AllowlistEntry).encode(__typed__.allowlistCid),
  };
}
,
};



exports.AllowlistParty = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({party: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    party: damlTypes.Party.encode(__typed__.party),
  };
}
,
};



exports.EquityInstrument = damlTypes.assembleTemplate(
{
  templateId: '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3:Equity.Instrument:EquityInstrument',
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
  AllowlistParty: {
    template: function () { return exports.EquityInstrument; },
    choiceName: 'AllowlistParty',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.AllowlistParty.decoder; }),
    argumentEncode: function (__typed__) { return exports.AllowlistParty.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.AllowlistEntry).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.AllowlistEntry).encode(__typed__); },
  },
  MintShares: {
    template: function () { return exports.EquityInstrument; },
    choiceName: 'MintShares',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.MintShares.decoder; }),
    argumentEncode: function (__typed__) { return exports.MintShares.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.EquityHolding).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.EquityHolding).encode(__typed__); },
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


damlTypes.registerTemplate(exports.EquityInstrument, ['5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3', '5ccac177b37de4df8b650b149ebe281dd4c63c8c84e03fa729a04c3ec0bb9ef3']);

