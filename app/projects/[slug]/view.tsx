// Mark this file as a Client Component since it uses useEffect and runs in the browser
"use client";

// Import useEffect hook from React
import { useEffect } from "react";

// Functional component to report a page view for a given slug
export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	
	// useEffect runs once on component mount (or when `slug` changes)
	useEffect(() => {
		// Send a POST request to the /api/incr endpoint to increment view count
		fetch("/api/incr", {
			method: "POST", // HTTP method
			headers: {
				"Content-Type": "application/json", // Sending JSON body
			},
			body: JSON.stringify({ slug }), // Send slug (e.g. project name)
		});
	}, [slug]); // Dependency array ensures this runs again if the slug changes

	// This component doesn't render anything visible to the page
	return null;
};