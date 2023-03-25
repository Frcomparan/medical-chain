const getContract = require("../utilities/hyperledger/contracConnection.js");
const express = require("express");

const router = express.Router();

router.get("/", async function (req, res) {
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

router.get("/:id", async function (req, res) {
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

router.post("/", async function (req, res) {
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

router.put("/:id", async function (req, res) {
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

router.delete("/:id", async function (req, res) {
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

module.exports = router;
