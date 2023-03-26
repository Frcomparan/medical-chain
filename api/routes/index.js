const express = require('express');
const pacientsRouter = require('./pacientsContract.router');
const ipfsFileRouter = require('./ipfsFile.router');
const usersRouter = require('./users.router');

function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/pacients', pacientsRouter);
  router.use('/ipfs', ipfsFileRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
