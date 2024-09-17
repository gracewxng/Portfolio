import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300">
      <nav className="my-16 animate-fade-in duration-500">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg md:text-xl duration-500 text-gray-400 hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px bg-gradient-to-r from-pink-100/0 via-gray-50/50 to-pink-100/0 md:block animate-fade-left duration-500" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in duration-500"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-white duration-500 cursor-default font-display sm:text-6xl md:text-9xl whitespace-nowrap">
        Grace Wang
      </h1>

      <div className="hidden w-screen h-px bg-gradient-to-r from-pink-100/0 via-gray-50/50 to-pink-100/0 md:block animate-fade-right duration-500" />
      <div className="my-16 text-center animate-fade-in duration-500">
        <h2 className="text-lg md:text-xl text-gray-400">
          Second Year Business and Computer Science
        </h2>
      </div>
    </div>
  );
}
