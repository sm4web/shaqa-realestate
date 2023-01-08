import React from "react";

const convertPriceToCurrency = (price) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
  }).format(price);
};

export default convertPriceToCurrency;
