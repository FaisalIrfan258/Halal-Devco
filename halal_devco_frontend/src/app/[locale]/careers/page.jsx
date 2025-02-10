"use client";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import Jobs from "@/components/Jobs";
import axios from "axios";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [JobLoading, setJobLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 20);
      } else {
        selectedData = data.find((item) => item.id === 19);
      }

      setData(selectedData);
      // console.log(jobData)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchJobSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/career-section?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data?.job);
      setJobData(data?.job);
      setJobLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchJobSection();
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
      {jobData && <Jobs data={jobData} />}
      <CallToAction />
    </>
  );
};

export default page;
