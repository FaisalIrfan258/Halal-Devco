"use client";
import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import React, { useEffect, useState } from "react";
import HalalSupplyChain from "../../../components/HalalSupplyChain";
import HalalExpansionSection from "@/components/HalalExpension";
import CallToAction from "@/components/CallToAction";
import axios from "axios";
import { useLocale } from "next-intl";

const page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pageData, setPageData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 13);
      } else {
        selectedData = data.find((item) => item.id === 1);
      }

      // console.log(selectedData)
      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchInvestmentPage = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/investment-page?_locale=${locale}`
      ); // Replace with your API URL
      const data = response.data;
      // console.log(data)
      setPageData(data);
      setLoadingPage(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchInvestmentPage();
  }, [locale]);

  return (
    <div className="space-y-14 overflow-hidden">
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={"xs"}
        loading={loading}
      />
      <HalalSupplyChain data={pageData} />
      <HalalExpansionSection data={pageData} />
      <NewsFeed />
      <CallToAction />
    </div>
  );
};

export default page;
