"use client";
import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import Jobs from "@/components/Jobs";
import { Button } from "@/components/ui/button";
import { careerList } from "@/constants";
import axios from "axios";
import { HexagonIcon } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const locale = useLocale();
  const [jobData, setJobData] = useState(null);
  const [JobLoading, setJobLoading] = useState(true);

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
    fetchJobSection();
  }, [locale]);

  const { id } = useParams();
  const career = jobData?.find((job) => job.id === parseInt(id));
  const otherJobs = jobData?.filter((job) => job.id !== parseInt(id));

  return (
    <>
      <HeroSection darkGreen={career?.title} paraText={career?.shortDesc} />
      <div className="container mx-auto p-6 text-justify">
        <div className="flex flex-col items-start justify-center lg:flex-row gap-10">
          <div className="md:w-1/2 p-6 py-12 text-white bg-primary-gradient rounded-2xl space-y-4">
            <div className="flex justify-start items-center gap-6 text-lg ">
              <p>{career?.type}</p>
              <p>{career?.location}</p>
            </div>
            <div className="text-2xl font-semibold">{career?.salary}</div>
          </div>
          <div className="w-auto space-y-10">
            <div className="flex flex-col justify-center items-start gap-4 ">
              <h3 className="text-3xl font-bold mb-2">{career?.jobDesc}</h3>
              {career?.jobDescPara?.map((para) => (
                <p key={para?.id}>{para?.descriptions}</p>
              ))}
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
              <h3 className="text-3xl font-bold mb-4">
                {career?.responsibility}
              </h3>
              {career?.responsib?.map((res) => (
                <div className="flex items-center justify-center gap-4" key={res?.id}>
                  <div className="w-6">
                    <HexagonIcon
                      className="fill-mehdi text-mehdi"
                      aria-hidden="true"
                    />
                  </div>
                  <p>{res?.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start justify-center gap-4 ">
              <h3 className="text-3xl font-bold mb-4">{career?.qualifii}</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-3 place-items-start ">
                {career?.qualification?.map((quality) => (
                  <div className="flex items-center justify-center gap-4" key={quality?.id}>
                    <HexagonIcon
                      className="fill-mehdi text-mehdi "
                      aria-hidden="true"
                    />
                    <p>{quality?.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              size="lg"
              className="border-2 hover:bg-primary-gradient hover:text-white bg-white text-green border-green transition-colors my-20"
              href="../contact"
            >
              {career?.btnText2}
            </Button>
          </div>
        </div>
        {/* Other Jobs */}
        <Jobs otherJobs={otherJobs} />
      </div>
      <CallToAction />
    </>
  );
};

export default page;
