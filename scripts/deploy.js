//const hre = require("hardhat");

async function main() {
 await deployer.deploy(Sample);
 const sample = await Sample.deployed();
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
/*
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");
  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
*/
}

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
