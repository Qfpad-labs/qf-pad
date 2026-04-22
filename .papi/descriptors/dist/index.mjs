// .papi/descriptors/src/common.ts
var table = new Uint8Array(128);
for (let i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
var toBinary = (base64) => {
  const n = base64.length, bytes = new Uint8Array((n - Number(base64[n - 1] === "=") - Number(base64[n - 2] === "=")) * 3 / 4 | 0);
  for (let i2 = 0, j = 0; i2 < n; ) {
    const c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
    const c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
    bytes[j++] = c0 << 2 | c1 >> 4;
    bytes[j++] = c1 << 4 | c2 >> 2;
    bytes[j++] = c2 << 6 | c3;
  }
  return bytes;
};

// .papi/descriptors/src/qf_network.ts
var descriptorValues = import("./descriptors-RUWOSDLR.mjs").then((module) => module["Qf_network"]);
var metadataTypes = import("./metadataTypes-LHEQRXDM.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset = {};
var extensions = {};
var getMetadata = () => import("./qf_network_metadata-44QFPG4B.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis = "0xee971a91ef92d733d86d3acc67a6394caa105f37a7757155f623bc5d0c4b690f";
var _allDescriptors = { descriptors: descriptorValues, metadataTypes, asset, extensions, getMetadata, genesis };
var qf_network_default = _allDescriptors;

// .papi/descriptors/src/common-types.ts
import { _Enum } from "polkadot-api";
var DigestItem = _Enum;
var Phase = _Enum;
var DispatchClass = _Enum;
var TokenError = _Enum;
var ArithmeticError = _Enum;
var TransactionalError = _Enum;
var BalanceStatus = _Enum;
var TransactionPaymentEvent = _Enum;
var CommonClaimsEvent = _Enum;
var GrandpaEvent = _Enum;
var StakingRewardDestination = _Enum;
var StakingForcing = _Enum;
var BalancesTypesReasons = _Enum;
var TransactionPaymentReleases = _Enum;
var Version = _Enum;
var ClaimsStatementKind = _Enum;
var MultiAddress = _Enum;
var BalancesAdjustmentDirection = _Enum;
var StakingPalletConfigOpBig = _Enum;
var StakingPalletConfigOp = _Enum;
var TransactionValidityUnknownTransaction = _Enum;
var TransactionValidityTransactionSource = _Enum;

// .papi/descriptors/src/index.ts
var metadatas = { ["0x26565ebffbc3d7c748855dfa78164811b67b6a2a3720dcb3adb757b57ae0a372"]: qf_network_default };
var getMetadata2 = async (codeHash) => {
  try {
    return await metadatas[codeHash].getMetadata();
  } catch {
  }
  return null;
};
export {
  ArithmeticError,
  BalanceStatus,
  BalancesAdjustmentDirection,
  BalancesTypesReasons,
  ClaimsStatementKind,
  CommonClaimsEvent,
  DigestItem,
  DispatchClass,
  GrandpaEvent,
  MultiAddress,
  Phase,
  StakingForcing,
  StakingPalletConfigOp,
  StakingPalletConfigOpBig,
  StakingRewardDestination,
  TokenError,
  TransactionPaymentEvent,
  TransactionPaymentReleases,
  TransactionValidityTransactionSource,
  TransactionValidityUnknownTransaction,
  TransactionalError,
  Version,
  getMetadata2 as getMetadata,
  qf_network_default as qf_network
};
