import type { ChatRequest, ChatResponse } from "./types";

const API_BASE = import.meta.env.VITE_CHAT_API_BASE_URL as string | undefined;

export function getChatBaseUrl(): string {
  return (API_BASE || "").replace(/\/$/, "");
}

export async function sendChatMessage(input: ChatRequest): Promise<ChatResponse> {
  const baseUrl = getChatBaseUrl();
  if (!baseUrl) {
    throw new Error("VITE_CHAT_API_BASE_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.detail ?? `Chat request failed with ${response.status}`);
  }

  return response.json();
}
