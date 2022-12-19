import React from "react";
import About from "../../components/Landing/About";
import Hero from "../../components/Landing/Hero";

const Landing = () => {
  return (
    <div className="min-h-screen w-full mt-6">
      <Hero />
      <About />
    </div>
  );
};

export default Landing;
