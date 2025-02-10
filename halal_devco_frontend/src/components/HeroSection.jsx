import React from "react";

const HeroSection = ({
  darkGreen,
  lightFont,
  linear_gradient,
  gradientFont,
  paraText,
  size,
  loading
}) => {
  return (
    <div className="relative ">
      <section className={`px-8 lg:px-16 py-28 rounded-3xl overflow-hidden z-10 ${loading ? "animate-pulse bg-gradient-to-r to-gray-200 via-gray-300 from-gray-400" : "bg-gradient-to-br from-green/30 to-green/10"}`}>
        <div
          className={`${size === "xs" && "max-w-[600px] text-justify"} ${size === "sm" && "max-w-2xl text-justify"} ${
            size === "md" && "max-w-3xl "
          } ${size === "lg" && "max-w-4xl"} ${
            size === "xl" && "max-w-5xl"
          } space-y-8 `}
        >
          <h1 className="text-4xl lg:text-6xl lg:leading-[70.46px] font-light text-dark-green">
            {darkGreen && <span className="font-semibold">{darkGreen}</span>}{" "}
            {lightFont && <span>{lightFont} </span>}
            {""}
            {linear_gradient && <span className="text-[#39a166] font-semibold">
              {linear_gradient}
            </span>}
            {gradientFont && <span className="bg-primary-gradient bg-clip-text text-transparent font-bold ">
              {gradientFont}
            </span>}
          </h1>
          <p className={`lg:text-xl text-justify ${size === "sm" ? "max-w-xl": 'max-w-2xl'}`}>{paraText}</p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
