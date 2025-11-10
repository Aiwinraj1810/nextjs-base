import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  // 🧩 Define your nav links in a simple array
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

  // Optional: social links can also be stored in an array
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
    <footer className="bg-[#C24E38] py-16 ">
      <div className="mx-auto max-w-[90%] bg-white px-16 py-10 md:py-16">
        {/* Top Section */}
        <div className="flex items-center">
          <div className="flex flex-1 items-center gap-10">
            {/* Logo */}
            <div className="flex w-1/2 flex-col items-start">
              <Image
                src="/images/logo.svg"
                alt="Site logo"
                width={200}
                height={200}
                className="mb-4"
              />
            </div>

            {/* Navigation Links */}
            <div className="text-4 grid grid-cols-2 gap-x-10 gap-y-10 font-inria uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[#b5442c] text-gray-500" 
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-1 flex-col items-start space-y-3 md:items-end">
            <div className="w-1/2 space-y-16">
              <p className="font-inria font-thin uppercase tracking-wider">
                Follow Sheikh Shamma
              </p>
              <div className="flex space-x-4">
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
        </div>

        {/* Divider */}
        <div className="mt-[9rem] border-t border-gray-200" />

        {/* Bottom Section */}
        <div className="mt-6 font-inria flex flex-col-reverse items-center justify-between space-y-4  text-gray-500 md:flex-row md:space-y-0">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Sheikha Shamma. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4 text-4 text-gray-500">
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
