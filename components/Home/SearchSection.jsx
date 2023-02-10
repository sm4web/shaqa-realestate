import { Field, Form, Formik, useField } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SearchIcon from "../../assets/icons/search-field-icon.png";
import PriceSlider from "../General/PriceSlider";

const TextField = ({ icon, placeholder, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="relative flex items-center w-full mr-2">
      <input
        className="w-full pl-[48px] h-full outline-none text-lg font-semibold"
        placeholder={placeholder}
        {...field}
        {...props}
      />
      <Image
        className="absolute left-0"
        src={icon}
        height={32}
        alt="search icon"
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
      <TextField
        placeholder={"Search keywords..."}
        icon={SearchIcon}
        name="term"
      />
      <button
        className="mainBTN w-full md:w-[250px] z-10 animate hover:fade rounded-md md:rounded-full"
        type="submit"
      >
        Search
      </button>
    </div>
  );
};

const FilterationArea = ({
  roomsCount,
  apartmentType,
  setRoomsCount,
  setApartmentType,
  priceRange,
  setPriceRange,
}) => {
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
            value={apartmentType}
            onChange={(e) => setApartmentType(e.target.value)}
            id="apartment-type"
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm h-[50px] rounded-lg focus:ring-main focus:border-main block w-full p-2.5 border-none shadow-xl placeholder-gray-400"
          >
            <option value={"0"}>Choose a type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
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
            defaultValue={0}
            value={roomsCount}
            onChange={(e) => {
              setRoomsCount(e.target.value);
            }}
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm h-[50px] rounded-lg focus:ring-main focus:border-main block w-full p-2.5 border-none shadow-xl placeholder-gray-400"
          >
            <option value={0}>Choose room number</option>
            {[1, 2, 3].map((roomCount) => (
              <option value={roomCount}>{roomCount}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2 md:col-span-1">
          <PriceSlider value={priceRange} setValue={setPriceRange} />
        </div>
      </div>
    </div>
  );
};

const SearchSection = () => {
  const [apartmentType, setApartmentType] = useState("apartment");
  const [roomsCount, setRoomsCount] = useState(0);
  const [priceRange, setPriceRange] = useState(0);
  const router = useRouter();
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
            router.push({
              query: {
                term: values.term,
                roomsCount,
                apartmentType,
                priceRange,
              },
            });
          }}
        >
          {() => (
            <Form>
              <SearchBar />
              <FilterationArea
                roomsCount={roomsCount}
                apartmentType={apartmentType}
                setRoomsCount={setRoomsCount}
                setApartmentType={setApartmentType}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SearchSection;
