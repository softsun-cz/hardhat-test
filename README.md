# Hardhat - Test

This project demonstrates a basic Hardhat use case. It comes with a sample contract.

1. Edit .secret and put there a wallet mnemonic phrase (24 words) - you need to have some gas on it
2. Register on polygonscan.com, bscscan.com etc. and create your new API keys
3. Edit .apikey_* files and add your api keys on the first line of each file (* means block explorer name, e.g.: polygonscan, bscscan ...)
4. edit ./migrations/sample-script.js and set variables
5. Install dependencies and run deploy script:
```console
yarn install
./deploy_hardhat.sh
```