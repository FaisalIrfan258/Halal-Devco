"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import { useParams } from "next/navigation";
import { newsmedia } from "@/constants";
import NewsFeed from "@/components/NewsFeed";
import Image from "next/image";
import CallToAction from "@/components/CallToAction";
import axios from "axios";
import { useLocale } from "next-intl";

const NewsDetailPage = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [data, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  // console.log('paramID', id)
  const fetchNewsSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/news-section?_locale=${locale}`
      );
      const data = response.data;
      // console.log('UID', data.news[2]?.UID);
      setNewsData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsSection();
  }, [locale]);

  const newsItem = data?.news?.find((item) => parseInt(item.UID) === parseInt(id));
  // console.log(newsItem)
  // console.log(newsItem)

  if (!newsItem) {
    return <div>News item not found</div>;
  }

  return (
    <>
      <HeroSection
        darkGreen={newsItem?.title}
        // lightFont={newsItem?.title}
        // gradientFont={newsItem?.title}
        paraText={newsItem?.description}
        size={'xl'}
      />
      <div className="max-w-6xl mx-auto p-6 text-start">
        {/* Top Image */}
        <div className="w-full h-[50%]">
          <img
            src={`https://dev-api.hpdc.sa${newsItem?.image?.url}`}
            alt={newsItem?.title}
            className="object-contain rounded-lg w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div className="relative bg-gradient-to-r from-green-100 via-yellow-50 to-transparent rounded-lg mt-14">
          <h2 className="text-s font-semibold text-[#252525] mb-8">
            {newsItem?.longTitle}
          </h2>
          <p className="text-sm text-gray-500 text-justify">
            {newsItem?.longDesc}
          </p>
        </div>

        <div className="flex gap-x-6 bg-gray-100 rounded-lg p-8 mt-6 max-w-[900px]">
          <div className="w-3 bg-[#1C9666] gap-x-9"></div>
          <div className="space-y-5">
            {newsItem?.strategy?.map((point, index) => (
              <p key={index} className="text-green-700 mt-2 text-justify">
                {point.strategy}
              </p>
            ))}
          </div>
        </div>

        {/* Additional Text Content */}
        <div className="mt-12">
          {newsItem?.agreement?.map((detail, index) => (
            <p key={index} className="text-gray-700 mt-4 text-justify">
              {detail.agreement}
            </p>
          ))}
        </div>
      </div>
      <NewsFeed />
      <CallToAction />
    </>
  );
};

export default NewsDetailPage;
