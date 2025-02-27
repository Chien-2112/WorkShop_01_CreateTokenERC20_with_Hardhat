const { task } = require("hardhat/config");

task("balance", "Prints the balance of an account")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);
    console.log(`Balance of ${taskArgs.account}: ${hre.ethers.utils.formatEther(balance)} ETH`);
  });

module.exports = {};
