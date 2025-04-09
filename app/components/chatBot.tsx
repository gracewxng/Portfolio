"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-pink-500">Grace's AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="text-gray-400 hover:text-pink-600" size={20} />
            </button>
          </div>

          {/* Chat content */}
          <div className="h-48 overflow-y-auto mb-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left text-pink-600"}`}>
                <p>{m.content}</p>
              </div>
            ))}
            {loading && (
              <div className="text-left text-pink-400 italic text-sm mb-2">Grace's AI is typing...</div>
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
              placeholder="Ask Grace's AI..."
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
        <button
          onClick={() => setIsOpen(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Open ChatBot"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}