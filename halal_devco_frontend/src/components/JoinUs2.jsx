"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import HexagonGrid from "./HexagonGrid";

const IntroText = ({ tagLine, title1, title2, darkGreen, gradientText1 }) => {
  const titleRef = React.useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  return (
    <div className="text-black w-full">
      <motion.div
        ref={titleRef}
        className="space-y-2 w-full"
        initial={{ x: -100, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {tagLine}
        </motion.p>

        <motion.h2
          className="text-4xl lg:text-6xl lg:leading-[70px] font-light text-dark-green"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {darkGreen && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-semibold"
            >
              {darkGreen}
            </motion.span>
          )}{" "}
          {title2 && <span>{title2} </span>}
          {""}
          {gradientText1 && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-primary-gradient bg-clip-text text-transparent font-bold "
            >
              {gradientText1}
            </motion.span>
          )}
        </motion.h2>
      </motion.div>
    </div>
  );
};

const JoinUss = ({ heading1, img2 }) => {
  // console.log(heading1)
  return (
    <div className="py-8">
      <div className="translate-y-3 max-w-6xl">
        <IntroText
          tagLine={heading1?.tagline}
          darkGreen={heading1?.darkText}
          title2={heading1?.lightText2}
          gradientText1={heading1?.gradientText}
        />
      </div>
      <div className="relative h-full w-full flex justify-between items-center mt-20 md:h-[550px]">
        <div className="max-w-3xl h-full md:absolute ltr:left-0 rtl:right-0 lg:relative">
          <HexagonGrid />
        </div>
        <div className="max-w-lg absolute ltr:right-0 rtl:left-0 lg:relative -z-10 rtl:scale-x-[-1]">
          <img src={img2} alt="Image 2 Description" />
        </div>
      </div>
    </div>
  );
};

export default JoinUss;
