import React from "react";

const Header = ({ name, lastName, address }) => {
  let stringName = null;
  let stringLastName = null;
  let stringAddress = JSON.stringify(address, null, 2);
  let firstThree = stringAddress.slice(0, 6);
  let lastFour = stringAddress.slice(-5);

  if (name) {
    stringName = JSON.stringify(name, null, 2);
  }
  if (lastName) {
    stringLastName = JSON.stringify(lastName, null, 2);
  }
  console.log(address);
  return (
    <header className="bg-[#09090b]">
      <div className="mx-auto  max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            <div className="group flex shrink-0 items-center rounded-lg transition">
              <div className="ms-2 hidden text-left text-xs sm:block">
                <div className="block font-medium text-[20px] mb-2 cursor-default text-white">
                  {name ? (
                    <span>Hi, {stringName.replace(/"/g, "")}</span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <span className=" text-white text-[14px] cursor-default  ">
                  <span className="text-[16px]">
                    {address ? (
                      <span>
                        Connected with {firstThree + "..." + lastFour}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl cursor-default text-white  font-bold sm:text-3xl">
            Welcome{" "}
            {stringName ? (
              <span>
                {stringName.replace(/"/g, "")}{" "}
                {stringLastName.replace(/"/g, "")}
              </span>
            ) : (
              <span></span>
            )}
          </h1>
          <p className="mt-1.5 text-sm cursor-default text-white  ">
            {stringName ? (
              <span>Time to rent a house 🔥</span>
            ) : (
              <span>
                If you want to take advantage of our service and rent a house
                right away, please login 🚀
              </span>
            )}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
