"use client";

import HexagonImage from "@/components/HexagonImage";
import { HexagonIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FeatureItem = ({ featureItem, isLastFeature, loading }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  let textHighlight = '';
  let textNotHighlight = '';
  if (featureItem?.id === 4) {
    let text = featureItem?.lightText.split(' ');
    textHighlight = text.slice(0, 2).join(' ')
    textNotHighlight = text.slice(2).join(' ')
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 10,
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const shouldSwap = featureItem?.lightText === "Delivering World-Class Advisory" || isLastFeature;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`flex flex-col items-center lg:flex-row gap-8 relative py-14 ${shouldSwap ? "flex-row-reverse" : ""}`}

    >
      {loading ? (
        // Loading State
        <div className="flex gap-4 animate-pulse">
          <div className="h-32 w-32 bg-gray-200 rounded-md" />
          <div className="flex flex-col justify-between">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      ) : (
        <>
          {/* Timeline part */}
          <div className="absolute -left-2 lg:left-1/2 -translate-x-1/2 h-full top-0 bottom-0">
            <div className="w-1 h-full border-dashed border-l-2 border-gray-300" />
          </div>
          <div className="absolute -left-2 lg:left-1/2 transform -translate-x-1/2 top-0 -translate-y-1/2 z-10">
            <HexagonIcon className={`w-12 h-12 text-white ${isInView ? "fill-mehdi" : "fill-gray-200"}`} />
          </div>

          {/* Conditional swap for image and text */}
          {shouldSwap ? (
            <>
              <motion.div
                className="lg:w-1/2 flex justify-center items-center order-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <HexagonImage className="w-full max-w-md" src={`https://dev-api.hpdc.sa${featureItem?.Image?.url}`} />
              </motion.div>
              <motion.div className="lg:w-1/2 space-y-8 order-1 flex justify-center items-center px-10" variants={itemVariants}>
                <div className="space-y-8">
                  <motion.h3 className="text-3xl lg:text-4xl font-light" variants={itemVariants}>
                    {featureItem?.id !== 4 ? <span className="text-dark-green font-light">
                      {featureItem?.lightText}{" "}
                    </span> : <> <span
                      className="bg-gradient-to-r from-[#9DC766] to-[#1C9666] bg-clip-text text-transparent font-semibold"
                    >{textHighlight} {" "}</span>
                      <span className="text-dark-green font-light">{textNotHighlight}</span>
                    </>}
                    <span
                      className="bg-gradient-to-r from-[#9DC766] to-[#1C9666] bg-clip-text text-transparent font-semibold"
                    >
                      {featureItem?.gradientText}
                    </span>
                  </motion.h3>
                  <motion.p className="text-black md:text-justify" variants={itemVariants}>
                    {featureItem?.description}
                  </motion.p>
                  <motion.div className="flex flex-wrap gap-4 md:text-justify" variants={itemVariants}>
                    {featureItem?.feature.map((item, itemIndex) => (
                      <motion.div key={itemIndex} className="flex gap-2 items-center justify-start border md:text-justify" variants={itemVariants}>
                        <HexagonIcon className="fill-mehdi text-mehdi shrink-0" aria-hidden="true" />
                        <span>{item?.feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                className="lg:w-1/2 flex justify-center items-center even:order-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <HexagonImage className="w-full max-w-md" src={`https://dev-api.hpdc.sa${featureItem?.Image?.url}`} />
              </motion.div>
              <motion.div className="lg:w-1/2 space-y-8 odd:order-2 flex justify-center items-center px-10" variants={itemVariants}>
                <div className="space-y-8">
                  <motion.h3 className="text-3xl lg:text-4xl font-light" variants={itemVariants}>
                    <span className="text-dark-green font-light">{featureItem?.lightText}{" "}</span>
                    <span className="bg-gradient-to-r from-[#9DC766] to-[#1C9666] bg-clip-text text-transparent font-semibold">
                      {featureItem?.gradientText}
                    </span>

                  </motion.h3>
                  <motion.p className="text-black md:text-justify" variants={itemVariants}>
                    {featureItem?.description}
                  </motion.p>
                  <motion.div className="flex flex-wrap gap-4 md:text-justify" variants={itemVariants}>
                    {featureItem?.feature.map((item, itemIndex) => (
                      <motion.div key={itemIndex} className="flex gap-2 items-center md:text-justify" variants={itemVariants}>
                        <HexagonIcon className="fill-mehdi text-mehdi shrink-0" aria-hidden="true" />
                        <span>{item.feature}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </>
      )}
    </motion.div>
  );
};

export default FeatureItem;
