"use client";
import HeroSection from "@/components/HeroSection";
import IndustryPage from "@/components/IndustryPage";
import IntroText from "@/components/IntroText";
import { aboutDetails, halalIndustyGrowth } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HalalExcellence } from "@/constants"; //
import MarqueeSection from "@/components/MarqueeSection";
import CallToAction from "@/components/CallToAction";
import axios from "axios";
import { HexagonIcon } from "lucide-react";
import { useLocale } from "next-intl";
import HexTeam from "@/components/HexTeam";

function page() {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 15);
      } else {
        selectedData = data.find((item) => item.id === 8);
      }
      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAboutSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/aboutpage?_locale=${locale}`
      );
      const data = response.data;
      setAboutData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchAboutSection();
  }, [locale]);
  // console.log(aboutData?.cards);

  return (
    <section className="overflow-x-hidden">
      {/* Section 01 */}
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={"xl"}
        loading={loading}
      />
      <div className="relative flex flex-row items-start ltr:pl-8 ltr:md:pl-20 rtl:pr-8 rtl:md:pr-20 min-h-[600px] md:py-12 mt-20 ">
        <div className="flex flex-col items-start justify-center z-10 relative translate-y-4 max-w-4xl">
          <IntroText
            tagLine={aboutData?.descriptiveinfo?.intro?.tagline}
            title1={aboutData?.descriptiveinfo?.intro?.lightText1}
            darkGreen={aboutData?.descriptiveinfo?.intro?.darkText}
            gradientText1={aboutData?.descriptiveinfo?.intro?.gradientText}
          />
          <div className="max-w-xl text-sm md:text-base leading-relaxed mt-12 ltr:border-l-4 ltr:border-l-[#1c9666]  rtl:border-r-4 rtl:border-r-[#1c9666] px-4 opacity-70 ltr:md:ml-20 rtl:md:mr-20 ltr:ml-8 rtl:mr-8 space-y-4 text-justify">
            {aboutData?.descriptiveinfo?.strategy?.map((item) => (
              <p key={item?.id}>{item?.strategy}</p>
            ))}
          </div>
        </div>
        <img
          src={`https://dev-api.hpdc.sa${aboutData?.descriptiveinfo?.image?.url}`}
          alt="Halal Supply Chain"
          className="max-w-xs md:max-w-md rounded-br-3xl absolute top-0 ltr:right-0 rtl:left-0 -z-10"
        />
      </div>
      {/* Section 03 */}
      <IndustryPage data={aboutData} />
      <div className="bg-[#f4faf4] text-black flex-1 relative h-auto pb-0 rounded-3xl">
        <div className="w-full bg-transparent">
          <div className="flex flex-col md:flex-row w-full p-10 md:p-20 gap-20 justify-between">
            <div className="md:w-1/2 flex flex-col gap-10 ">
              <div className="flex flex-row items-start  gap-6 hover:bg-primary-gradient group bg-transparent rounded-lg max-w-[450px] p-8 ">
                <div>
                  <HexagonIcon
                    className="fill-mehdi text-mehdi"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-dark-green group-hover:text-white ">
                    {aboutData?.subdivs[0]?.title}
                  </h2>
                  <p className="text-[#7C7C7C] text-lg leading-tight group-hover:text-white text-justify">
                    {aboutData?.subdivs[0]?.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-start gap-6 hover:bg-primary-gradient transition-all group bg-transparent rounded-lg max-w-[450px] p-8">
                <div>
                  <HexagonIcon
                    className="fill-mehdi text-mehdi"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-dark-green group-hover:text-white">
                    {aboutData?.subdivs[1]?.title}
                  </h2>

                  <p className="text-[#7C7C7C] text-lg leading-tight group-hover:text-white text-justify">
                    {aboutData?.subdivs[1]?.description}
                  </p>
                </div>
              </div>
            </div>

            <div className=" md:w-1/2 flex flex-col gap-10">
              <div className="space-y-10">
                <h1 className="text-4xl lg:text-6xl font-light text-dark-green">
                  {aboutData?.secintro[0]?.lighttext1}{" "}
                  <span className="font-semibold">
                    {aboutData?.secintro[0]?.darkText}{" "}
                  </span>
                  {aboutData?.secintro[0]?.lightText2}{" "}
                  <span className="bg-primary-gradient bg-clip-text text-transparent font-bold md:inline-block">
                    {aboutData?.secintro[0]?.gradientText}
                  </span>
                </h1>

                <p className="text-[#7C7C7C] text-lg leading-tight max-w-lg text-justify">
                  {aboutData?.secintro[0]?.description}
                </p>
              </div>

              <div className="flex w-full flex-wrap justify-around gap-4 items-center mx-auto">
                {aboutData?.Numbers?.map((item) => (
                  <div
                    key={item?.id}
                    className="py-4 ltr:pl-4 ltr:pr-20 rtl:pr-8 rtl:pl-20 rounded-lg space-y-2 bg-inherit hover:bg-gradient-to-r hover:from-[#E0DE57] hover:to-[#9DC766] group transition-colors ease-in-out duration-1000 delay-1000"
                  >
                    <p className="text-4xl text-green font-semibold group-hover:text-white transition-colors ease-in-out duration-100 text-justify">
                      {item?.title}
                    </p>

                    <p className="text-[#7C7C7C] group-hover:text-white transition-colors ease-in-out duration-100 text-justify">
                      {item?.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <MarqueeSection />
        </div>
      </div>
      {/* Section 05 */}
      <div className="p-10 flex flex-col gap-y-8 mt-20 ">
        <div className="max-w-5xl ">
          <IntroText
            tagLine={aboutData?.headings[0]?.tagline}
            title1={aboutData?.headings[0]?.lightText1}
            darkGreen={aboutData?.headings[0]?.darkText}
            gradientText1={aboutData?.headings[0]?.gradientText}
          />
        </div>

        <motion.div
          ref={ref}
          className="flex items-center justify-center flex-wrap gap-10 mt-8 pb-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {aboutData?.cards?.map((content, index) => (
            <motion.div
              key={index}
              className="max-w-[400px] min-h-[309px] hover:bg-primary-gradient rounded-2xl relative group flex flex-col shadow-lg "
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white w-full h-full p-6 space-y-8 group-hover:bg-transparent transition-all flex flex-col rounded-2xl ">
                <div className="space-y-8">
                  <h3 className="text-dark-green group-hover:text-white font-bold md:text-2xl">
                    {content?.Title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed group-hover:text-white md:text-lg md:text-justify">
                    {content?.Description}
                  </p>
                </div>

                <div className="flex tems-end">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E0DE57] to-[#9DC766] rounded-full"></div>
                </div>
              </div>

              <img
                src={
                  content.image ||
                  `https://dev-api.hpdc.sa${content?.Image[0]?.url}`
                }
                className="absolute ltr:right-0 rtl:left-0 bottom-0 w-[110px] group-hover:w-[220px] transition-all"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Section 06 */}
      <div className="space-y-20 pt-10">
        <div className="md:max-w-7xl">
          <IntroText
            tagLine={aboutData?.heading[0]?.tagline}
            title1={aboutData?.heading[0]?.lightText1}
            title2={aboutData?.heading[0]?.lightText2}
            darkGreen={aboutData?.heading[0]?.darkText}
            gradientText1={aboutData?.heading[0]?.gradientText}
          />
        </div>
        <HexTeam buttons={aboutData?.team?.team} team1={aboutData?.team?.teamImg} team2={aboutData?.exeTeam} />
      </div>
      {/* Sectino 07 */}
      <div className="pt-20 flex md:flex-row flex-col-reverse gap-10 mb-20">
        <div className="space-y-8 flex flex-col justify-start">
          <IntroText
            tagLine={aboutData?.head[0]?.tagline}
            title1={aboutData?.head[0]?.lightText1}
            title2={aboutData?.head[0]?.lightText2}
            darkGreen={aboutData?.head[0]?.darkText}
            gradientText1={aboutData?.head[0]?.gradientText}
          />

          <div className="leading-snug font-lg space-y-6 text-justify ">
            {aboutData?.descriptivetext?.map((item) => (
              <p key={item.id}>{item?.descriptions}</p>
            ))}
          </div>

          <div className="text-justify">
            <p className="text-2xl font-semibold">{aboutData?.Title}</p>
            <p className="leadig-snug text-lg">{aboutData?.Position}</p>
          </div>
        </div>

        <div className="w-full">
          <img src={`https://dev-api.hpdc.sa${aboutData?.image?.[0]?.url}`} />
        </div>
      </div>
      <CallToAction />
    </section>
  );
}

export default page;
