import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300">
      <nav className="my-16 animate-fade-in duration-20">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg md:text-xl duration-20 text-gray-400 hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 mb-6 animate-fade-in duration-20">
        <Image
          src="/headshot.jpg"
          alt="Grace Wang Headshot"
          width={150}
          height={100}
          className="rounded-full"
        />
      </div>

      <div className="hidden w-screen h-px bg-gradient-to-r from-pink-100/0 via-gray-50/50 to-pink-100/0 md:block animate-fade-left duration-20" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in duration-20"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-white duration-20 cursor-default font-display sm:text-6xl md:text-9xl whitespace-nowrap">
        Grace Wang
      </h1>

      <div className="hidden w-screen h-px bg-gradient-to-r from-pink-100/0 via-gray-50/50 to-pink-100/0 md:block
