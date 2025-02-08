import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "../components/nav";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center justify-center text-gray-800 relative">
    {/* Navigation Bar */}
    <Navigation />
    
    {/* Back Arrow */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* About Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-pink-600">About Me</h1>
        <p className="text-lg md:text-xl text-gray-500">
        Hi! My name is Grace and I am a second year Business and Computer Science student at UBC.
        I'm passionate about software engineering, education, healthcare, and building
        meaningful projects that make an impact. I love exploring new technologies and
        combining business knowledge with technical expertise to solve real world problems.
        <br />
        <br />
        Outside of school, you can find me in the dance studio, at a cute cafe drinking matcha, or
        just hanging out with friends and family.
        </p>
      </div>
    </div>
  );
}