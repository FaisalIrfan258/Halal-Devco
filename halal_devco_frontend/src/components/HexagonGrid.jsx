"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocale } from "next-intl";

const HexagonGrid = () => {
  const locale = useLocale();
  const [hexData, setHexData] = useState();
  const [isLastWrapped, setIsLastWrapped] = useState(false);
  const hexRefs = useRef([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/hex-grid?_locale=${locale}`
      );
      const data = response.data;
      setHexData(data?.gridItem);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkPosition = () => {
    if (hexRefs.current.length > 1) {
      const lastHex = hexRefs.current[hexRefs.current.length - 1];
      const firstHex = hexRefs.current[0];
      if (lastHex && firstHex) {
        const lastHexTop = lastHex.getBoundingClientRect().top;
        const firstHexTop = firstHex.getBoundingClientRect().top;
        setIsLastWrapped(lastHexTop > firstHexTop);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [locale]);

  useEffect(() => {
    checkPosition();
    window.addEventListener("resize", checkPosition);
    return () => {
      window.removeEventListener("resize", checkPosition);
    };
  }, [hexData]);

  const colors = [
    "bg-primary-gradient text-white", // Investment support (Green)
    "bg-[#BCC7C1] text-[#22411C]", // Export solutions (Light Gray)
    "bg-[#D0E5BC] text-[#22411C]", // Halal certification (Light Green)
    "bg-[#F7F5B2] text-[#22411C]", // Advisory services (Light Yellow)
    "bg-[#E0DE57] text-white", // Virtual parks/Incubators (Yellow)
    "bg-[#8FC76F] text-white", // Enhancing synergy (Green)
    "bg-[#E0DE57] text-white", // Virtual parks/Incubators (Yellow)
  ];

  return (
    <div className="flex flex-wrap items-center justify-center pl-0 pr-0 md:items-start md:justify-start gap-4 ">
      {hexData?.map((hex, index) => (
        <div
          className="relative w-36 h-36"
          key={hex?.id}
          ref={(el) => (hexRefs.current[index] = el)} // Assign ref for position checking
        >
          <div className="md:absolute top-0">
            <div
              className={`relative lg:w-44 lg:h-44 w-40 h-40 text-center text-sm lg:text-base px-4 ${
                colors[index]
              } clip-hexagon flex items-center justify-center text-center font-semibold lg:p-6 ${
                index === hexData.length - 1 &&
                (isLastWrapped ? "ltr:lg:left-24" : "ltr:lg:left-0")
              } ${
                index === 4 && "ltr:lg:left-24 rtl:lg:right-20"
              } ${index === 5 && "ltr:lg:left-24 rtl:lg:right-20"} ${
                index === 6 && "ltr:xl:left-24 ltr:md:left-0 rtl:lg:right-20"
              } ${
                index === 0 && "rtl:lg:right-0"
              } `}
            >
              {hex?.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HexagonGrid;
