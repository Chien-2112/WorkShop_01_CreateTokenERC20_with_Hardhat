//SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.7.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract Floppy is
    ERC20("Floppy", "FLP"),
    ERC20Burnable,
    Ownable
{
    uint256 private cap = 50_000_000_000 * 10**uint256(18);

    constructor() Ownable(msg.sender) {
        console.log("owner: %s maxcap: %s", msg.sender, cap);
        // Khi contract được deploy, mint toàn bộ supply cho owner.
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(
            ERC20.totalSupply() + amount <= cap,
            "Floppy: cap exceeded"
        );
        _mint(to, amount);
    }
}