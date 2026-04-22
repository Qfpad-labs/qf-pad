# Deploying Solidity Contracts on QF Network

## Overview

QF Network runs Substrate with `pallet-revive`, which executes PolkaVM bytecode. You write contracts in Solidity, compile them with `resolc` (the Revive compiler) instead of `solc`, and deploy using a Node.js script that talks to the chain via `@polkadot/api`.

MetaMask can see balances and interact with deployed contracts via the ETH-RPC layer, but for deployment we use a Substrate script because it gives reliable finalization and event parsing.

---

## Prerequisites

**1. Install resolc (Revive Solidity Compiler)**

This is the compiler that turns Solidity into PolkaVM bytecode. It's a drop-in replacement for `solc` that targets PolkaVM instead of EVM.

Get it from: https://github.com/paritytech/revive

Either download a pre-built binary from the releases page or build from source. Make sure `resolc` is available in your PATH. Verify with:

resolc --version


**2. Install Node.js (v18+)**

**3. A funded QF account**

You need a Substrate account (SS58 address) with QF tokens for gas and storage deposits. You'll need the 12-word mnemonic phrase for this account.

---

## Step 1: Organize Your Project

Create a project directory:

my-contract/ contracts/ MyContract.sol deploy.mjs .env


Put your Solidity files in the `contracts/` folder.

---

## Step 2: Compile

Run `resolc` with the `--combined-json` flag to generate a single output file containing ABI and bytecode for all your contracts:

resolc contracts/MyContract.sol --combined-json abi,bin -o contracts/ --overwrite


If you have multiple contracts that reference each other, list them all:

resolc contracts/ContractA.sol contracts/ContractB.sol --combined-json abi,bin -o contracts/ --overwrite


This creates `contracts/combined.json` with this structure:

```json
{
  "contracts": {
    "contracts/MyContract.sol:MyContract": {
      "abi": [...],
      "bin": "60806040..."
    }
  }
}
```
The abi field is the standard Solidity ABI (same as what solc produces). The bin field is hex-encoded PolkaVM bytecode.

## Step 3: Install Deployment Dependencies
These packages are only needed for the deploy script, not for your dApp frontend:

npm install @polkadot/api @polkadot/keyring @polkadot/util-crypto @polkadot/util ethers dotenv

## Step 4: Create Your .env File
DEPLOYER_SEED="your twelve word mnemonic phrase here"
Do not commit this file to git.

## Step 5: Create the Deploy Script
Create deploy.mjs at your project root:

```import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { keccakAsU8a, decodeAddress } from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { readFileSync } from 'fs';
import { ethers } from 'ethers';
import { config } from 'dotenv';

config();

// ============================================
// CONFIGURATION
// ============================================
const RPC_URL = 'wss://mainnet.qfnode.net';
const COMBINED_JSON_PATH = './contracts/combined.json';
const DEPLOYER_SEED = process.env.DEPLOYER_SEED;

if (!DEPLOYER_SEED) {
  console.error('Error: DEPLOYER_SEED not set in .env');
  process.exit(1);
}

// ============================================
// HELPERS
// ============================================

function substrateToEvmAddress(ss58Address) {
  const publicKey = decodeAddress(ss58Address);
  const hash = keccakAsU8a(publicKey);
  return u8aToHex(hash.slice(12));
}

function loadContractArtifact(contractName) {
  const raw = JSON.parse(readFileSync(COMBINED_JSON_PATH, 'utf-8'));
  const contractKey = Object.keys(raw.contracts).find(k => {
    const parts = k.split(':');
    return parts[parts.length - 1] === contractName;
  });

  if (!contractKey) {
    throw new Error(`Contract "${contractName}" not found in combined.json`);
  }

  const contractData = raw.contracts[contractKey];
  const abi = typeof contractData.abi === 'string'
    ? JSON.parse(contractData.abi)
    : contractData.abi;
  const bytecode = contractData.bin.startsWith('0x')
    ? contractData.bin
    : '0x' + contractData.bin;

  return { abi, bytecode };
}

function encodeConstructorArgs(abi, args = []) {
  if (args.length === 0) return '0x';
  const iface = new ethers.Interface(abi);
  return iface.encodeDeploy(args);
}

async function deployContract(api, deployer, name, artifact, args = [], options = {}) {
  console.log(`\nDeploying ${name}...`);

  const { abi, bytecode } = artifact;
  const constructorData = encodeConstructorArgs(abi, args);
  const data = constructorData === '0x' ? '' : constructorData;

  console.log(`  Code size: ${(bytecode.length - 2) / 2} bytes`);

  const tx = api.tx.revive.instantiateWithCode(
    options.value || BigInt(0),
    options.gasLimit,
    options.storageDepositLimit,
    bytecode,
    data,
    null
  );

  const result = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Deployment timed out after 180 seconds'));
    }, 180000);

    // CRITICAL: withSignedTransaction must be false on QF Network
    // This disables CheckMetadataHash which causes failures otherwise
    tx.signAndSend(deployer, { withSignedTransaction: false }, ({ status, events, dispatchError }) => {
      if (dispatchError) {
        clearTimeout(timeout);
        if (dispatchError.isModule) {
          const decoded = api.registry.findMetaError(dispatchError.asModule);
          reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`));
        } else {
          reject(new Error(dispatchError.toString()));
        }
        return;
      }

      if (status.isInBlock) {
        console.log(`  Included in block: ${status.asInBlock.toHex()}`);
      }

      if (status.isFinalized) {
        clearTimeout(timeout);
        console.log(`  Finalized: ${status.asFinalized.toHex()}`);

        let contractAddress = null;
        for (const { event } of events) {
          if (event.section === 'revive' && event.method === 'Instantiated') {
            contractAddress = event.data[1]?.toString();
            break;
          }
        }
        resolve({ contractAddress, blockHash: status.asFinalized.toHex() });
      }
    }).catch(err => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  if (!result.contractAddress) {
    throw new Error(`${name} deployment failed — no contract address in events`);
  }

  console.log(`  Deployed at: ${result.contractAddress}`);
  return result.contractAddress;
}

async function callContract(api, deployer, contractAddress, abi, methodName, args = [], options = {}) {
  console.log(`  Calling ${methodName}...`);

  const iface = new ethers.Interface(abi);
  const data = iface.encodeFunctionData(methodName, args);

  const tx = api.tx.revive.call(
    contractAddress,
    options.value || BigInt(0),
    options.gasLimit,
    options.storageDepositLimit,
    data
  );

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`${methodName} timed out after 120 seconds`));
    }, 120000);

    // CRITICAL: withSignedTransaction must be false
    tx.signAndSend(deployer, { withSignedTransaction: false }, ({ status, dispatchError }) => {
      if (dispatchError) {
        clearTimeout(timeout);
        if (dispatchError.isModule) {
          const decoded = api.registry.findMetaError(dispatchError.asModule);
          reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs.join(' ')}`));
        } else {
          reject(new Error(dispatchError.toString()));
        }
        return;
      }

      if (status.isFinalized) {
        clearTimeout(timeout);
        console.log(`  ${methodName} finalized`);
        resolve(status.asFinalized.toHex());
      }
    }).catch(err => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('========================================');
  console.log('  QF Network Contract Deployment');
  console.log('========================================\n');

  // Connect
  console.log('Connecting to QF Network...');
  const provider = new WsProvider(RPC_URL);
  const api = await ApiPromise.create({ provider });
  const [chain] = await Promise.all([api.rpc.system.chain()]);
  console.log(`Connected to ${chain}\n`);

  // Load deployer
  const keyring = new Keyring({ type: 'sr25519' });
  const deployer = keyring.addFromUri(DEPLOYER_SEED);
  const deployerEvm = substrateToEvmAddress(deployer.address);
  console.log(`Deployer SS58:  ${deployer.address}`);
  console.log(`Deployer EVM:   ${deployerEvm}`);

  // Check balance
  const { data: balance } = await api.query.system.account(deployer.address);
  const freeBalance = balance.free.toBigInt();
  console.log(`Balance:        ${(Number(freeBalance) / 1e18).toFixed(4)} QF\n`);

  if (freeBalance === 0n) {
    console.error('Error: Zero balance. Fund your account first.');
    process.exit(1);
  }

  // Map deployer account (required once per account for pallet-revive)
  console.log('Mapping deployer account...');
  try {
    await new Promise((resolve, reject) => {
      api.tx.revive.mapAccount().signAndSend(
        deployer,
        { withSignedTransaction: false },
        ({ status, dispatchError }) => {
          if (dispatchError) {
            const err = dispatchError.isModule
              ? api.registry.findMetaError(dispatchError.asModule).name
              : dispatchError.toString();
            if (err.includes('AlreadyMapped') || err.includes('AccountAlreadyMapped')) {
              console.log('  Already mapped\n');
              resolve();
              return;
            }
            reject(new Error(err));
            return;
          }
          if (status.isFinalized) {
            console.log('  Mapped successfully\n');
            resolve();
          }
        }
      ).catch(reject);
    });
  } catch (err) {
    console.warn(`  Map warning: ${err.message}\n`);
  }

  // Calculate gas limits from chain constants
  const blockWeights = api.consts.system.blockWeights;
  const maxExtrinsic = blockWeights.perClass.normal.maxExtrinsic.unwrap();
  const maxRefTime = maxExtrinsic.refTime.toBigInt();
  const maxProofSize = maxExtrinsic.proofSize.toBigInt();

  const deployGasLimit = api.registry.createType('Weight', {
    refTime: maxRefTime * 75n / 100n,
    proofSize: maxProofSize * 75n / 100n,
  });

  const callGasLimit = api.registry.createType('Weight', {
    refTime: maxRefTime * 50n / 100n,
    proofSize: maxProofSize * 50n / 100n,
  });

  const deployStorageDeposit = freeBalance / 10n;
  const callStorageDeposit = freeBalance / 100n;

  // ========================================
  // DEPLOY YOUR CONTRACT(S) HERE
  // ========================================

  const artifact = loadContractArtifact('MyContract');

  // Constructor arguments go in the array below
  // No args:     []
  // One address: ['0x000000000000000000000000000000000000dEaD']
  // Multiple:    ['0xAddr1', '0xAddr2', 100]
  const contractAddress = await deployContract(
    api, deployer, 'MyContract', artifact,
    [],
    {
      gasLimit: deployGasLimit,
      storageDepositLimit: deployStorageDeposit,
    }
  );

  // If you need to call setup functions after deployment:
  //
  // await callContract(
  //   api, deployer, contractAddress, artifact.abi,
  //   'someSetupFunction',
  //   ['arg1', 'arg2'],
  //   { gasLimit: callGasLimit, storageDepositLimit: callStorageDeposit }
  // );

  // ========================================
  // DONE
  // ========================================

  console.log('\n========================================');
  console.log('  Deployment Complete');
  console.log('========================================');
  console.log(`\n  Contract: ${contractAddress}\n`);

  await api.disconnect();
}

main().catch(err => {
  console.error('\nDeployment failed:', err.message);
  process.exit(1);
});
```

## Step 6: Deploy
node deploy.mjs
The script will connect to QF mainnet, map your account if needed, deploy the contract, wait for finalization, and print the deployed contract address.

## Key Things to Know
{ withSignedTransaction: false } is mandatory. Every signAndSend call on QF Network must include this flag. Without it, transactions fail due to a CheckMetadataHash incompatibility. This applies to deployment, post-deploy setup calls, and any other on-chain transactions through @polkadot/api.

Gas limits are calculated from chain constants, not hardcoded. The script queries blockWeights.perClass.normal.maxExtrinsic and uses 75% of the max for deployments, 50% for regular calls. This ensures your transactions fit within block limits regardless of chain configuration changes.

Account mapping is a one-time step. The revive.mapAccount() call links your SS58 (Substrate) address to a deterministic EVM address. This only needs to happen once per account. The script handles it automatically and gracefully skips if already mapped.

Constructor arguments are ABI-encoded using ethers.js. The script uses ethers.Interface.encodeDeploy() to encode constructor arguments. Pass them as a JavaScript array matching your constructor's parameter types. Addresses should be EVM format (0x...). If your constructor takes no arguments, pass an empty array [].

The contract address comes from the revive.Instantiated event. After finalization, the script parses block events looking for revive.Instantiated which contains the deployer address and the new contract address.

Alternative: Polkadot Remix IDE
If you prefer a browser-based workflow, you can use https://remix.polkadot.io which has resolc built in. Write your Solidity, compile in the browser, and deploy via MetaMask connected to QF Network's ETH-RPC endpoint. This works for deployment but note that contract verification tooling for pallet-revive contracts does not exist yet across the Polkadot ecosystem.

Multiple Contracts
If you're deploying multiple contracts that depend on each other, deploy them in order. Each deployContract call returns the address, which you pass as a constructor argument to the next:

```const registryAddress = await deployContract(
  api, deployer, 'Registry', registryArtifact, [],
  { gasLimit: deployGasLimit, storageDepositLimit: deployStorageDeposit }
);

const mainAddress = await deployContract(
  api, deployer, 'Main', mainArtifact, [registryAddress],
  { gasLimit: deployGasLimit, storageDepositLimit: deployStorageDeposit }
);
```
RPC Endpoints
Substrate WebSocket (for deployment and queries): wss://mainnet.qfnode.net
ETH JSON-RPC (for MetaMask, balance checks): https://archive.mainnet.qfnode.net/eth