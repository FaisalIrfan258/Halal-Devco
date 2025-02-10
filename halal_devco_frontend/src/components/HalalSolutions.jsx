import React from "react";
import IntroText from "./IntroText";
import { halalSolutions } from "@/constants";
import { Button } from "./ui/button";

function HalalSolutions({ intro, solutionSection }) {
  // console.log(solutionSection);
  return (
    <div className="lg:px-16">
      <IntroText
        tagLine={intro?.tagline}
        title1={intro?.lightText1}
        darkGreen={intro?.darkText}
        gradientText1={intro?.gradientText}
      />
      <div className="container mx-auto p-4 space-y-28 my-8 md:my-16">
        {solutionSection?.map((item) => (
          <div className="flex flex-col md:flex-row w-full" key={item?.id}>
            <div className="md:w-1/2 py-4 ltr:md:pr-32 rtl:md:pl-32 mb-20">
              <h2 className="text-3xl lg:text-4xl text-dark-green mb-8">
                {item?.lightText}{" "}
                <span className="bg-primary-gradient bg-clip-text text-transparent font-bold">
                  {item?.gradientText}
                </span>
              </h2>
              <p className="text-lg mb-8 md:mb-16 leading-snug text-[#252525] text-justify">
                {item?.description}
              </p>
              <Button
                size="lg"
                className="bg-primary-gradient self-end"
                href="/investment"
              >
                {item?.btnText}
              </Button>
            </div>
            {/* Programs List */}
            <div className="space-y-4 md:w-1/2 ">
              {item?.solution?.map((solution, index) => (
                <div
                  className="p-4 border-b-2 hover:border-b-mehdi cursor-pointer flex items-center justify-start gap-8"
                  key={solution?.id}
                >
                  <img
                    src={`https://dev-api.hpdc.sa${solution?.image?.url}`}
                    width={40}
                  />
                  <div className="mb-2">
                    <h3 className="text-xl md:text-2xl font-bold mb-6">
                      {solution?.title}
                    </h3>
                    <p className="text-[#7C7C7C] hover:text-black leading-tight mb-2 text-justify">
                      {solution?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HalalSolutions;
