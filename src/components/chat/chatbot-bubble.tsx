import { MessageCircle, Sparkles, X, Send, ExternalLink, ArrowRight } from "lucide-react";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount as useQfAccount } from "@/lib/papi/hooks";
import { sendChatMessage } from "@/lib/chat/client";
import { useChatbotActionStore } from "@/lib/store/chatbot-action-store";
import type { ActionDraft, ChatTurn } from "@/lib/chat/types";
import { useAccount as useEvmAccount } from "wagmi";

const SESSION_STORAGE_KEY = "qfpad:chat:session";
const QUICK_ACTIONS = [
  "Create a token for me",
  "Create a presale for me",
  "Lock some tokens for me",
  "Help me buy QPAD",
  "How do I claim QPAD?",
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { address: qfMappedAddress, ss58Address } = useQfAccount();
  const { address: evmAddress } = useEvmAccount();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionId) {
      window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
    } else {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [sessionId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const pushPrompt = async (prompt?: string) => {
    const trimmed = (prompt ?? input).trim();
    if (!trimmed || isLoading) return;

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

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1.5px] md:hidden"
          aria-label="Close chat overlay"
        />
      )}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="flex w-[min(20.5rem,calc(100vw-1.5rem))] max-w-[20.5rem] flex-col overflow-hidden rounded-[26px] border-[3px] border-black bg-white text-black shadow-[8px_8px_0_rgba(0,0,0,1)] sm:w-[22rem] sm:max-w-[22rem]">
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
                className="inline-flex h-8 w-8 items-center justify-center border-[2px] border-black bg-white text-black shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="max-h-[min(62vh,28rem)] min-h-[13rem] flex-1 overflow-y-auto px-3 py-3 sm:px-4"
            >
              {!hasMessages && !isLoading && (
                <div className="space-y-3">
                  <p className="text-sm font-bold leading-6">
                    Agent Quinn at your service. No relation to Harley. Fewer bats, more launchpads.
                  </p>
                  <div className="rounded-[18px] border-[2px] border-black bg-[#FFF2D5] px-3 py-3">
                    <p className="text-sm font-bold leading-5">
                      Ask me any QFPad question. I can help with QPAD sale issues and tee up actions when you want something set up.
                    </p>
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
                      actionDraft={isLast && message.role === "assistant" ? lastActionDraft : null}
                      isLoading={isLast && message.role === "assistant" && isLoading}
                      onActionClose={() => setIsOpen(false)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="shrink-0 border-t-[3px] border-black bg-gray-50 px-3 py-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value.slice(0, 600))}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a QFPad question..."
                  disabled={isLoading}
                  maxLength={600}
                  className="flex-1 border-[2px] border-black px-3 py-2 text-sm font-bold placeholder:text-black/35 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-black bg-[#42C9FF] text-black shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  aria-label="Send message"
                >
                  {isLoading ? <TypingDots /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Hide chatbot" : "Show chatbot"}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-black bg-[#42C9FF] text-black shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
