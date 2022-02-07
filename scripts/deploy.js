const hre = require('hardhat');
const fetch = require('node-fetch');

var netInfo;

async function main() {
 getWelcomeMessage('Sample project');
 netInfo = await getNetworkInfo();
 getNetworkMessage();
 console.log('');
 console.log('Deploying smart contracts ...');
 console.log('');
 var sample = await deploy('Sample');
 var sample2 = await deploy('Sample');
 
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
 // LOG:
 
 console.log('');
 console.log('======================================================');
 console.log('| Sample: ' + sample.address + ' |');
 console.log('======================================================');
}

async function getNetworkInfo() {
 var arr = [];
 const [minter] = await ethers.getSigners();
 arr['chainID'] = (await ethers.provider.getNetwork()).chainId;
 arr['name'] = 'Unknown';
 arr['rpc'] = 'Unknown';
 arr['currency'] = 'Unknown';
 arr['symbol'] = 'ETH';
 arr['explorer'] = 'https://etherscan.io';
 arr['walletAddress'] = minter.address;
 arr['walletBalance'] = ethers.utils.formatEther(await minter.getBalance());
 var response = await fetch('https://chainid.network/chains.json');
 var json = await response.json();
 json = JSON.stringify(json);
 var arrJSON = JSON.parse(json);
 for (var i = 0; i < arrJSON.length; i++) {
  if (arrJSON[i].chainId == arr['chainID']) {
   if (!!arrJSON[i].name) arr['name'] = arrJSON[i].name;
   if (!!arrJSON[i].rpc) arr['rpc'] = arrJSON[i].rpc;
   if (!!arrJSON[i].nativeCurrency.name) arr['currency'] = arrJSON[i].nativeCurrency.name;
   if (!!arrJSON[i].nativeCurrency.symbol) arr['symbol'] = arrJSON[i].nativeCurrency.symbol;
   if (!!arrJSON[i].explorers[0].url) arr['explorer'] = arrJSON[i].explorers[0].url;
  }
 }
 return arr;
}

function getWelcomeMessage(name) {
 const eq = '='.repeat(arguments[0].length + 16);
 console.log('');
 console.log(eq);
 console.log(name + ' - deploy script');
 console.log(eq);
 console.log('');
}

function getNetworkMessage() {
 console.log('Network info:');
 console.log('');
 console.log('Chain name:      ' + netInfo['name']);
 console.log('Chain ID:        ' + netInfo['chainID']);
 console.log('RPC URL:         ' + netInfo['rpc']);
 console.log('Currency:        ' + netInfo['currency'] + ' (' + netInfo['symbol'] + ')');
 console.log('Block explorer:  ' + netInfo['explorer']);
 console.log('Wallet address:  ' + netInfo['walletAddress']);
 console.log('Wallet balance:  ' + netInfo['walletBalance'] + ' ' + netInfo['symbol']);
 console.log('');
}

async function deploy() {
 if (arguments.length == 0) {
  console.log('Error: Missing smart contract name');
  console.log('');
  return;
 }
 const confirmNum = 2;
 const dash = '-'.repeat(arguments[0].length);
 console.log(dash);
 console.log(arguments[0]);
 console.log(dash);
 console.log('');
 const Contract = await ethers.getContractFactory(...arguments);
 const contract = await Contract.deploy();
 console.log('Contract TX ID:   ' + contract.deployTransaction.hash);
 console.log('Contract address: ' + contract.address);
 //console.log(contract);
 const result = await contract.deployed();
 /*
 console.log('Waiting for ' + i + ' confirmations...' + i);
 for (var i = 0; i <= confirmNum; i++) {
  console.log('Confirmation: ' + i);
  await result.wait(1);
 }
 */
 //console.log(result.deployTransaction);
 var balance = await ethers.provider.getBalance(result.deployTransaction.from);
 balance = ethers.utils.formatEther(balance) +  ' ' + netInfo['symbol'];
 console.log('Wallet address: ' + result.deployTransaction.from);
 console.log('Wallet balance: ' + balance);
 console.log('Gas limit:      ' + result.deployTransaction.gasLimit.toString());
 console.log('Gas price:      ' + result.deployTransaction.gasPrice.toString());
 console.log('Value sent:     ' + result.deployTransaction.value.toString());
 console.log('');
 return result;
 //console.log(web3.utils.fromWei(balance, 'ether'), 'ETH');
}

async function collectionAdd(contract, name) {
 console.log('Adding collection: \"' + name + '\"');
 var col = await contract.collectionAdd(name);
 console.log('Waiting for 1 confirmation...');
 await col.wait(1);
 console.log('Done.');
 return (await contract.collectionsCount() - 1).toString();
}

async function propertyAdd(contract, collection, name) {
 console.log('Adding property: \"' + name + '\" to collection ID: ' + collection);
 var property = contract.propertyAdd(collection, name);
 console.log('Done.');
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
