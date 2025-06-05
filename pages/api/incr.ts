// Import the Upstash Redis client
import { Redis } from "@upstash/redis";
// Import types from Next.js for handling requests and responses
import { NextRequest, NextResponse } from "next/server";

// Initialize Redis client using environment variables
const redis = Redis.fromEnv();

// Specify that this function should run on the Edge runtime
export const config = {
  runtime: "edge",
};

// Default export: an async function to handle incoming requests
export default async function incr(req: NextRequest): Promise<NextResponse> {
  // Reject non-POST requests with 405 (Method Not Allowed)
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }

  // Reject if the request body is not JSON
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  // Parse the JSON body of the request
  const body = await req.json();

  // Initialize slug variable, defaulting to undefined
  let slug: string | undefined = undefined;

  // If the body contains a "slug" field, extract it
  if ("slug" in body) {
    slug = body.slug;
  }

  // If no slug is found, return an error response
  if (!slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // Get the IP address of the requester
  const ip = req.ip;
  if (ip) {
    // Hash the IP address using SHA-256 (for privacy – do not store raw IPs)
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );

    // Convert the hash buffer into a hexadecimal string
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Attempt to set a key that deduplicates the IP+slug combination for 24 hours
    const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
      nx: true, // Only set the key if it does not already exist
      ex: 24 * 60 * 60, // Expire after 24 hours
    });

    // If the key already exists, the IP has already been counted — exit early
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }

  // Increment the pageview count for the given slug
  await redis.incr(["pageviews", "projects", slug].join(":"));

  // Return a success response
  return new NextResponse(null, { status: 202 });
}