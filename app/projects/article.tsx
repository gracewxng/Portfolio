// Import Next.js <Link> component for client-side routing
import Link from "next/link";

// Import the Eye icon for showing view count
import { Eye } from "lucide-react";

// Define the shape of the project prop used in this component
type SimplifiedProject = {
  slug: string;         // Unique identifier for the project
  title: string;        // Title of the project
  description: string;  // Short description
  date: string;         // Published date
  href: string;         // Path to project detail page
};

// Props include the project and the number of views
type Props = {
  project: SimplifiedProject;
  views: number;
};

// Functional component to display a clickable project summary (card-style)
export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    // Make the whole article clickable and link to the project page
    <Link href={project.href}>
      <article className="p-4 md:p-8">
        
        {/* Top row: date on left, views on right */}
        <div className="flex justify-between gap-2 items-center">
          
          {/* Display formatted publish date or "SOON" if missing */}
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
            {project.date ? (
              // <time> element improves accessibility and SEO
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span> // Fallback text if no date is available
            )}
          </span>

          {/* View count display with Eye icon */}
          <span className="text-zinc-500 text-xs flex items-center gap-1">
            <Eye className="w-4 h-4" />{" "}
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
          </span>
        </div>

        {/* Project title */}
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
          {project.title}
        </h2>

        {/* Project description */}
        <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {project.description}
        </p>
      </article>
    </Link>
  );
};