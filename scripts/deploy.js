const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const geoBlockchain = await hre.ethers.getContractFactory("geoBlockchain");
  const GeoBlockchain = await geoBlockchain.deploy();
  await GeoBlockchain.deployed();
  console.log("GeoBlockchain deployed to:", GeoBlockchain.address);

  fs.writeFileSync(
    "./config.js",
    `
  export const GeoBlockchainAddress = "${GeoBlockchain.address}"
  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
