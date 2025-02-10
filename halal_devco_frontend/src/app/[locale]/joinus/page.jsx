"use client";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import Join from "@/components/JoinUs";
import JoinUss from "@/components/JoinUs2";
import Form from "@/components/JoinUsForm";
import axios from "axios";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const Page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [JoinUsData, setJoinUsData] = useState(null);
  const [JoinLoading, setJoinLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 11);
      } else {
        selectedData = data.find((item) => item.id === 10);
      }

      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchJoinSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/joinaspartnerpage?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data?.form);
      setJoinUsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchJoinSection();
  }, [locale]);

  return (
    <section className ="overflow-x-hidden">
      <HeroSection
        darkGreen={data?.darkText}
        lightFont={data?.lightText}
        gradientFont={data?.gradientText}
        paraText={data?.description}
        size={"lg"}
        loading={loading}
      />
      <Join
        heading={JoinUsData?.head?.[0]}
        description={JoinUsData?.decription?.[0]}
      />
      <JoinUss
        heading1={JoinUsData?.heading?.[0]}
        // img1={`https://dev-api.hpdc.sa${JoinUsData?.image1?.[0]?.url}`}
        img2={`https://dev-api.hpdc.sa${JoinUsData?.image2?.[0]?.url}`}
      />
      <Form
        ques={JoinUsData?.question}
        heading2={JoinUsData?.heads?.[0]}
        Data={JoinUsData?.form}
      />
    </section>
  );
};

export default Page;
