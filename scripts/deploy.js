const { ethers, upgrades } = require("hardhat");

async function main() {
  try {
    // Deploy the Decentragram contract
    const Decentragram = await ethers.getContractFactory("Decentragram");
    const decentragram = await upgrades.deployProxy(Decentragram, [], { initializer: "initialize" });

    // Wait for the deployment to be mined
    await decentragram.deployed();

    console.log(`Decentragram deployed to: ${decentragram.address}`);

    // If you want to upgrade the contract using Hardhat Upgrades Plugin, you can use the following:
    // const UpgradedDecentragram = await upgrades.upgradeProxy(decentragram.address, UpgradedDecentragram);
    // console.log(`Decentragram upgraded to: ${UpgradedDecentragram.address}`);

  } catch (error) {
    console.error("Error deploying Decentragram:", error.message || error);
    process.exitCode = 1;
  }
}

// Execute the deployment script
main();
