

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader } from "lucide-react";

type ParticipationState = "NOT_REGISTERED" | "REGISTERING" | "REGISTERED" | "CHECKING_RESULTS" | "WON" | "LOST" | "PURCHASING";

interface Project {
  // Define expected fields as needed, e.g.:
  id: string;
  name: string;
  // add more fields according to your project's requirements
}

export function ProjectParticipation({ project }: { project: Project; }) {
  const [state, setState] = useState<ParticipationState>("NOT_REGISTERED");
  const [purchaseAmount, setPurchaseAmount] = useState("");

  console.log(project);

  const handleRegister = () => {
    setState("REGISTERING");
    toast.loading("Registering your interest...");
    setTimeout(() => {
      setState("REGISTERED");
      toast.success("You have successfully registered for the allocation lottery!");
    }, 2000);
  };

  const handleCheckResults = () => {
    setState("CHECKING_RESULTS");
    toast.loading("Checking lottery results...");
    setTimeout(() => {
      if (Math.random() > 0.5) {
        setState("WON");
        toast.success("Congratulations! You have won an allocation.");
      } else {
        setState("LOST");
        toast.error("Sorry, you were not selected for an allocation this time.");
      }
    }, 3000);
  };

  const handlePurchase = () => {
    setState("PURCHASING");
    toast.loading("Processing your purchase...");
    setTimeout(() => {
      toast.success(`Successfully purchased ${purchaseAmount} tokens!`);
      // Reset state or redirect
    }, 2000);
  };

  const allocationAmount = 500; // Dummy allocation amount in USD

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participate in Project</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === "NOT_REGISTERED" && (
          <>
            <p>Register your interest to be part of the allocation lottery.</p>
            <Button onClick={handleRegister} className="w-full">Register Interest</Button>
          </>
        )}
        {state === "REGISTERING" && (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="animate-spin" />
            <span>Registering...</span>
          </div>
        )}
        {state === "REGISTERED" && (
          <>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle />
              <p className="font-bold">You are registered!</p>
            </div>
            <p className="text-sm text-gray-500">Lottery results will be announced soon. You can check back here later.</p>
            <Button onClick={handleCheckResults} className="w-full">Check Results</Button>
          </>
        )}
        {state === "CHECKING_RESULTS" && (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="animate-spin" />
            <span>Checking results...</span>
          </div>
        )}
        {state === "LOST" && (
          <div className="flex items-center space-x-2 text-red-500">
            <XCircle />
            <p className="font-bold">Not Selected</p>
          </div>
        )}
        {state === "WON" && (
          <>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle />
              <p className="font-bold">You Won an Allocation!</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Your Allocation</span>
              <span className="font-bold">${allocationAmount}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Input
                type="number"
                placeholder={`Amount (max ${allocationAmount})`}
                className="flex-grow"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                max={allocationAmount}
              />
              <Button onClick={handlePurchase} className="w-full sm:w-auto">Buy</Button>
            </div>
            <p className="text-xs text-gray-500">
              Gas estimate: 0.002 QF. You will receive approximately 995 TKN.
            </p>
          </>
        )}
        {state === "PURCHASING" && (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="animate-spin" />
            <span>Processing purchase...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
