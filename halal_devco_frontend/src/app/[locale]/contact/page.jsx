"use client";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { contactDetails } from "@/constants";
import axios from "axios";
import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";

const page = () => {
  const locale = useLocale();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);

  const fetchHeroSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/headers?_locale=${locale}`
      );
      const data = response.data;

      let selectedData;
      if (locale === "ar") {
        selectedData = data.find((item) => item.id === 18);
      } else {
        selectedData = data.find((item) => item.id === 17);
      }

      setData(selectedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchContactSection = async () => {
    try {
      const response = await axios.get(
        `https://dev-api.hpdc.sa/contact-info?_locale=${locale}`
      );
      const data = response.data;
      // console.log(data?.form)
      setContactData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHeroSection();
    fetchContactSection();
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
      <div className="flex flex-wrap justify-center ite p-4 gap-8">
        {contactData?.contact?.map((item, index) => (
          <div
            className={`${
              index === 0
                ? `bg-primary-gradient text-white`
                : `hover:bg-primary-gradient hover:text-white bg-white shadow-md`
            } rounded-2xl flex w-72 items-center justify-start gap-6 p-5 pr-8 `}
            key={item?.id}
          >
            <img
              src={`https://dev-api.hpdc.sa${item?.image?.url}`}
              alt={item?.title}
              className=""
            />
            <div className="space-y-3">
              <p className="text-xl font-semibold ">{item?.title}</p>
              <p className="font-light text-black group-hover:text-white">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ContactForm data={contactData?.form} />
    </>
  );
};

export default page;
