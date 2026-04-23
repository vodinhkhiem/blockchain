require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("dotenv").config(); // Dòng này dùng để đọc file .env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    // Mạng ảo
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Mạng thử nghiệm Sepolia thực tế trên Internet
    sepolia: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
