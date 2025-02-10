"use client";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import NewMedia from "@/components/NewMedia";
import axios from "axios";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const NewsFeedPage = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 16);
      } else {
        selectedData = data.find((item) => item.id === 9);
      }

      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
  }, [locale]);

  return (
    <>
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={"lg"}
        loading={loading}
      />
      <NewMedia />
      <CallToAction />
    </>
  );
};

export default NewsFeedPage;
