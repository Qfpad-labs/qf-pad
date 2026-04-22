Doomly ⟠, [Mar 20, 2026 at 12:20:45 PM]:
The contracts stay in Solidity. Nothing changes there. What changes is how the frontend talks to the chain. Instead of MetaMask + ethers/viem RPC, you use a Polkadot wallet + polkadot-api (PAPI).


What stays the same:

Write your contracts in Solidity, compile with resolc (Revive compiler) instead of solc
ABI files are identical — same JSON format
You still use encodeFunctionData and decodeFunctionResult from viem to build calldata and parse results

What's different:

Users connect with Talisman or SubWallet instead of MetaMask

Their address is SS58 (Substrate format), not 0x...

Before the first transaction, the wallet needs a one-time map_account call that links the SS58 address to an on-chain EVM address. This is automatic. Your frontend handles it silently.

To read a contract, you call typedApi.apis.ReviveApi.call(origin, dest, value, undefined, undefined, calldata) — this is like eth_call

To write, you build the calldata the same way, do a dry-run for gas estimation, then submit via typedApi.tx.Revive.call({ dest, value, gas_limit, storage_deposit_limit, data }).signAndSubmit(signer)

The signer comes from the Polkadot wallet extension, not window.ethereum.


==================================================
Codex Addendum - April 16, 2026
==================================================

Additional confirmed notes from live interaction on QF mainnet:

1. There are two working interaction paths:

- ETH-RPC / EVM wallet path:
  Use `ethers` against `https://archive.mainnet.qfnode.net/eth` with a normal EVM private key.
  This worked for:
  - WQF `deposit()` and `withdraw()`
  - ERC20 transfers
  - Calling `TokenFactory.createPlainToken(...)` from an EVM wallet

- Substrate / PAPI path:
  Use `@polkadot/api` or `polkadot-api` with an SS58 signer and `pallet-revive`.
  This worked for:
  - `revive.mapAccount()`
  - `revive.call(...)`
  - `revive.uploadCode(...)`
  - `revive.instantiateWithCode(...)`
  - Calling `TokenFactory.createPlainToken(...)` from the deployer seed account

2. Practical rule:

- Reads can work through `ReviveApi.call` even when writes are failing.
- Writes require the signer account to be an SS58/Substrate account when using the PAPI path.
- MetaMask-style EVM interaction works for already deployed contracts through ETH-RPC, but native QF deployment and native SS58 account usage still go through `revive.*` extrinsics.

3. Important wallet note:

- For the dapp wallet flow, Talisman or SubWallet should expose a Substrate SS58 account.
- Do not use an injected `ethereum` account for the PAPI write flow.
- If a wallet shows intermittent write failures but reads still work, the issue is likely signer/metadata/account-selection related rather than ABI or contract logic.
- SubWallet should be considered a valid compatibility test for the same dapp flow, not just Talisman.

4. Deployer and wallet addresses confirmed in this repo:

- `MAIN_PRIVATE_KEY` EVM address:
  `0x4C3Af86D9F5B8bDeB0fD211E9ed4590d709CaA71`

- `DEPLOYER_SEED` SS58 address:
  `5GsUbAaQ5ZKL7TFScGbekje6cfdi8KZhPqoNX3fRQznr9h3g`

- `DEPLOYER_SEED` mapped EVM address:
  `0x617C365862108FE1E2E8EEEa6144e4CB3923B882`

5. WQF contract confirmed:

- WQF contract address:
  `0x3e3a42e7e25d5004282ce13a96695c2805224f30`

- Confirmed live interactions:
  - Wrapped 5 QF from the main wallet:
    tx `0x2a12309198d7af4d73f578995775367f39f0e542cfe114b1168190744eceedc0`
  - Unwrapped 7 WQF from the main wallet:
    tx `0xa7b563b8f26f8864e35fd45cb9b6db912e5b3fc727524fdea004d383acb34230`

6. Launchpad deployment addresses confirmed on QF mainnet:

- TokenLocker:
  `0x85e149dd4f4474a5a43f378d31607c305fade5cf`

- AirdropMultisender:
  `0x9e361c49cd918771a5af06c462ab0cc47519287c`

- TokenFactory:
  `0xb3210cd97feadfafb4637a28161195e81c00e12e`

- PresaleFactory:
  `0xdc823a4a42ea47b932b2630f1e05e1de4302bf0e`

- NFTFactory:
  `0xc8cb98d60df20fe504f305043071ba6d4f462106`

- NFTFactoryLens:
  `0xfce5ddc08f208fb8214ab2685c46e5b9af13563d`

7. TokenFactory interactions confirmed:

- `totalDeployments()` was read successfully on TokenFactory.
- It initially returned `0`, then increased as tokens were created.

- Token created from `MAIN_PRIVATE_KEY` wallet:
  - Token:
    `0xFB136D85B250aB17209068B0d04A3F5C4ee42C50`
  - Name:
    `QF Main Plain Token`
  - Symbol:
    `QMPT`
  - Tx:
    `0x087e81481eeba18c4d552a438cac786523fa8cfb4813af9d3b330a08655742f9`

- Token created from `DEPLOYER_SEED` mapped account:
  - Token:
    `0x2390250C31f88dC1D48E895d2B8dEC68D590B0D6`
  - Name:
    `QF Deployer Plain Token`
  - Symbol:
    `QDPT`
  - Finalized block:
    `53138097`

8. Additional deployed tokens confirmed on QF mainnet:

- OTU:
  `0x8Cd90E173bbB33F6d88c43B9Fc6199ffdED24e9B`

- QDPT:
  `0x2390250C31f88dC1D48E895d2B8dEC68D590B0D6`

- Avatar token:
  `0xb39cCA71828a89E07aD473721281A24A9B3A5D84`

9. Recipient/test address used in multiple live checks:

- Recipient EVM address:
  `0x24107d41ca46f100b49f67c96a99ebb2d458d918`

- This address received:
  - 10 WQF in an earlier transfer
  - 10,000 OTU
  - 10,000 QDPT
  - 10,000 Avatar token

- Confirmed token transfer tx hashes on April 14, 2026:
  - OTU:
    `0x8617a3ffa6cfaf368492956b240f50a1aeef514a1dd2c013b3b8d42a5ab8e4cb`
  - QDPT:
    `0x22a8a4f15df92e2e5caa11a58b025bf8ac138d61bdd8506e0448a65d9d42d3a8`
  - Avatar:
    `0xad9ea4d9681fbddf15fe2250a9335efff597e24099632dfa9e828b3e0b19be52`

- Confirmed recipient WQF balance after those token transfers:
  `10.0 WQF`

10. Native QF transfer confirmed:

- Sent 5 QF from `DEPLOYER_SEED` SS58 account to:
  `5FsWLCoci5tNsvCkgQ3ekniQTHBqoHQg2LDoN1VhN3TxXMRj`

- Transfer tx:
  `0x283f307681d915922d79f85ec87ec78a81e10b42a446309ebfdd12e13a8c84a1`

11. ABI note:

- Standard ABI files were exported into `/abi`.
- They are standard Solidity ABI JSONs and are usable for frontend interaction.
- Libraries/helpers with no external/public callable surface can legitimately export empty `[]` ABIs.

12. Compile/deploy note:

- `resolc` is needed for QF / PolkaVM bytecode and deployment artifacts.
- The ABI itself is still standard Solidity ABI format.
- In this repo, `build/qf/*/combined.json` is the current source of truth for deployable artifacts used by the deployment scripts.
