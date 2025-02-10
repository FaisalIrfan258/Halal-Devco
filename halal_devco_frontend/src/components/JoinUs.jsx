"use client";
import React from "react";
import { motion, useInView } from "framer-motion";

const IntroText = ({
  tagLine,
  title1,
  title2,
  darkGreen,
  gradientText1,
  gradientText2,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  const titleRef = React.useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  return (
    <div className="text-black flex-1">
      <motion.div
        ref={titleRef}
        className="space-y-2"
        initial={{ x: -100, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {tagLine}
        </motion.p>

        <h2 className="text-4xl lg:text-6xl lg:leading-[70px] font-light text-dark-green">
          {darkGreen && <span className="font-semibold">{darkGreen}</span>}{" "}
          {title2 && <span>{title2} </span>}
          {""}
          {gradientText1 && (
            <span className="text-[#39a166] font-semibold">
              {gradientText1}
            </span>
          )}
          {gradientText2 && (
            <span className="bg-primary-gradient bg-clip-text text-transparent font-bold ">
              {gradientText2}
            </span>
          )}
        </h2>
      </motion.div>
    </div>
  );
};

const Join = ({ heading, description }) => {
  return (
    <div className="ltr:pl-10 rtl:pr-10 ltr:md:pl-36 rtl:md:pr-36 md:py-12 space-y-6">
      <div className="translate-y-4 max-w-6xl">
        <IntroText
          tagLine={heading?.tagline}
          title2={heading?.lightText2}
          darkGreen={heading?.darkText}
          gradientText2={heading?.gradientText}
        />
      </div>
      <div>
        <p className="text-justify max-w-2xl text-[#252525]  mt-28 ltr:border-l-4 ltr:border-l-[#1C9666] rtl:border-r-4 rtl:border-r-[#1C9666] px-4 ltr:md:ml-28 rtl:md:mr-28 ltr:ml-8 rtl:mr-8">
          {description?.descriptions}
        </p>
      </div>
    </div>
  );
};

export default Join;
