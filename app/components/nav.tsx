"use client";
import Link from "next/link";
import React from "react";

// Define navigation items
const navigation = [
	{ name: "About", href: "/about" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export const Navigation: React.FC = () => {
  return (
    // Navigation - Positioned in Top Right
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
  );
};