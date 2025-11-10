"use client";

//nextjs-base\src\components\elements\header\HeaderContent.tsx
import { useApp } from "@/components/AppProvider";
import { cn } from "@/lib/utils";
import { IHeaderNavItem } from "@/typings/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ImageComponent from "../../ui/image";

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
        className={` z-[9] w-full transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } `}
      >
        <nav
          className={cn(
            "flex items-center justify-between bg-gray-300 p-4",
            isDarkHeader && "bg-red-700",
          )}
        >
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold text-white">
              <ImageComponent
                src="/images/logo.svg"
                alt="Logo"
                width={200}
                height={30}
              />
            </Link>
            <p>Content here</p>
          </div>

          {/* Hamburger menu button for small screens */}
          <div className="block lg:hidden">
            <div className={`inline-block cursor-pointer`} onClick={toggleMenu}>
              <div
                className={`duration-400 mb-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "translate-y-[0.6rem] -rotate-45" : null
                }`}
              ></div>
              <div
                className={`duration-400 mb-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "opacity-0" : null
                }`}
              ></div>
              <div
                className={`duration-400 mt-2 h-px w-10 bg-gray-700 transition-all ${
                  isOpen ? "translate-y-[-0.6rem] rotate-45" : null
                }`}
              ></div>
            </div>
          </div>

          {/* Menu on the right */}
          <div className={`hidden lg:flex`}>
            <ul className="items-center justify-end space-x-4 lg:flex text-2xl">
              {navItems?.map((item, i) => {
                let active: boolean = false;

                if (item.path == "/" && !activePath[2]) {
                  active = true;
                } else if (
                  item.path !== "/" &&
                  activePath[1] &&
                  activePath[1] == item.path.substring(1)
                ) {
                  active = true;
                }
                return (
                  <li key={`menu-item-${i}`} className="group relative">
                    <Link
                      href={item.path}
                      target={item.type === "EXTERNAL" ? "_blank" : "_self"}
                      className={cn(`text-black`, active && `underline`)}
                    >
                      {item.title}
                    </Link>
                    {item?.items?.length ? (
                      <ul className="absolute z-10 hidden min-w-[160px]  bg-white p-4 shadow-lg group-hover:block">
                        {item?.items?.map((e, i) => (
                          <li key={i}>
                            <Link
                              href={e.path}
                              target={
                                item.type === "EXTERNAL" ? "_blank" : "_self"
                              }
                              className="text-black"
                            >
                              {e.title}
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
        </nav>
      </header>
      <div
        className={`${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } fixed start-0 top-0 z-[8] h-dvh w-full bg-gray-300 transition ease-linear`}
      >
        <ul className="flex flex-col space-y-4 px-4 pt-28">
          {navItems?.map((item, i) => {
            let active: boolean = false;

            if (item.path == "/" && !activePath[2]) {
              active = true;
            } else if (
              item.path !== "/" &&
              activePath[1] &&
              activePath[1] == item.path.substring(1)
            ) {
              active = true;
            }
            return (
              <li className="group relative" key={i}>
                <Link
                  href={item.path}
                  target={item.type === "EXTERNAL" ? "_blank" : "_self"}
                  className={cn(`text-black`, active && `underline`)}
                >
                  {item.title}
                </Link>
                {item?.items?.length ? (
                  <ul className="ps-4">
                    {item?.items?.map((e, i) => (
                      <li key={`mobile-menu-item-${i}`}>
                        <Link
                          href={e.path}
                          target={item.type === "EXTERNAL" ? "_blank" : "_self"}
                          className="text-black"
                        >
                          {e.title}
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
