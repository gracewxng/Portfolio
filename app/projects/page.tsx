// Import Next.js routing and UI components
import Link from "next/link";
import React from "react";

// Import your site-wide Navigation bar and Card UI components
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

// Import back arrow icon from Lucide icon set
import { ArrowLeft } from "lucide-react";

// Array of personal projects to render on the page
const personalProjects = [
  {
    slug: "aimassist",
    title: "AimAssist",
    description: "JavaScript | HTML | CSS",
    date: "2024-09-10",
    href: "https://aimassist.vercel.app/",
  },
  {
    slug: "sleepmetrix",
    title: "SleepMetrix",
    description: "Java | Java Swing",
    date: "2024-02-14",
    href: "https://github.com/gracewxng/SleepMetrix",
  },
  {
    slug: "fitsphere",
    title: "FitSphere",
    description: "React | Node.js | JavaScript | HTML | CSS",
    date: "2024-03-23",
    href: "https://github.com/gracewxng/FitSphere",
  },
  {
    slug: "puptalk",
    title: "PupTalk",
    description: "OpenAI API | JavaScript | HTML | CSS",
    date: "2025-02-10",
    href: "https://github.com/gracewxng/PupTalk",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "TypeScript | Next.js | Tailwind CSS | Upstash | OpenAI API",
    date: new Date().toISOString(), // Use current date for Portfolio
    href: "https://gracewang.vercel.app/",
  },
];

// Main component to display all projects
export default function ProjectsPage() {
  // Sort projects by newest date first
  const sortedProjects = personalProjects.sort(
    (a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
  );

  return (
    // Page wrapper with gradient background and vertical layout
    <div className="relative pb-16 bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 min-h-screen flex flex-col items-center">
      
      {/* Navigation bar at top */}
      <Navigation />

      {/* Back arrow to return to homepage */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Header: title and subtitle */}
      <div className="text-center max-w-lg mt-16">
        <h1 className="text-l sm:text-6xl md:text-l font-bold text-white">My Projects</h1>
        <p className="text-lg md:text-xl text-pink-600 mt-2">Putting those technical skills to use!</p>
      </div>

      {/* Grid layout to display projects */}
      <div className="mt-16 grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 px-6 max-w-7xl">
        {sortedProjects.map((project) => (
          // Wrap each project in a styled card
          <Card key={project.slug}>
            {/* Make the entire card clickable */}
            <Link href={project.href}>
              <article className="relative w-full h-full p-4 md:p-8">

                {/* Top row: show project date */}
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-500">
                    {project.date ? (
                      // Render ISO date using native <time> tag
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                          new Date(project.date)
                        )}
                      </time>
                    ) : (
                      <span>SOON</span> // Placeholder if no date is set
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h2 className="mt-4 text-3xl font-bold text-gray-600 group-hover:text-white sm:text-4xl font-display">
                  {project.title}
                </h2>

                {/* Tech stack or description */}
                <p className="mt-4 leading-8 duration-150 text-gray-500 group-hover:text-gray-300">
                  {project.description}
                </p>
              </article>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}