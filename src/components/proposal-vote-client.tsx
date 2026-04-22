

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Proposal = {
    title: string;
    status: string;
    votesFor: number;
    votesAgainst: number;
    description: string;
    endTime: string;
    // add other fields as needed
};

export default function ProposalVoteClient({ initialProposal }: { initialProposal: Proposal; }) {
    const [voteDirection, setVoteDirection] = useState<'for' | 'against' | null>(null);
    const [voteAmount, setVoteAmount] = useState("");
    const [proposal, setProposal] = useState<Proposal>(initialProposal);

    if (!proposal) {
        return <div className="text-center py-20">Proposal not found.</div>;
    }

    const handleVoteSubmit = () => {
        const amount = parseInt(voteAmount, 10);
        if (isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount to vote.");
            return;
        }

        const newProposal = { ...proposal };
        if (voteDirection === 'for') {
            newProposal.votesFor += amount;
        } else if (voteDirection === 'against') {
            newProposal.votesAgainst += amount;
        }

        setProposal(newProposal);
        toast.success(`Successfully voted with ${amount} tokens!`);
        setVoteDirection(null);
        setVoteAmount("");
    };

    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
    const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-[#42C9FF]';
            case 'passed': return 'bg-[#B8EF53]';
            case 'rejected': return 'bg-[#FF7F41]';
            default: return 'bg-[#FFF2D5]';
        }
    };

    return (
        <div className="bg-[#FFF2D5] min-h-screen">
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-start justify-between mb-6 gap-4">
                        <h1 className="text-4xl md:text-5xl font-black uppercase leading-none tracking-tight flex-1">
                            {proposal.title}
                        </h1>
                        <span className={`px-4 py-2 text-sm font-black uppercase tracking-wider border-2 border-black ${getStatusColor(proposal.status)} text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] shrink-0`}>
                            {proposal.status}
                        </span>
                    </div>

                    <p className="text-xl font-medium mb-8">{proposal.description}</p>

                    <div className="mb-8">
                        <div className="flex justify-between text-lg font-black uppercase mb-2">
                            <span>FOR: {proposal.votesFor.toLocaleString()}</span>
                            <span>AGAINST: {proposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <div className="flex h-10 border-4 border-black">
                            <div className="bg-[#B8EF53] flex items-center justify-center font-black text-xl" style={{ width: `${forPercentage}%` }}>
                                {forPercentage.toFixed(1)}%
                            </div>
                            <div className="bg-[#FF7F41] flex items-center justify-center font-black text-xl text-white" style={{ width: `${againstPercentage}%` }}>
                                {againstPercentage.toFixed(1)}%
                            </div>
                        </div>
                    </div>

                    {proposal.status === 'active' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button
                                onClick={() => setVoteDirection('for')}
                                className={`p-8 text-3xl font-black uppercase border-4 border-black transition-all flex flex-col items-center justify-center ${voteDirection === 'for'
                                        ? 'bg-[#B8EF53] text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1'
                                        : 'bg-[#42C9FF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1'
                                    }`}
                            >
                                VOTE FOR
                                {voteDirection === 'for' && <span className="text-lg mt-2">SELECTED</span>}
                            </button>
                            <button
                                onClick={() => setVoteDirection('against')}
                                className={`p-8 text-3xl font-black uppercase border-4 border-black transition-all flex flex-col items-center justify-center ${voteDirection === 'against'
                                        ? 'bg-[#FF7F41] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1'
                                        : 'bg-[#FFFF00] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1'
                                    }`}
                            >
                                VOTE AGAINST
                                {voteDirection === 'against' && <span className="text-lg mt-2">SELECTED</span>}
                            </button>
                        </div>
                    )}

                    {voteDirection && proposal.status === 'active' && (
                        <div className="mt-8 border-4 border-black p-6 bg-white space-y-4">
                            <h3 className="text-2xl font-black uppercase text-center">Deposit to Vote</h3>
                            <p className="text-center font-medium">Your Balance: 10,000 GOV</p>
                            <Input
                                type="number"
                                placeholder="Enter amount to vote"
                                value={voteAmount}
                                onChange={(e) => setVoteAmount(e.target.value)}
                                className="h-14 text-xl text-center font-bold border-4 border-black focus:ring-0 focus:border-black"
                            />
                            <button
                                onClick={handleVoteSubmit}
                                className="w-full p-4 text-2xl font-black uppercase border-4 border-black bg-black text-white shadow-[4px_4px_0px_0px_#42C9FF] hover:shadow-[6px_6px_0px_0px_#42C9FF] hover:-translate-x-px hover:-translate-y-px transition-all"
                            >
                                SUBMIT VOTE
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center text-lg font-bold uppercase tracking-wider">
                        {proposal.endTime}
                    </div>
                </div>
            </div>
        </div>
    );
}
