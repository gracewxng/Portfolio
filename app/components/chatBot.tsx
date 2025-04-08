"use client";
import { useState } from "react";

export function ChatBot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    console.log("sending request to chatbot");

    const res = await fetch("/api/chat-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      <div className="h-48 overflow-y-auto mb-2 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === "user" ? "text-right" : "text-left text-pink-600"}`}>
            <p>{m.content}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Grace's AI..."
          className="flex-1 border p-2 rounded-l"
        />
        <button onClick={sendMessage} className="bg-pink-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}