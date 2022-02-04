require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");


const fs = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();
const api_key_bscscan = fs.readFileSync('.apikey_bscscan').toString().trim();
const api_key_polygonscan = fs.readFileSync('.apikey_polygonscan').toString().trim();
const api_key_avax = fs.readFileSync('.apikey_avax').toString().trim();
const api_key_optimism = fs.readFileSync('.apikey_optimism').toString().trim();
const api_key_fantom = fs.readFileSync('.apikey_ftmscan').toString().trim();
const api_key_hecoinfo = fs.readFileSync('.apikey_hecoinfo').toString().trim();

module.exports = {
 solidity: {
  version: '^0.8.11',
  settings: {
   optimizer: {
    enabled: true,
    //runs: 1500
   }
  }
 },
 networks: {
  polygonTestnet: {
   //url: 'https://rpc-mumbai.matic.today',
   url: 'https://matic-mumbai.chainstacklabs.com',
   //url: 'https://rpc-mumbai.maticvigil.com',
   //url: 'https://matic-testnet-archive-rpc.bwarelabs.com',
   chainId: 80001,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true
  },
  polygonMainnet: {
   url: 'https://polygon-rpc.com',
   //url: 'https://rpc-mainnet.matic.network',
   //url: 'https://matic-mainnet.chainstacklabs.com',
   //url: 'https://rpc-mainnet.maticvigil.com',
   //url: 'https://rpc-mainnet.matic.quiknode.pro',
   //url: 'https://matic-mainnet-full-rpc.bwarelabs.com',
   chainId: 137,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true
  },
  bscTestnet: {
   url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
   chainId: 97,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  bscMainnet: {
   url: 'https://bsc-dataseed2.binance.org',
   chainId: 56,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  avaxTestnet: {
   url: 'https://api.avax-test.network/ext/bc/C/rpc',
   chainId: 43113,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  avaxMainnet: {
   url: 'https://api.avax.network/ext/bc/C/rpc',
   chainId: 43114,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  optimismTestnet: {
   url: 'https://kovan.optimism.io/',
   chainId: 69,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  optimismMainnet: {
   url: 'https://mainnet.optimism.io',
   chainId: 10,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  fantomTestnet: {
   url: 'https://rpc.testnet.fantom.network/',
   chainId: 4002,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  fantomMainnet: {
   url: 'https://rpc.ftm.tools/',
   chainId: 250,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  hecoTestnet: {
   url: 'https://http-testnet.hecochain.com/',
   chainId: 256,
   confirmations: 1,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  hecoMainnet: {
   url: 'https://http-mainnet.hecochain.com/',
   chainId: 128,
   confirmations: 10,
   timeoutBlocks: 200,
   skipDryRun: true,
   accounts: {mnemonic: mnemonic}
  },
  localhost: {
   url: '127.0.0.1:8545',
  },
 },
 bscscan: {
  apiKey: api_key_bscscan,
 },
 polygonscan: {
  apiKey: api_key_polygonscan,
 },
 snowtrace: {
  apiKey: api_key_avax,
 },
 optimistic_etherscan: {
  apiKey: api_key_optimism,
 },
 ftmscan: {
  apiKey: api_key_fantom,
 },
 hecoinfo: {
  apiKey: api_key_hecoinfo,
 },
};

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
 const accounts = await hre.ethers.getSigners();
 for (const account of accounts) {
  console.log(account.address);
 }
});
