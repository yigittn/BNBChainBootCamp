// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RentHouse is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _counter;


  address private owner;
  uint256 private totalPayments;

  struct User {
    address walletAddress;
    string name;
    string lastname;
    uint rentedHouseId;
    uint balance;
    uint debt;
    uint start;

  }

  struct House {
    uint id;
    string name;
    string imgUrl;
    Status status;
    uint rentFee;
    uint saleFee;

  }

  enum Status {
    Retired,
    InUse,
    Available
  }

  event HouseAdded(uint indexed id, string name, string imgUrl, uint rentFee, uint saleFee);
  event HouseMetadataEdited(uint indexed id, string name, string imgUrl, uint rentFee, uint saleFee); 
  event HouseStatusEdited(uint indexed id, Status status);
  event UserAdded(address indexed walletAddress, string name, string lastname);
  event Deposit (address indexed walletAddress, uint amount);
  event Checkout (address indexed walletAddress, uint indexed houseId);
  event CheckInEvent (address indexed walletAddress, uint indexed houseId);
  event PaymentMade (address indexed walletAddress, uint amount);
  event Balance (address indexed walletAddress, uint amount);

  mapping (address => User) private users;
  mapping (uint => House) private houses;

  constructor() {
    owner = msg.sender;
    totalPayments = 0;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "You're not the owner");
    _;
  }

  function setOwner (address _newOwner) external onlyOwner {
    owner = _newOwner;
  }

  function addUser (string calldata name, string calldata _lastName ) external {
    require(!isUser(msg.sender) , "User already exists");
    users[msg.sender] = User(msg.sender, name, _lastName, 0, 0, 0, 0);
    emit UserAdded(msg.sender, name, _lastName);
  }

  function addHouse ( string calldata name, string calldata url, uint rent, uint sale) external onlyOwner {
    _counter.increment();
    uint counter = _counter.current();
    houses[counter] = House(counter, name, url, Status.Available, rent, sale);

    emit HouseAdded(counter, houses[counter].name, houses[counter].imgUrl, rent, sale);
  }

  function editHouseMetadata (uint id , string calldata name, string calldata imgUrl, uint rentFee, uint saleFee) external onlyOwner {
    require(houses[id].id != 0, "House doesn't exist");
    House storage house = houses[id];
    if(bytes(name).length != 0) {
      house.name = name;
    }
    if(bytes(imgUrl).length != 0) {
      house.imgUrl = imgUrl;
    }
    if(rentFee != 0) {
      house.rentFee = rentFee;
    }
    if(saleFee != 0) {
      house.saleFee = saleFee;
    }

    emit HouseMetadataEdited(id, house.name, house.imgUrl, house.rentFee, house.saleFee);
  }

  function editHouseStatus(uint id , Status status ) external onlyOwner {
    require(houses[id].id != 0, "House doesn't exist");
    houses[id].status = status;
    emit HouseStatusEdited(id, status);
  }

  function checkOut(uint id) external {
    require(isUser(msg.sender), "User doesn't exist");
    require(houses[id].status == Status.Available, "House is not available");
    require(users[msg.sender].rentedHouseId == 0, "User already has a house rented");
    require(users[msg.sender].debt == 0, "User has debt");

    users[msg.sender].start = block.timestamp;
    users[msg.sender].rentedHouseId = id;
    houses[id].status = Status.InUse;

    emit Checkout(msg.sender, id);
  }

  function CheckIn() external {
    require(isUser(msg.sender), "User doesn't exist");
    uint rentedHouseId = users[msg.sender].rentedHouseId;
    require(rentedHouseId != 0, "User doesn't have a house rented");

    uint timeElapsed = block.timestamp - users[msg.sender].start;
    uint rentFee = houses[rentedHouseId].rentFee;
    users[msg.sender].debt += calculateDebt(timeElapsed, rentFee);
    users[msg.sender].rentedHouseId = 0;
    users[msg.sender].start = 0;
    houses[rentedHouseId].status = Status.Available;

    emit CheckInEvent(msg.sender, rentedHouseId);
  }

  function deposit () external payable {
    require(isUser(msg.sender), "User doesn't exist");
    require(msg.value > 0, "You must send greater than 0");
    users[msg.sender].balance += msg.value;
    emit Deposit(msg.sender, msg.value);
  }

  function makePayment () external payable {
    require(isUser(msg.sender), "User doesn't exist");
    uint debt = users[msg.sender].debt;
    uint balance = users[msg.sender].balance;
    require (debt > 0, "User doesn't have debt");
    require (balance >= debt, "User doesn't have enough balance");

    unchecked {
      users[msg.sender].debt -= msg.value;
    }

    totalPayments += msg.value;
    users[msg.sender].debt = 0;

    emit PaymentMade(msg.sender, debt);
  }

  function withdrawBalance (uint amount) external nonReentrant {
    require(isUser(msg.sender), "User doesn't exist");
    uint balance = users[msg.sender].balance;
    require(balance > amount, "You don't have enough balance");

    unchecked {
      users[msg.sender].balance -= amount;
    }

    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed.");

    emit Balance(msg.sender, balance);
  }

  function withdrawOwnerBalance (uint amount) external onlyOwner nonReentrant {
    require(totalPayments > amount, "You don't have enough balance");
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed.");
    
    unchecked {
      totalPayments -= amount;
    }
  
  }

  function getOwner () external view returns (address) {
    return owner;
  }

  function isUser(address walletAddress) private view returns (bool) {
    return users[walletAddress].walletAddress != address(0);
  }

  function getUser(address walletAddress) external view returns (User memory) {
    require(isUser(walletAddress), "User doesn't exist");
    return users[walletAddress];
  }

  function getHouse(uint id) external view returns (House memory) {
    require(houses[id].id != 0, "House doesn't exist");
    return houses[id];
  }

  function getHouseByStatus(Status _status) external view returns(House[] memory) {
    uint count = 0;
    uint lenght = _counter.current();
    for(uint i = 1; i <= lenght; i++) {
      if(houses[i].status == _status) {
        count++;
      }
    }

    House[] memory result = new House[](count);
    count = 0;
    for(uint i = 1; i <= lenght; i++) {
      if(houses[i].status == _status) {
        result[count] = houses[i];
        count++;
      }
    }
    return result;
  }

  function calculateDebt(uint usedSecond, uint rentFee) private pure returns (uint) {
    uint usedMinutes = usedSecond / 60;
    return usedMinutes * rentFee;
  }

  function getCurrentCount() external view returns (uint) {
    return _counter.current();
  }

  function getBalance() external view returns (uint) {
    return address(this).balance;
  }

  function getTotalPayments() external view onlyOwner returns(uint) {
    return totalPayments;
  }



}


