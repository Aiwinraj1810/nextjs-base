"use client";

import { useApp } from "@/components/AppProvider";
import { cn } from "@/lib/utils";
import { IHeaderNavItem } from "@/typings/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ImageComponent from "../../ui/image";
import { Search, ArrowRight } from "lucide-react";

export interface HeaderContentProps {
  className?: string;
  navItems: IHeaderNavItem[];
}

const HeaderContent = ({ navItems }: HeaderContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const activePath = pathname.split("/");
  const { isDarkHeader } = useApp();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-hidden", !isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-[9] w-full bg-[#EAE3DD] pt-12 py-4 px-8 sm:px-16 lg:pt-20 sm:pb-[1.3rem] transition-transform duration-300",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between",
            isDarkHeader && "bg-red-700"
          )}
        >
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ImageComponent
                src="/images/logo.svg"
                alt="Logo"
                width={350}
                height={200}
                className="object-contain"
              />
            </Link>
          </div>
          {/* Right: Icons and button */}
          <div className="flex items-center space-x-6">
            {/* Search icon */}
            <button
              aria-label="Search"
              className="text-gray-700 hover:text-black transition"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* Get in touch button */}
            <Link
              href="/contact"
              className="hidden font-inria sm:inline-flex items-center space-x-2 rounded-full bg-[#BC9464] px-8 py-[1.1rem] text-4  uppercase text-white tracking-wide hover:bg-[#a77e50] transition"
            >
              <span>Get in touch</span>
              <ArrowRight size={14} />
            </Link>

            {/* Hamburger menu */}
            <div className="block cursor-pointer" onClick={toggleMenu}>
              <div
                className={`duration-400 mb-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "translate-y-[0.6rem] -rotate-45" : ""
                }`}
              ></div>
              <div
                className={`duration-400 mb-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`duration-400 mt-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "translate-y-[-0.6rem] rotate-45" : ""
                }`}
              ></div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } fixed start-0 top-0 z-[8] h-dvh w-full bg-gray-300 transition ease-linear`}
      >
        <ul className="flex flex-col space-y-4 px-4 pt-28">
          {navItems?.map((item, i) => {
            const isActive =
              (item.path === "/" && !activePath[2]) ||
              (item.path !== "/" &&
                activePath[1] === item.path.substring(1));

            return (
              <li className="group relative" key={i}>
                <Link
                  href={item.path}
                  target={item.type === "EXTERNAL" ? "_blank" : "_self"}
                  className={cn(`text-black`, isActive && `underline`)}
                >
                  {item.title}
                </Link>
                {item?.items?.length ? (
                  <ul className="ps-4">
                    {item?.items?.map((sub, idx) => (
                      <li key={`mobile-sub-${idx}`}>
                        <Link
                          href={sub.path}
                          target={sub.type === "EXTERNAL" ? "_blank" : "_self"}
                          className="text-black"
                        >
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default HeaderContent;
