import { create } from "zustand";
import type { ActionDraft } from "@/lib/chat/types";

export type ChatbotSignPhase =
  | "idle"
  | "ready"
  | "checking_allowance"
  | "approving"
  | "locking"
  | "creating"
  | "sending"
  | "success"
  | "error";

interface ChatbotSignFlowState {
  draft: ActionDraft | null;
  phase: ChatbotSignPhase;
  approvalTxHash: string | null;
  primaryTxHash: string | null;
  resultAddress: string | null;
  errorMessage: string | null;
  signRequestId: number;
  setDraft: (draft: ActionDraft | null) => void;
  requestSignAttempt: () => void;
  updateFlow: (patch: Partial<Pick<ChatbotSignFlowState, "phase" | "approvalTxHash" | "primaryTxHash" | "resultAddress" | "errorMessage">>) => void;
  clearFlow: () => void;
}

const INITIAL_STATE = {
  draft: null,
  phase: "idle" as const,
  approvalTxHash: null,
  primaryTxHash: null,
  resultAddress: null,
  errorMessage: null,
  signRequestId: 0,
};

export const useChatbotTxStore = create<ChatbotSignFlowState>()((set) => ({
  ...INITIAL_STATE,
  setDraft: (draft) =>
    set((state) => {
      if (!draft) {
        return { ...INITIAL_STATE };
      }

      const sameDraft =
        state.draft?.actionType === draft.actionType &&
        state.draft?.targetRoute === draft.targetRoute &&
        JSON.stringify(state.draft?.prefill ?? {}) === JSON.stringify(draft.prefill ?? {});

      if (sameDraft && state.phase !== "idle") {
        return state;
      }

      return {
        draft,
        phase: "ready",
        approvalTxHash: null,
        primaryTxHash: null,
        resultAddress: null,
        errorMessage: null,
        signRequestId: state.signRequestId,
      };
    }),
  requestSignAttempt: () =>
    set((state) => ({
      signRequestId: state.signRequestId + 1,
    })),
  updateFlow: (patch) =>
    set((state) => ({
      ...state,
      ...patch,
    })),
  clearFlow: () => set({ ...INITIAL_STATE }),
}));
