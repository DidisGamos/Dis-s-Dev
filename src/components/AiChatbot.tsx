import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, User, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatBotServerFn } from "@/lib/ai-action";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Bonjour ! Je suis DisBot (propulsé par Vercel AI SDK & Groq Llama 3.3 70B). Posez-moi vos questions sur nos services, nos tarifs ou votre futur projet !",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const botAnswer = await chatBotServerFn({ data: { message: query } });
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botAnswer || "Désolé, je n'ai pas pu générer de réponse.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("[AiChatbot Error]", err);
      const botMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: "bot",
        text: "Bonjour ! Nos services incluent la création web, les apps mobiles et les solutions IA. N'hésitez pas à remplir le formulaire de contact en bas de page pour échanger avec notre équipe !",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* Overlay mobile */}
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <AnimatePresence mode="wait">
          {!open && (
            <motion.button
              key="chatbot-trigger"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setOpen(true)}
              aria-label="Ouvrir l'assistant IA DisBot"
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-glow)] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              <Bot className="h-7 w-7 transition-transform group-hover:rotate-12" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400" />
              </span>
            </motion.button>
          )}

          {open && (
            <motion.div
              key="chatbot-window"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl backdrop-blur-xl sm:static sm:h-[540px] sm:w-[400px] sm:rounded-3xl"
            >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface/90 px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand/20 text-brand ring-1 ring-brand/30">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-foreground text-sm">
                    DisBot IA <Sparkles className="h-3.5 w-3.5 text-brand" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> Powered by Vercel AI SDK
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages avec Scrollbar sombre personnalisée */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      m.sender === "user" ? "bg-brand text-brand-foreground" : "bg-surface-2 text-brand"
                    }`}
                  >
                    {m.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 whitespace-pre-wrap leading-relaxed ${
                      m.sender === "user"
                        ? "bg-brand text-brand-foreground font-medium rounded-tr-none"
                        : "bg-surface border border-border text-foreground rounded-tl-none"
                    }`}
                  >
                    {m.text}
                    <div
                      className={`mt-1 text-[10px] ${
                        m.sender === "user" ? "text-brand-foreground/70 text-right" : "text-muted-foreground"
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs italic p-1">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-brand" /> AI SDK génère une réponse...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chips d'action rapide sans scrollbar horizontale inesthétique */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2 border-t border-border/50 bg-background/50 shrink-0">
              {[
                "Nos services",
                "Obtenir un devis",
                "Où êtes-vous ?",
                "Vos technologies",
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Zone de saisie adaptée mobile */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-border bg-surface/90 p-3 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question à l'IA..."
                className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-brand"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Envoyer"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </>
  );
}
