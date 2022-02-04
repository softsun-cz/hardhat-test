const hre = require("hardhat");

async function main() {
 const Sample = await ethers.getContractFactory('Sample');
 const sample = await Sample.deploy();
 await sample.deployed();
 console.log();
 console.log('Sample:', sample.address);
/*
 var piggy = await sample.collectionAdd.call('Piggy');
 piggy = await piggy.toString();
 console.log(piggy);
 var duck = await sample.collectionAdd.call('Duck');
 duck = await duck.toString();
 console.log(duck);
 await sample.propertyAdd(piggy, 'Body');
 await sample.propertyAdd(piggy, 'Ears');
 await sample.propertyAdd(piggy, 'Eyes');
 await sample.propertyAdd(piggy, 'Snout');
 await sample.propertyAdd(piggy, 'Mouth');
 await sample.propertyAdd(piggy, 'Tail');
 await sample.propertyAdd(duck, 'Body');
 await sample.propertyAdd(duck, 'Eyes');
 await sample.propertyAdd(duck, 'Beak');
 await sample.propertyAdd(duck, 'Wings');
 */
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });
