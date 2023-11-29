require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  // networks: {
  //   hardhat: {
  //     chainId: 1337,
  //   },
  // },
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  rinkeby: {
    url: "<YOUR_INFURA_RINKEBY_URL>",
    accounts: ["0xYOUR_PRIVATE_KEY"],
  },
  
};
