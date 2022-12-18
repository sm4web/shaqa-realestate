import Head from "next/head";
import React from "react";
import AdList from "../components/Home/AdList";
import withAuth from "../hooks/withAuth";

const Favorites = () => {
  return (
    <div className="container py-4">
      <Head>
        <title>Shaqa - Favorites</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Favorites Page - Shaqa, Real Estate"
          key="Fav-Page"
        />
      </Head>
      <h1 className="font-bold text-3xl text-secondary mt-12">
        Favorite Properties 🥰
      </h1>
      <AdList />
    </div>
  );
};

export default withAuth(Favorites);
