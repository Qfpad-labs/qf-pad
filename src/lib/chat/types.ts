export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface ActionDraft {
  actionType: string;
  targetRoute: string;
  requiredWallet: "qf" | "evm" | null;
  requiredChain: "qf" | "ethereum" | null;
  prefill: Record<string, string>;
  summary: string;
  warnings: string[];
  missingFields: string[];
  nextSteps: string[];
}

export interface ChatRequest {
  sessionId?: string;
  mode?: "auto" | "fast" | "deep";
  messages: ChatTurn[];
  walletAddress?: string;
  ss58Address?: string;
  evmAddress?: string;
}

export type ChatBlockReason = "guard" | "guest_limit_soft" | "guest_limit_hard";

export interface ChatResponse {
  blocked: boolean;
  blockReason?: ChatBlockReason;
  sessionId: string | null;
  model?: string;
  answer: string;
  citations: string[];
  actionDraft: ActionDraft | null;
}

export interface ChatError {
  error: string;
  sessionId?: string;
  detail?: string;
}
