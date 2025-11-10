import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/media", label: "Media" },
    { href: "/ventures", label: "Ventures" },
    { href: "/events", label: "Events" },
    { href: "/initiatives", label: "Initiatives" },
    { href: "/gallery", label: "Gallery" },
    { href: "/publications", label: "Publications" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    {
      href: "https://www.instagram.com/",
      icon: <Instagram size={18} />,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/",
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-[#C24E38] py-16">
      <div className="mx-auto max-w-[90%] bg-white px-6 py-10 md:px-16 md:py-16">
        {/* Top Section */}
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-start">
          {/* Left: Logo + Nav */}
          <div className="flex w-full flex-col gap-10 md:w-2/3 md:flex-row md:gap-16">
            {/* Logo */}
            <div className="flex w-full flex-col items-start md:w-1/2">
              <Image
                src="/images/logo.svg"
                alt="Site logo"
                width={200}
                height={200}
                className="mb-4"
              />
            </div>

            {/* Navigation Links */}
            <div className="text-4 grid grid-cols-2 gap-x-10 gap-y-10 font-inria uppercase tracking-wider text-gray-500 md:w-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[#b5442c]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Social */}
          <div className="flex w-full flex-col items-start space-y-6 md:w-1/3 md:items-end">
            <p className="font-inria font-thin uppercase tracking-wider">
              Follow Sheikh Shamma
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-sm bg-[#b5442c] p-4 text-white transition hover:bg-[#a13e28]"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-gray-200" />

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 font-inria text-gray-500 md:flex-row md:gap-0">
          <p className="text-center text-gray-500 md:text-left">
            © {new Date().getFullYear()} Sheikha Shamma. All Rights Reserved.
          </p>
          <div className="text-4 flex flex-wrap items-center justify-center space-x-4 text-gray-500">
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
