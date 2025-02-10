"use client";
import React from "react";
import { useRef } from "react";
// import Link from "next/link";
import { motion, useInView } from "framer-motion";

function IntroText({
  tagLine,
  title1,
  title2,
  darkGreen,
  gradientText1,
  gradientText2,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.3,
  });

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, {
    amount: 0.3,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const alternateItemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
  };

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
          className="text-lg pl-1"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {tagLine}
        </motion.p>

        <motion.h2
          className="text-3xl lg:text-6xl  text-balance text-dark-green font-light flex flex-wrap items-center md:gap-x-4 md:gap-y-3 gap-2 "
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {title1}
          <motion.span
            className="font-semibold inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {darkGreen}
          </motion.span>
          <div className="capitalize">{title2}</div>
          {/* {title2} */}
          <motion.span
            className="bg-primary-gradient bg-clip-text text-transparent font-bold "
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {gradientText1}
          </motion.span>
          <motion.span
            className="bg-primary-gradient bg-clip-text text-transparent font-bold md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {gradientText2}
          </motion.span>
        </motion.h2>
      </motion.div>
    </div>
  );
}

export default IntroText;
