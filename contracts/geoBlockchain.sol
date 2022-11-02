// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";

import "./UserContract.sol";

contract geoBlockchain {
  struct User {
    address user_contract;
    geoBlockchain.UserType userType;
  }

  struct Product {
    string product_id;
    string product_name;
    string category;
    uint quantity;
    address createdBy;
    string current_location;
    string[] location;
    address[] updatedBy;
    uint created_at;
    mapping(address => bool) whitelisted;
  }

  string public contract_name = "geobc";

  mapping(address => User) public Users; 
  mapping(address => bool) userCreated;
  mapping(string => Product) products;

  using Counters for Counters.Counter ;
  Counters.Counter private userIds;

  enum UserType {
    Producer,
    Supplier,
    Consumer
  }

  modifier onlyProducer {
    require(Users[msg.sender].userType == UserType.Producer, "Only producer can create products");
    _;
  }

  modifier onlyCreatedUser {
    require(userCreated[msg.sender], "User needs to be created first");
    _;
  }

  modifier onlyWhitelisted(string memory product_id) {
    require(products[product_id].whitelisted[msg.sender], "Whitelisted users can modify product state");
    _;
  }

  function createUser(string memory _userName, string memory _Address, string memory _contactNumber, string memory _location, string memory _AadharId, uint _type) public {
    userIds.increment();

    uint index = userIds.current();

    UserContract x = new UserContract(address(this), index, _userName, _Address, _contactNumber, _location, _AadharId);

    User storage user = Users[msg.sender];
    user.user_contract = address(x);

    if (_type == 1) {
      user.userType = UserType.Producer;
    } else if (_type == 2) {
      user.userType = UserType.Supplier;
    } else if (_type == 3) {
      user.userType = UserType.Consumer;
    } else {
      revert("Wrong user type entered");
    }

    userCreated[msg.sender] = true;
  }

  function addProduct(string memory product_id, string memory name, string memory category, uint quantity, string memory create_location, address[] memory whitelisted) external onlyCreatedUser onlyProducer {
    Product storage product = products[product_id];
    product.product_id = product_id;
    product.product_name = name;
    product.category = category;
    product.current_location = create_location;
    product.location.push(create_location);
    product.updatedBy.push(msg.sender);
    for ( uint i = 0; i<whitelisted.length; i++ ) {
      product.whitelisted[whitelisted[i]] = true; 
    }
    product.createdBy = msg.sender;
    product.created_at = block.timestamp;
    product.quantity = quantity;

    User storage user = Users[msg.sender];
    require(UserContract(user.user_contract).addProduct(product_id), "Could not update product for user");
  } 

  function updateProductLocation(string memory product_id, string memory location) external onlyWhitelisted(product_id){
    Product storage product = products[product_id];
    product.current_location = location;
    product.location.push(location);
    product.updatedBy.push(msg.sender);
  }

  function updateProductWhitelist(string memory product_id, address[] memory whitelisted) external onlyProducer{
    Product storage product = products[product_id];
    for (uint i = 0; i<whitelisted.length; i++) {
      product.whitelisted[whitelisted[i]] = true;
    }
  }

  function getProductInfo(string memory product_id) external view returns (string[5] memory){
    Product storage product = products[product_id];
    return [product.product_id, product.product_name, product.category, product.location[0], product.current_location];
  }

  function getInfo( address addr) public view returns (User memory ) {
    return Users[addr];
  }

}