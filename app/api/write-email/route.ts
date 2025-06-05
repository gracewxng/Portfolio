// Import Next.js request and response types from the App Router
import { NextRequest, NextResponse } from "next/server";

// Define the POST handler function that runs when this API route is hit with a POST request
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body of the incoming request, expecting a "topic" field
    const { topic } = await req.json();

    // Build a prompt string to send to OpenAI, with personal context for a better email
    const prompt = `You can mention matcha, football, dancing, or video editing if fitting.
                   Write a short, friendly, and polite email to Grace about: ${topic}`;

    // Send a POST request to the OpenAI Chat Completion API
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Tell OpenAI we're sending JSON data
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Send your API key securely via environment variable
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the GPT model to use
        messages: [{ role: "user", content: prompt }], // Send the prompt as a "user" message
        temperature: 0.7, // Set creativity level to moderate
      }),
    });

    // If OpenAI API returns an error status (e.g. 400, 500), handle it here
    if (!res.ok) {
      const error = await res.text(); // Read the error message as text
      console.error("OpenAI API error:", error); // Log the error to the server console
      return NextResponse.json({ email: "OpenAI API error. Check logs." }); // Return fallback error to client
    }

    // Parse the JSON response from OpenAI
    const data = await res.json();

    // Extract the email content from the first choice, or provide a fallback if missing
    const email = data.choices?.[0]?.message?.content ?? "No response from AI.";

    // Return the generated email content to the client as JSON
    return NextResponse.json({ email });
  } catch (err) {
    // If any unexpected error occurs (e.g. JSON parse error, network issue), catch it here
    console.error("Server error:", err); // Log the error
    return NextResponse.json({ email: "Server error. Check logs." }); // Return a generic server error message
  }
}