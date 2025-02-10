"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useLocale } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  // console.log(locale);

  const ref = useRef(null);
  const videoRef = useRef(null);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch hero section data
  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/hero-section?_locale=${locale}`
      );
      setHeroData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHeroSection();

    if (!loading && ref.current && videoRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current, // Target the hero section
          start: "top 50px", // Start when the top of the section hits the top of the viewport
          end: "0%", // Unpin after 200% of the section height (adjust as needed)
          pin: true, // Pin the section during scroll
          scrub: 2, // Smoothly link the scroll progress to the animation
          markers: false, // Set to true for debugging, shows start/end markers
        },
      });

      tl.fromTo(
        videoRef.current,
        { clipPath: "inset(100% 0 0 0)" }, // Initially fully masked (hidden)
        { clipPath: "inset(0% 0 0 0)", ease: "none" } // Fully reveal the video
      );
    }

    // Cleanup GSAP scroll triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loading, locale]);

  return (
    <div ref={ref} className="overflow-hidden flex items-center justify-center z-10 !h-full !w-full">
      <section
        className={`sticky top-0 px-8 py-28 border rounded-3xl !w-full
          ${
            loading
              ? "animate-pulse bg-gradient-to-r to-gray-200 via-gray-300 from-gray-400"
              : "bg-gradient-to-br from-green/30 to-green/10"
          }`}
      >
        <div className="space-y-8 z-0 !w-full">
          {!loading && (
            <>
              <h1 className="text-4xl lg:text-6xl lg:leading-[70.46px] font-light">
                {heroData?.Name}
                <span className="block bg-primary-gradient bg-clip-text text-transparent font-semibold">
                  {heroData?.gradient}
                </span>
              </h1>
              <p className="md:text-justify lg:text-xl max-w-xl">
                {heroData?.description}
              </p>
              <Button
                // size="lg"
                className="bg-primary-gradient md:text-xl text-semibold text-black w-full md:w-auto text-md"
                href={"/investment"}
              >
                {heroData?.buttonText}
              </Button>
            </>
          )}
        </div>

        {/* Masked Video Section */}
        <div
          ref={videoRef}
          className=" absolute top-0 left-0 !w-full h-full overflow-hidden flex justify-center items-center user-select-none pointer-events-none bg-stone-900 rounded-3xl"
          style={{
            clipPath: `inset(100% 0 0 0)`, // Start fully masked
          }}
        >
          {!loading && (
            <>
              <img
                src="/logo.svg"
                alt="Halal DevCo. logo"
                width={180}
                height={37}
                className="absolute top-8 left-8 select-none"
              />
              <video
                src={`https://dev-api.hpdc.sa${heroData?.Video?.[0]?.url}`}
                className="w-full h-full object-cover object-center "
                autoPlay
                loop
                muted
                preload="none"
              ></video>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
