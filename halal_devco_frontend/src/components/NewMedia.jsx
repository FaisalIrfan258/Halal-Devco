"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { newsmedia } from "@/constants";
import Image from "next/image";
import axios from "axios";
import { useLocale } from "next-intl";

const NewsMedia = () => {
  const locale = useLocale();
  const ref = useRef(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const alternateItemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setTriggerAnimation(false);
      } else if (!triggerAnimation) {
        setTriggerAnimation(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerAnimation]);

  const [data, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchNewsSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/news-section?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data.news[0].UID);
      setNewsData(data);
      setLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsSection();
  }, [locale]);

  return (
    <section ref={ref} className="space-y-20 overflow-x-hidden">
      <motion.div
        ref={titleRef}
        className="ltr:lg:ml-[26%] ltr:md:ml-[20%] rtl:lg:mr-[26%] rtl::md:mr-[20%] space-y-2"
        initial={{ x: -100, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {data?.intro?.tagline}
        </motion.p>
        <motion.h2
          className="text-3xl lg:text-6xl lg:leading-[70px] text-balance text-dark-green font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {data?.intro?.darkText}{" "}
          <motion.span
            className="font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {data?.intro?.lightText2}
          </motion.span>
          <motion.span
            className="block bg-primary-gradient bg-clip-text text-transparent font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {data?.intro?.gradientText}
          </motion.span>
        </motion.h2>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate={triggerAnimation ? "visible" : "hidden"}
      >
        {data?.news?.map((item, index) =>
          // console.log(item)
            (
              <motion.div
                key={item.id}
                variants={index % 2 === 0 ? itemVariants : alternateItemVariants}
              >
                <Link
                  href={`./Newsfeed/${item?.UID}`}
                  className="pt-6 pb-8 border-b-2 hover:border-b-mehdi flex flex-col md:flex-row gap-16 transition-colors duration-300 items-center text-justify"
                >
                  <div className="flex-shrink-0">
                    <div className="w-[300px] h-[200px] relative shadow-lg">
                      <img
                        src={`https://dev-api.hpdc.sa${item?.image?.url}`}
                        alt={`News Image ${index + 1}`}
                        layout="fill"
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-8 flex-grow">
                    <h3 className="text-xl lg:text-2xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-base lg:text-lg">{item?.description}</p>
                    <div className="text-gray-400">
                      {new Date(item?.publishDate).toLocaleDateString("default", {
                        dateStyle: "long",
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
};

export default NewsMedia;
