import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TokenFactory } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog, parseUnits, type Address } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "@/lib/papi/hooks";
import { Coins, ExternalLink, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getFriendlyTxErrorMessage } from "@/lib/utils/tx-errors";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import { contractRead } from "@/lib/papi/contract-read";

const TokenType = {
  Plain: 0,
  Mintable: 1,
  Burnable: 2,
  Taxable: 3,
  NonMintable: 4
} as const;

type TokenType = typeof TokenType[keyof typeof TokenType];

export default function CreateTokenPage() {
  const { address } = useAccount();
  const { explorerUrl, tokenFactory } = useChainContracts();
  const { data: hash, writeContract, isPending, error, reset } = useWriteContract();

  const [tokenType, setTokenType] = useState<TokenType>(TokenType.Plain);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("18");
  const [initialSupply, setInitialSupply] = useState("1000000");
  const [initialRecipient, setInitialRecipient] = useState("");
  const [taxWallet, setTaxWallet] = useState("");
  const [taxBps, setTaxBps] = useState("0");

  const [createdTokenAddress, setCreatedTokenAddress] = useState<string | null>(null);
  const [tokenCreated, setTokenCreated] = useState(false);

  // Track processed hashes to prevent duplicate toasts
  const processedHash = useRef<string | null>(null);
  const tokensBeforeCreate = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (address) {
      setInitialRecipient(address);
    }
  }, [address])

  const { draft, clearDraft } = useChatbotActionStore();
  useEffect(() => {
    if (draft?.actionType === "create_token" && draft.prefill) {
      if (draft.prefill.name) setName(draft.prefill.name);
      if (draft.prefill.symbol) setSymbol(draft.prefill.symbol);
      if (draft.prefill.decimals) setDecimals(draft.prefill.decimals);
      if (draft.prefill.initialSupply) setInitialSupply(draft.prefill.initialSupply);
      if (draft.prefill.tokenType) setTokenType(parseInt(draft.prefill.tokenType) as TokenType);
      if (draft.prefill.initialRecipient) setInitialRecipient(draft.prefill.initialRecipient);
      clearDraft();
    }
  }, [draft, clearDraft]);

  const resetForm = () => {
    setName("");
    setSymbol("");
    setDecimals("18");
    setInitialSupply("1000000");
    setTaxWallet("");
    setTaxBps("0");
  };

  const readCreatedTokens = async () => {
    if (!address) return [];
    const tokens = await contractRead({
      address: tokenFactory,
      abi: TokenFactory.abi,
      functionName: "tokensCreatedBy",
      args: [address],
    });
    return Array.isArray(tokens) ? (tokens as Address[]) : [];
  };

  const findCreatedTokenByReadback = async () => {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const tokens = await readCreatedTokens();
        const previous = tokensBeforeCreate.current;
        const created = previous
          ? tokens.find((token) => !previous.has(token.toLowerCase()))
          : tokens[tokens.length - 1];

        if (created) return created;
      } catch (err) {
        console.warn("Could not read created tokens after token creation", err);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    return null;
  };

  const handleCreateToken = async () => {
    setCreatedTokenAddress(null);
    setTokenCreated(false);
    processedHash.current = null;
    tokensBeforeCreate.current = null;
    
    const tokenParams = {
      name,
      symbol,
      decimals: parseInt(decimals),
      initialSupply: parseUnits(initialSupply, parseInt(decimals)),
      initialRecipient: initialRecipient as `0x${string}`
    };

    let functionName: "createPlainToken" | "createMintableToken" | "createBurnableToken" | "createTaxableToken" | "createNonMintableToken";
    const args: unknown[] = [tokenParams];

    switch (tokenType) {
      case TokenType.Plain:
        functionName = "createPlainToken";
        break;
      case TokenType.Mintable:
        functionName = "createMintableToken";
        break;
      case TokenType.Burnable:
        functionName = "createBurnableToken";
        break;
      case TokenType.Taxable: {
        functionName = "createTaxableToken";
        const taxParams = {
          taxWallet: taxWallet as `0x${string}`,
          taxBps: parseInt(taxBps)
        }
        args.push(taxParams);
        break;
      }
      case TokenType.NonMintable:
        functionName = "createNonMintableToken";
        break;
      default:
        toast.error("Invalid token type selected");
        return;
    }

    try {
      const existingTokens = await readCreatedTokens();
      tokensBeforeCreate.current = new Set(
        existingTokens.map((token) => token.toLowerCase())
      );
    } catch (err) {
      console.warn("Could not snapshot existing tokens before creation", err);
    }

    writeContract({
      address: tokenFactory,
      abi: TokenFactory.abi,
      functionName,
      args: args as never,
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed, data: createTokenReceipt } =
    useWaitForTransactionReceipt({
      hash,
    })

  // Handle transaction states
  useEffect(() => {
    if (error) {
      toast.error(getFriendlyTxErrorMessage(error, "Token creation"));
      reset();
    }
  }, [error, reset]);

  useEffect(() => {
    const handleConfirmedTokenCreation = async () => {
      if (!isConfirmed || !createTokenReceipt || processedHash.current === hash) {
        return;
      }

      processedHash.current = hash ?? null;

      // QF receipts may not always surface Solidity logs in the shape viem expects.
      // Prefer decoded events when available, then fall back to reading factory state.
      const logs = createTokenReceipt.logs ?? [];
      const event = logs
        .map((log: { data: `0x${string}`; topics: [`0x${string}`, ...`0x${string}`[]] }) => {
          try {
            return decodeEventLog({
              abi: TokenFactory.abi,
              data: log.data,
              topics: log.topics,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any as { eventName: string; args: Record<string, unknown> };
          } catch {
            return null;
          }
        })
        .find((decoded) => decoded?.eventName === 'TokenCreated');

      const eventToken = event
        ? (event.args as unknown as { token: `0x${string}` }).token
        : null;
      const tokenAddress = eventToken ?? await findCreatedTokenByReadback();

      setTokenCreated(true);
      if (tokenAddress) {
        setCreatedTokenAddress(tokenAddress);
        toast.success("Token created successfully!");
      } else {
        toast.success("Token created successfully. It should appear in your dashboard shortly.");
      }

      resetForm();
      reset();
    };

    void handleConfirmedTokenCreation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, createTokenReceipt, hash, reset]);

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      {/* Header */}
      <div className="mb-8">
        <div className="-rotate-[0.45deg] sm:-rotate-[0.2deg] border-4 border-black bg-[#42C9FF] p-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider flex items-center gap-3">
            <Coins className="w-8 h-8" /> Create Token
          </h1>
          <p className="text-sm text-gray-700 mt-2">
            Deploy a token with fixed supply, minting, burning, or transfer-tax options.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Advanced: ERC-20 compatible token contract.
          </p>
        </div>
      </div>

      {/* Success Message */}
      {tokenCreated && (
        <Card className="before:hidden -rotate-[0.35deg] max-w-2xl mx-auto mb-8 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
          <CardHeader className="border-b-2 border-black bg-[#90EE90] p-6">
            <CardTitle className="font-black uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Token Created Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {createdTokenAddress ? (
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Token Address</p>
                <code className="block bg-gray-100 p-3 border-2 border-black font-mono text-sm break-all">
                  {createdTokenAddress}
                </code>
              </div>
            ) : (
              <p className="text-sm font-semibold text-gray-700">
                The transaction finalized. Your token should show in the dashboard shortly.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              {createdTokenAddress ? (
                <a 
                  href={`${explorerUrl}/address/${createdTokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="-rotate-[0.3deg] w-full border-4 border-black bg-white text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-100">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                </a>
              ) : (
                <Link to="/dashboard/user" className="flex-1">
                  <Button className="-rotate-[0.3deg] w-full border-4 border-black bg-white text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-gray-100">
                    View Dashboard
                  </Button>
                </Link>
              )}
              {createdTokenAddress && <Link to={`/dashboard/tools/token-locker?token=${createdTokenAddress}`} className="flex-1">
                <Button className="rotate-[0.3deg] w-full border-4 border-black bg-[#FFE38A] text-black font-black uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-[#F6CF62]">
                  Lock Tokens
                </Button>
              </Link>}
            </div>
            <Button 
              onClick={() => {
                setCreatedTokenAddress(null);
                setTokenCreated(false);
              }}
              variant="outline"
              className="w-full border-2 border-black"
            >
              Create Another Token
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Token Form */}
      {!tokenCreated && (
        <Card className="before:hidden rotate-[0.35deg] max-w-2xl mx-auto border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)] p-0 gap-0">
          <CardHeader className="border-b-2 border-black bg-white p-6">
            <CardTitle className="font-black uppercase tracking-wider">Token Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token-type" className="font-bold uppercase text-xs">Token Type</Label>
              <Select onValueChange={(value) => setTokenType(parseInt(value) as TokenType)} defaultValue={TokenType.Plain.toString()}>
                <SelectTrigger id="token-type" className="border-2 border-black">
                  <SelectValue placeholder="Select token type" />
                </SelectTrigger>
                <SelectContent className="border-2 border-black">
                  <SelectItem value={TokenType.Plain.toString()}>Plain</SelectItem>
                  <SelectItem value={TokenType.Mintable.toString()}>Mintable</SelectItem>
                  <SelectItem value={TokenType.Burnable.toString()}>Burnable</SelectItem>
                  <SelectItem value={TokenType.Taxable.toString()}>Taxable</SelectItem>
                  <SelectItem value={TokenType.NonMintable.toString()}>Non-Mintable</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {tokenType === TokenType.Plain && "A standard token with basic transfer functionality."}
                {tokenType === TokenType.Mintable && "Allows the owner to mint new tokens after deployment."}
                {tokenType === TokenType.Burnable && "Allows holders to burn (destroy) their tokens."}
                {tokenType === TokenType.Taxable && "Applies a tax on transfers, sent to a designated wallet."}
                {tokenType === TokenType.NonMintable && "Fixed supply token that cannot be minted after creation."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold uppercase text-xs">Token Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. My Token" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="border-2 border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symbol" className="font-bold uppercase text-xs">Symbol</Label>
                <Input 
                  id="symbol" 
                  placeholder="e.g. MTK" 
                  value={symbol} 
                  onChange={e => setSymbol(e.target.value)} 
                  className="border-2 border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="decimals" className="font-bold uppercase text-xs">Decimals</Label>
                <Input 
                  id="decimals" 
                  type="number" 
                  placeholder="18" 
                  value={decimals} 
                  onChange={e => setDecimals(e.target.value)} 
                  className="border-2 border-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initial-supply" className="font-bold uppercase text-xs">Initial Supply</Label>
                <Input 
                  id="initial-supply" 
                  type="number" 
                  placeholder="1000000" 
                  value={initialSupply} 
                  onChange={e => setInitialSupply(e.target.value)} 
                  className="border-2 border-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="initial-recipient" className="font-bold uppercase text-xs">Initial Recipient</Label>
              <Input 
                id="initial-recipient" 
                placeholder="e.g. 0x..." 
                value={initialRecipient} 
                onChange={e => setInitialRecipient(e.target.value)} 
                className="border-2 border-black font-mono text-sm"
              />
              <p className="text-xs text-gray-500">Defaults to your connected wallet address.</p>
            </div>

            {tokenType === TokenType.Taxable && (
              <div className="space-y-4 pt-4 border-t-2 border-black">
                <h3 className="font-black uppercase text-sm">Taxable Token Configuration</h3>
                <div className="space-y-2">
                  <Label htmlFor="tax-wallet" className="font-bold uppercase text-xs">Tax Wallet</Label>
                  <Input 
                    id="tax-wallet" 
                    placeholder="e.g. 0x..." 
                    value={taxWallet} 
                    onChange={e => setTaxWallet(e.target.value)} 
                    className="border-2 border-black font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-bps" className="font-bold uppercase text-xs">Tax (in BPS, 1% = 100)</Label>
                  <Input 
                    id="tax-bps" 
                    type="number" 
                    placeholder="100" 
                    value={taxBps} 
                    onChange={e => setTaxBps(e.target.value)} 
                    className="border-2 border-black"
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handleCreateToken} 
              disabled={isPending || isConfirming || !name || !symbol} 
              className="-rotate-[0.35deg] w-full border-4 border-black bg-[#FF7F41] text-black font-black uppercase tracking-wider shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#E45845] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] transition-all"
            >
              {isPending ? 'Confirm in Wallet...' : isConfirming ? 'Creating Token...' : 'Create Token'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
