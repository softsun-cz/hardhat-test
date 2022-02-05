const hre = require("hardhat");

async function main() {
 var sample = await deploy('Sample');
 var piggy = await collectionAdd(sample, 'Piggy');
 //console.log(piggy);
 var duck = await collectionAdd(sample, 'Duck');
 //console.log(duck);
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
 var collection = await contract.collectionAdd(name).call;
 console.log('Done.');
 console.log(collection);
 return collection; //.value.toString();
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
