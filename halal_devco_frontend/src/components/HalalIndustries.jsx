"use client";

import { Button } from "./ui/button";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { halalIndustries} from "@/constants";
import axios from "axios";
import { useLocale } from "next-intl";

const HalalIndustries = () => {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const sectionRef = useRef(null);

  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start -20px", "end end"],
  });

  useEffect(() => {
    return scrollY.on("change", (currentScrollY) => {
      setScrollDirection(currentScrollY > prevScrollY ? "down" : "up");
      setPrevScrollY(currentScrollY);
    });
  }, [prevScrollY, scrollY]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start -20px", "end end"],
  });

  scrollYProgress.on("change", (latest) => {
    const newIndex = Math.min(
      Math.floor(latest * (halalIndustries.industries.length + 1)),
      halalIndustries.industries.length - 1
    );
    setActiveIndex(newIndex);
  });

  const transitionDuration = scrollDirection === "down" ? 1.2 : 1.2;

  const [data, setPurposeData] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Fetch hero section data
  const fetchPurposeSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/purpose-section?_locale=${locale}`
      );
      const data = response.data;
      setPurposeData(data);
      setLoading(false); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurposeSection();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      id="halal-industries-section"
      className={`space-y-14  px-6 md:px-14 py-10 md:py-20 rounded-3xl bg-secondary-gradient ${loading && 'animate-pulse bg-gradient-to-r to-gray-200 via-gray-300 from-gray-400 '}`} 
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="space-y-2">
        <p className="text-lg md:text-justify">{data?.purposeInto.tagline}</p>
        <h2 className="text-3xl lg:text-6xl text-balance text-dark-green font-semibold">
          {data?.purposeInto.darkText}{" "}
          <span className="font-light">{data?.purposeInto.lightText2}</span>
          <span className="block bg-primary-gradient bg-clip-text text-transparent font-semibold">
            {data?.purposeInto.gradientText}
          </span>
        </h2>
      </div>

      <div className="relative md:text-justify">
        <AnimatePresence>
          {data?.purposeCategory.slice(0, 3).map((industry, index) => (
            <motion.div
              key={industry?.id}
              className="rounded-2xl overflow-hidden relative static-box" 
              initial={{ opacity: 1, height: 350, marginBottom: 32 }}
              animate={{
                scale: activeIndex > index ? 0 : 1,
                height: activeIndex > index ? 0 : 350,
                marginBottom: activeIndex > index ? 0 : 32,
              }}
              exit={{ scale: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: transitionDuration, ease: "easeInOut" }}
            >
              <div className="w-full h-full overflow-hidden ">
                <img
                  src={`https://dev-api.hpdc.sa${industry?.image?.url}`}
                  alt={industry?.title}
                  className="object-cover object-center w-full h-full"
                />
                <div className="w-full absolute inset-0 bg-primary-gradient opacity-50" />
                <div className="max-w-5xl p-4 md:p-6 absolute bottom-3  space-y-6 text-white">
                  <h3 className="text-xl lg:text-4xl font-semibold">
                    {industry?.title}
                  </h3>
                  <p className="text-sm lg:text-lg ">{industry?.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 text-justify">
        <p>{data?.description}</p>
        <Button className="bg-primary-gradient" href="/industry">
          {data?.btnText}
        </Button>
      </div>
    </section>
  );
};

export default HalalIndustries;