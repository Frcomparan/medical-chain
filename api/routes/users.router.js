const express = require('express');

const UserService = require('./../services/user.service');
const AuthService = require('./../services/auth.service');

const validatorHandler = require('./../middlewares/validator.handler');
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const userService = new UserService();
const authService = new AuthService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await userService.create(body);

      res.status(201).json(authService.signToken(newUser));
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await userService.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
