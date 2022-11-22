import React, { Component } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";

import { GeoBlockchainAddress } from "../config";

import geoBlockchain from "../artifacts/contracts/geoBlockchain.sol/geoBlockchain.json";

const AddProduct = () => {
  const [formInput, updateFormInput] = useState({
    product_id: "",
    product_name: "",
    category: "",
    quantity: "",
    createdBy: "",
    current_location: "",
    location: "",
    updatedBy: "",
    created_at: "",
  });
  const router = useRouter();

  async function createProduct() {
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
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Product Id"
          className="mt-8 border rounded p-4"
          type="text"
          onChange={(e) =>
            updateFormInput({ ...formInput, product_id: e.target.value })
          }
        />
        <textarea
          placeholder="Product Name"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, product_name: e.target.value })
          }
        />
        <textarea
          placeholder="category"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, category: e.target.value })
          }
        />
        <input
          placeholder="Quantity"
          type="number"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, quantity: e.target.value })
          }
        />
        <input
          placeholder="Created by"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, createdBy: e.target.value })
          }
        />
        <input
          placeholder="Current Location"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, current_location: e.target.value })
          }
        />
        <input
          placeholder="Locations array"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, location: e.target.value })
          }
        />
        <input
          placeholder="updated by array"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, updatedBy: e.target.value })
          }
        />
        <input
          placeholder="created at"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, created_at: e.target.value })
          }
        />

        <button
          onClick={createProduct}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
