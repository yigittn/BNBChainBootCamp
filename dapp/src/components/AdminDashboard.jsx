import React, { useState, useEffect } from "react";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import {
  addHouse,
  getTotalPayments,
  withdrawOwnerBalance,
  setOwner,
  getOwner,
  editHouseMetadata,
  editHouseStatus,
} from "../Web3Client";
const web3 = new Web3();

const AdminDashboard = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [rent, setRent] = useState("");
  const [sale, setSale] = useState("");
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [newRent, setNewRent] = useState("");
  const [newSale, setNewSale] = useState("");
  const [totalPayments, setTotalPayments] = useState(null);
  const [withdrawBalance, setWithdrawBalance] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [currentOwner, setCurrentOwner] = useState(null);

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

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      let result = await withdrawOwnerBalance(withdrawBalance);
      if (result) {
        console.log("Withdrawn successfully" + result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const editHouseData = async (e) => {
    e.preventDefault();
    const newRentInWei = convertDecimalToInteger(newRent, 18);
    const newSaleInWei = convertDecimalToInteger(newSale, 18);
    try {
      let result = await editHouseMetadata(
        id,
        newName,
        newUrl,
        newRentInWei,
        newSaleInWei
      );
      if (result) {
        console.log("House edited successfully" + result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const editHouseStatusData = async (e) => {
    e.preventDefault();
    try {
      let result = await editHouseStatus(id, status);
      if (result) {
        console.log("House status edited successfully" + result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetOwner = async (e) => {
    e.preventDefault();
    try {
      let result = await setOwner(ownerAddress);
      if (result) {
        console.log("Owner set successfully" + result);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ownerAddress);

  useEffect(() => {
    const fetchTotalPayments = async () => {
      const totalPayments = await getTotalPayments();
      console.log(totalPayments);
      setTotalPayments(totalPayments);
    };
    const fetchOwner = async () => {
      const owner = await getOwner();
      console.log(owner);
      setCurrentOwner(owner);
    };
    fetchTotalPayments();
    fetchOwner();
  }, []);

  return (
    <div className="bg-gradient-to-r  border-t-2  border-white  from-slate-700 via-pink-900 to-black">
      <div className="flex justify-center gap-x-10 items-center">
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="House Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL: </label>
            <input
              type="text"
              placeholder="House Picture Url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rent">Rent:</label>
            <input
              type="text"
              placeholder="Rent Fee"
              id="rent"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sale">Sale:</label>
            <input
              type="text"
              placeholder="Sale Fee"
              id="sale"
              value={sale}
              onChange={(e) => setSale(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
            type="submit"
          >
            Add House
          </button>
        </form>
        <span className="border cursor-default flex flex-col border-black p-4 text-white bg-blue-700 rounded-2xl">
          {" "}
          Total Payment : {totalPayments}{" "}
          <input
            type="number"
            placeholder="Withdraw Balance"
            className="text-black"
            onChange={(e) => {
              setWithdrawBalance(e.target.value);
            }}
          />
          <button
            onClick={handleWithdraw}
            className="border mt-3 border-black rounded-xl p-2 text-white bg-black"
          >
            Withdraw Balance
          </button>
        </span>
        <div className="flex flex-col gap-y-4">
          <span className="text-white">
            Current Owner : <span className="text-red-500">{currentOwner}</span>{" "}
          </span>
          <input
            placeholder="New Owner Address"
            className="text-black"
            onChange={(e) => {
              setOwnerAddress(e.target.value);
            }}
          />
          <button
            onClick={handleSetOwner}
            className="border mt-3 text-white border-black rounded-xl p-2  bg-black"
          >
            Set New Owner
          </button>
        </div>
        <form className="" onSubmit={editHouseData}>
          <div>
            <label htmlFor="name">Id:</label>
            <input
              type="text"
              placeholder="House Id"
              id="name"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="New House Name"
              className="text-black"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">URL: </label>
            <input
              type="text"
              placeholder="New House Picture Url"
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rent">Rent:</label>
            <input
              type="text"
              placeholder="New Rent Fee"
              onChange={(e) => setNewRent(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sale">Sale:</label>
            <input
              type="text"
              placeholder="New Sale Fee"
              onChange={(e) => setNewSale(e.target.value)}
            />
          </div>
          <button
            className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
            type="submit"
          >
            Edit House Metadata
          </button>
        </form>
        <form onSubmit={editHouseStatusData}>
          <div>
            <label className="text-white">Id:</label>
            <input
              type="number"
              placeholder="House Id"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white">Status:</label>
            <input
              type="number"
              placeholder="House Status"
              className="text-black"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <span className="text-red-500">
            0 = retired ( Home disappears from the screen) <br /> 1 = InUse{" "}
            <br /> 2 = Available
          </span>
          <button
            className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
            type="submit"
          >
            Edit House Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
