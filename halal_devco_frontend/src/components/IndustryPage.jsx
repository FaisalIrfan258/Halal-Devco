import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";


// Skeleton loader component with hexagonal icons using inline styles
const SkeletonLoader = () => (
  <div className="bg-white py-10 px-6 lg:px-20 flex flex-col lg:flex-row">
    {/* Skeleton for Heading Section */}
    <div className="max-w-lg lg:mr-96 mb-10 lg:mb-0 space-y-8 flex flex-col">
      <div className="h-12 lg:h-16 bg-gray-200 rounded-md w-full"></div>
      <div className="h-12 lg:h-16 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-10 lg:h-14 bg-gray-200 rounded-md w-40"></div>
    </div>

    {/* Skeleton for Industries Section */}
    <div className="xl:max-w-1/2 flex-1 space-y-6 px-6">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="group border-b border-white flex items-start justify-start space-x-14 max-w-full"
        >
          {/* Hexagonal placeholder using inline styles */}
          <div
            style={{
              width: '80px',    // width of the hexagon
              height: '80px',   // height of the hexagon
              backgroundColor: '#e2e8f0', // color of the skeleton (gray)
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            }}
            className="lg:w-20 lg:h-20"
          ></div>
          {/* Placeholder for text */}
          <div className="space-y-4 mb-8">
            <div className="h-6 bg-gray-200 rounded-md w-32"></div>
            <div className="h-4 bg-gray-200 rounded-md w-64"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const IndustryPage = ({ data }) => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // simulate a 2-second load time

    return () => clearTimeout(timer);
  }, []);

  // Render skeleton loader when loading, else render actual content
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="bg-white py-20 px-6 lg:px-20 flex flex-col lg:flex-row">
      {/* Heading Section */}
      <div className="max-w-lg lg:w-2/5 xl:w-2/3 ltr:lg:mr-16 rtl:ml-16 mb-20 lg:mb-0 flex flex-col items-start justify-between space-y-8">
        <h2 className="text-4xl lg:text-6xl font-light lg:leading-[70px] text-dark-green">
          {data?.intro?.lightText1}{" "}
          <span className="font-semibold">{data?.intro?.darkText}</span>{' '}
          <span className="capitalize">{data?.intro?.lightText2} </span>
          <span className="bg-primary-gradient bg-clip-text text-transparent font-semibold">
            {data?.intro?.gradientText}
          </span>
        </h2>
        <Button
          size="lg"
          className="bg-primary-gradient text-lg"
          href="/investment"
        >
          {data?.btnText}
        </Button>
      </div>

      {/* Industries Section */}
      <div className=" flex-1 ltr:space-y-6 rtl:space-y-8 md:px-6">
        {data?.investments?.map((item, index) => (
          <div
            key={item?.id}
            className={`   ${index === 1 && "!border-b  !border-lime-600"
              } group hover:border-lime-600 border-b border-white flex items-start justify-start rtl:gap-x-6 gap-x-6 rtl:md:gap-x-14 md:space-x-14 max-w-full`}
          >
            <img
              src={`https://dev-api.hpdc.sa${item?.image?.url}`}
              alt="Food and Beverages Icon"

              className={` transition-opacity duration-500 ease-in-out opacity-10 group-hover:opacity-100 pb-4 ${index === 1 && "opacity-100 "
                } w-10 md:w-32`}
            />
            <div className="space-y-3 mb-8 ">
              <h3 className="text-xl lg:text-2xl font-bold text-dark-green">
                {item?.title}
              </h3>
              <p className="text-[#7C7C7C] md:text-justify">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryPage;
