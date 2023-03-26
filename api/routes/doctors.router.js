const express = require('express');

const DoctorService = require('../services/doctor.service');
const AuthService = require('./../services/auth.service');

const validatorHandler = require('../middlewares/validator.handler');
const {
  createDoctorSchema,
  updateDoctorSchema,
  getDoctorSchema,
} = require('../schemas/doctor.schema');

const router = express.Router();
const doctorService = new DoctorService();
const authService = new AuthService();

router.get('/', async (req, res, next) => {
  try {
    const pacients = await doctorService.find();
    res.json(pacients);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getDoctorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log({ id });
      const doctor = await doctorService.findOne(id);
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createDoctorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newDoctor = await doctorService.create(body);
      res.status(201).json(authService.signToken(newDoctor.dataValues.user));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getDoctorSchema, 'params'),
  validatorHandler(updateDoctorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const doctor = await doctorService.update(id, body);
      res.json(doctor);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
