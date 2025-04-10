"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Show "Need help?" bubble on initial load
  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => setShowHint(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className={`bg-white border border-gray-200 flex flex-col rounded-lg shadow-lg p-4 transition-all duration-300 ${isExpanded ? "w-[90vw] h-[80vh] max-w-4xl" : "w-[400px] h-[300px] max-w-lg"}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-pink-500">Ask Me Anything!</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                  <Minimize2 className="text-gray-400 hover:text-pink-600" size={20} />
                ) : (
                  <Maximize2 className="text-gray-400 hover:text-pink-600" size={20} />
                )}
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="text-gray-400 hover:text-pink-600" size={20} />
              </button>
            </div>
          </div>

          {/* Chat content */}
          <div className="flex-grow overflow-y-auto mb-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left text-pink-600"}`}>
                <p>{m.content}</p>
              </div>
            ))}
            {loading && (
              <div className="text-left text-pink-400 italic text-sm mb-2">Grace is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Grace..."
              className="flex-1 border p-2 rounded-l text-sm"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 rounded-r text-sm hover:bg-pink-600"
            >
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="relative">
          {/* Tooltip bubble */}
          {showHint && (
            <div className="absolute bottom-14 right-0 bg-white text-gray-800 text-sm border border-gray-300 px-4 py-2 rounded-lg shadow-lg w-max">
              Ask Grace!
            </div>
          )}

          {/* Floating button with animation */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center animate-pulse"
            aria-label="Open ChatBot"
          >
            <MessageCircle size={24} />
          </button>
        </div>
      )}
    </div>
  );
}