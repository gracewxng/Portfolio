import Link from "next/link";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "../components/nav";

const experiences = [
  {
    title: "Software Engineer",
    company: "Sustaingineering UBC",
    date: "Jan 2025 - Present",
    description: "🌱 The tiny home project is kinda cool",
  },
  {
    title: "Software Engineer",
    company: "Ascend UBC",
    date: "Dec 2024 - Present",
    description: "💻 Check out our website!",
  },
  {
    title: "Kitchen Specialist",
    company: "Gate Gourmet",
    date: "Aug 2023 - Sep 2023",
    description: "🌯 Bringing the yum to your tum in flight",
  },
  {
    title: "Server",
    company: "Fusion Sushi",
    date: "Mar 2023 - Aug 2023",
    description: "🍣 Let's grab sushi?",
  },
  {
    title: "Crew Member",
    company: "VBurger",
    date: "Aug 2022 - Sep 2022",
    description: "🍦 Expert at blending ice cream",
  },
  {
    title: "Research Assistant",
    company: "University of Calgary",
    date: "Jul 2018 - Mar 2021",
    description: "🦠 Cancer research is kinda cool",
  },
];

export default function Experiences() {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 flex flex-col items-center text-gray-800 relative pb-20">     
      {/* Navigation Bar */}
      <Navigation />

      {/* Back Button */}
      <Link href="/" className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Page Header */}
      <div className="text-center max-w-lg mt-16">
        <h1 className="text-l sm:text-6xl md:text-l font-bold text-white">My Experiences</h1>
        <p className="text-lg md:text-xl text-pink-600 mt-2">A quick timeline!</p>
      </div>

      {/* Timeline */}
      <div className="mt-10 space-y-8 w-full max-w-3xl">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative pl-8 border-l-4 border-pink-600 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-white/40 rounded-md group"
          >
            {/* Timeline Marker */}
            <div className="absolute left-[-10px] w-4 h-4 bg-pink-600 rounded-full animate-pulse" />

            {/* Experience Details */}
            <div className="ml-4 transition-opacity duration-300 group-hover:opacity-100">
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