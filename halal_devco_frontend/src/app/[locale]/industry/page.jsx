"use client";

import HeroSection from "@/components/HeroSection";
import NewsFeed from "@/components/NewsFeed";
import IndustryPage from "@/components/IndustryPage";
import React, { useEffect, useState } from "react";
import HalalWorldwidePage from "@/components/HalalWorldwidePage";
import { halalIndustyInvestments } from "@/constants";
import CallToAction from "@/components/CallToAction";
import axios from "axios";
import { useLocale } from "next-intl";

const page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [industryPage, setIndustryPage] = useState(null);
  const [industryloading, setIndustryLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(`https://dev-api.hpdc.sa/headers?_locale=${locale}`); 
      const data = response.data;

      let selectedData;
      if (locale === 'ar'){
        selectedData = data.find((item) => item.id === 12);
      } else{
        selectedData = data.find((item) => item.id === 6)
      }
      
      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIndustryPage = async () => {
    try {
      const response = await axios.get(`https://dev-api.hpdc.sa/industry-page?_locale=${locale}`); 
      const data = response.data;
      // console.log(data)
      setIndustryPage(data);
      setIndustryLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchIndustryPage();
  }, [locale]);

  return (
    <>
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={'md'}
        loading = {loading}
      />
      <IndustryPage
        data={industryPage}
      />

      <HalalWorldwidePage data={industryPage} />
      <NewsFeed />
      <CallToAction />
    </>
  );
};

export default page;
