const express = require('express');
const PacientPermissionService = require('../services/pacientPermission.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const pacientPermissionService = new PacientPermissionService();
const {
  getPacientPermissionSchema,
  createPacientPermissionSchema,
} = require('../schemas/pacientPermission.schema');

router.get('/', checkRoles('pacient'), async (req, res, next) => {
  try {
    const id = req.user.sub;
    console.log(id);

    const permissions = await pacientPermissionService.findPermissions(id);
    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  checkRoles('doctor'),
  validatorHandler(createPacientPermissionSchema, 'body'),
  async (req, res, next) => {
    try {
      if (req.user.role !== 'doctor') {
        res
          .status(403)
          .json({ messages: 'Only doctor can be asociated with pacients' });
      }

      const data = {
        ...req.body,
      };

      const permission = await pacientPermissionService.create(
        data,
        req.user.sub
      );
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  checkRoles('pacient'),
  validatorHandler(getPacientPermissionSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const permission = await pacientPermissionService.togglePermission(id);
      res.json(permission);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
