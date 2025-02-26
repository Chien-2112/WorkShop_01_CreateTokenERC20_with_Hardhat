const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Token contract", function() {
	/**
	 * @desc - Kiểm tra xem tổng cung token có được gán đúng cho owner
	 * 			khi deploy contract hay không.
	*/
	it("Deployment should assign the total supply of tokens to the owner", async function() {
		// Lấy danh sách tài khoản giả lập trên Hardhat Network(sử dụng để test).
		const [owner] = await ethers.getSigners();

		const Token = await ethers.getContractFactory("Floppy");
		// Deploy contract - Trả về địa chỉ contract gán vào biến hardhatToken.
		const hardhatToken = await Token.deploy();

		// Check balance của owner phải bằng totalSupply.
		const ownerBalance = await hardhatToken.balanceOf(owner.address);
		// expect - Kiểm tra điều kiện.
		expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
	});

	/**
	 * @desc - Kiểm tra việc chuyển token giữa các account.
	*/
	it("Should transfer tokens between accounts", async function() {
		const [owner, addr1, addr2] = await ethers.getSigners();

		const Token = await ethers.getContractFactory("Floppy");

		const hardhatToken = await Token.deploy();

		// Transfer 50 tokens from owner to addr1.
		await hardhatToken.transfer(addr1.address, 50);
		expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

		// Transfer 50 tokens from add1 to addr2.
		await hardhatToken.connect(addr1).transfer(addr2.address, 50);
		expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
		console.log("Transfer from addr1 to addr2 successfully!");
	});
});