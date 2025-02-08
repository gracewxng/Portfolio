import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center justify-center text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-pink-600">About Me</h1>
      <p className="text-lg md:text-xl max-w-2xl text-center">
        Hi, I'm Grace Wang, a second-year Business and Computer Science student at UBC.
        I'm passionate about software engineering, artificial intelligence, and building
        meaningful projects that make an impact. I love exploring new technologies and
        combining business knowledge with technical expertise to solve real-world problems.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="px-4 py-2 bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}