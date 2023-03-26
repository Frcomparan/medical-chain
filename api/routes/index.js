const express = require('express');
const cbPacientsRouter = require('./pacientsContract.router');
const ipfsFileRouter = require('./ipfsFile.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const pacientsRouter = require('./pacient.router');
const passport = require('passport');

function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/bcpacients', cbPacientsRouter);
  router.use('/ipfs', ipfsFileRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/pacients', pacientsRouter);
}

module.exports = routerApi;
