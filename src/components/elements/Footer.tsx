import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-[#b5442c] bg-white text-gray-700">
      <div className="mx-auto max-w-[75%] px-6 py-10 md:py-16">
        {/* Top Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Image
              src="/images/logo.svg"
              alt="Site logo"
              width={80}
              height={80}
              className="mb-4"
            />
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm uppercase tracking-wider">
            <Link href="/about" className="hover:text-[#b5442c]">
              About
            </Link>
            <Link href="/media" className="hover:text-[#b5442c]">
              Media
            </Link>
            <Link href="/ventures" className="hover:text-[#b5442c]">
              Ventures
            </Link>
            <Link href="/events" className="hover:text-[#b5442c]">
              Events
            </Link>
            <Link href="/initiatives" className="hover:text-[#b5442c]">
              Initiatives
            </Link>
            <Link href="/gallery" className="hover:text-[#b5442c]">
              Gallery
            </Link>
            <Link href="/publications" className="hover:text-[#b5442c]">
              Publications
            </Link>
            <Link href="/contact" className="hover:text-[#b5442c]">
              Contact
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start md:items-end space-y-3">
            <p className="text-xs uppercase tracking-wider">
              Follow me on social media
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-[#b5442c] text-white hover:bg-[#a13e28] transition"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-[#b5442c] text-white hover:bg-[#a13e28] transition"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-200" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col-reverse items-center justify-between space-y-4 text-xs text-gray-500 md:flex-row md:space-y-0">
          <p>© {new Date().getFullYear()} Sheikha Shamma. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/terms" className="hover:text-[#b5442c]">
              Terms & Conditions
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="hover:text-[#b5442c]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
