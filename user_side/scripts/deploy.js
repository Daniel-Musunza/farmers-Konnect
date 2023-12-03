const hre = require("hardhat");

async function main() {
  const Decentragram = await hre.ethers.getContractFactory("Decentragram"); 
  const decentragram = await Decentragram.deploy();

  await decentragram.deployed();

  console.log("Library deployed to:", decentragram.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
