// Mark this as a Client Component
"use client";

// Import icons and tools
import { ArrowLeft, Eye, Github, Twitter } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

// Define props type: accepts a `project` object and a view count
type Props = {
	project: {
		url?: string;        // Optional project website
		title: string;       // Project title (also used as slug)
		description: string; // Short project description
		repository?: string; // Optional GitHub repo
	};
	views: number;          // View count to display
};

// Functional component definition
export const Header: React.FC<Props> = ({ project, views }) => {
	// Ref to track when the header is in view
	const ref = useRef<HTMLElement>(null);

	// Whether the header is in the viewport
	const [isIntersecting, setIntersecting] = useState(true);

	// Build dynamic links based on project props
	const links: { label: string; href: string }[] = [];
	if (project.repository) {
		links.push({
			label: "GitHub",
			href: `https://github.com/${project.repository}`,
		});
	}
	if (project.url) {
		links.push({
			label: "Website",
			href: project.url,
		});
	}

	// Run once on mount: set up intersection observer + send view count
	useEffect(() => {
		if (!ref.current) return;

		// Create intersection observer to detect when header is in view
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);

		// Ping API to increment view count (e.g., for analytics)
		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug: project.title }),
		});

		// Clean up observer on unmount
		return () => observer.disconnect();
	}, []);

	// Header container with background gradient
	return (
		<header
			ref={ref}
			className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			{/* Sticky navigation bar that changes styles based on scroll */}
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent" // Transparent when in view
						: "bg-white/10 border-zinc-200 lg:border-transparent" // Blurred/colored when scrolled
				}`}
			>
				{/* Nav content container */}
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">

					{/* Right side: views and social icons */}
					<div className="flex justify-between gap-8">
						{/* View count with eye icon */}
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? "text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							}`}
						>
							<Eye className="w-5 h-5" />{" "}
							{/* Format view number with commas (or compact like 1.2K) */}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>

						{/* Twitter icon/link */}
						<Link target="_blank" href="https://twitter.com/chronark_">
							<Twitter
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? "text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								}`}
							/>
						</Link>

						{/* GitHub icon/link */}
						<Link target="_blank" href="https://github.com/chronark">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? "text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								}`}
							/>
						</Link>
					</div>

					{/* Back to Projects link with arrow */}
					<Link
						href="/projects"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? "text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						}`}
					>
						<ArrowLeft className="w-6 h-6" />
					</Link>
				</div>
			</div>

			{/* Main content of the header (project title/description) */}
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					
					{/* Title + description */}
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{project.title}
						</h1>
						<p className="mt-6 text-lg leading-8 text-zinc-300">
							{project.description}
						</p>
					</div>

					{/* Project links (GitHub, website) */}
					<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
							{links.map((link) => (
								<Link target="_blank" key={link.label} href={link.href}>
									{link.label} <span aria-hidden="true">&rarr;</span>
								</Link>
							))}
						</div>
					</div>
					
				</div>
			</div>
		</header>
	);
};