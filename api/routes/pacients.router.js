const express = require('express');

const PacientService = require('../services/pacient.service');
const AuthService = require('./../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPacientSchema,
  updatePacientSchema,
  getPacientSchema,
} = require('../schemas/pacient.schema');

const router = express.Router();
const pacientService = new PacientService();
const authService = new AuthService();

router.get('/', async (req, res, next) => {
  try {
    const pacients = await pacientService.find();
    res.json(pacients);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getPacientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log({ id });
      const pacient = await pacientService.findOne(id);
      res.json(pacient);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPacientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const creator = req.user.sub;
      const newPacient = await pacientService.create(body, creator);
      res.status(201).json(authService.signToken(newPacient.dataValues.user));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getPacientSchema, 'params'),
  validatorHandler(updatePacientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const pacient = await pacientService.update(id, body);
      res.json(pacient);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
