# GeoBlockchain

This project leverages blockchain and smart contracts to create a transparent
and secure supply chain system. Through the use of Solidity for smart contracts
and Reactjs for frontend development, end users can easily access data related
to supply items and view their most recent locations on a map rendered using
Leaflet. 
Overall, this project aims to improve supply chain efficiency and
accountability while providing users with greater transparency and control.

## Getting Started

To run this project:

1. The user needs to have `Node.js` installed on their system.
2. Git clone the project
3. Change into the project directory: `cd project-name`
4. Run `npm install`
5. In another terminal, start the hardhat node in the local system by running `npx hardhat node`
6. In the same directory, run the following:
   ```shell
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network localhost
   ```

This will compile and deploy the smart contract to local blockchain.

7. In another terminal in the same directory, run` npm run dev`.

The user needs to have Metamask installed in their browser and also needs to import the private keys of the from hardhat.

Technologies Used
Blockchain
Solidity
React
leaflet
hardhat
