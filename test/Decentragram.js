const { expect } = require("chai");

describe("Decentragram", function () {
  let Decentragram;
  let decentragram;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Decentragram = await ethers.getContractFactory("Decentragram");
    decentragram = await Decentragram.deploy();
    await decentragram.deployed();
  });

  it("Should upload land", async function () {
    // Upload land
    await decentragram.uploadLand(
      "hash",
      "title",
      "landType",
      "country",
      "soilType",
      "landDetails",
      "message",
      "price"
    );

    // Check if land was uploaded
    const land = await decentragram.lands(1);
    expect(land.title).to.equal("title");
    // Add more checks as needed
  });

  it("Should book land", async function () {
    // Upload land
    await decentragram.uploadLand(
      "hash",
      "title",
      "landType",
      "country",
      "soilType",
      "landDetails",
      "message",
      "price"
    );

    // Book land
    await decentragram.connect(addr1).bookLand(1, { value: ethers.utils.parseEther("1.0") });

    // Check if land was booked
    const land = await decentragram.lands(1);
    expect(land.grantAmount).to.equal(ethers.utils.parseEther("1.0"));
    // Add more checks as needed
  });

  it("Should upload image", async function () {
    // Upload image
    await decentragram.uploadImage("imageHash", "1");

    // Check if image was uploaded
    const image = await decentragram.images(1);
    expect(image.landId).to.equal("1");
    // Add more checks as needed
  });
});
