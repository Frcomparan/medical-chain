const express = require("express");
const pacientesRouter = require("./pacientsContract.router");
const ipfsFileRouter = require("./ipfsFile.router");

function routerApi(app) {
  const router = express.Router();

  app.use("/api", router);
  router.use("/pacients", pacientesRouter);
  router.use("/ipfs", ipfsFileRouter);
}

module.exports = routerApi;
