"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MarqueeSection from "./MarqueeSection";

const HalalExpansionSection = ({ data }) => {
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


  return (
    <>
      <div className="bg-[#f4faf4] text-black flex-1 relative h-auto rounded-2xl ">
        <motion.div
          ref={titleRef}
          className="space-y-2 mb-0 p-10 max-w-6xl"
          initial={{ x: -100, opacity: 0 }}
          animate={titleInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-lg text-dark-green"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {data?.sectionIntro?.tagline}
          </motion.p>
          <motion.h2
            className="text-4xl lg:text-6xl text-dark-green font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {data?.sectionIntro?.lightText1}{" "}
            <motion.span
              className="text-dark-green font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {data?.sectionIntro?.darkText}
            </motion.span>{" "}
            {data?.sectionIntro?.lightText2}{" "}
            <motion.span
              className="bg-primary-gradient bg-clip-text text-transparent font-semibold "
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {data?.sectionIntro?.gradientText}
            </motion.span>
          </motion.h2>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 pb-10 md:px-4 xl:px-8 "
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {data?.subDivs?.map((content) => (
            <motion.div
              key={content?.id}
              className="max-w-[426px] h-auto md:h-[348px] bg-primary-gradient rounded-2xl relative group flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#f4faf4] w-full h-full p-6 gap-6 group-hover:bg-transparent transition-all flex flex-col  justify-between">
                <div className="space-y-8">
                  <h3 className="text-[#22411C] group-hover:text-white font-bold text-2xl">
                    {content?.title}
                  </h3>
                  <p className="md:text-justify text-gray-600 leading-relaxed group-hover:text-white text-lg">
                    {content?.description}
                  </p>
                </div>

                <div className="">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E0DE57] to-[#9DC766] rounded-full"></div>
                </div>
              </div>
              <img
                src={`https://dev-api.hpdc.sa${content?.image?.url}`}
                className="absolute ltr:right-0 rtl:left-0 bottom-0 w-[110px] group-hover:w-[220px] transition-all"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full bg-transparent">
          <MarqueeSection />
        </div>
      </div>
    </>
  );
};

export default HalalExpansionSection;
