// Mark this as a Client Component so it can use hooks and browser APIs
"use client";

// Import animation utilities from Framer Motion
import {
	motion,                 // Used to create animated elements
	useMotionTemplate,     // Used to create dynamic CSS values with animations
	useMotionValue,        // (not used here, but typically tracks raw values)
	useSpring,             // Adds smooth spring physics to values
} from "framer-motion";

// Import types from React
import { MouseEventHandler, PropsWithChildren } from "react";

// Define the Card component using React.FC with children prop
export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	// Initialize animated spring values for mouse X and Y positions
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	// Function to update mouse position when hovering over the card
	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		// Get the card's position on the screen
		const { left, top } = currentTarget.getBoundingClientRect();
		// Set mouseX and mouseY to the position of the cursor relative to the card
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	// Create a radial mask gradient that follows the mouse position
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;

	// Apply the mask to both standard and WebKit browsers
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		// Outer container of the card
		// Triggers mouse tracking and handles visual hover effects
		<div
			onMouseMove={onMouseMove} // Call onMouseMove when the mouse moves over the card
			className="overflow-hidden relative duration-700 border rounded-xl 
				hover:bg-zinc-800/10 group md:gap-8 
				hover:border-zinc-400/50 border-zinc-600"
		>
			{/* Overlay and motion layers that create dynamic lighting effect */}
			<div className="pointer-events-none">
				{/* Fade out the bottom of the card with a vertical gradient */}
				<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />

				{/* Gradient that follows the mouse and becomes visible on hover */}
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 
						transition duration-1000 group-hover:opacity-50"
					style={style} // Apply dynamic mask gradient
				/>

				{/* Another animated overlay that blends over the card on hover */}
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay 
						transition duration-1000 group-hover:opacity-100"
					style={style} // Same gradient mask applied here too
				/>
			</div>

			{/* Render the children elements passed into this Card */}
			{children}
		</div>
	);
};