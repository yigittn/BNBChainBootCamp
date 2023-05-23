import React from "react";
import { checkOut, CheckIn } from "../Web3Client";
import Web3 from "web3";

const HouseCard = ({ name, id, image, saleFee, rentFee, houseStatus, due }) => {
  const handleCheckOut = async () => {
    const res = await checkOut(id);
    console.log(res);
  };

  console.log(due);

  const handleCheckIn = async () => {
    await CheckIn(id);
  };

  return (
    <div className=" grid-cols-3 justify-center items-center">
      <div className="flex justify-center items-center ">
        <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <img
            className="h-52 w-[29rem] flex flex-col justify-center items-center bg-amber-500 rounded-t-xl"
            src={image}
          />
          <div className="p-4 md:p-6">
            <span className="block mb-1 text-xs font-semibold uppercase text-amber-500">
              {name} - id: {id}
            </span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 dark:hover:text-white">
              <p>House fee : {Web3.utils.fromWei(rentFee)} </p>
              <p>Sale fee: {Web3.utils.fromWei(saleFee)} </p>
              <p>{houseStatus === "2" ? "Available" : "Not Available"}</p>
            </h3>
            <p className="mt-3 text-gray-500">House Description</p>
          </div>
          <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
            <button
              disabled={due > 0 ? true : false}
              onClick={() => handleCheckOut(id)}
              className=" disabled:cursor-not-allowed w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50   transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              Check In
            </button>
            <button
              disabled={due > 0 ? true : false}
              onClick={() => handleCheckIn()}
              className="  disabled:cursor-not-allowed w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-br-xl font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50   transition-all text-sm sm:p-4 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
