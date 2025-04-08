"use client";
import { useState } from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ArrowLeft } from "lucide-react";

const socials = [
  {
    icon: <Mail size={20} />, 
    href: "mailto:wanggrace730@gmail.com", 
    label: "Email", 
    handle: "Contact Me"
  },
  {
    icon: <Github size={20} />, 
    href: "https://github.com/gracewxng", 
    label: "Github", 
    handle: "My Github"
  },
  {
    icon: <Linkedin size={20} />, 
    href: "https://www.linkedin.com/in/grace-wang-a338ab217/", 
    label: "LinkedIn", 
    handle: "Let's Connect"
  }
];

export default function Example() {
  const [topic, setTopic] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/write-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });
    const data = await res.json();
    setResponse(data.email);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 min-h-screen flex flex-col items-center">
      <Navigation />

      {/* Back Arrow */}
      <Link href="/" className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Page Header */}
      <div className="text-center max-w-lg mt-16">
        <h1 className="text-l sm:text-6xl md:text-l font-bold text-white">Get in Touch With Me</h1>
        <p className="text-lg md:text-xl text-pink-600 mt-2">Let's continue chatting!</p>
      </div>

      {/* Contact Sections */}
      <div className="container flex flex-col lg:flex-row items-start justify-center gap-12 px-4 mx-auto mt-16">
        {/* Social Links (Left Side) */}
        <div className="flex-1 grid w-full grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-1">
          {socials.map((s) => (
            <Card key={s.href}>
              <Link href={s.href} target="_blank" className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-12 lg:py-8 md:p-8">
                <span className="absolute w-px h-2/3 bg-gradient-to-b from-pink-500 via-pink-500/50 to-transparent" aria-hidden="true" />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-gray-400 group-hover:text-white group-hover:bg-pink-600 border-gray-400 bg-pink-300 group-hover:border-white drop-shadow-orange">
                  {s.icon}
                </span>
                <div className="z-10 flex flex-col items-center">
                  <span className="lg:text-xl font-medium duration-150 xl:text-2xl text-gray-600 group-hover:text-white font-display">
                    {s.handle}
                  </span>
                  <span className="mt-2 text-sm text-center duration-1000 text-gray-500 group-hover:text-gray-300">
                    {s.label}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Email Generator (Right Side) */}
        <div className="flex-1 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Help me write an email to Grace</h2>
          <textarea
            placeholder="Write what you'd like to say..."
            className="w-full p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows={5}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
          {response && (
            <div className="mt-6 p-4 bg-white/80 rounded shadow text-gray-800 whitespace-pre-wrap">
              {response}
            </div>
          )}
        </div>
      </div>
      <div className="mt-24" />
    </div>
  );
}