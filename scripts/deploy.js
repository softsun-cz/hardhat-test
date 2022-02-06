const hre = require('hardhat');
const fetch = require('node-fetch');

var netInfo;

async function getNetworkInfo() {
 var arr = [];
 arr['chainID'] = (await ethers.provider.getNetwork()).chainId;
 arr['name'] = 'Unknown';
 arr['rpc'] = 'Unknown';
 arr['currency'] = 'Unknown';
 arr['symbol'] = 'ETH';
 arr['explorer'] = 'https://etherscan.io';
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

async function main() {
 netInfo = await getNetworkInfo();
 console.log('');
 console.log('======================');
 console.log('Sample - deploy script');
 console.log('======================');
 console.log('');
 console.log('Network info:');
 console.log('');
 console.log('Chain name:     ' + netInfo['name']);
 console.log('Chain ID:       ' + netInfo['chainID']);
 console.log('RPC URL:        ' + netInfo['rpc']);
 console.log('Currency:       ' + netInfo['currency'] + ' (' + netInfo['symbol'] + ')');
 console.log('Block explorer: ' + netInfo['explorer']);
 console.log('');
 console.log('');
 console.log('Deploying smart contracts:');
 console.log('');
 var sample = await deploy('Sample');
 /*
 await collectionAdd(sample, 'Piggy');
 var ID = await sample.collectionsCount();
 console.log(ID.toString());
 
 await collectionAdd(sample, 'Duck');
 ID = await sample.collectionsCount();
 console.log(ID.toString());
*/

 /*
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
 */
 // LOG:
 /*
 console.log('');
 console.log('======================================================');
 console.log('| Sample: ' + sample.address + ' |');
 console.log('======================================================');
 */
}

async function deploy() {
 if (arguments.length == 0) {
  console.log('Error: Missing smart contract name');
  console.log('');
  return;
 }
 const confirmNum = 2;
 var dash = '-'.repeat(arguments[0].length);
 console.log(dash);
 console.log(arguments[0]);
 console.log(dash);
 console.log('');
 const Contract = await ethers.getContractFactory(...arguments);
 const contract = await Contract.deploy();
 console.log('TX ID:          ' + contract.deployTransaction.hash);
 console.log('Address:        ' + contract.address);
 //console.log(contract);
 const result = await contract.deployed();
 /*
 console.log('Waiting for ' + i + ' confirmations...' + i);
 for (var i = 0; i <= confirmNum; i++) {
  console.log('Confirmation: ' + i);
  await result.wait(1);
 }
 */
 console.log(result.deployTransaction);
 
 
 


 var balance = await ethers.provider.getBalance(result.deployTransaction.from);
 balance = ethers.utils.formatEther(balance) + chainFound ? ' ' + symbol : ' ETH';
 console.log('Wallet address: ' + result.deployTransaction.from);
 console.log('Wallet balance: ' + balance);
 console.log('Gas limit:      ' + result.deployTransaction.gasLimit.toString());
 console.log('Gas price:      ' + result.deployTransaction.gasPrice.toString());
 console.log("Value sent:     " + result.deployTransaction.value.toString());
 return result;
 
 //console.log(web3.utils.fromWei(balance, 'ether'), 'ETH');

 /*
> block number:        24326744
> block timestamp:     1643318263
> balance:             21.278893990918758695
> gas used:            2183115 (0x214fcb)
> gas price:           2.500000011 gwei
> total cost:          0.005457787524014265 ETH
*/

}

async function collectionAdd(contract, name) {
 console.log('Adding collection: \"' + name + '\"');
 var x = await contract.collectionAdd(name);
 console.log('Waiting...');
 await x.wait(1);
 console.log('Done.');
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
