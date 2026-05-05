import { create } from "zustand";
import type { ActionDraft } from "@/lib/chat/types";

interface ChatbotActionState {
  draft: ActionDraft | null;
  setDraft: (draft: ActionDraft | null) => void;
  clearDraft: () => void;
}

export const useChatbotActionStore = create<ChatbotActionState>()((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));
