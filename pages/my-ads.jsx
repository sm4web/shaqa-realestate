import Head from "next/head";
import React from "react";
import AdList from "../components/Home/AdList";
import withAuth from "../hooks/withAuth";
import { getAdsData } from "./api/fetch-ads";

const MyAds = ({ data }) => {
  return (
    <div className="container py-4">
      <Head>
        <title>Shaqa - My Ads</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="My Ads Page - Shaqa, Real Estate"
          key="MyAd-Page"
        />
      </Head>
      <h1 className="font-bold text-3xl text-secondary mt-12">
        My Advertisements 🥰
      </h1>
      <AdList data={data} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const data = await getAdsData(context.query.uid);
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default withAuth(MyAds);
