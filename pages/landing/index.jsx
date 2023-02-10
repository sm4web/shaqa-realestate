import Head from "next/head";
import React from "react";
import AdList from "../../components/Home/AdList";
import About from "../../components/Landing/About";
import Hero from "../../components/Landing/Hero";
import HowItWork from "../../components/Landing/HowItWork";
import { getAdsData } from "../api/fetch-ads";

const Landing = ({ data }) => {
  return (
    <div className="min-h-screen w-full mt-6">
      <Head>
        <title>Shaqa - Real Estate</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Home Page - Shaqa, Real Estate"
          key="Landing-Page"
        />
      </Head>
      <Hero />
      <About />
      <div className="container mt-[120px] lg:mt-[200px]">
        <h1 className="font-bold text-[32px] lg:text-[54px] xl:text-[60px]">
          Our Most <br />
          <span className="text-main">Popular Properties</span>
        </h1>
        <AdList data={data} />
      </div>
      <HowItWork />
      <div className="container mt-[120px] lg:mt-[200px]">
        <h1 className="font-bold text-[32px] lg:text-[54px] xl:text-[60px]">
          Recent Added <br />
          <span className="text-main">New Properties</span>
        </h1>
        <AdList data={data} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await getAdsData();
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Landing;
