"use client";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Mail size={20} />,
		href: "mailto:wanggrace730@gmail.com",
		label: "Email",
		handle: "Let's Chat",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/gracewxng",
		label: "Github",
		handle: "My Github",
	},
	{
		icon: <Linkedin size={20} />,
		href: "https://www.linkedin.com/in/grace-wang-a338ab217/",
		label: "LinkedIn",
		handle: "Let's Connect",
	},
];

export default function Example() {
	return (
		<div className=" bg-gradient-to-tl from-pink-100 via-pink-200 to-pink-300">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
					{socials.map((s) => (
						<Card key={s.href}>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-pink-500 via-pink-500/50 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-gray-400 group-hover:text-white group-hover:bg-pink-600 border-gray-400 bg-pink-300 group-hover:border-white drop-shadow-orange">
									{s.icon}
								</span>
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-gray-600 group-hover:text-white font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-gray-500 group-hover:text-gray-300">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
