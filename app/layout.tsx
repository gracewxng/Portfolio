// Import global CSS styles (Tailwind, resets, etc.)
import "../global.css";

// Import Google Font (Inter) from @next/font
import { Inter } from "@next/font/google";

// Import a custom local font
import LocalFont from "@next/font/local";

// Import the Metadata type for defining SEO/meta tags
import { Metadata } from "next";

// Import custom analytics component for tracking (e.g., Beam, Vercel, etc.)
import { Analytics } from "./components/analytics";

// Define metadata for the entire site — used for SEO, social sharing, etc.
export const metadata: Metadata = {
  title: {
    default: "Grace Wang",                // Default title for all pages
    template: "%s | Grace Wang",          // Format for dynamic titles
  },
  description: "Second Year Business and Computer Science", // Meta description

  openGraph: {
    title: "Grace Wang",                             // Title shown on link previews
    description: "Second Year Business and Computer Science", 
    url: "https://gracewang.vercel.app",             // Canonical URL
    siteName: "Grace Wang",                          // Name of your site
    images: [                                        // Social preview image
      {
        url: "https://gracewang.vercel.app/preview.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },

  robots: {
    index: true,    // Allow indexing
    follow: true,   // Allow crawling of links
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,     // No limit on video preview length
      "max-image-preview": "large",// Show large image previews
      "max-snippet": -1,           // No limit on text snippet
    },
  },

  twitter: {
    title: "Grace Wang",           // Title used in Twitter cards
    card: "summary_large_image",   // Use large preview cards
  },

  icons: {
    shortcut: "/logo.png",         // Favicon icon (shown in browser tab)
  },
};

// Load Inter font from Google Fonts and assign it to a CSS variable
const inter = Inter({
  subsets: ["latin"],              // Only include Latin characters
  variable: "--font-inter",        // CSS custom property to use in Tailwind
});

// Load CalSans font from local .ttf file and assign to a variable
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

// Root layout used to wrap every page in the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Children represent the page-specific content
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        {/* Manually include favicon for legacy support */}
        <link rel="icon" href="/favicon.png" />
        
        {/* Analytics script injected here (e.g., Beam) */}
        <Analytics />
      </head>

      <body
        className={`bg-black ${
          // If in development mode, enable Tailwind debug overlay (optional)
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {/* Render the page content here */}
        {children}
      </body>
    </html>
  );
}