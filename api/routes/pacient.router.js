const express = require('express');

const PacientService = require('../services/pacient.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPacientSchema,
  updatePacientSchema,
  getPacientSchema,
} = require('../schemas/pacient.schema');

const router = express.Router();
const service = new PacientService();

router.get('/', async (req, res, next) => {
  try {
    const pacients = await service.find();
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
      const pacient = await service.findOne(id);
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
      const newPacient = await service.create(body);
      res.status(201).json(newPacient);
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
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
