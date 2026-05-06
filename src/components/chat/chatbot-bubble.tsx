import { MessageCircle, Sparkles, X, Send, ExternalLink, ArrowRight } from "lucide-react";
import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount as useQfAccount } from "@/lib/papi/hooks";
import { sendChatMessage } from "@/lib/chat/client";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import { useChatbotTxStore } from "@/lib/store/chatbot-tx-store";
import type { ActionDraft, ChatTurn } from "@/lib/chat/types";
import { useAccount as useEvmAccount } from "wagmi";
import { InlineSignPanel, isInlineSignableDraft } from "./inline-sign-panel";

const SESSION_STORAGE_KEY = "qfpad:chat:session";
const QUICK_ACTIONS = [
  "Create a token for me",
  "Airdrop some tokens for me",
  "Create a presale for me",
  "Lock some tokens for me",
  "Help me buy QPAD",
  "How do I claim QPAD?",
];

function isLockRetryPrompt(message: string) {
  const normalized = message.trim().toLowerCase();

  return (
    /^(yes|yeah|yep|yup|sure|okay|ok|go ahead|do it|retry|sign now|try again)$/i.test(normalized) ||
    /\b(try|sign|lock)\b.*\bagain\b/i.test(normalized) ||
    /\bretry\b/i.test(normalized)
  );
}

const QUINN_GREETINGS = [
  "Hey there, Quinn at your service.",
  "Hi — Quinn. What's up?",
  "Hey, Quinn here. What's good?",
  "Hi, I'm Quinn.",
  "Hey there. Quinn here.",
  "Quinn here. Welcome aboard.",
  "Hey there, champ.",
  "What's up, chad?",
  "Hey hey, friendo.",
  "Hey there, hero.",
  "Yo, fren. Quinn here.",
  "Gm fren. Quinn here.",
  "Wagmi. Quinn at your service.",
  "Gm ser. Quinn online.",
  "Yo anon. Quinn here.",
  "Lfg — Quinn reporting in.",
  "Hey degen. Quinn here.",
  "Gm gm. Quinn around.",
  "Bullish on questions. Quinn here.",
  "Hodl tight. Quinn's online.",
  "Stay frosty, anon. Quinn here.",
  "Hey — Quinn here. The presale isn't going to ape itself.",
  "Hi, Quinn. Charts loading, vibes pending.",
  "Quinn here. The mempool's quiet today.",
  "Hi, Quinn. Wallet ready, snacks optional.",
  "Hey, Quinn. Gas fees can't catch us today.",
  "Hey, Quinn. Did someone say liquidity?",
  "Quinn here. Wallets up.",
  "Hi, Quinn. Hands off the seed phrase.",
  "Hey, Quinn here. Tap in.",
];

function formatCitationLabel(url: string) {
  try {
    const parsed = new URL(url);
    return `${parsed.pathname || parsed.hostname}${parsed.hash || ""}`;
  } catch {
    return url;
  }
}

function isGitbookUrl(url: string) {
  try {
    return new URL(url).hostname.includes("gitbook.io");
  } catch {
    return false;
  }
}

function formatLinkLabel(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("gitbook.io")) {
      const tail = parsed.pathname.split("/").filter(Boolean).slice(-1)[0];
      return tail ? tail.replace(/-/g, " ") : "QFPad docs";
    }
    if (parsed.pathname.includes("/projects/")) {
      return "QPAD presale page";
    }
    return parsed.hostname;
  } catch {
    return "Open link";
  }
}

function renderMessageContent(content: string): ReactNode[] {
  const segments = content.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g).filter(Boolean);

  return segments.map((segment, index) => {
    const markdownLink = segment.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    if (markdownLink) {
      const [, label, href] = markdownLink;
      return (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {label}
        </a>
      );
    }

    if (/^https?:\/\//.test(segment)) {
      return (
        <a key={index} href={segment} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          {formatLinkLabel(segment)}
        </a>
      );
    }

    return <Fragment key={index}>{segment}</Fragment>;
  });
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      <span className="h-2 w-2 animate-[chat-dot_1s_infinite] rounded-full bg-black/60" />
      <span className="h-2 w-2 animate-[chat-dot_1s_0.15s_infinite] rounded-full bg-black/60" />
      <span className="h-2 w-2 animate-[chat-dot_1s_0.3s_infinite] rounded-full bg-black/60" />
    </div>
  );
}

function ActionDraftCard({ draft, onClose }: { draft: ActionDraft; onClose: () => void }) {
  const navigate = useNavigate();
  const setDraft = useChatbotActionStore((state) => state.setDraft);

  const handleCTA = () => {
    setDraft(draft);
    onClose();
    navigate(draft.targetRoute);
  };

  const walletLabel =
    draft.requiredWallet === "qf"
      ? "QF Wallet"
      : draft.requiredWallet === "evm"
        ? "MetaMask / EVM Wallet"
        : "None";

  return (
    <div className="mt-2 border border-black/15 bg-[#FFF7E8]">
      <div className="space-y-2 px-3 py-3">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/55">Ready in app</p>
        <p className="text-sm font-bold leading-5">{draft.summary}</p>
        {draft.warnings.length > 0 && (
          <p className="text-xs text-black/65">{draft.warnings.join(" ")}</p>
        )}
        {draft.missingFields.length > 0 && (
          <p className="text-xs text-black/55">Still needed: {draft.missingFields.join(", ")}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-black/45">
          <span>Wallet: {walletLabel}</span>
          <span>Chain: {draft.requiredChain ?? "any"}</span>
        </div>
        <button
          type="button"
          onClick={handleCTA}
          className="flex w-full items-center justify-center gap-1 border-[2px] border-black bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.08em] shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
        >
          {draft.actionType === "open_route" ? "Open" : "Set It Up"}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function ChatMessage({
  role,
  content,
  citations,
  actionDraft,
  isLoading,
  onActionClose,
}: {
  role: "user" | "assistant";
  content: string;
  citations?: string[];
  actionDraft?: ActionDraft | null;
  isLoading?: boolean;
  onActionClose: () => void;
}) {
  const isUser = role === "user";
  const gitbookCitations = (citations ?? []).filter((url) => isGitbookUrl(url));
  const shouldShowCitations = !isUser && !actionDraft && !content.includes("http://") && !content.includes("https://") && gitbookCitations.length > 0;

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] ${
          isUser
            ? "rounded-[20px] rounded-br-[8px] border-[2px] border-black bg-black px-3 py-2 text-white"
            : "rounded-[20px] rounded-bl-[8px] border-[2px] border-black bg-white px-3 py-2 text-black"
        }`}
      >
        {isLoading ? (
          <TypingDots />
        ) : (
          <p className="whitespace-pre-wrap text-xs font-bold leading-5">{renderMessageContent(content)}</p>
        )}
        {citations && citations.length > 0 && shouldShowCitations && (
          <div className="mt-2 space-y-1 border-t border-black/15 pt-2">
            {[...new Set(gitbookCitations)].map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-black/55 hover:text-black"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="truncate">{formatCitationLabel(url)}</span>
              </a>
            ))}
          </div>
        )}
        {actionDraft && !isLoading && <ActionDraftCard draft={actionDraft} onClose={onActionClose} />}
      </div>
    </div>
  );
}

export function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(SESSION_STORAGE_KEY);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastActionDraft, setLastActionDraft] = useState<ActionDraft | null>(null);
  const [lastCitations, setLastCitations] = useState<string[]>([]);
  const [guestHardLocked, setGuestHardLocked] = useState(false);
  const [welcomeGreeting] = useState(
    () => QUINN_GREETINGS[Math.floor(Math.random() * QUINN_GREETINGS.length)],
  );
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const [idlePlaceholder] = useState(() =>
    Math.random() < 0.5 ? "Ask Quinn a question ..." : "Press / for quick actions",
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { address: qfMappedAddress, ss58Address } = useQfAccount();
  const { address: evmAddress } = useEvmAccount();
  const {
    draft: activeSignDraft,
    phase: signPhase,
    setDraft: setActiveSignDraft,
    requestSignAttempt,
  } = useChatbotTxStore();
  const showGuestMode = useMemo(
    () => !(evmAddress || qfMappedAddress || ss58Address),
    [evmAddress, qfMappedAddress, ss58Address],
  );
  const activeInlineSignDraft = isInlineSignableDraft(activeSignDraft) ? activeSignDraft : null;
  const isSignFlowExpanded =
    activeInlineSignDraft !== null &&
    (
      activeInlineSignDraft.actionType === "airdrop_tokens" ||
      ["checking_allowance", "approving", "locking", "creating", "sending"].includes(signPhase)
    );

  useEffect(() => {
    if (!showGuestMode) {
      setGuestHardLocked(false);
    }
  }, [showGuestMode]);

  useEffect(() => {
    if (!lastActionDraft) return;

    if (isInlineSignableDraft(lastActionDraft)) {
      setActiveSignDraft(lastActionDraft);
      return;
    }

    setActiveSignDraft(null);
  }, [lastActionDraft, setActiveSignDraft]);

  const isGuestLocked = showGuestMode && guestHardLocked;

  const appendAssistantMessage = (content: string) => {
    setTranscript((previous) => [...previous, { role: "assistant", content }]);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionId) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [sessionId]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    requestAnimationFrame(() => {
      node.scrollTop = node.scrollHeight;
    });
  }, [transcript, isLoading, activeInlineSignDraft]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isSlashMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setIsSlashMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSlashMenuOpen]);

  const pushPrompt = async (prompt?: string) => {
    const trimmed = (prompt ?? input).trim();
    if (!trimmed || isLoading || isGuestLocked) return;

    if (
      activeInlineSignDraft &&
      signPhase !== "success" &&
      isLockRetryPrompt(trimmed)
    ) {
      const userTurn: ChatTurn = { role: "user", content: trimmed };
      setTranscript((previous) => [...previous, userTurn]);
      setInput("");
      requestSignAttempt();
      return;
    }

    const userTurn: ChatTurn = { role: "user", content: trimmed };
    const messages = [...transcript, userTurn];

    setTranscript([...messages, { role: "assistant", content: "" }]);
    setInput("");
    setIsLoading(true);
    setLastActionDraft(null);
    setLastCitations([]);

    try {
      const response = await sendChatMessage({
        sessionId: sessionId ?? undefined,
        mode: "auto",
        messages: messages.slice(-20),
        walletAddress: evmAddress ?? qfMappedAddress,
        ss58Address,
        evmAddress,
      });

      setSessionId(response.sessionId);

      setTranscript([
        ...messages,
        { role: "assistant", content: response.answer },
      ]);

      setLastActionDraft(response.actionDraft);
      setLastCitations(response.citations);

      if (response.blockReason === "guest_limit_hard") {
        setGuestHardLocked(true);
      }
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Sorry, I hit a connection issue. Try again in a moment.";

      setTranscript([
        ...messages,
        { role: "assistant", content: message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    await pushPrompt();
  };

  const handleQuickAction = async (prompt: string) => {
    await pushPrompt(prompt);
  };

  const handlePickQuickAction = (prompt: string) => {
    setIsSlashMenuOpen(false);
    void handleQuickAction(prompt);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && isSlashMenuOpen) {
      event.preventDefault();
      setIsSlashMenuOpen(false);
      return;
    }
    if (event.key === "/" && input === "" && !isGuestLocked) {
      event.preventDefault();
      setIsSlashMenuOpen(true);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  };

  const hasMessages = transcript.length > 0;

  return (
    <>
      <style>{`
        @keyframes chat-dot {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[55] bg-black/[0.03] backdrop-blur-[0.5px] md:hidden"
          aria-label="Close chat overlay"
        />
      )}

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[60] flex flex-col items-end gap-3">
        {isOpen && (
          <div
            className={`flex flex-col overflow-hidden rounded-[26px] border-[3px] border-black bg-white text-black shadow-[8px_8px_0_rgba(0,0,0,1)] ${
              isSignFlowExpanded
                ? "w-[min(24rem,calc(100vw-1rem))] max-w-[24rem] sm:w-[28rem] sm:max-w-[28rem]"
                : "w-[min(20.5rem,calc(100vw-1.5rem))] max-w-[20.5rem] sm:w-[22rem] sm:max-w-[22rem]"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b-[3px] border-black bg-[#B8EF53] px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <p className="text-xs font-black uppercase tracking-[0.16em]">Quinn</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border-[2px] border-black bg-white text-black shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className={`min-h-[13rem] flex-1 overflow-y-auto px-3 py-3 sm:px-4 ${
                isSignFlowExpanded ? "max-h-[min(72dvh,34rem)]" : "max-h-[min(62dvh,28rem)]"
              }`}
            >
              {!hasMessages && !isLoading && (
                <div className="space-y-3">
                  <p className="text-sm font-bold leading-6">{welcomeGreeting}</p>
                  <div className="rounded-[18px] border-[2px] border-black bg-[#FFF2D5] px-3 py-3">
                    <p className="text-sm font-bold leading-5">
                      Ask me any QFPad question. I can help with QPAD sale issues and tee up actions when you want something set up.
                    </p>
                    {showGuestMode && (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-black/55">
                        Guest mode: 5 prompts
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-black/55">
                      Quick actions
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action}
                          type="button"
                          onClick={() => void handleQuickAction(action)}
                          className="rounded-full border-[2px] border-black bg-white px-3 py-2 text-left text-xs font-bold shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {transcript.map((message, index) => {
                  const isLast = index === transcript.length - 1;
                  return (
                    <ChatMessage
                      key={`${message.role}-${index}`}
                      role={message.role}
                      content={message.content}
                      citations={isLast && message.role === "assistant" ? lastCitations : undefined}
                      actionDraft={
                        isLast &&
                        message.role === "assistant" &&
                        !isInlineSignableDraft(lastActionDraft)
                          ? lastActionDraft
                          : null
                      }
                      isLoading={isLast && message.role === "assistant" && isLoading}
                      onActionClose={() => setIsOpen(false)}
                    />
                  );
                })}
              </div>

              {activeInlineSignDraft && (
                <InlineSignPanel
                  draft={activeInlineSignDraft}
                  onAppendAssistantMessage={appendAssistantMessage}
                />
              )}
            </div>

            <div className="relative shrink-0 border-t-[3px] border-black bg-gray-50 px-3 py-3">
              {isSlashMenuOpen && (
                <div
                  ref={slashMenuRef}
                  className="absolute bottom-full left-3 right-3 mb-2 overflow-hidden rounded-[14px] border-[2px] border-black bg-white shadow-[4px_4px_0_rgba(0,0,0,1)]"
                >
                  <p className="border-b-[2px] border-black bg-[#FFF2D5] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-black/60">
                    Quick actions
                  </p>
                  <div className="flex flex-col">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handlePickQuickAction(action)}
                        className="border-b border-black/10 px-3 py-2 text-left text-xs font-bold last:border-b-0 hover:bg-gray-100"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 600))}
                  onKeyDown={handleKeyDown}
                  placeholder={isGuestLocked ? "Connect a wallet to keep chatting" : idlePlaceholder}
                  disabled={isLoading || isGuestLocked}
                  maxLength={600}
                  className="flex-1 rounded-full border-[2px] border-black px-4 py-2 text-base font-bold placeholder:text-black/35 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isLoading || isGuestLocked}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[2px] border-black bg-[#42C9FF] text-black shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  aria-label="Send message"
                >
                  {isLoading ? <TypingDots /> : <Send className="h-4 w-4" />}
                </button>
              </div>
              {isGuestLocked && (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black/55">
                  Guest cap reached — connect a wallet to continue
                </p>
              )}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Hide chatbot" : "Show chatbot"}
          className={`${isOpen ? "hidden md:inline-flex" : "inline-flex"} h-14 w-14 items-center justify-center rounded-full border-[3px] border-black bg-[#42C9FF] text-black shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
