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

  return (
    <header
      aria-label="Page Header"
      className="bg-gradient-to-r from-slate-700 via-pink-900 to-black"
    >
      <div className="mx-auto cursor-default max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl text-white  font-bold  sm:text-3xl">
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

            <p className="mt-1.5  text-sm text-white ">
              {stringName ? (
                <span>Time to rent a house 🔥</span>
              ) : (
                <span className="text-[18px]">
                  If you want to take advantage of our service and rent a house
                  right away, please login 🚀
                </span>
              )}
            </p>
          </div>

          <h1 className="  border border-black p-4 text-white bg-blue-700 rounded-2xl">
            {name ? (
              <span>
                Hi, {stringName.replace(/"/g, "")} <br />
                {address ? (
                  <span>Connected with {firstThree + "..." + lastFour}</span>
                ) : (
                  <span></span>
                )}
              </span>
            ) : (
              <span> Please Register or Login</span>
            )}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
