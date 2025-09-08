import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { api } from "../../api/client";

type ChatMessage = {
    role: "user" | "assistant" | "system";
    content: string;
}

export default function AIChat() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content: "Hi! I'm your portfolio AI assistant. How can I help?"
        },
    ])
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const reduce = useReducedMotion();
    const location = useLocation();
    const CHAT_STORAGE_KEY = "ai_chat_messages_v1";
    const listRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to latest message
    useEffect(() => {
        listRef.current?.scrollTo({top: listRef.current.scrollHeight, behavior: "smooth"});        
    }, [messages, open]);

    // ✅ Changed: persist messages whenever they update
    useEffect(() => {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // Listen for project proposal submissions from the projects form
    useEffect(() => {
        function onProposalSubmitted(e: Event) {
            const ce = e as CustomEvent<{
                name: string;
                email: string;
                title: string;
                budget: string;
                timeline: string;
                requirements: string;
                comments?: string;
                proposal: string;
            }>;

            const d = ce.detail;
            //Build a concise user summary for the chat (latest decision: include title, budget, timeline, requirements, comments)
            const userSummary =
                `Project Title: ${d.title}\nBudget: ${d.budget}\nTimeline: ${d.timeline}\n` +
                `Requirements: ${d.requirements}${d.comments ? `\nComments: ${d.comments}` : ""}`;

            // Push user's message (requirements + key details)
            setMessages((prev) => [...prev, { role: "user", content: userSummary }]);

            // Push assistant: proposal text + follow-up line
            const assistantReply =
                `${d.proposal}\n\n—\nI’ll reach out to you soon at ${d.email} with follow-up details and next steps.`;
            setMessages((prev) => [...prev, { role: "assistant", content: assistantReply }]);

            // Optionally, auto-open the chat so they see it appear
            setOpen(true);
        }

        window.addEventListener("proposal:submitted", onProposalSubmitted as EventListener);
        return () => window.removeEventListener("proposal:submitted", onProposalSubmitted as EventListener);
    }, []);

    // ✅ Changed: agent mapping function
    function getAgentFromPath(pathname: string | undefined) {
        if (!pathname) return undefined;
        if (pathname.startsWith("/projects")) return "technical";
        if (pathname.startsWith("/about")) return "storyteller";
        if (pathname === "/") return "router";
        return undefined; // none on other pages
    }

    async function sendMessage() {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setInput("");
        setSending(true);

        try {
            const agent = getAgentFromPath(location.pathname);
            const payload: any = { message: userMsg };
            if (agent) payload.agent = agent;

            // General chat on all pages → /api/chat
            const res = await api.post("/api/chat", payload);
            const reply = res?.data?.message || "I’m not sure I understood that, could you rephrase?";
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I couldn’t reach the server. Please try again." },
            ]);
        } finally {
            setSending(false);
        }
    }

    const panelVariants = {
        hidden: { opacity: 0, y: 12, scale: reduce ? 1 : 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28 } },
        exit: { opacity: 0, y: 12, scale: reduce ? 1 : 0.98, transition: { duration: 0.2 } },
    };

    return (
        <>
            {/* Floating toggle button */}
            <button
                aria-label={open ? "Close chat" : "Open chat"}
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-5 right-5 z-40 rounded-full p-4 shadow-lg bg-sky-500 hover:bg-sky-600 text-white focus-visible:ring-4 focus-visible:ring-sky-300"
            >
                {/* Chat bubble icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M21 12c0 4.418-4.03 8-9 8-1.196 0-2.341-.19-3.388-.54L3 21l1.54-4.612C4.19 15.341 4 14.196 4 13c0-4.418 4.03-8 9-8s8 3.582 8 7z" stroke="currentColor" strokeWidth="2" />
                </svg>
            </button>

            {/* Sliding panel */}
            <AnimatePresence>
                {open && (
                    <motion.section
                        className="fixed bottom-20 right-5 z-40 w-[90vw] max-w-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900"
                        role="dialog"
                        aria-modal="true"
                        aria-label="AI Chat"
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        variants={panelVariants}
                    >
                        <header className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="font-semibold">AI Assistant</div>
                            <span className="text-xs text-slate-500">
                                {location.pathname === "/projects" ? "Projects mode enabled" : "General mode"}
                            </span>
                        </header>

                        <div ref={listRef} className="p-3 space-y-2 h-80 overflow-y-auto" role="log" aria-live="polite">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`max-w-[85%] p-3 rounded-lg whitespace-pre-wrap ${m.role === "user"
                                            ? "ml-auto bg-sky-500 text-white"
                                            : "mr-auto bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            ))}
                        </div>

                        <form
                            className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-sky-400"
                                aria-label="Type your message"
                            />
                            <button
                                type="submit"
                                disabled={sending}
                                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium disabled:opacity-60"
                                aria-busy={sending}
                            >
                                {sending ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}