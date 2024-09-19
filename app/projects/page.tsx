import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

export const revalidate = 60;

const personalProjects = [
  {
    slug: "aimassist",
    title: "AimAssist",
    description: "A dynamic task management system built using JavaScript, HTML, and CSS",
    date: "2024-09-10",
    href: "https://aimassist.vercel.app/",
  },
  {
    slug: "sleepmetrix",
    title: "SleepMetrix",
    description: "A sleep-tracking desktop application created using Java",
    date: "2024-02-14",
    href: "https://github.com/gracewxng/SleepMetrix",
  },
  {
    slug: "fitsphere",
    title: "FitSphere",
    description: "A beginner-friendly exercise website developed using React, HTML, CSS, and JavaScript",
    date: "2024-03-23",
    href: "https://github.com/gracewxng/FitSphere",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    description: "A visually appealing website showcasing skills and projects built using Next.js, Tailwind CSS, and Upstash",
    date: "2024-09-17",
    href: "https://gracewang.vercel.app/",
  },
];

export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...personalProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[personalProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = personalProjects.find((project) => project.slug === "aimassist")!;
  const top2 = personalProjects.find((project) => project.slug === "sleepmetrix")!;
  const top3 = personalProjects.find((project) => project.slug === "fitsphere")!;
  const top4 = personalProjects.find((project) => project.slug === "portfolio")!;
  const sorted = personalProjects
    .filter((project) => project.slug !== featured.slug && project.slug !== top2.slug && project.slug !== top3.slug)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16 bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">Projects</h2>
          <p className="mt-4 text-gray-500">Putting those technical skills to use!</p>
        </div>
        <div className="w-full h-px bg-gray-400" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={featured.href}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-gray-500">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="w-4 h-4" />
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(views[featured.slug] ?? 0)}
                  </span>
                </div>
                <h2 id="featured-post" className="mt-4 text-3xl font-bold text-gray-600 group-hover:text-white sm:text-4xl font-display">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-gray-500 group-hover:text-gray-300">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-gray-500 hover:text-gray-200 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-300 lg:mx-0 lg:border-t-0 ">
            {[top2, top3, top4].map((project) => (
              <Card key={project.slug}>
                <Link href={project.href}>
                  <article className="relative w-full h-full p-4 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-gray-500">
                        {project.date ? (
                          <time dateTime={new Date(project.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(project.date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="w-4 h-4" />
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(views[project.slug] ?? 0)}
                      </span>
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-600 group-hover:text-white sm:text-4xl font-display">
                      {project.title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-gray-500 group-hover:text-gray-300">
                      {project.description}
                    </p>
                  </article>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-gray-400" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
