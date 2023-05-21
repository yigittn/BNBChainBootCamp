import { useState, useEffect } from "react";
import HouseCard from "./components/HouseCard";
import Header from "./components/Header";
import Web3 from "web3";
import {
  getUserAddress,
  register,
  getHouseByStatus,
  getHouse,
  getOwner,
  login,
} from "./Web3Client";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [house, setHouse] = useState([]);
  const [name, setName] = useState({});
  const [lastName, setLastName] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userCredit, setUserCredit] = useState("0");
  const [due, setDue] = useState("0");
  const [isAvailable, setIsAvailable] = useState("Can't Rent Right Now");
  const [rideMins, setRideMins] = useState("0");

  const emptyAddress = "0x0000000000000000000000000000000000000000";

  useEffect(() => {
    let handleInit = async () => {
      let isAUser = await login();
      if (isAUser.address !== emptyAddress) {
        setLoggedIn(true);
        setUserName(isAUser?.name);
        setLastName(isAUser[2]);
        setAddress(isAUser?.walletAddress);
        let userDue = Web3.utils
          .fromWei(String(isAUser.debt), "ether")
          .toString();
        setDue(userDue);

        let address = await getUserAddress();
        let owner = await getOwner();
        if (address === owner.toLowerCase()) {
          setIsAdmin(true);
        }
        // get houses
        let houseArray = [];
        let houseByStatus = await getHouseByStatus(2); // 2 means available
        houseArray.push(...houseByStatus);
        if (isAUser.rentedHouseId !== "0") {
          let rentedHouse = await getHouse(Number(isAUser.rentedHouseId));
          houseArray.push(rentedHouse);
        }
        setHouse(houseArray);

        if (isAUser.rentedHouseId !== "0") {
          let rentedHouse = await getHouse(Number(isAUser.rentedHouseId));
          setIsAvailable(`Rented: ${rentedHouse.name} - ${rentedHouse.id}`);
        } else {
          console.log(due);
          if (due !== "0") {
            setIsAvailable("You have due to pay");
          }
        }
        let rideMins = "0";
        if (isAUser.rentedHouseId !== "0") {
          rideMins = Math.floor(
            Math.floor(Date.now() / 1000 - isAUser.start) / 60
          ).toString();
        }
        setRideMins(rideMins);
      }
    };
    handleInit();
  }, []);

  const handleNameChange = async (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = async (e) => {
    setLastName(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let res = await register(name, lastName);
      setLoggedIn(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header name={userName} lastName={lastName} address={address} />
      <div className="bg-[#111112] flex justify-center mx-auto items-center min-h-screen">
        {loggedIn ? (
          <div>
            sa{" "}
            <div>
              {house.length > 0 ? (
                house.map((house) => {
                  return (
                    <HouseCard
                      name={house.name}
                      id={house.id}
                      image={house.image}
                      saleFee={house.saleFee}
                      rentFee={house.rentFee}
                      houseStatus={house.houseStatus}
                    />
                  );
                })
              ) : (
                <div>House Loading...</div>
              )}
            </div>
          </div>
        ) : (
          <form
            className=" w-[40rem]  border rounded-md border-white flex flex-col p-6"
            onSubmit={handleRegister}
          >
            <div className="relative  block overflow-hidden rounded-sm border-b border-white  px-3 pt-3  focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input
                type="text"
                onChange={handleNameChange}
                placeholder="Name"
                className="peer h-8 w-full text-white  bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />

              <span className="absolute start-3 top-3 text-white -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Name
              </span>
            </div>
            <div className="relative  mt-6 block overflow-hidden rounded-sm border-b border-white px-3 pt-3  focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <input
                type="text"
                onChange={handleLastNameChange}
                placeholder="Lastname"
                className="peer h-8 w-full roundend-md text-white bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              />

              <span className="absolute start-3 top-3 text-white -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                Lastname
              </span>
            </div>
            <button type="submit">
              <div className="mt-6 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                Register
              </div>
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default App;
