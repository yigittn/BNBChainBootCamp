import React from "react";
import { checkOut, CheckIn } from "../Web3Client";
import Web3 from "web3";

const HouseCard = ({ name, id, image, saleFee, rentFee, houseStatus }) => {
  const handleCheckOut = async () => {
    await checkOut(id);
  };

  const handleCheckIn = async () => {
    await CheckIn(id);
  };

  return (
    <div className="max-w-[75rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <img
            className="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl"
            src={image}
          />
          <div className="p-4 md:p-6">
            <span className="block mb-1 text-xs font-semibold uppercase text-amber-500">
              {name}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <p>House fee : {Web3.utils.fromWei(props.rentFee)} </p>
              <p>Sale fee:{Web3.utils.fromWei(props.saleFee)} </p>
              <p>{houseStatus === "2" ? "Available" : "Not Available"}</p>
            </h3>
            <p className="mt-3 text-gray-500">House Description</p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <button
              onClick={() => handleCheckOut(id)}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50   transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              Check Out
            </button>
            <button
              onClick={() => handleCheckIn()}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50   transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              Check In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
