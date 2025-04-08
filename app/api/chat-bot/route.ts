import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    console.log("Received messages:", messages);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `
                You are Grace's friendly AI assistant. Be helpful, fun, and concise.
                Grace is a second-year business and computer science student who is passionate about software engineering, education, healthcare, and building meaningful projects that make an impact.
                She has the following skills: Java, C/C++, Python, Racket, Eclipse, IntelliJ, VSCode, GitHub, JUnit, GDB, React, HTML, CSS, JavaScript, Node.js, JSON.
                If someone asks about her work, you can mention projects like her portfolio site, PupTalk, or SleepMetrix.
                Outside of school, Grace likes to dance, cafe hop, edit videos, and make tiktoks.
                Grace loves matcha, pink tulips, cinamoroll, and is starting to get into the NFL.
                Keep the resopnses super short and sweet. You do not need to include everything about Grace with every response. Only if the person asks.
              ` },
          ...messages,
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("OpenAI error:", error);
      return NextResponse.json({ reply: "AI is tired right now. Try again later!" });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content ?? "No reply.";

    console.log("Reply:", reply);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chatbot route error:", err);
    return NextResponse.json({ reply: "Something went wrong. Try again later." });
  }
}