const hre = require("hardhat");

async function main() {
 var contracts = ['Sample'];
 for (var i = 0; i < contracts.length; i++) var contract[i] = await deploy(contract[i]);
 /*
 await collectionAdd(sample, 'Piggy');
 var ID = await sample.getCollectionsCount();
 console.log(ID.toString());
 await collectionAdd(sample, 'Duck');
 ID = await sample.getCollectionsCount();
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
 console.log('');
 console.log('===================================================');
 for (var i = 0; i < contracts.length; i++) console.log('| ' + contract[i] + ': ' + contract[i].address + ' |');
 console.log('===================================================');
}

async function deploy(name) {
 var dash = '-'.repeat(name.length + 11);
 console.log(dash);
 console.log('Deploying: ' + name);
 console.log(dash);
 const Contract = await ethers.getContractFactory(name);
 const contract = await Contract.deploy();
 console.log('TX ID:   ' + contract.deployTransaction.hash);
 console.log('Address: ' + contract.address);
 //console.log(contract);
 const result = await contract.deployed();
 //console.log(result);
 return result;
}

async function collectionAdd(contract, name) {
 console.log('Adding collection: \"' + name + '\"');
 var x = await contract.collectionAdd(name);
 console.log('Waiting...');
 x.wait();
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
