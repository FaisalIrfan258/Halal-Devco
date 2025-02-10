"use client";
import Marquee from "./magicui/marquee";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MarqueeSection = () => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMarqueeSection = async () => {
    try {
      const response = await axios.get(
        "https://dev-api.hpdc.sa/marquee-section"
      );
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching marquee section:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarqueeSection();
  }, []);

  const controls = useAnimation(); // Initialize the animation controls
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the component is in view
  });

  // Trigger animations based on scrolling
  useEffect(() => {
    if (inView) {
      controls.start("visible");  // Animate to visible on scroll down
    } else {
      controls.start("hidden");   // Animate to hidden on scroll up
    }
  }, [inView, controls]);

  // Define animation variants for framer-motion
  const marqueeVariants = {
    hidden: { opacity: 0, y: 50 }, // Hidden with downward offset
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }, // Fade in and move up
  };

  return (
    <motion.div
      ref={ref}              // Reference for tracking scroll position
      initial="hidden"       // Initial hidden state
      animate={controls}     // Controls the animation
      variants={marqueeVariants} // Apply animation variants
      className="w-full"
    >
      <Marquee pauseOnHover className="select-none">
        <div className="w-[900px] h-72 grid grid-cols-12 grid-rows-3 gap-2 rounded-xl">
          {images?.img?.map((image, imageIndex) => {
            const imageUrl = `https://dev-api.hpdc.sa${image?.url}`;
            return (
              <div
                key={imageIndex}
                className={`relative col-span-4 ${
                  imageIndex < 2
                    ? "row-span-3"
                    : imageIndex === 2
                    ? "row-span-2"
                    : "row-span-1"
                }`}
              >
                {image?.url && (
                  <img
                    src={imageUrl}
                    className="object-cover object-center w-full h-full"
                    alt={image?.name || `Image ${imageIndex + 1}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Marquee>
    </motion.div>
  );
};

export default MarqueeSection;
