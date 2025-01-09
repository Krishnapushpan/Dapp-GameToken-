# Dapp-GameToken- 🎮💰
Dapp-GameToken is a decentralized application designed for gaming ecosystems, leveraging the Ethereum blockchain and ERC-20 token standard. The application allows users to interact with game tokens for various gaming utilities, such as purchasing items, rewards, and more.

## Features
- *ERC-20 Token Standard*: Fully compliant with Ethereum's ERC-20 standard.
- *Minting Functionality*: Allows the contract owner to mint additional tokens.
- *Secure Ownership*: Uses Ownable from OpenZeppelin for secure contract ownership.

## Installation

1. Clone the repository:
   bash
   git clone https://github.com/Krishnapushpan/Dapp-GameToken-.git

2. Install Dependencies
   bash
   Copy code

3. Configure the .env File

4.  Replace your_private_key with the private key of your wallet (e.g., from MetaMask).
    Replace your_network_name with the test network you plan to use (e.g., holesky).

5. Compile the Contract
    bash
    npx hardhat compile

6. Deploy the Contract
   bash
   npx hardhat ignition deploy ignition/modules/coin.js --network holesky
