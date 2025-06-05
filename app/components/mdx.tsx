// Disable TypeScript checking for this file (likely due to loose or inferred types)
// Consider removing this and adding explicit types later
// @ts-nocheck

// Import core React functionality
import * as React from "react";

// Import Next.js optimized image and link components
import Image from "next/image";
import Link from "next/link";

// Import the Contentlayer hook to compile and render MDX content
import { useMDXComponent } from "next-contentlayer/hooks";

// Utility function to join class names, ignoring falsy values (e.g., null, undefined)
function clsx(...args: any) {
	return args.filter(Boolean).join(" ");
}

// Define custom renderers for MDX elements (e.g., h1, p, code, etc.)
const components = {
	// Custom <h1> with Tailwind styles
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),

	// Custom <h2>
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),

	// Custom <h3>
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),

	// Custom <h4>
	h4: ({ className, ...props }) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),

	// Custom <h5>
	h5: ({ className, ...props }) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),

	// Custom <h6>
	h6: ({ className, ...props }) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),

	// Custom <a> using Next.js <Link> with Tailwind styling
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-zinc-900 underline underline-offset-4",
				className,
			)}
			{...props}
		/>
	),

	// Custom <p>
	p: ({ className, ...props }) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),

	// Custom unordered list
	ul: ({ className, ...props }) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),

	// Custom ordered list
	ol: ({ className, ...props }) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	),

	// Custom list item
	li: ({ className, ...props }) => (
		<li className={clsx("mt-2", className)} {...props} />
	),

	// Custom <blockquote>
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
				className,
			)}
			{...props}
		/>
	),

	// Custom <img>, allowing all native props
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// Using <img> instead of <Image> due to MDX limitations
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={clsx("rounded-md border border-zinc-200", className)}
			alt={alt}
			{...props}
		/>
	),

	// Custom horizontal rule
	hr: ({ ...props }) => (
		<hr className="my-4 border-zinc-200 md:my-8" {...props} />
	),

	// Wrapper for scrollable table
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),

	// Custom <tr>
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
				className,
			)}
			{...props}
		/>
	),

	// Custom <th>
	th: ({ className, ...props }) => (
		<th
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),

	// Custom <td>
	td: ({ className, ...props }) => (
		<td
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),

	// Custom <pre> block (for code blocks)
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
				className,
			)}
			{...props}
		/>
	),

	// Custom inline <code> styling
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
				className,
			)}
			{...props}
		/>
	),

	// Allow Next.js <Image> usage in MDX (for advanced cases)
	Image,
};

///////////////////////////////////////
// Renders compiled MDX into React JSX
///////////////////////////////////////

// Define props for the Mdx component — expects a compiled code string
interface MdxProps {
	code: string;
}

// The actual MDX rendering component
export function Mdx({ code }: MdxProps) {
	// Compile MDX string into a usable React component
	const Component = useMDXComponent(code);

	return (
		// Render compiled MDX with custom component overrides
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}