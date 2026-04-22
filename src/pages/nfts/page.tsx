
import { Input } from "@/components/ui/input";
import { NFTCard } from "@/components/ui/nft-card";
import { NFTFactoryContract } from "@/config";
import { useChainContracts } from "@/lib/hooks/useChainContracts";
import { Search } from "lucide-react";
import { useState } from "react";
import { useReadContract } from "@/lib/papi/hooks";

export default function NFTsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { nftFactory } = useChainContracts();

  const { data: nfts, isLoading } = useReadContract({
    abi: NFTFactoryContract.abi,
    address: nftFactory,
    functionName: 'deployments',
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-7xl">
        <div className="mb-12 sm:mb-20 text-right lg:text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 tracking-tight">
            NFT<br />Marketplace
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl ml-auto lg:ml-0">
            Discover, mint, and trade unique NFT collections.
          </p>
        </div>

        <div className="mb-16 space-y-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black w-6 h-6" />
            <Input
              placeholder="SEARCH COLLECTIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 w-full h-16 text-lg border-2 border-black focus:ring-0 focus:border-black font-medium uppercase placeholder:text-gray-400"
            />
          </div>
        </div>

        {isLoading && <p>Loading collections...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts && Array.isArray(nfts) ? (nfts as Array<{ nft: `0x${string}` }>).map((nft) => (
            <NFTCard nftAddress={nft.nft} key={nft.nft} />
          )) : null}
        </div>
      </div>
    </div>
  );
}
