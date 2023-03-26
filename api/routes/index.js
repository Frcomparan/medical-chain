const express = require('express');
const pacientsRouter = require('./pacientsContract.router');
const ipfsFileRouter = require('./ipfsFile.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const passport = require('passport');

function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/pacients', pacientsRouter);
  router.use('/ipfs', ipfsFileRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
