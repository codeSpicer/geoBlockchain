import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { GeoBlockchainAddress } from "../config";

import geoBlockchain from "../artifacts/contracts/geoBlockchain.sol/geoBlockchain.json";
import userContract from "../artifacts/contracts/UserContract.sol/UserContract.json";

const Profile = () => {
  useEffect(() => {
    getDetails();
  }, []);

  const [details, updateDetails] = useState({
    _userName: "",
    _Address: "",
    _location: "",
    _contactNumber: "",
    _AadharId: "",
    _type: "",
  });
  const [userAdd, updateAdderess] = useState("");
  const [isConnected, updateIsConnected] = useState(false);

  async function getDetails() {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const address = await signer.getAddress();
      updateAdderess(address);
      // console.log(address);

      // const provider = new ethers.providers.JsonRpcProvider(
      //   `${process.env.INFURA_MAINNET}${process.env.APIKEY}`
      // );

      let contract = new ethers.Contract(
        GeoBlockchainAddress,
        geoBlockchain.abi,
        provider
      );

      let info = await contract.getInfo(address);

      const userAddress = info.user_contract;
      const userType = info.userType;

      let contractChild = new ethers.Contract(
        userAddress,
        userContract.abi,
        provider
      );

      const name = await contractChild.userName();
      const Address = await contractChild.Address();
      const contactNumber = await contractChild.contactNumber();
      const location = await contractChild.location();
      const AadharId = await contractChild.AadharId();

      updateDetails({
        ...details,
        _AadharId: AadharId,
        _userName: name,
        _Address: Address,
        _contactNumber: contactNumber,
        _location: location,
      });
      updateIsConnected(true);
    } catch (e) {
      console.log(e);
    }
  }

  if (userAdd && isConnected) {
    return (
      <div>
        <div className="p-4">
          {/* <h2 className="text-2xl py-2">{userAdd}</h2> */}
          <div className="border shadow rounded-xl overflow-hidden w-2/5">
            <div className="p-4">
              <p className="text-2xl font-bold  ">Name - {details._userName}</p>
              <p className="text-2xl font-bold ">
                Contact Number - {details._contactNumber}
              </p>
              <p className="text-2xl font-bold ">
                Address - {details._Address}
              </p>
              <p className="text-2xl font-bold ">
                Location - {details._location}
              </p>
              <p className="text-2xl font-bold ">
                Aadhar Number - {details._AadharId}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="text-2xl h-[32rem] items-center justify-center	flex ">
          Login and Register to view Profile
        </h2>
      </div>
    );
  }
};

export default Profile;
