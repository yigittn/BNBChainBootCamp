import React from "react";

const Information = ({ userCredit, rideMins, due, isAvailable }) => {
  return (
    <>
      <div className="flex gap-x-6 mt-[8rem] ml-[22rem]">
        <article className="flex items-center justify-between gap-4 rounded-lg border w-[12rem] border-gray-100 bg-white p-6">
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
    </>
  );
};

export default Information;
