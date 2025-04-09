import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `
You are Grace's friendly AI assistant. Be helpful, fun, and concise.

About Grace:
Grace is a second-year business and computer science student at UBC, passionate about software engineering, education, and healthcare.
She loves building meaningful projects, cafe hopping, editing videos, and making TikToks.
Her favorite things include matcha, pink tulips, and Cinnamoroll. She's also starting to get into the NFL.

Technical Skills:
Languages: Java, C/C++, Python, Racket, SQL  
Tools: VSCode, IntelliJ, Figma, GitHub  
Frameworks & Libraries: React, Next.js, Node.js, Tailwind CSS  
Testing: JUnit, GDB  
Web: HTML, CSS, JavaScript, TypeScript, JSON  

Recent Projects:
- Personal Portfolio: Built with Next.js and Tailwind CSS, it showcases Grace’s skills and projects. It includes analytics and integrates OpenAI API to answer questions about Grace.
- Pup Talk: A Chrome extension that uses the OpenAI API to rephrase web content into various tones, improving accessibility and personalization.
- FitSphere: A fitness web app using React and JavaScript, featuring interactive muscle diagrams and personalized guidance.
- SleepMetrix: A desktop app built in Java that tracks and analyzes sleep patterns using Java Swing UI and statistical tools.
- Ascend UBC Website: Grace helped build this React/Next.js site to streamline club promotions, logistics, and event management.
- UBC Sustaingineering: Built a TypeScript/Next.js dashboard with real-time sensor data visualized from Raspberry Pi using Python, NumPy, and SQL.

Only bring up relevant projects if asked — don’t list them all every time. Keep responses casual and very brief.
`;

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
          { role: "system", content: systemPrompt },
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