"use client";
import Link from "next/link";
import { careerList, MAX_CAREERS } from "@/constants";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";

const Jobs = ({ otherJobs, data }) => {
  let filteredJobs;
  if (otherJobs) {
    filteredJobs = otherJobs;
  }
  // console.log(filteredJobs)

  return (
    <div className="space-y-20 text-justify">
      <div className="max-w-5xl mx-auto space-y-8">
        {data?.slice(0, MAX_CAREERS).map((career) => (
          <Link
            href={otherJobs ? `./${career?.id}` : `./careers/${career?.id}`}
            key={career.id}
          >
            <div className="pt-14 pb-4 border-b-2 hover:border-b-mehdi flex flex-col md:flex-row gap-6 md:gap-28 transition-colors duration-300 items-start justify-center group w-full">
              <div className="space-y-4 text-start md:w-1/4 ">
                <div className="flex gap-4 text-sm text-[#7C7C7C]">
                  <p>{career?.type}</p>
                  <p>{career?.location}</p>
                </div>
                <p className="font-bold text-lg md:text-xl leading-loose">
                  {career?.salary}
                </p>
              </div>

              <div className="space-y-4 mb-4">
                <h3 className="text-xl lg:text-2xl lg:font-normal">{career?.title}</h3>
                <div className="flex space-x-10 items-center justify-center">
                  <p className="text-base text-[#7C7C7C]">
                    {career?.shortDesc}
                  </p>
                  <Button
                    size="lg"
                    className="border-2 group-hover:bg-primary-gradient group-hover:text-white bg-white text-green border-green transition-colors"
                  >
                    {career?.btnText1}
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
