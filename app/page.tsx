// Import Next.js Link for client-side routing
import Link from "next/link";

// Import React
import React from "react";

// Import Particles background component
import Particles from "./components/particles";

// Import Image component for optimized image loading
import Image from "next/image";

// Import floating chatbot component
import { ChatBot } from "./components/chatBot";

// Top navigation links
const navigation = [
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

// Home page component
export default function Home() {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen overflow-auto bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 relative">
      
      {/* Top-right navigation menu */}
      <nav className="absolute top-6 right-6 flex gap-4">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-4 py-2 text-sm md:text-base bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Animated particles background */}
      <Particles className="absolute inset-0 -z-10 animate-fade-in duration-20" quantity={100} />

      {/* Main hero section: intro and headshot */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl px-6 space-y-8 md:space-y-0 md:space-x-12 mt-16">
        
        {/* Left: Name, About Me, Button */} 
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white">
            Grace Wang
          </h1>
          <p className="text-lg md:text-xl text-pink-600 mt-2">
            Business + Computer Science @ UBC
          </p>

          {/* About Me paragraph */}
          <p className="mt-3 text-lg md:text-l text-gray-600">
            Hi! My name is Grace and I am an incoming third-year Business and Computer Science student at UBC.
            I'm passionate about software engineering, education, healthcare, and building meaningful projects 
            that make an impact. I love exploring new technologies 
            and combining business knowledge with technical expertise to solve real-world problems.
            <br /><br />
            Chat with me using the message icon in the bottom right corner!
          </p>

          {/* Contact button */}
          <div className="mt-6">
            <Link
              href="/contact"
              className="px-6 py-3 text-lg font-medium bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
            >
              Get in Touch!
            </Link>
          </div>
        </div>

        {/* Right: Headshot image */}
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <Image
            src="/headshot.png"
            alt="Grace Wang Headshot"
            width={300} 
            height={300}
            className="object-cover"
          />
        </div>
      </div>

      {/* Experience highlights section */}
      <div className="mt-12 w-full px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Experience Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Software Engineer Intern",
              company: "Craeftig App Inc.",
              date: "May 2025 – Present",
              description: "💻 Improved performance and reliability of a cross-platform mobile app by diagnosing bugs, implementing UI features, and automating deployments with CI/CD and AWS, reducing release times by 30%.",
            },
            {
              title: "Software Engineer",
              company: "Sustaingineering UBC",
              date: "Jan 2025 – Present",
              description: "🌱 Built a real-time sensor data visualization tool using TypeScript, Next.js, and Python, with backend processing via Pandas/NumPy and an SQL database deployed on Raspberry Pi, achieving 95% user satisfaction.",
            },
          ].map((exp, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-1">{exp.title}</h3>
              <h4 className="text-md font-medium text-gray-700">{exp.company}</h4>
              <p className="text-sm text-gray-500 italic">{exp.date}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects section */}
      <div className="mt-12 w-full px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
              {
                title: "Portfolio",
                description: "Next.js, Tailwind CSS, Upstash, OpenAI API<br /><br />Designed and developed a personal portfolio website...",
                href: "https://gracewang.vercel.app/",
                date: new Date().toISOString(),
              },
              {
                title: "PupTalk",
                description: "OpenAI API, JavaScript, HTML, CSS<br /><br />Built a Chrome extension that transforms webpage text...",
                href: "https://github.com/gracewxng/PupTalk",
                date: "2025-02-10",
              },
              {
                title: "FitSphere",
                description: "React, JavaScript, HTML, CSS<br /><br />Created a beginner-friendly fitness site with interactive diagrams...",
                href: "https://github.com/gracewxng/FitSphere",
                date: "2024-03-23",
              },
          ].map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-2">{project.title}</h3>

              {/* First line of the description */}
              <p className="text-sm text-gray-500 mb-2">
                {project.description.split('<br /><br />')[0]}
              </p>

              {/* Second paragraph */}
              <p className="text-sm text-gray-700">
                {project.description.split('<br /><br />')[1]}
              </p>

              {/* Project date */}
              <p className="mt-2 text-xs text-gray-400">
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}
              </p>
            </a>
          ))}
        </div>

        {/* See more projects button */}
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-block px-6 py-2 text-sm font-medium text-pink-600 bg-white rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
          >
            See More Projects →
          </Link>
        </div>
      </div>

      {/* "More About Me" dashboard section */}
      <div className="w-full bg-transparent py-6 mt-12">
        <h2 className="text-3xl font-bold text-white text-center mb-8">More About Me</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center">
          
          {/* Skills */}
          <div className="p-4 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-lg font-bold text-pink-600">Skills</h2>
            <p className="text-gray-700">
              👩🏻‍💻 Programming: Java, C/C++, Python, SQL <br />
              🛠️ Tools: Figma, IntelliJ, VSCode, GitHub <br />
              🧪 Testing: JUnit, GDB <br />
              🖥️ Web: React, HTML, CSS, JS, TypeScript, Node, Next
            </p>
          </div>

          {/* Hobbies */}
          <div className="p-4 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-lg font-bold text-pink-600">Hobbies</h2>
            <p className="text-gray-700">
              💃🏻 Dancing <br />
              ☕️ Cafe Hopping <br />
              🎬 Video Editing <br />
              📲 Content Creation
            </p>
          </div>

          {/* Current obsessions */}
          <div className="p-4 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-lg font-bold text-pink-600">Current Obsessions</h2>
            <p className="text-gray-700">
              🍵 Matcha Lattes <br />
              🌷 Pink Tulips <br />
              🐰 Cinnamoroll <br />
              🏈 NFL <br />
              🎥 How I Met Your Mother
            </p>
          </div>
        </div>
      </div>

      {/* Chatbot (bottom right floating message bubble) */}
      <ChatBot />
    </div>
  );
}