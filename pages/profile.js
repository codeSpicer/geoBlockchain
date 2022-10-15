import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { GeoBlockchainAddress } from "../config";

import geoBlockchain from "../artifacts/contracts/geoBlockchain.sol/geoBlockchain.json";

const profile = () => {
  useEffect(() => {
    getDetails();
  });
  async function getDetails() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const address = await signer.getAddress();

    // const provider = new ethers.providers.JsonRpcProvider(
    //   `${process.env.INFURA_MAINNET}${process.env.APIKEY}`
    // );

    let contract = new ethers.Contract(
      GeoBlockchainAddress,
      geoBlockchain.abi,
      provider
    );
    console.log(address);

    let info = await contract.getInfo(address);
    // let info = await contract.Users[address];
    console.log(info);
  }
  return (
    <div>
      <h2>helo</h2>
    </div>
  );
};

export default profile;
