import type { PresaleCategory, PresaleSocials } from "@/lib/store/launchpad-presale-store";
import type { Address } from "viem";

export interface PresaleMetadata {
  category?: PresaleCategory;
  socials?: PresaleSocials;
  description?: string;
  logo?: string;
}

// Map presale contract addresses to their metadata (socials, category, etc.)
// Add entries here for each presale that has social links
export const presaleMetadataMap: Record<string, PresaleMetadata> = {
  // Example entry - replace with actual presale addresses:
  // "0x1234...": {
  //   category: "defi",
  //   socials: {
  //     twitter: "https://twitter.com/projectname",
  //     telegram: "https://t.me/projectname",
  //     discord: "https://discord.gg/projectname",
  //     website: "https://projectname.com",
  //   },
  //   description: "A revolutionary DeFi protocol",
  //   logo: "https://example.com/logo.png",
  // },
  "0x8b495b4171a63eb206991f546328d61e7e164b92": {
    category: "meme",
    socials: {
      twitter: "https://x.com/hidethegain",
      telegram: "https://t.me/hidethegain",
      website: "https://Hidethegain.com",
      discord: "",
    },
  },
  "0x843ae255dd8945022107eeb888f90c5ecadd96a2": {
    category: "infrastructure",
    socials: {
      twitter: "https://x.com/qfpad_",
      telegram: "https://t.me/qfpad",
      website: "https://portal.qfnetwork.xyz/?rpc=wss%3A%2F%2Fmainnet.qfnode.net#/explorer",
      discord: "",
    },
  },
};

export function getPresaleMetadata(address: Address | string): PresaleMetadata | undefined {
  const normalizedAddress = address.toLowerCase();
  return presaleMetadataMap[normalizedAddress];
}
