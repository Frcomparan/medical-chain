const express = require('express');
const PacientService = require('../services/pacient.service');

const router = express.Router();
const pacientService = new PacientService();

router.get('/', async (req, res, next) => {
  try {
    const id = req.user.sub;
    console.log(id);

    const permissions = await pacientService.findPermissions(id);
    res.json(permissions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
