import React, { useState, useEffect } from "react";
import Web3 from "web3";

import { deposit, makePayment, withdrawBalance } from "../Web3Client";
const web3 = new Web3();

const Information = ({ userCredit, rideMins, due, isAvailable }) => {
  const [amount, setAmount] = useState(0);

  const makeDeposit = async () => {
    const amountInWei = web3.utils.toWei(amount);
    const res = await deposit(amount);
    console.log(amountInWei);
  };

  const payDue = async () => {
    try {
      let res = await makePayment();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const withdraw = async () => {
    try {
      let res = await withdrawBalance(amount);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex gap-x-6 mt-[6rem] ">
        <article className="flex items-center justify-between gap-4 rounded-lg border  border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600"></span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{userCredit}</p>
            <p className="text-sm text-gray-500">BNB Credit</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600"></span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{due}</p>
            <p className="text-sm text-gray-500">BNB Due</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <span className="rounded-full bg-blue-100 p-3 text-blue-600"></span>

          <div>
            <p className="text-2xl font-medium text-gray-900">{rideMins}</p>

            <p className="text-sm text-gray-500">Ride Mins</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-6">
          <div>
            <p className="text-2xl font-medium text-gray-900">{isAvailable}</p>
          </div>
        </article>
      </div>

      <div className="flex gap-x-12 justify-center items-center  mt-10">
        <label className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:white">
          <input
            placeholder="BNB for deposit"
            className="peer appearance-none text-white h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />

          <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            BNB
          </span>
        </label>
        <button
          onClick={makeDeposit}
          className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
        >
          {" "}
          Deposit
        </button>
        <button
          onClick={withdraw}
          className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
        >
          Withdraw
        </button>
        <button
          onClick={payDue}
          className="bg-gradient-to-r h-8 text-xl justify-center flex items-center from-pink-500 via-red-400 to-yellow-500 rounded-full  p-[10px]  focus:outline-none focus:ring active:text-opacity-75"
        >
          Pay Your Debt
        </button>
      </div>
    </>
  );
};

export default Information;
