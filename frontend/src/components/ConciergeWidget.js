import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, SendHorizontal } from "lucide-react";

const GREETING =
  "Hello — ask me about ANUYORA’s bookkeeping services, engagement approach or how we work with accounting firms.";

export default function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    try {
      let sid = localStorage.getItem("anuyora_chat_session");
      if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem("anuyora_chat_session", sid);
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sid,
          messages: next
            .filter((m) => m.role !== "error")
            .slice(-8)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok || !res.body) throw new Error("request failed");
      setMessages([...next, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let reply = "";
      let failed = false;
      const apply = (msg) =>
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = msg;
          return copy;
        });
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buffer.indexOf("\n\n")) !== -1) {
          const chunk = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          if (!chunk.startsWith("data:")) continue;
          try {
            const payload = JSON.parse(chunk.slice(5).trim());
            if (payload.delta) {
              reply += payload.delta;
              apply({ role: "assistant", content: reply });
            } else if (payload.error) {
              failed = true;
              apply({ role: "error", content: payload.error });
            }
          } catch {
            continue;
          }
        }
      }
      if (!reply && !failed) throw new Error("empty response");
    } catch {
      setMessages([
        ...next,
        {
          role: "error",
          content: "Something went wrong. Please try again, or reach us through the contact form.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        data-testid="concierge-toggle"
        aria-expanded={open}
        aria-label={open ? "Close Ask ANUYORA" : "Open Ask ANUYORA"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[70] inline-flex h-12 items-center gap-3 bg-navy px-5 text-sm font-semibold tracking-wide text-navy-text shadow-lg transition-colors duration-300 hover:bg-navy-mid"
      >
        {open ? <X size={16} strokeWidth={2} /> : <MessageSquare size={16} strokeWidth={2} />}
        <span className="hidden sm:inline">Ask ANUYORA</span>
      </button>

      <div
        data-testid="concierge-panel"
        aria-hidden={!open}
        className={`fixed bottom-24 right-4 z-[70] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col border border-hairline bg-white shadow-2xl transition-all duration-300 sm:right-6 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ height: "min(540px, calc(100vh - 8rem))" }}
      >
        <div className="border-b border-hairline bg-paper px-6 py-5">
          <p className="font-serif text-lg tracking-tight text-ink">Ask ANUYORA</p>
          <p className="mt-1 text-xs text-slate-400">
            Answers based on this website. For anything specific, use the contact form.
          </p>
        </div>

        <div ref={listRef} data-testid="concierge-messages" className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {messages.map((m, i) => (
            <div
              key={i}
              data-testid={`concierge-message-${i}`}
              className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-navy text-navy-text"
                  : m.role === "error"
                    ? "border border-red-200 bg-red-50 text-red-800"
                    : "border border-hairline bg-paper text-ink"
              }`}
            >
              {m.content}
              {busy && i === messages.length - 1 && m.role === "user" && (
                <span className="ml-2 inline-flex gap-1" aria-label="ANUYORA is typing">
                  <span className="h-1 w-1 animate-pulse bg-slate-400" />
                  <span className="h-1 w-1 animate-pulse bg-slate-400 [animation-delay:150ms]" />
                  <span className="h-1 w-1 animate-pulse bg-slate-400 [animation-delay:300ms]" />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-hairline px-4 py-3">
          <div className="flex items-center gap-2">
            <label htmlFor="concierge-input" className="sr-only">
              Your question
            </label>
            <input
              id="concierge-input"
              data-testid="concierge-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about our services…"
              className="w-full border-0 border-b border-hairline bg-transparent py-2 text-[14px] text-ink placeholder:text-slate-400 transition-colors focus:border-navy-mid focus:outline-none"
            />
            <button
              type="button"
              data-testid="concierge-send"
              onClick={send}
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-navy transition-colors hover:text-navy-mid disabled:opacity-40"
            >
              <SendHorizontal size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
