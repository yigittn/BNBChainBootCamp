import Web3 from "web3";
import RenterABI from "./ABI/RentHouse.json";

let selectedAccount;
let renterContract;
let isInitialized = false;
let renterContractAddress = "0x79619d1bC9254E68Efba3362BF3d1c2952cAF678";

export const init = async () => {
  let provider = await window.ethereum;

  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  window.ethereum.on("accountsChanged", (accounts) => {
    selectedAccount = accounts[0];
  });

  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  renterContract = new web3.eth.Contract(RenterABI.abi, renterContractAddress);
  isInitialized = true;
};

export const getUserAddress = async () => {
  if (!isInitialized) {
    await init();
  }
  return selectedAccount;
};

export const setOwner = async (_newOwner) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .setOwner(_newOwner.loverCase())
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (name, _lastName) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .addUser(name, _lastName)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addHouse = async (name, url, rent, sale) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .addHouse(name, url, rent, sale)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editHouseMetadata = async (id, name, imgUrl, rentFee, saleFee) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .editHouseMetadata(id, name, imgUrl, rentFee, saleFee)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editHouseStatus = async (id, status) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .editHouseStatus(id, status)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const checkOut = async (id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .checkOut(id)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const CheckIn = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .CheckIn()
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deposit = async (value) => {
  if (!isInitialized) {
    await init();
  }
  let sending_ether = Web3.utils.toWei(value, "ether");
  try {
    let res = await renterContract.methods
      .deposit()
      .send({ from: selectedAccount, value: sending_ether });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const makePayment = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .makePayment()
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const withdrawBalance = async (amount) => {
  if (!isInitialized) {
    await init();
  }
  let sending_ether = Web3.utils.toWei(amount, "ether");
  try {
    let res = await renterContract.methods
      .withdrawBalance(sending_ether)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const withdrawOwnerBalance = async (amount) => {
  if (!isInitialized) {
    await init();
  }
  let sending_ether = Web3.utils.toWei(amount, "ether");
  try {
    let res = await renterContract.methods
      .withdrawOwnerBalance(sending_ether)
      .send({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOwner = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods.getOwner().call();
    return res.toString();
  } catch (error) {
    console.log(error);
  }
};

export const login = async () => {
  if (!isInitialized) {
    await init();
  }
  if (selectedAccount == null) {
    return;
  }
  try {
    let res = await renterContract.methods.getUser(selectedAccount).call();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHouse = async (id) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods.getHouse(id).call();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHouseByStatus = async (status) => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods.getHouseByStatus(status).call();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentCount = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods.getCurrentCount().call();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods.getBalance().call();
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalPayments = async () => {
  if (!isInitialized) {
    await init();
  }
  try {
    let res = await renterContract.methods
      .getTotalPayments()
      .call({ from: selectedAccount });
    return res;
  } catch (error) {
    console.log(error);
  }
};
