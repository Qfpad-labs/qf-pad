import { useReadContracts } from "@/lib/papi/hooks";
import { LaunchpadNFTContract } from "@/config";
import { formatEther } from "viem";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function NFTCard({ nftAddress }: { nftAddress: `0x${string}` }) {
    const nftContract = {
        address: nftAddress,
        abi: LaunchpadNFTContract.abi,
    } as const;

    const { data, isLoading } = useReadContracts({
        contracts: [
            { ...nftContract, functionName: 'name' },
            { ...nftContract, functionName: 'symbol' },
            { ...nftContract, functionName: 'maxSupply' },
            { ...nftContract, functionName: 'totalMinted' },
            { ...nftContract, functionName: 'mintPrice' },
        ]
    });

    const [name, _symbol, maxSupply, totalMinted, mintPrice] = data || [];

    if (isLoading || !data) {
        return <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Loading...</div>;
    }

    const progress = maxSupply?.result ? (Number(totalMinted?.result as bigint) / Number(maxSupply.result as bigint)) * 100 : 0;

    return (
        <Link to={`/nfts/${nftAddress}`} className="block h-full">
            <div className="border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group cursor-pointer h-full flex flex-col">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="border-2 border-black rounded-full p-1 bg-white">
                        <Avatar className="w-14 h-14 border-2 border-black rounded-full">
                            <AvatarImage src="" alt={`${name?.result as string} logo`} />
                            <AvatarFallback className="text-lg font-black uppercase">
                                {(name?.result as string)?.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-tight break-words">
                            {name?.result as string}
                        </h3>
                    </div>
                </div>

                <p className="font-medium mb-6 min-h-[3rem]">A collection of {(maxSupply?.result as bigint)?.toString()} unique NFTs.</p>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black uppercase tracking-wider">PROGRESS</span>
                        <span className="text-sm font-black">{progress.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-4">
                        <div
                            className="bg-black h-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold">{totalMinted?.result?.toString()} minted</span>
                        <span className="text-xs font-bold">{maxSupply?.result?.toString()} total</span>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t-2 border-black">
                    <p>Price: {formatEther(mintPrice?.result as bigint ?? BigInt(0))} QF</p>
                    <button className="w-full mt-4 bg-blue-400 text-white h-12 font-black uppercase text-sm tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                        MINT
                    </button>
                </div>
            </div>
        </Link>
    );
}
