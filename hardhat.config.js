require('@openzeppelin/hardhat-upgrades');

module.exports = {
  // ... other configurations
  solidity: {
    version: '0.8.4',
  },
  
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
  },
  // ... other configurations
};
