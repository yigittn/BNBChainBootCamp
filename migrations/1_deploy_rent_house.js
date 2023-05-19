const RentHouse = artifacts.require("RentHouse");

module.exports = async function (deployer) {
  await deployer.deploy(RentHouse);
  const instance = await RentHouse.deployed();
  const rentHouseAddress = instance.address;

  console.log("rentHouseAddress:", rentHouseAddress);
};
