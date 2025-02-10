"use client";

import FeatureItem from "./FeatureItem";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import axios from "axios";
import { useLocale } from "next-intl";

const FeatureSection = () => {
  const locale = useLocale();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 110%", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  });

  const [data, setFeatureData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch feature section data
  const fetchFeatureSection = async () => {
    try {

      const response = await axios.get(`https://dev-api.hpdc.sa/feature?_locale=${locale}`);
      const data = response.data
      // console.log(data)
      setFeatureData(data);
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeatureSection();
  }, [locale]);

  return (
    <section className="px-8 py-14 space-y-20">
      <div className="space-y-2 lg:pl-16">

        <p className="text-lg text-justify " >{data?.header?.tagline}</p>
        <h2 className="text-3xl   lg:text-6xl  lg:leading-[75.09px] text-balance text-dark-green font-light">
        {data?.header?.lightText1}{" "}
          <span className="font-semibold text-3xl lg:text-6xl  capitalize">{data?.header?.darkText }</span>
          <div className="capitalize">
          {data?.header?.lightText2}{" "}
            <span
              className="bg-gradient-to-r from-[#9DC766] to-[#1C9666] text-transparent bg-clip-text font-semibold text-3xl lg:text-6xl"
            >
              {data?.header?.gradientText}
            </span>
          </div>
        </h2>
      </div>
      <div ref={containerRef} className="relative">
        {loading ? (
          // Static Loading Skeleton
          <div className="flex flex-col gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-8 py-16 relative">
                {/* Placeholder for hexagon on the left */}
                <div className="absolute -left-2 lg:left-1/2 transform -translate-x-1/2 top-0 -translate-y-1/2 z-10">
                  <div className="hexagon w-12 h-12 bg-gray-300" />
                </div>
                
                {/* Timeline part */}
                <div className="absolute -left-2 lg:left-1/2 -translate-x-1/2 h-full top-0 bottom-0">
                  <div className="w-1 h-full border-dashed border-l-2 border-gray-300" />
                </div>

                {/* Placeholder for text on the right */}
                <div className="lg:w-1/2 space-y-8 order-2 flex justify-center items-center px-10">
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          data?.featureData.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            >
              <FeatureItem featureItem={feature} isLastFeature={index === data.featureData.length - 1} />
            </motion.div>
          ))
        )}
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 top-0 -left-[10.8px] lg:left-[49.85%] translate-x-1/2 w-0.5 bg-green origin-top"
        />
      </div>
    </section>
  );
};

export default FeatureSection;
