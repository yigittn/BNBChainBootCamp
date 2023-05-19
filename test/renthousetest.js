const RentHouse = artifacts.require("RentHouse");

contract("RentHouse", (accounts) => {
  let RentHouse;
  let owner = accounts[0];
  let user1 = accounts[1];

  beforeEach(async () => {
    RentHouse = await RentHouse.new();
  });

  describe("Add user and house", () => {
    it("should add new user", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      const user = await RentHouse.getUser(user1);
      assert.equal(user.name, "John", "User name is not correct");
      assert.equal(user.lastname, "Sam", "User lastname is not correct");
    });

    it("should add new house", async () => {
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      const house = await RentHouse.getHouse(1);
      assert.equal(house.name, "House 1", "House name is not correct");
      assert.equal(house.url, "exampleurl", "House url is not correct");
      assert.equal(house.rent, 100, "House rent is not correct");
      assert.equal(house.sale, 2, "House sale is not correct");
    });
  });

  describe("Checkout and CheckIn", () => {
    it("should checkout house", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      await RentHouse.checkOut(1, { from: user1 });

      const user = await RentHouse.getUser(1);
      assert.equal(user.isRented, 1, "User could not checkout house");
    });

    it("should checkin house", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      await RentHouse.checkOut(1, { from: user1 });
      await new Promise((resolve) => setTimeout(resolve, 6000));

      await RentHouse.checkIn({ from: user1 });
      const user = await RentHouse.getUser(1);

      assert.equal(user.rentedHouseId, 0, "User could not checkin house");
      assert.equal(user.debt, 10, "User debt is not correct");
    });
  });

  describe("Deposit and make payment", () => {
    it("deposit", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      await RentHouse.checkOut(1, { from: user1 });
      await new Promise((resolve) => setTimeout(resolve, 6000));
      await RentHouse.checkIn({ from: user1 });

      await RentHouse.deposit({ from: user1, value: 100 });
      await RentHouse.makePayment({ from: user1, value: 10 });

      const user = await RentHouse.getUser(user1);
      assert.equal(user.debt, 0, "User debt is not correct");
    });

    it("make payment", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      await RentHouse.checkOut(1, { from: user1 });
      await new Promise((resolve) => setTimeout(resolve, 6000));
      await RentHouse.checkIn({ from: user1 });

      await RentHouse.deposit({ from: user1, value: 100 });
      await RentHouse.makePayment({ from: user1 });

      const user = await RentHouse.getUser(user1);
      assert.equal(user.debt, 10, "User debt is not correct");
    });
  });

  describe("edit house", () => {
    it("edit house", async () => {
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });

      const newName = "House 2";
      const newUrl = "exampleurl2";
      const newRent = 20;
      const newSaleFee = 100000;
      await HouseRent.editHouseMetadata(
        1,
        newName,
        newUrl,
        newRent,
        newSaleFee,
        { from: owner }
      );

      const house = await RentHouse.getHouse(1);
      assert.equal(house.name, newName, "House name is not correct");
      assert.equal(house.url, newUrl, "House url is not correct");
      assert.equal(house.rent, newRent, "House rent is not correct");
      assert.equal(house.sale, newSaleFee, "House sale is not correct");
    });

    it("edit an existing house's status", async () => {
      await RentHouse.addHouse("House 1", "exampleurl", 100, 2, {
        from: owner,
      });
      const newStatus = 0;
      await RentHouse.editHouseStatus(1, newStatus, { from: owner });
      const house = await RentHouse.getHouse(1);
      assert.equal(house.status, newStatus, "House status is not correct");
    });
  });

  describe("withdraw", async () => {
    it("should sent a tokens to user", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.deposit({ from: user1, value: 100 });
      await RentHouse.withdrawBalance(50, { from: user1 });

      const user = await RentHouse.getUser(user1);
      assert.equal(user.balance, 50, "User balance is not correct");
    });

    it("should sent a tokens to owner", async () => {
      await RentHouse.addUser("John", "Sam", { from: user1 });
      await RentHouse.addHouse("House 1", "exampleurl", 10, 2, { from: owner });
      await RentHouse.checkOut(1, { from: user1 });
      await new Promise((resolve) => setTimeout(resolve, 6000));
      await RentHouse.checkIn({ from: user1 });
      await RentHouse.deposit({ from: user1, value: 100 });
      await RentHouse.makePayment({ from: user1 });

      const totalPaymentAmount = await RentHouse.getTotalPayments({
        from: owner,
      });
      const amountToWithdraw = totalPaymentAmount - 10;
      await RentHouse.withdrawOwnerBalance(amountToWithdraw, { from: owner });
      const totalPayment = await RentHouse.getTotalPayments({ from: owner });
      assert.equal(totalPayment, 10, "Total payment is not correct");
    });
  });
});
