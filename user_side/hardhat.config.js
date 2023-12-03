require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // url: 'http://localhost:8545',
    },
    sepolia: {
      url: "https://thrilling-virulent-dinghy.ethereum-sepolia.quiknode.pro/c2e0582ada626b6b5724cb461493e2129374ab14/",
      accounts: ["a283b2433fd6ec2609ec7e669900185908ae6377a85f0fac4445eecf2550d29b"],
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  etherscan: {
    apiKey: "IP8KJMX95EWWSAYDF28IJT3DRKW7DIMBBB",
  }
};
