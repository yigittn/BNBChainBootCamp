import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-900">
      <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            <div className="group flex shrink-0 items-center rounded-lg transition">
              <p className="ms-2 hidden text-left text-xs sm:block">
                <div className="block font-medium text-[20px] mb-2 cursor-default text-white">
                  Eric Frusciante
                </div>
                <span className=" text-white text-[14px] cursor-default  ">
                  Connected with{" "}
                  <span className="text-[16px]">0x4b3..b556</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl cursor-default text-white  font-bold sm:text-3xl">
            Welcome Barry!
          </h1>
          <p className="mt-1.5 text-sm cursor-default text-white  ">
            Your website has seen a 52% increase in traffic in the last month.
            Keep it up! 🚀
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
