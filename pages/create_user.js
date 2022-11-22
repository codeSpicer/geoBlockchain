import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { GeoBlockchainAddress } from "../config"; // address where main contract is deployed

import geoBlockchain from "../artifacts/contracts/geoBlockchain.sol/geoBlockchain.json"; // importing ABI

const Register = () => {
  useEffect(() => {
    findLocation();
  }, []); // to store current user location as soon as the page renders

  const [formInput, updateFormInput] = useState({
    _userName: "",
    _Address: "",
    _location: "",
    _contactNumber: "",
    _AadharId: "",
    _type: "1",
  }); // state to store the form data

  const findLocation = () => {
    const success = (pos) => {
      const coordinates = pos.coords.latitude + " " + pos.coords.longitude;
      console.log(coordinates);
      updateFormInput({ ...formInput, _location: coordinates });
    };
    const error = () => {
      console.log("Could not retrieve location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }; // to retreive coordinate of user

  const router = useRouter();

  async function AddUser() {
    // when form is submitted add user is called

    console.log(formInput);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // connecting to wallet and getting signer

    let contract = new ethers.Contract(
      GeoBlockchainAddress,
      geoBlockchain.abi,
      signer
    ); // making contract instance to call methods

    try {
      let transaction = await contract.createUser(
        formInput._userName,
        formInput._Address,
        formInput._contactNumber,
        formInput._location,
        formInput._AadharId,
        Number(formInput._type)
      ); // creating user using inputs from form

      await transaction.wait();
      router.push("/profile");
      // after transaction is made moves to profile tab
    } catch {
      console.log("Transaction failed");
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Name"
          className="mt-8 border rounded p-4"
          type="text"
          onChange={(e) =>
            updateFormInput({ ...formInput, _userName: e.target.value })
          }
        />
        <textarea
          placeholder="Address"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, _Address: e.target.value })
          }
        />
        <input
          placeholder="Contact Number"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, _contactNumber: e.target.value })
          }
        />
        <input
          placeholder="Aadhar Number"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, _AadharId: e.target.value })
          }
        />
        <select className="mt-2 border rounded p-4" required={true}>
          <option value="1">Farmer</option>
          <option value="2">Supplier</option>
          <option value="3">Consumer</option>
          onChange=
          {(e) => updateFormInput({ ...formInput, _type: e.target.value })}
        </select>

        <button
          onClick={AddUser}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
