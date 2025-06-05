// Mark this file as a Client Component so it can use hooks, interactivity, etc.
"use client";

// Import Next.js <Link> component for client-side navigation
import Link from "next/link";

// Import React to define functional components
import React from "react";

// Define the navigation menu items — each has a name and a corresponding path (href)
const navigation = [
	{ name: "Experience", href: "/experience" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

// Export the Navigation component as a React Functional Component
export const Navigation: React.FC = () => {
  return (
    // Navigation container — absolutely positioned at the top-right of the screen
    <nav className="absolute top-6 right-6 flex gap-4">
      {/* Loop through each item in the navigation array */}
      {navigation.map((item) => (
        // Use Next.js <Link> for fast client-side navigation
        <Link
          key={item.href} // Unique key for React reconciliation
          href={item.href} // Destination route
          className="px-4 py-2 text-sm md:text-base bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:text-white transition duration-300"
          // Tailwind styling: padding, responsive text size, background, rounded corners, hover effects
        >
          {item.name} {/* Render the visible link text (e.g., "Experience") */}
        </Link>
      ))}
    </nav>
  );
};