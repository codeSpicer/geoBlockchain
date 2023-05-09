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

## Details about the smart contract 

The first contract is called UserContract and it stores basic user information such as name, address, contact number, location, and Aadhar ID. It also has a function addProduct which is used to add a product ID to the user's information. This contract can only be updated through delegate calls by the parent contract, which is the geoBlockchain contract.

The second contract is called geoBlockchain and it manages the entire supply chain process by creating and managing products, and tracking their movement. It has a struct called User which stores the user contract address and their user type (producer, supplier, or consumer). It also has a struct called Product which stores information such as the product ID, name, category, quantity, created by, current location, location history, users who have updated the location, created date, and a mapping of whitelisted users who can modify the product state.

The geoBlockchain contract has several functions such as createUser which creates a new user with a specified user type, addProduct which is used by producers to create a new product and add it to their user information, and updateProductLocation which is used by whitelisted users to update the current location of a product. There are also functions to update the product whitelist and get product information.

These contracts work together by the UserContract being called from the geoBlockchain contract to add a product ID to a user's information. The geoBlockchain contract manages the entire supply chain process and tracks the movement of products through the functions it provides such as creating new users, adding new products, and updating the location and whitelist of products.



Technologies Used
Blockchain
Solidity
React
leaflet
hardhat
