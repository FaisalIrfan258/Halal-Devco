import React, { useState, useEffect } from "react";
import { HALAL_WORLDWIDE_CONTENT } from "@/constants";
import { HexagonIcon } from "lucide-react";


const HalalWorldwidePage = ({ data }) => {
  // State to handle loading
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2 seconds loading time

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-2xl bg-white flex flex-col lg:flex-row items-center lg:items-start py-12 px-6 lg:px-20 ">
        {/* Skeleton Hexagon Section */}
        <div className="flex-shrink-0 mb-8 lg:mb-0 lg:mr-16 relative w-96 h-96">
          <div
            className="bg-gray-200 animate-pulse"
            style={{
              width: "100%",
              height: "100%",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          ></div>
        </div>

        {/* Skeleton Content Section */}
        <div className="max-w-xl ml-64 mt-20">
          {/* Skeleton Heading */}
          <div className="bg-gray-200 h-10 w-3/4 animate-pulse rounded-md mb-4"></div>

          {/* Skeleton Paragraph */}
          <div className="bg-gray-200 h-6 w-2/3 animate-pulse rounded-md mb-4"></div>

          <div className="text-base w-max mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-11 gap-y-8">
            {[...Array(4)].map((_, index) => (
              <div className="flex items-center" key={index}>
                <div className="bg-gray-200 w-4 h-4 mr-3 animate-pulse rounded-full"></div>
                <div className="bg-gray-200 h-4 w-3/4 animate-pulse rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl overflow-x-hidden bg-white flex flex-col lg:flex-row items-center lg:items-center py-12 px-6 lg:px-20">
      {/* Image Section */}
      <div className="mb-8 lg:mb-0 ltr:lg:mr-48 rtl:lg:ml-48">
        <img
          src={`https://dev-api.hpdc.sa${data?.feature?.Image?.url}`}
          alt={"haxagonImage of Globe"}
          className="w-470 h-562 lg:w-470 lg:h-562 object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-xl mt-20 lg:mt-0 text-justify">
        <h2 className="text-4xl lg:text-[42px] font-light leading-snug text-dark-green">
          {data?.feature?.lightText}{" "}
          <span className="bg-primary-gradient bg-clip-text text-transparent font-semibold">
            {data?.feature?.gradientText}
          </span>
        </h2>
        <p className="text-dark-green mt-10">{data?.feature?.description}</p>

        <div className="text-base mt-10 overflow-x-hidden grid grid-cols-1 lg:grid-cols-2 gap-x-11 gap-y-8">
          {data?.feature?.feature.map((point, index) => (
            <div className="flex gap-4 items-start" key={point.id}>
              <HexagonIcon
                className="fill-mehdi text-mehdi flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-dark-green flex-grow">{point?.feature}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HalalWorldwidePage;
