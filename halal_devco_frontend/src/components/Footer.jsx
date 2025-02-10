"use client";
import { footerLinks } from "@/constants";
import axios from "axios";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
  const locale = useLocale();

  const [data, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFooterSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/footer-section?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data?.links);
      setFooterData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFooterSection();
  }, [locale]);

  return (
    <footer className="p-12 flex flex-col lg:flex-row items-start gap-x-36  gap-y-6 md:gap-y-10 bg-secondary-gradient rounded-3xl">
      <Link href={"/"}>
        <img
          src={`https://dev-api.hpdc.sa${data?.logo?.[0].url}`}
          alt="Halal DevCo. logo"
          width={180}
          height={37}
          className="mt-1 md:w-full w-40"
        />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-8 w-full">
        {data?.links?.map((linkItem, linkIndex) => (
          <div className=" space-y-3 md:space-y-4" key={linkItem?.id}>
            <h3 className="font-semibold text-lg md:text-2xl">{linkItem?.title}</h3>
            {linkIndex === data.links.length - 1 ? (
              <ul className="flex flex-wrap gap-6">
                {footerLinks.social_network.map((social, index) => (
                  <li key={index}>
                    <Link href={social.href} aria-label={social.name}>
                      {social.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="flex flex-col text-sm md:text-base">
                {linkItem?.footLinks?.map((link) =>
                  link?.footLinkHref !== null ? (
                    <li key={link?.id}>
                      <Link href={link.footLinkHref}>{link?.footLink}</Link>
                    </li>
                  ) : (
                    <li key={link?.id}>{link?.footLink}</li>
                  )
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
