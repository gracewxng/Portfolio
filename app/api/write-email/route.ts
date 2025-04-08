import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    const prompt = `You can mention matcha, football, dancing, or video editing if fitting.
                   Write a short, friendly, and polite email to Grace about: ${topic}`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("OpenAI API error:", error);
      return NextResponse.json({ email: "OpenAI API error. Check logs." });
    }

    const data = await res.json();
    const email = data.choices?.[0]?.message?.content ?? "No response from AI.";

    return NextResponse.json({ email });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ email: "Server error. Check logs." });
  }
}