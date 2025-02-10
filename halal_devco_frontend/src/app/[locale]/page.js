import Image from "next/image";
import Link from "next/link";

import CallToAction from "@/components/CallToAction";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";
import HalalIndustries from "@/components/HalalIndustries";
import MarqueeSection from "@/components/MarqueeSection";

import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import { MenuIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
// import { getTranslations } from "next-intl/server";  We use getTranslation when the function in aync and we have to wait for the data from the server, getTranslation is not client side

export default function Home() {
  // server request async stuff
  //  const t =  useTranslations("Homepage")

  return (
    <main className="space-y-16">
      {/* <h1>{t("title")}</h1>
          <p>{t("content")}</p> */}
      <div className="!w-full">
        <Hero />
      </div>
      <MarqueeSection />
      <FeatureSection />
      <HalalIndustries />
      <NewsFeed />
      <CallToAction />
    </main>
  );
}
