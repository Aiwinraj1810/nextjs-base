"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DynamicZoneProps } from "@/typings/common";

interface HeaderBlockProps {
  block: DynamicZoneProps;
}

const HeaderBlock = ({ block }: HeaderBlockProps) => {
  const { logo, menu_links, cta_text, cta_link, background_color } = block;
  console.log("blcok : ", menu_links)

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } shadow-md`}
      style={{ backgroundColor: background_color || "#ffffff" }}
    >
      <div className=" flex justify-between items-center p-4">
        {/* Logo */}
        {logo?.url && (
          <Link href="/">
            <Image
              src={logo.url}
              alt="Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        )}

        {/* Menu Links */}
        <nav className="md:flex gap-6 bg-black">
          {menu_links?.map((link: any, index: number) => (
            <Link
              key={index}
              href={link.url || "#"}
              className="text-black hover:text-blue-600 transition-colors"
            >
              {link.Title}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        {cta_text && (
          <Link
            href={cta_link || "#"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {cta_text}
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderBlock;
