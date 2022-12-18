import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search-field-icon.png";
import LocationIcon from "../../assets/icons/location-icon.png";
import PriceSlider from "../General/PriceSlider";

const TextField = ({ icon, placeholder }) => {
  const [term, setTerm] = useState("");
  return (
    <div className="relative flex items-center min-w-full md:min-w-[30%]">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full pl-[32px] h-full outline-none text-lg font-semibold"
        placeholder={placeholder}
      />
      <Image
        className="absolute left-0"
        src={icon}
        height={24}
        alt="search icon"
      />
      <Image
        className="absolute right-0"
        src={require("../../assets/icons/clearIcon.png")}
        height={24}
        alt="clear icon"
        onClick={() => setTerm("")}
      />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div
      className="w-[85%] flex flex-col md:flex-row items-start md:items-center
      justify-between gap-6 md:gap-0
      rounded-md md:rounded-full shadow-xl mt-[50px] p-4 md:py-4 md:px-12 h-fit md:h-[100px] m-auto bg-white"
    >
      <TextField placeholder={"Search apartment..."} icon={SearchIcon} />{" "}
      <div className="hidden md:block h-[90%] w-[2px] mx-[60px] bg-main"></div>
      <TextField placeholder={"Choose Location..."} icon={LocationIcon} />
      <button
        className="mainBTN w-full md:w-[250px] z-10 animate hover:fade rounded-md md:rounded-full"
        type="submit"
      >
        Search
      </button>
    </div>
  );
};

const FilterationArea = () => {
  return (
    <div className="mt-[40px] w-full max-w-[85%] m-auto ">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center gap-[12px] md:gap-[24px]">
        <div className="z-10">
          <label
            htmlFor="apartment-type"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Select property type
          </label>
          <select
            defaultValue={"0"}
            id="apartment-type"
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm h-[50px] rounded-lg focus:ring-main focus:border-main block w-full p-2.5 border-none shadow-xl placeholder-gray-400"
          >
            <option value={"0"}>Choose a type</option>
            <option value="APT">Apartment</option>
            <option value="VILLA">Villa</option>
          </select>
        </div>

        <div className="z-10">
          <label
            htmlFor="apartment-type"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Select an option
          </label>
          <select
            id="apartment-type"
            defaultValue={"0"}
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm h-[50px] rounded-lg focus:ring-main focus:border-main block w-full p-2.5 border-none shadow-xl placeholder-gray-400"
          >
            <option value={"0"}>Choose room number</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <PriceSlider />
        </div>
      </div>
    </div>
  );
};

const SearchSection = () => {
  return (
    <section className="min-h-[240px] md:min-h-[370px] bg-lightmain relative p-4">
      <Image
        src={require("../../assets/images/search-background.png")}
        className={"absolute -z-0 w-full h-full top-0 left-0 object-cover"}
        alt={"search for apartments - shaqa"}
      />
      <div className="z-10">
        <Formik
          initialValues={{ term: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          {() => (
            <Form className="">
              <SearchBar />
              <FilterationArea />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SearchSection;
