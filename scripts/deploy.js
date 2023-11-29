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
// real 0xBD90db46f1EE284928dC127A1143a37189D0bc70
// contract 0x5FbDB2315678afecb367f032d93F642f64180aa3