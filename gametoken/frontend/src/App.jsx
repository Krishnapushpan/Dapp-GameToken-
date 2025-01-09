import React, { useState } from "react";
import { ethers } from "ethers";
import ABI from "./assets/Coin.json";
import address from "./assets/deployed_addresses.json";
import "./App.css";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const connectWallet = async (e) => {
    e.preventDefault();
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      await tempProvider.send("eth_requestAccounts", []);

      const tempSigner = await tempProvider.getSigner();
      const tempContract = new ethers.Contract(
        address["coinModule#Coin"],
        ABI.abi,
        tempSigner
      );

      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);

      const userAddress = await tempSigner.getAddress(); 
      setUserAddress(userAddress);

      const balance = await tempContract.balanceOf(userAddress);
      setBalance(ethers.formatUnits(balance, 2)); 
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      alert("Failed to connect wallet");
    }
  };

  const mintTokens = async () => {
    if (!contract) {
      alert("Connect your wallet first!");
      return;
    }
    try {
      const tx = await contract.transfer(mintAddress, ethers.parseUnits(mintAmount, 2));
      await tx.wait();
      alert(`Minted ${mintAmount} tokens to ${mintAddress}`);
    } catch (err) {
      console.error("Failed to mint tokens:", err);
      alert("Failed to mint tokens");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-extrabold mb-6 text-gray-800">GameToken DApp</h1>
    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition-colors duration-200"
    >
      Connect Wallet
    </button>
  
    {userAddress && (
      <div className="mt-6 bg-white p-4 rounded shadow-md w-full max-w-sm">
        <p className="text-md text-gray-600">
          <span className="font-semibold text-gray-800">Connected Wallet:</span> {userAddress}
        </p>
        <p className="text-md text-gray-600">
          <span className="font-semibold text-gray-800">Token Balance:</span> {balance} GT
        </p>
      </div>
    )}
  
    <div className="mt-8 space-y-4 w-full max-w-sm">
      <input
        type="text"
        placeholder="Recipient Address"
        className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <button
        onClick={mintTokens}
        className="px-6 py-3 bg-green-500 text-white font-medium rounded shadow hover:bg-green-600 transition-colors duration-200"
      >
        Mint Tokens
      </button>
    </div>
  </div>
  
  );
};

export default App;
