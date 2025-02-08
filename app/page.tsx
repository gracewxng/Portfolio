import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
  { name: "About", href: "/about" },
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

      {/* Profile Image */}
      <div className="relative z-10 mb-6 animate-fade-in duration-20">
        <div className="w-36 h-36 rounded-full overflow-hidden">
          <Image
            src="/headshot.png"
            alt="Grace Wang Headshot"
            width={150}
            height={150}
            className="object-cover"
          />
        </div>
      </div>

      <Particles className="absolute inset-0 -z-10 animate-fade-in duration-20" quantity={100} />

      {/* Name */}
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-white duration-20 cursor-default font-display sm:text-6xl md:text-9xl whitespace-nowrap">
        Grace Wang
      </h1>

      {/* Subtitle */}
      <div className="my-16 text-center animate-fade-in duration-20">
        <h2 className="text-lg md:text-xl text-gray-400">
          Second Year Business and Computer Science at UBC
        </h2>
      </div>
    </div>
  );
}