import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "../components/nav";

const experiences = [
  {
    title: "Software Engineer",
    company: "Sustaingineering UBC",
    date: "Jan 2025 - pResent",
    description: "Tiny home project!",
  },
  {
    title: "Software Engineer",
    company: "Ascend UBC",
    date: "Jan 2025 - Present",
    description: "Web dev!",
  },
];

export default function Experiences() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center justify-center text-gray-800 relative">     
    {/* Navigation Bar */}
    <Navigation />

      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600">My Experiences</h1>
        <p className="text-lg text-gray-600 mt-2">A timeline of my work and education.</p>
      </div>

      {/* Timeline */}
      <div className="mt-10 space-y-8 w-full max-w-3xl">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 border-l-4 border-pink-600">
            {/* Timeline Marker */}
            <div className="absolute left-[-10px] w-4 h-4 bg-pink-600 rounded-full" />

            {/* Experience Details */}
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{exp.title}</h2>
              <h3 className="text-md font-medium text-gray-500">{exp.company}</h3>
              <p className="text-sm text-gray-600 italic">{exp.date}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}