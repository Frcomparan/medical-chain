const express = require('express');
const cbPacientsRouter = require('./pacientsContract.router');
const ipfsFileRouter = require('./ipfsFile.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const pacientsRouter = require('./pacients.router');
const doctorsRouter = require('./doctors.router');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');

function routerApi(app) {
  const router = express.Router();

  app.use('/api', router);
  router.use('/bcpacients', cbPacientsRouter);
  router.use('/ipfs', ipfsFileRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use(
    '/pacients',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin', 'doctor'),
    pacientsRouter
  );
  router.use(
    '/doctors',
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    doctorsRouter
  );
}

module.exports = routerApi;
