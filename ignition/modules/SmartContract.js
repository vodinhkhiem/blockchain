const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AcademicCredentialModule", (m) => {
  const academic = m.contract("AcademicCredential");

  return { academic };
});