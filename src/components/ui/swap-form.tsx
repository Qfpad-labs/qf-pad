"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown } from 'lucide-react';
import { useSwap } from '@/lib/hooks/useSwap';
import { useAccount, useBalance } from '@/lib/papi/hooks';
import { formatUnits } from 'viem';
import { useConnectModal } from '@/lib/papi/hooks';

type Token = {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
};

type Market = {
  id: string;
  token0: Token;
  token1: Token;
  price: number;
};

export function SwapForm({ market }: { market: Market }) {
  const [fromToken, setFromToken] = useState(market.token0);
  const [toToken, setToToken] = useState(market.token1);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { data: fromBalance } = useBalance({ address, token: fromToken.address });
  const { data: toBalance } = useBalance({ address, token: toToken.address });

  const { 
    toAmount: quoteAmount, 
    swap, 
    approve, 
    needsApproval, 
    isLoading,
    isSuccess
  } = useSwap({ fromToken, toToken, fromAmount });

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setFromAmount(amount);
    setToAmount(quoteAmount);
  };

  const handleFlip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }

  const getButton = () => {
    if (!isConnected) {
      return <Button className="w-full" onClick={openConnectModal}>Connect Wallet</Button>;
    }
    if (needsApproval) {
      return <Button className="w-full" onClick={approve} disabled={isLoading}>{isLoading ? 'Approving...' : `Approve ${fromToken.symbol}`}</Button>;
    }
    return <Button className="w-full" onClick={swap} disabled={isLoading || !fromAmount}>{isLoading ? 'Swapping...' : 'Swap'}</Button>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="from-token">You Pay</Label>
          <div className="relative">
            <Input
              id="from-token"
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={handleFromAmountChange}
              className="pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-bold text-sm">{fromToken.symbol}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">Balance: {fromBalance ? `${parseFloat(formatUnits(fromBalance.value, fromBalance.decimals)).toFixed(4)} ${fromBalance.symbol}`: '0'}</p>
        </div>

        <div className="flex justify-center -my-3 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-white" onClick={handleFlip}>
                <ArrowDown className="h-4 w-4" />
            </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-token">You Receive</Label>
          <div className="relative">
            <Input
              id="to-token"
              type="number"
              placeholder="0.0"
              value={quoteAmount || toAmount}
              readOnly
              className="pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-bold text-sm">{toToken.symbol}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">Balance: {toBalance ? `${parseFloat(formatUnits(toBalance.value, toBalance.decimals)).toFixed(4)} ${toBalance.symbol}`: '0'}</p>
        </div>

        {getButton()}

        {isSuccess && <p className="text-green-500 text-center">Swap successful!</p>}

        <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
                <span>Price</span>
                <span>1 {fromToken.symbol} = {market.price.toFixed(6)} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between">
                <span>Slippage Tolerance</span>
                <span>0.5%</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
