
// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "./geoBlockchain.sol";

contract User {
  uint public userId;
  string public userName;
  string public Address;
  string public contactNumber;
  string public location;
  string public AadharId;         // basic user information

  geoBlockchain parentContract;

  constructor(geoBlockchain _parentContract, uint _userId, string memory _userName, string memory _Address, string memory _contactNumber, string memory _location, string memory _AadharId) {
    parentContract = _parentContract;
    userId = _userId;
    userName = _userName;
    Address = _Address;
    contactNumber = _contactNumber;
    location = _location;
    AadharId = _AadharId;
  }
}