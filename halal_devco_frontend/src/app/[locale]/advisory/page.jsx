"use client";
import CallToAction from "@/components/CallToAction";
import HalalSolutions from "@/components/HalalSolutions";
import HalalSupplyChain from "@/components/HalalSupplyChain";
import HeroSection from "@/components/HeroSection";
import IntroText from "@/components/IntroText";
import NewsFeed from "@/components/NewsFeed";
import axios from "axios";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [pageloading, setPageLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(`https://dev-api.hpdc.sa/headers?_locale=${locale}`);
      const data = response.data;

      let selectedData;
      if (locale === 'ar'){
        selectedData = data.find((item) => item.id === 13);
      } else{
        selectedData = data.find((item) => item.id === 1)
      }

      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchAdvisoryPage = async () => {
    try {
      const response = await axios.get(`https://dev-api.hpdc.sa/advisory-page?_locale=${locale}`);
      const data = response.data;
      setPageData(data);
      setPageLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchAdvisoryPage();
  }, [locale]);


  // console.log(pageData?.descriptiveIntro?.image.url)
  return (
    <div className="space-y-14 overflow-hidden">
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={"xs"}
        loading={loading}
      />
      <div className="relative flex flex-row items-start pl-10 ltr:md:pl-28 rtl:md:pr-28 min-h-[600px] md:py-12">
        <div className="flex flex-col items-start justify-center z-10 relative translate-y-4 max-w-4xl">
          {" "}
          <IntroText
            tagLine={pageData?.descriptiveIntro?.intro?.tagline}
            title1={pageData?.descriptiveIntro?.intro?.lightText1}
            title2={pageData?.descriptiveIntro?.intro?.lightText2}
            darkGreen={pageData?.descriptiveIntro?.intro?.darkText}
            gradientText1={pageData?.descriptiveIntro?.intro?.gradientText}
            // gradientText2={"Ecosystem"}
          />
          <p className="max-w-xl text-sm md:text-base leading-relaxed mt-12 ltr:border-l-4 rtl:border-r-4 ltr:border-l-[#1c9666] rtl:border-r-[#1c9666] px-4 opacity-70 ltr:md:ml-28 rtl:md:mr-28 ltr:ml-8 rtl:mr-8 text-justify">
            {pageData?.descriptiveIntro?.strategy?.[0]?.strategy}
          </p>
        </div>
        <img
          src={`https://dev-api.hpdc.sa${pageData?.descriptiveIntro?.image.url}`}
          alt="Halal Supply Chain"
          className="max-w-xs md:max-w-md rounded-br-3xl absolute top-0 ltr:right-0 rtl:left-0 -z-10 rtl:scale-x-[-1]"
        />
      </div>
      <HalalSolutions intro={pageData?.section2} solutionSection={pageData?.solutionSection}/>
      <NewsFeed />
      <CallToAction />
    </div>
  );
};

export default page;
