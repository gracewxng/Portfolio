import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Eye } from "lucide-react";

const projects = [
  {
    title: "AimAssist",
    description: "A web-based tool to enhance aiming skills with real-time feedback.",
    date: "2023-01-15", // Example date, you can update it as necessary
    href: "https://aimassist.vercel.app/",
    views: 1200, // Example views count
  },
  {
    title: "SleepMetrix",
    description: "A tool to analyze and improve sleep patterns.",
    date: "2023-02-10",
    href: "https://github.com/gracewxng/SleepMetrix",
    views: 980, // Example views count
  },
  {
    title: "FitSphere",
    description: "An app focused on tracking fitness goals and progress.",
    date: "2023-03-05",
    href: "https://github.com/gracewxng/FitSphere",
    views: 750, // Example views count
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative pb-16 bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-gray-500">
            Putting those technical skills to use!
          </p>
        </div>
        <div className="w-full h-px bg-gray-400" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {projects.map((project) => (
            <Card key={project.href}>
              <Link href={project.href} target="_blank">
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-gray-500">
                      {project.date ? (
                        <time dateTime={new Date(project.date).toISOString()}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(project.date))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                        project.views ?? 0,
                      )}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-gray-600 group-hover:text-white sm:text-4xl font-display"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-gray-500 group-hover:text-gray-300">
                    {project.description}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-gray-500 hover:text-gray-200 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
