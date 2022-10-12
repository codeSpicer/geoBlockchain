// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

import "./User.sol";

contract geoBlockchain {
  struct userInfo {
    User user;
    geoBlockchain.UserType userType;
  }

  mapping(address => userInfo) public Users; 

    using Counters for Counters.Counter ;
    Counters.Counter private userIds;

    enum UserType {
      Producer,
      Supplier,
      Consumer
    }

    function
    createUser(string memory _userName, string memory _Address, string memory _contactNumber, string memory _location, string memory _AadharId, uint _type) public {
      userIds.increment();

      uint index = userIds.current();

      User x = new User(this, index, _userName, _Address, _contactNumber, _location, _AadharId);

      Users[msg.sender].user = x;

      if (_type == 1) {
        Users[msg.sender].userType = UserType.Producer;
      } else if (_type == 2) {
        Users[msg.sender].userType = UserType.Supplier;
      } else if (_type == 3) {
        Users[msg.sender].userType = UserType.Consumer;
      } else {
        revert("Wrong user type entered");
      }
    }
}