"use client";
import { useEffect, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "./ui/button";
import { usePathname } from "@/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import axios from "axios";
import { useLocale } from "next-intl";

const Navbar = () => {
  const locale = useLocale();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (path) => {
    return `text-lg ${
      pathname === path ? "font-bold text-green-800" : "text-white"
    } border-b border-opacity-50 pb-1 w-full`;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [data, setNavData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchNavSection = async () => {
    try {
      const response = await axios.get(`https://dev-api.hpdc.sa/navbar?_locale=${locale}`);
      const data = response.data;
      setNavData(data);
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNavSection();
  }, [locale]);

  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center p-0 bg-white !mt-0">
        <Link href="/">
          {loading ? (
            // Skeleton for logo
            <div className="w-[180px] h-[37px] bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <img
              src={`https://dev-api.hpdc.sa${data?.logo?.url}`}
              alt="Halal DevCo. logo"
              width={180}
              height={37}
              className="select-none"
            />
          )}
        </Link>

        <nav className="flex items-center gap-4">
          {loading ? (
            // Skeleton for buttons
            <div className="flex gap-4">
              <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
              <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          ) : (
            <>
              <LanguageSwitcher />
              <Button
                className="bg-primary-gradient max-sm:hidden"
                href="/investment"
              >
                {data?.btnText}
              </Button>
              <button onClick={toggleSidebar} className="cursor-pointer">
                <MenuIcon />
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Sidebar */}
      <div
        className={`stick fixed -top-14 ltr:right-0 rtl:left-0 h-full w-96 bg-gradient-to-b from-[#9DC76666] via-[#1C966666] to-[#9DC76666] shadow-lg transform backdrop-blur-xl ${
          isSidebarOpen ? "translate-x-0 opacity-100" : "ltr:translate-x-full rtl:-translate-x-full opacity-0"
        } transition-all duration-500 ease-in-out z-50`}
      >
        {/* Close button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-14 ltr:right-4 rtl:left-4 cursor-pointer"
        >
          <X />
        </button>

        {/* Logo in Sidebar */}
        <div className="px-6 pt-14">
          <Link href="/" onClick={toggleSidebar}>
            {loading ? (
              <div className="w-[150px] h-[50px] bg-gray-300 animate-pulse rounded-md"></div>
            ) : (
              <img
                src={`https://dev-api.hpdc.sa${data?.logo?.url}`}
                alt="Halal DevCo logo"
                width={150}
                height={50}
              />
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-start justify-start space-y-6 p-6 mt-4">
          {loading
            ? // Skeleton for navlinks
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-6 bg-gray-300 animate-pulse rounded-md"
                  ></div>
                ))
            : data?.navlinks?.map((link) => (
                <Link
                  key={link?.id}
                  href={link?.href}
                  onClick={toggleSidebar}
                  className={getLinkClass(link?.href)}
                >
                  {link?.title}
                </Link>
              ))}
        </div>

        {/* Footer Text */}
        <div className="px-6 py-10 text-xl">
          {loading ? (
            // Skeleton for footer text
            <div className="w-64 h-6 bg-gray-300 animate-pulse rounded-md"></div>
          ) : (
            <p>
              <span className="font-semibold text-[#22411C]">
                {data?.navDesc?.darkText}
              </span>{" "}
              <span className="font-light text-[#22411C]">
                {data?.navDesc?.lightText2}
              </span>{" "}
              <span className="font-semibold text-white">
                {data?.navDesc?.gradientText}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
