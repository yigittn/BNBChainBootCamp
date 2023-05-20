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
    /*
    let handleInit = async () => {
      let isAUser = await login();
      if (isAUser.address !== emptyAddress) {
        setLoggedIn(true);
        let userDue = Web3.utils
          .fromWei(String(isAUser.debt), "ether")
          .toString();
        setDue(userDue);
        setUserName(isAUser.name);
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
    */
  }, []);

  const handleNameChange = async (e) => {
    setName(e.target.value);
  };

  const handleLastNameChange = async (e) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <Header />
    </>
  );
}

export default App;
