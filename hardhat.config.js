require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

require("./tasks/accounts.js");
require("./tasks/balance.js");

// TASK CUSTOM.
// task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address)
//   }
// })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      evmVersion: "london"
    }
  },
  networks: {
    sepolia: {
      // url - Là 1 endpoint để truy cập vào node giúp giao tiếp với mạng blockchain
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  }
};