import React from "react";
import { Navigation } from "../components/nav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col items-center w-screen min-h-screen overflow-auto bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 relative p-6">
      <Navigation />
      
      {/* Back Arrow */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>
      
      {/* About Me Section */}
      <div className="text-center max-w-lg mt-16">
        <h1 className="text-l sm:text-6xl md:text-l font-bold text-white">All About Me!</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
          Hi! My name is Grace and I am a second-year Business and Computer Science student at UBC.
          I'm passionate about software engineering, education, healthcare, and building meaningful
          projects that make an impact. I love exploring new technologies and combining business knowledge
          with technical expertise to solve real-world problems.
        </p>
        <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
          Outside of school, you can find me in the dance studio, at a cute cafe drinking matcha, or just
          hanging out with friends and family!
        </p>
      </div>

      {/* Dashboard Section Below Content */}
      <div className="w-full bg-white bg-opacity-50 backdrop-blur-lg py-10 mt-16 rounded-lg shadow-md">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
          {/* Technical Skills */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-pink-600 mb-3">Skills</h2>
            <p className="text-gray-700 leading-relaxed">
              👩🏻‍💻 <strong>Programming:</strong> Java, C/C++, Python, Racket <br />
              🛠️ <strong>Tools:</strong> Eclipse, IntelliJ, VSCode, GitHub <br />
              🧪 <strong>Testing:</strong> JUnit, GDB <br />
              🖥️ <strong>Web:</strong> React, HTML, CSS, JavaScript, Node.js, JSON
            </p>
          </div>

          {/* Hobbies */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-pink-600 mb-3">Hobbies</h2>
            <p className="text-gray-700 leading-relaxed">
              💃🏻 Dancing <br />
              ☕️ Cafe Hopping <br />
              🎬 Video Editing <br />
              📲 Content Creation
            </p>
          </div>

          {/* Current Obsessions */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-pink-600 mb-3">Current Obsessions</h2>
            <p className="text-gray-700 leading-relaxed">
              🍵 Matcha Lattes <br />
              🌷 Pink Tulips <br />
              🐰 Cinnamoroll <br />
              🏈 NFL <br />
              🎥 How I Met Your Mother
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}