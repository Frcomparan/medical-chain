var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
// Setting for Hyperledger Fabric
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
//const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const getContract = async () => {
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "test-network",
    "organizations",
    "peerOrganizations",
    "org1.example.com",
    "connection-org1.json"
  );

  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const identity = await wallet.get("appUser");
  if (!identity) {
    console.log(
      'An identity for the user "appUser" does not exist in the wallet'
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: "appUser",
    discovery: { enabled: true, asLocalhost: true },
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");

  // Get the contract from the network.
  const contract = network.getContract("pacientCRUD");
  return [contract, gateway];
};

app.get("/api/pacients", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')

    const result = await contract.evaluateTransaction("GetAllPacients");
    console.log(JSON.parse(result.toString()));
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: JSON.parse(result.toString()) });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    // process.exit(1);
  }
});

app.get("/api/pacients/:id", async function (req, res) {
  try {
    const [contract, gateway] = await getContract();

    // Evaluate the specified transaction.
    // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
    // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
    const result = await contract.evaluateTransaction(
      "ReadPacient",
      req.params.id
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: JSON.parse(result.toString()) });
  } catch (error) {
    console.log(`Failed to submit transaction: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/pacients/", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    const response = await contract.submitTransaction(
      "CreatePacient",
      req.body.id,
      req.body.name,
      req.body.lastname,
      req.body.weight,
      req.body.height,
      req.body.bloodType
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted ");
    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({ error: error });
    // process.exit(1);
  }
});

app.put("/api/pacients/:id", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    const response = await contract.submitTransaction(
      "UpdatePacient",
      req.params.id,
      req.body?.name,
      req.body?.lastname,
      req.body?.weight,
      req.body?.height,
      req.body?.bloodType
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted ");
    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error.messages}`);
    res.status(500).json({ error: error.responses[0].response });
    // process.exit(1);
  }
});

app.delete("/api/pacients/:id", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    const response = await contract.submitTransaction(
      "DeletePacient",
      req.params.id
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted ");
    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error.messages}`);
    res.status(500).json({ error: error.responses[0].response });
    // process.exit(1);
  }
});

app.listen(8080);
