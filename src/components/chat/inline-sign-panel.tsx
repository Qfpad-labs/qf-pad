import type { ActionDraft } from "@/lib/chat/types";
import { AirdropSignPanel } from "./airdrop-sign-panel";
import { CreateTokenSignPanel } from "./create-token-sign-panel";
import { LockSignPanel } from "./lock-sign-panel";

export function isInlineSignableDraft(draft: ActionDraft | null) {
  if (!draft || draft.missingFields.length > 0) return false;

  if (draft.actionType === "lock_token") return true;
  if (draft.actionType === "airdrop_tokens") return true;
  if (draft.actionType === "create_token") {
    return draft.prefill.tokenType !== "3";
  }

  return false;
}

export function InlineSignPanel({
  draft,
  onAppendAssistantMessage,
}: {
  draft: ActionDraft;
  onAppendAssistantMessage: (content: string) => void;
}) {
  if (draft.actionType === "lock_token") {
    return <LockSignPanel draft={draft} onAppendAssistantMessage={onAppendAssistantMessage} />;
  }

  if (draft.actionType === "create_token") {
    return <CreateTokenSignPanel draft={draft} onAppendAssistantMessage={onAppendAssistantMessage} />;
  }

  if (draft.actionType === "airdrop_tokens") {
    return <AirdropSignPanel draft={draft} onAppendAssistantMessage={onAppendAssistantMessage} />;
  }

  return null;
}
