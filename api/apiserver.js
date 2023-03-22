const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const app = express();

app.use(cors());
app.use(express.json());
// Setting for Hyperledger Fabric
const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

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

    const result = await contract.evaluateTransaction("GetAllPacients");
    console.log(JSON.parse(result.toString()));
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json(JSON.parse(result.toString()));

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
  }
});

app.get("/api/pacients/:id", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

    const result = await contract.evaluateTransaction(
      "ReadPacient",
      req.params.id
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json(JSON.parse(result.toString()));

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log(`Failed to submit transaction: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/pacients/", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();
    console.log(req.body);
    const result = await contract.evaluateTransaction("GetAllPacients");
    const total = JSON.parse(result.toString()).length;

    const response = await contract.submitTransaction(
      "CreatePacient",
      total + 1,
      req.body.name,
      req.body.lastname,
      req.body.weight,
      req.body.height,
      req.body.bloodType,
      req.body.birthdate,
      req.body.genre
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted ");

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({ error: error });
  }
});

app.put("/api/pacients/:id", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();
    console.log(req.body);
    console.log(req.params.id);

    const response = await contract.submitTransaction(
      "UpdatePacient",
      req.params.id,
      req.body?.name,
      req.body?.lastname,
      req.body?.weight,
      req.body?.height,
      req.body?.bloodType,
      req.body?.birthdate,
      req.body?.genre
    );
    console.log("Transaction has been submitted");
    res.send("Transaction has been submitted ");

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error.messages}`);
    res.status(500).json({ error: error });
  }
});

app.delete("/api/pacients/:id", async function (req, res) {
  try {
    // Get the contract from the network.
    const [contract, gateway] = await getContract();

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
  }
});

app.get("/file", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/filepath", upload.single("doc"), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected",
      });
    } else {
      let HASH = "";
      import("./uploadIPFS.mjs").then(async (module) => {
        HASH = await module.uploadIPFS("uploads/" + req.file.filename);
        res.send({
          status: true,
          message: "File is uploaded",
          data: {
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          },
          link: `https://ipfs.io/ipfs/${HASH}`,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

app.post("/filepathtwo", upload.single("doc"), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected",
      });
    } else {
      let PATH = "";
      import("./uploadIPFStwo.mjs").then(async (module) => {
        PATH = await module.uploadIPFS("uploads/" + req.file.filename);
        console.log(req.file.filename);
        res.sendFile(__dirname + `/uploads/${PATH}`);
        // fs.unlink(__dirname + `/uploads/${PATH}`);
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

app.get("/seefile", async (req, res) => {
  console.log("a");
  res.sendFile(__dirname + "/uploads/cat.jpg");
});

app.listen(8080);
