import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { GeoBlockchainAddress } from "../config";

import geoBlockchain from "../artifacts/contracts/geoBlockchain.sol/geoBlockchain.json";

const Register = () => {
  const [formInput, updateFormInput] = useState({
    _userName: "",
    _Address: "",
    _location: "",
    _contactNumber: "",
    _AadharId: "",
    _type: "",
  });
  const router = useRouter();

  //   async function onChange(e) {
  //     console.log(e.target);
  //   }

  async function AddUser() {
    console.log(formInput);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      GeoBlockchainAddress,
      geoBlockchain.abi,
      signer
    );

    // need to add input checks here so they dont make into tx

    let transaction = await contract.createUser(
      formInput._userName,
      formInput._Address,
      formInput._contactNumber,
      formInput._location,
      formInput._AadharId,
      formInput._type
    );

    await transaction.wait();

    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Name"
          className="mt-8 border rounded p-4"
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
        <textarea
          placeholder="Location"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, _location: e.target.value })
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
        <input
          placeholder="Type of individual"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, _type: e.target.value })
          }
        />

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
