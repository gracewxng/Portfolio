import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ArrowLeft } from "lucide-react";

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
    href: "https://puptalk.vercel.app/",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "TypeScript | Next.js | Tailwind CSS | Upstash",
    date: "2024-09-17",
    href: "https://gracewang.vercel.app/",
  },
];

export default function ProjectsPage() {
  // Sort projects by date (most recent first)
  const sortedProjects = personalProjects.sort(
    (a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
  );

  return (
    <div className="relative pb-16 bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300 min-h-screen flex flex-col items-center">
      {/* Navigation Bar */}
      <Navigation />

      {/* Back Arrow */}
      <Link
        href="/"
        className="absolute top-8 left-8 text-gray-600 hover:text-pink-600 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Page Header */}
      <div className="text-center max-w-lg mt-16">
        <h1 className="text-l sm:text-6xl md:text-l font-bold text-white">My Projects</h1>
        <p className="text-lg md:text-xl text-pink-600 mt-2">Putting those technical skills to use!</p>
      </div>

      {/* Projects Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 px-6 max-w-7xl">
        {sortedProjects.map((project) => (
          <Card key={project.slug}>
            <Link href={project.href}>
              <article className="relative w-full h-full p-4 md:p-8">
                {/* Project Metadata */}
                <div className="flex items-center justify-between gap-2">
                  {/* Date */}
                  <div className="text-xs text-gray-500">
                    {project.date ? (
                      <time dateTime={new Date(project.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                          new Date(project.date)
                        )}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h2 className="mt-4 text-3xl font-bold text-gray-600 group-hover:text-white sm:text-4xl font-display">
                  {project.title}
                </h2>

                {/* Project Description */}
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