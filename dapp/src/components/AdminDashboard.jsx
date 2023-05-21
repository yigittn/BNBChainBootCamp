import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import { addHouse } from "../Web3Client";
const web3 = new Web3();

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState("");

  const convertDecimalToInteger = (decimal, decimalPlaces) => {
    const decimalString = decimal.toString();
    const decimalFactor = new BigNumber(10).exponentiatedBy(decimalPlaces);
    const integer = new BigNumber(decimalString).multipliedBy(decimalFactor);
    return integer.toFixed();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rentInWei = convertDecimalToInteger(rent, 18);
    const saleInWei = convertDecimalToInteger(sale, 18);

    let result = await addHouse(name, url, rentInWei, saleInWei);
    if (result) {
      console.log("House added successfully");
    }
    console.log(result);
  };

  return (
    <div className="bg-gradient-to-r from-slate-700 via-pink-900 to-black">
      <form className="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input
            type="text"
            placeholder="URL"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rent">Rent:</label>
          <input
            type="text"
            placeholder="Rent"
            id="rent"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sale">Sale:</label>
          <input
            type="text"
            placeholder="Sale"
            id="sale"
            value={sale}
            onChange={(e) => setSale(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
