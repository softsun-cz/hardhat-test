//const hre = require('hardhat');
const fetch = require('node-fetch');

var netInfo;
var contracts = [];
var totalCost = ethers.BigNumber.from('0');
const confirmNum = 3;

async function main() {
 getWelcomeMessage('Sample project');
 netInfo = await getNetworkInfo();
 getNetworkMessage();
 console.log();
 console.log('Deploying smart contracts ...');
 console.log();
 var sample = await deploy('Sample');
 getTotalCost();
 var piggy = await collectionAdd(sample, 'Piggy');
 var duck = await collectionAdd(sample, 'Duck');
 await propertyAdd(sample, piggy, 'Body');
 await propertyAdd(sample, piggy, 'Ears');
 await propertyAdd(sample, piggy, 'Eyes');
 await propertyAdd(sample, piggy, 'Snout');
 await propertyAdd(sample, piggy, 'Mouth');
 await propertyAdd(sample, piggy, 'Tail');
 await propertyAdd(sample, duck, 'Body');
 await propertyAdd(sample, duck, 'Eyes');
 await propertyAdd(sample, duck, 'Beak');
 await propertyAdd(sample, duck, 'Wings');
 getTotalCost();
 await getSummary();
}

async function getNetworkInfo() {
 var arr = [];
 const account = (await ethers.getSigners())[0];
 arr['chainID'] = (await ethers.provider.getNetwork()).chainId;
 arr['name'] = 'Unknown';
 arr['rpc'] = 'Unknown';
 arr['currency'] = 'Unknown';
 arr['symbol'] = 'ETH';
 arr['explorer'] = 'https://etherscan.io';
 arr['walletAddress'] = account.address;
 arr['walletBalance'] = ethers.utils.formatEther(await account.getBalance());
 var response = await fetch('https://chainid.network/chains.json');
 var json = await response.json();
 json = JSON.stringify(json);
 var arrJSON = JSON.parse(json);
 for (var i = 0; i < arrJSON.length; i++) {
  if (arrJSON[i].chainId == arr['chainID']) {
   if (!!arrJSON[i].name) arr['name'] = arrJSON[i].name;
   if (!!arrJSON[i].nativeCurrency.name) arr['currency'] = arrJSON[i].nativeCurrency.name;
   if (!!arrJSON[i].nativeCurrency.symbol) arr['symbol'] = arrJSON[i].nativeCurrency.symbol;
   if (!!arrJSON[i].explorers[0].url) arr['explorer'] = arrJSON[i].explorers[0].url;
  }
 }
 return arr;
}

function getWelcomeMessage(name) {
 const eq = '='.repeat(arguments[0].length + 16);
 console.log();
 console.log(eq);
 console.log(name + ' - deploy script');
 console.log(eq);
 console.log();
 console.log('Start time: ' + new Date(Date.now()).toLocaleString());
 console.log();
}

function getNetworkMessage() {
 console.log('Network info:');
 console.log();
 console.log('Chain name:      ' + netInfo['name']);
 console.log('Chain ID:        ' + netInfo['chainID']);
 console.log('Currency:        ' + netInfo['currency'] + ' (' + netInfo['symbol'] + ')');
 console.log('Block explorer:  ' + netInfo['explorer']);
 console.log('Wallet address:  ' + netInfo['walletAddress']);
 console.log('Wallet balance:  ' + netInfo['walletBalance'] + ' ' + netInfo['symbol']);
 console.log();
}

async function deploy() {
 if (arguments.length == 0) {
  console.log('Error: Missing smart contract name');
  console.log();
  return;
 }
 var params = [];
 if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) params.push(arguments[i]);
 const dash = '-'.repeat(arguments[0].length + 10);
 console.log(dash);
 console.log('Contract: ' + arguments[0]);
 console.log(dash);
 console.log();
 const Contract = await ethers.getContractFactory(arguments[0]);
 const contract = await Contract.deploy(...params);
 console.log('Contract TX ID:   ' + contract.deployTransaction.hash);
 console.log('Contract address: ' + contract.address);
 var balance = ethers.utils.formatEther(await (await ethers.getSigners())[0].getBalance()) + ' ' + netInfo['symbol'];
 console.log('Wallet balance:   ' + balance);
 var result = await contract.deployed();
 var receipt = await ethers.provider.getTransactionReceipt(contract.deployTransaction.hash);
 var blockTimestamp = (await ethers.provider.getBlock(receipt.blockNumber)).timestamp;
 console.log('Block number:     ' + receipt.blockNumber.toString());
 console.log('Block timestamp:  ' + blockTimestamp.toString());
 console.log('Gas limit:        ' + result.deployTransaction.gasLimit.toString());
 console.log('Gas used:         ' + receipt.gasUsed);
 console.log('Gas price:        ' + ethers.utils.formatUnits(result.deployTransaction.gasPrice.toString(), 'gwei') + ' gwei');
 console.log('Value sent:       ' + ethers.utils.formatEther(result.deployTransaction.value.toString()) + ' ' + netInfo['symbol']);
 var cost = contract.deployTransaction.gasPrice.mul(receipt.gasUsed);
 totalCost = totalCost.add(cost);
 console.log('Deploy cost:      ' + ethers.utils.formatEther(cost.toString()) + ' ' + netInfo['symbol']);
 console.log();
 var cont = [];
 cont['name'] = arguments[0];
 cont['address'] = contract.address;
 contracts.push(cont);
 console.log('Waiting for ' + confirmNum + ' confirmations...');
 console.log();
 var confirmations = 0;
 var lastConfirmation = -1;
 while (confirmations < confirmNum) {
  confirmations = (await contract.deployTransaction.wait(1)).confirmations;
  if (lastConfirmation != confirmations) console.log('Confirmation: ' + confirmations);
  lastConfirmation = confirmations;
 }
 console.log();
 return result;
}

function getTotalCost() {
 var total = 'Total cost: ' + ethers.utils.formatEther(totalCost.toString()) + ' ' + netInfo['symbol'];
 const eq = '='.repeat(total.length);
 console.log(eq);
 console.log(total);
 console.log(eq);
 console.log();
}

async function getSummary() {
 console.log('===================');
 console.log('Deployed contracts:');
 console.log('===================');
 console.log();
 for (var i = 0; i < contracts.length; i++) {
  console.log(contracts[i]['name'] + ': ' + netInfo['explorer'] + '/address/' + contracts[i]['address']);
 }
 console.log();
 console.log('End time: ' + new Date(Date.now()).toLocaleString());
 console.log();
}

async function collectionAdd(contract, name) {
 console.log('Adding collection: \"' + name + '\"');
 var col = await contract.collectionAdd(name);
 console.log('Waiting for 1 confirmation...');
 await col.wait(1);
 console.log('Done.');
 var receipt = await ethers.provider.getTransactionReceipt(col.hash);
 var cost = col.gasPrice.mul(receipt.gasUsed);
 console.log('Transaction cost: ' + ethers.utils.formatEther(cost.toString()) + ' ' + netInfo['symbol']);
 totalCost = totalCost.add(cost);
 console.log();
 return (await contract.collectionsCount() - 1).toString();
}

async function propertyAdd(contract, collection, name) {
 console.log('Adding property: \"' + name + '\" to collection ID: ' + collection);
 var property = await contract.propertyAdd(collection, name);
 console.log('Waiting for 1 confirmation...');
 await property.wait(1);
 console.log('Done.');
 var receipt = await ethers.provider.getTransactionReceipt(property.hash);
 var cost = property.gasPrice.mul(receipt.gasUsed);
 console.log('Transaction cost: ' + ethers.utils.formatEther(cost.toString()) + ' ' + netInfo['symbol']);
 totalCost = totalCost.add(cost);
 console.log();
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
