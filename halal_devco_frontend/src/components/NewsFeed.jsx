"use client"; // Ensure the component is client-side

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { useLocale } from "next-intl";

const NewsFeed = () => {
  const locale = useLocale();
  const ref = useRef(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(""); // State for the locale
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
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
      if (window.scrollY > 100) {
        setTriggerAnimation(true);
      } else {
        setTriggerAnimation(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const locale = window.location.pathname.split("/")[1];
      setCurrentLocale(locale);
    }
  }, [locale]);

  const [data, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchNewsSection = async () => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/news-section?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data.news[0].UID); // Log the fetched data
      setNewsData(data);
    } catch (error) {
      console.error("Error fetching news:", error); // Log any errors
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  useEffect(() => {
    fetchNewsSection();
  }, []);

  return (
    <section ref={ref} className="space-y-20 overflow-x-hidden text-justify">
      <motion.div
        ref={titleRef}
        className="ltr:lg:ml-[26%] ltr:md:ml-[20%] rtl:lg:mr-[26%] rtl:md:mr-[20%] space-y-2 "
        initial={{ x: -100, opacity: 0 }}
        animate={titleInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg capitalize "
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {data?.intro?.tagline}
        </motion.p>
        <motion.h2
          className="text-3xl lg:text-6xl lg:leading-[80px] text-balance text-dark-green font-semibold"
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
            className="block bg-primary-gradient bg-clip-text text-transparent font-semibold capitalize"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {data?.intro?.gradientText}
          </motion.span>
        </motion.h2>
      </motion.div>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="max-w-5xl mx-auto space-y-8">
          {[...Array(3)].map((_, index) => ( // Change from 5 to 3 skeleton loaders
            <div key={index} className="flex gap-4 items-center border-b-2 pb-4">
              <div className="w-[300px] h-[200px] bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="flex-grow space-y-2">
                <div className="h-6 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="max-w-5xl mx-auto space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={triggerAnimation ? "visible" : "hidden"}
        >
          {data?.news?.slice(0, 3).map((item, index) => ( // Change from 5 to 3 displayed news items
            <motion.div
              key={item.id}
              variants={index % 2 === 0 ? itemVariants : alternateItemVariants}
            >

              <Link
                href={`/${currentLocale}/Newsfeed/${item?.UID}`}
                className="pt-6 pb-8 border-b-2 hover:border-b-mehdi flex flex-col md:flex-row gap-16 transition-colors duration-300 items-center"
              >
                <div className="flex-shrink-0">
                  <div className="w-[300px] h-[200px] relative shadow-lg">
                    <img
                      src={`https://dev-api.hpdc.sa${item?.image?.url}`}
                      alt={`News Image ${index + 1}`}
                      className="object-cover rounded-lg w-full h-full"
                    />
                  </div>
                </div>
                <div className="space-y-8 flex-grow">
                  <h3 className="text-xl lg:text-2xl font-normal lg:leading-[31.2px]">
                    {item.title}
                  </h3>
                  <p className="text-base lg:text-lg lg:leading-[19.32px] ">{item?.description}</p>
                  <div className="text-gray-400">
                    {" "}
                    {new Date(item.publishDate).toLocaleDateString("default", {
                      dateStyle: "long",
                    })}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default NewsFeed;
