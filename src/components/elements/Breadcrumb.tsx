"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react"; // arrow icon

export interface BreadcrumbTrail {
  title?: string;
  link?: string;
  enabled?: boolean;
}

interface BreadcrumbProps {
  trail?: BreadcrumbTrail[];
  className?: string;
  classNames?: {
    title?: string;
    link?: string;
    list?: string;
  };
}

const Breadcrumb = ({ trail, className, classNames }: BreadcrumbProps) => {
  const pathname = usePathname();

  // Filter out empty titles
  const filteredTrail = trail?.filter((e) => !!e.title) || [];

  const generateHref = (path: BreadcrumbTrail, index: number) => {
    const url =
      filteredTrail
        ?.slice(0, index)
        ?.map((e) => e?.link)
        ?.filter(Boolean)
        ?.join("/") || "";

    const pathLink = path?.link ? `/${path.link}` : "";
    const urlLink = url ? `/${url}` : "";

    return `${urlLink}${pathLink}`;
  };

  return (
    <nav aria-label="breadcrumb" className={cn("text-mobster", className)}>
      <ul
        className={cn(
          "flex flex-wrap items-center text-4 whitespace-nowrap",
          classNames?.list
        )}
      >
        {/* Home link */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className={cn(
              "uppercase font-medium hover:text-gray-700 transition",
              classNames?.link
            )}
          >
            Home
          </Link>
          {!!filteredTrail?.length && <Separator />}
        </li>

        {/* Dynamic trail */}
        {filteredTrail?.map((item, i) => {
          const isLast = i === filteredTrail.length - 1;
          const href = generateHref(item, i);

          return (
            <li
              key={`breadcrumb-${i}`}
              className={cn(
                "inline-flex items-center",
                !item.enabled && "cursor-not-allowed opacity-70"
              )}
            >
              {!isLast ? (
                <>
                  {item.enabled !== false && item.link ? (
                    <Link
                      href={href}
                      className={cn(
                        "hover:text-gray-700 transition",
                        classNames?.link
                      )}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className={classNames?.title}>{item.title}</span>
                  )}
                  <Separator />
                </>
              ) : (
                // Current page (no link)
                <span
                  className={cn(
                    "font-semibold text-gray-900",
                    classNames?.title
                  )}
                >
                  {item.title}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/* Separator → replaces "/" with arrow */
const Separator = () => (
  <ChevronRight
    size={16}
    className="mx-2 text-gray-400 shrink-0"
    aria-hidden="true"
  />
);

export default Breadcrumb;
