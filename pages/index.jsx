import Head from "next/head";
import SearchSection from "../components/Home/SearchSection";
import SortingSection from "../components/Home/SortingSection";
import AdList from "../components/Home/AdList";
import CreateAdButton from "../components/General/CreateAdButton";
import withAuth from "../hooks/withAuth";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Shaqa - Real Estate</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Home Page - Shaqa, Real Estate"
          key="Home-Page"
        />
      </Head>

      <SearchSection />
      <SortingSection />
      <div className="container">
        <AdList />
      </div>
      <CreateAdButton />
    </div>
  );
};

export default withAuth(Home);
