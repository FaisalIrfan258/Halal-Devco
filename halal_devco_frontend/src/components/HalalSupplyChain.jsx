import React from "react";
import IntroText from "./IntroText";

const HalalSupplyChain = ({ data }) => {
  // console.log(data?.decriptiveIntro?.image?.url)
  return (
    <div className="relative flex flex-row items-start min-h-[800px] md:py-2 text-justify">
      <div className="flex flex-col items-start justify-center z-10 relative translate-y-4 px-4 ltr:md:pl-20 rtl:md:pr-20 ltr:lg:pl-32 rtl:lg:pr-32 max-w-5xl rtl:mt-10 text-justify">
        {" "}
        <IntroText
          tagLine={data?.decriptiveIntro?.intro?.tagline}
          title1={data?.decriptiveIntro?.intro?.lightText1}
          title2={data?.decriptiveIntro?.intro?.lightText2}
          darkGreen={data?.decriptiveIntro?.intro?.darkText}
          gradientText1={data?.decriptiveIntro?.intro?.gradientText}
        />
        <p className="max-w-xl text-sm md:text-base leading-relaxed mt-12 ltr:border-l-4 rtl:border-r-4 ltr:border-l-[#1c9666] rtl:border-r-[#1c9666] md:ltr:pl-4 md:rtl:pr-4 px-4 px-4 opacity-100 ltr:md:ml-20 ltr:lg:ml-28 ltr:ml-8 rtl::md:mr-20 rtl:lg:mr-28 rtl:mr-8 ">
          {data?.decriptiveIntro?.strategy?.[0].strategy}
        </p>
      </div>
      <div className="py-12 absolute top-0 ltr:-right-24 rtl:-left-24 -z-50 w-[500px]">
        <img
          src={`https://dev-api.hpdc.sa${data?.decriptiveIntro?.image?.url}`}
          alt="Halal Supply Chain"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default HalalSupplyChain;
