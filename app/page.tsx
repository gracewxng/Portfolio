import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-white via-zinc-100/20 to-white">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-800 hover:text-zinc-600"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px bg-gradient-to-r from-white/0 via-white/50 to-white/0 md:block animate-fade-left" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-black duration-1000 cursor-default font-display sm:text-6xl md:text-9xl whitespace-nowrap">
        chronark
      </h1>

      <div className="hidden w-screen h-px bg-gradient-to-r from-white/0 via-white/50 to-white/0 md:block animate-fade-right" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-800">
          I'm building{" "}
          <Link
            target="_blank"
            href="https://unkey.dev"
            className="underline duration-500 hover:text-zinc-600"
          >
            unkey.dev
          </Link>{" "}
          to solve API authentication and authorization for developers.
        </h2>
      </div>
    </div>
  );
}
