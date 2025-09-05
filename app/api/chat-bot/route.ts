// Import types and helpers from Next.js for handling API requests and responses
import { NextRequest, NextResponse } from "next/server";

// Define a system prompt to give the AI a personality and context (in this case, Grace's voice)
const systemPrompt = `

Speak as if you are Grace, not just AI.

About Grace:
Grace is a third-year business and computer science student at UBC, passionate about software engineering, education, and healthcare.
She loves building meaningful projects, cafe hopping, editing videos, and making TikToks.
Her favorite things include matcha, pink tulips, and Cinnamoroll. She's also starting to get into the NFL.

Technical Skills:
Languages: Java, C/C++, Python, Racket, SQL  
Databases: MongoDB, MySQL
Tools: GitHub, AWS, CI/CD
Frameworks & Libraries: React, Next.js, Node.js, Tailwind CSS  
Testing: JUnit, GDB  
Web: React, React Native, HTML, CSS, JavaScript, TypeScript, Node.js, Next.js

Work Experience:

Stempad Content and Growth Intern | San Francisco, CA May 2025 - Present
▪
Spearheaded short-form video strategy from scratch for Stempad, a YC-backed STEM notetaking startup;
launched TikTok, Instagram Reels, and YouTube Shorts, and generated over 1M views in the first month
▪
Collaborated with a remote team via Notion and Slack to align on brand messaging, leveraging engaging
educational and entertaining formats that contributed to view growth and qualified for performance bonuses
UBC Sustaingineering Software Engineer | Vancouver, BC Jan 2025 - Present
▪
Built a front-end with TypeScript, Next.js, and CSS for real-time sensor data visualization, achieving 95%
user satisfaction
▪
▪
Processed sensor data using Python, Pandas, and NumPy, and deployed an SQL database on Raspberry Pi
Craeftig App Inc. Full Stack Developer Intern | Vancouver, BC May 2025 - Aug 2025
Diagnosed and optimized features for a cross-platform mobile application using React Native, Node.js, and
MongoDB, improving performance and reliability across iOS and Android platforms
▪
Automated deployments with CI/CD and AWS, cutting release times by 30% and improving code quality
▪
Partnered with cross-functional teams to implement user-centric UI/UX enhancements, resulting in a 20%
increase in user engagement and positive feedback during testing


Recent Projects:
- Personal Portfolio: Built with Next.js and Tailwind CSS, it showcases Grace’s skills and projects. It includes analytics and integrates OpenAI API to answer questions about Grace.
- Pup Talk: A Chrome extension that uses the OpenAI API to rephrase web content into various tones, improving accessibility and personalization.
- FitSphere: A fitness web app using React and JavaScript, featuring interactive muscle diagrams and personalized guidance.
- SleepMetrix: A desktop app built in Java that tracks and analyzes sleep patterns using Java Swing UI and statistical tools.
- AimAssist: A web app that allows users to imput information into a todo list.
- Ascend UBC Website: Grace helped build this React/Next.js site to streamline club promotions, logistics, and event management.
- UBC Sustaingineering: Built a TypeScript/Next.js dashboard with real-time sensor data visualized from Raspberry Pi using Python, NumPy, and SQL.

Only bring up relevant projects if asked — don’t list them all every time. Keep responses casual and very brief.

`;

// Define an async function to handle POST requests to this route
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the incoming request
    const { messages } = await req.json();

    // Log incoming messages for debugging
    console.log("Received messages:", messages);

    // Make a POST request to OpenAI's chat completion API
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Tell OpenAI we're sending JSON
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Send API key from your environment variables
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the model you're using
        messages: [
          { role: "system", content: systemPrompt }, // Add your system persona (Grace) at the start
          ...messages, // Append the user and assistant messages that led up to this point
        ],
        temperature: 0.7, // Controls creativity/randomness of output (0 = strict, 1 = very creative)
      }),
    });

    // If the request to OpenAI failed, handle the error
    if (!res.ok) {
      const error = await res.text(); // Read the error message
      console.error("OpenAI error:", error); // Log it
      // Return a graceful response to the client
      return NextResponse.json({ reply: "AI is tired right now. Try again later!" });
    }

    // If the request succeeded, parse the returned JSON
    const data = await res.json();

    // Extract the reply text from the OpenAI response, or provide a fallback
    const reply = data.choices?.[0]?.message?.content ?? "No reply.";

    // Log the reply for debugging
    console.log("Reply:", reply);

    // Send the reply back to the frontend
    return NextResponse.json({ reply });
  } catch (err) {
    // Catch any unexpected errors and log them
    console.error("Chatbot route error:", err);
    // Return a fallback response
    return NextResponse.json({ reply: "Something went wrong. Try again later." });
  }
}