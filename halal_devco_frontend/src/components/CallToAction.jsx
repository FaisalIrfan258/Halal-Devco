"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const CallToAction = () => {
  const locale = useLocale();
  const [data, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentPath = usePathname();
  // console.log(currentPath.includes('careers'))

  // Fetch hero section data
  const fetchContactSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/call-to-action?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data);
      setContactData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContactSection();
  }, [locale]);

  return (
    <section className="max-w-6xl mx-auto py-20 flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-10 xl:text-justify">
      <p className={`md:text-lg inline ${loading && 'w-32 h-10 rounded-md bg-gray-300 animate-pulse'} `}>{data?.contact?.tagline}</p>
      <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-dark-green max-w-[700px]">
        <span className="font-semibold">{data?.contact?.darkText}{" "}</span>
        {data?.contact?.lightText2}{" "}
        <span className="bg-primary-gradient bg-clip-text text-transparent font-semibold">
          {data?.contact?.gradientText}
        </span>
      </h2>
      <Button
        size="lg"
        className="bg-primary-gradient self-end"
        href={`${currentPath.includes('careers') ? 'mailto:career@hpdc.sa' : 'mailto:info@hpdc.sa'}`}
      >
        {data?.btnText}
      </Button>
    </section>
  );
};

export default CallToAction;
