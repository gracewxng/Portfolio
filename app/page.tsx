import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 relative">
      {/* Navigation - Positioned in Top Right */}
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

      <Particles className="absolute inset-0 -z-10 animate-fade-in duration-20" quantity={100} />

      {/* Content Layout */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl px-6 space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Side - Name, About Me & Contact Button */}
        <div className="text-center md:text-left max-w-lg">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white">
            Grace Wang
          </h1>

          {/* About Me Blurb */}
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Hi! My name is Grace and I am a second-year Business and Computer Science student at UBC.
            I'm passionate about software engineering, education, healthcare, and building
            meaningful projects that make an impact. I love exploring new technologies and
            combining business knowledge with technical expertise to solve real-world problems.
            <br />
            <br />
            Outside of school, you can find me in the dance studio, at a cute cafe drinking matcha, or
            just hanging out with friends and family!
          </p>

          {/* Get in Touch Button */}
          <div className="mt-6">
            <Link
              href="/contact"
              className="px-6 py-3 text-lg font-medium bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
            >
              Get in Touch!
            </Link>
          </div>
        </div>

        {/* Right Side - Headshot with White Border */}
        <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-lg border-4 border-white">
          <Image
            src="/headshot.png"
            alt="Grace Wang Headshot"
            width={300} 
            height={300}
            className="object-cover"
          />
        </div>
      </div>

      {/* Spacing Before Dashboard */}
      <div className="mt-16"></div>

      {/* Dashboard Section at the Bottom */}
      <div className="absolute bottom-0 w-full bg-white bg-opacity-50 backdrop-blur-lg py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 text-center">
          {/* Technical Skills */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-pink-600">Skills</h2>
            <p className="text-gray-700">
            👩🏻‍💻 Programming: Java, C/C++, Python, Racket <br />
            🛠️ Tools/Environments: Eclipse, IntelliJ, VSCode, Github <br />
            🧪 Testing: JUnit, GDB. <br />
            🖥️ Web: React, HTML, CSS, JavaScript, Node.js, JSON
            </p>
          </div>

          {/* Hobbies */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-pink-600">Hobbies</h2>
            <p className="text-gray-700">
            💃🏻 Dancing <br />
            ☕️ Cafe Hopping <br />
            🎬 Video Editing <br />
            📲 Content Creation <br />
            </p>
          </div>

          {/* Currently */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-pink-600">Current Obsessions</h2>
            <p className="text-gray-700">
            🍵 Matcha Lattes <br />
            🌷 Pink Tulips <br />
            🐰 Cinamoroll <br />
            🏈 NFL <br />
            🎥 How I Met Your Mother</p>
          </div>
        </div>
      </div>
    </div>
  );
}
