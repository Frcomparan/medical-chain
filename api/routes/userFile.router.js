const express = require('express');
const multer = require('multer');

const UserFileService = require('./../services/userFile.service');
const AuthService = require('./../services/auth.service');

const validatorHandler = require('./../middlewares/validator.handler');
const {
  createUserFileSchema,
  getUserFileSchema,
} = require('./../schemas/userFile.schema');
const { NUMBER } = require('sequelize');

const router = express.Router();
const upload = multer({ dest: process.cwd() + '/uploads' });
const userFileService = new UserFileService();
const authService = new AuthService();

router.get('/', async (req, res, next) => {
  try {
    const userFiles = await userFileService.find();
    res.json(userFiles);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getUserFileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userFile = await userFileService.findOne(id);
      res.json(userFile);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', upload.single('doc'), async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: 'No file is selected',
      });
    } else {
      import('../utils/ipfs/uploadIPFSEncrypted.mjs').then(async (module) => {
        let uploadFile = await module.uploadIPFS(
          process.cwd() + '/uploads/' + req.file.filename,
          Date.now() + '_' + req.file.originalname
        );
        console.log(req.user);
        let HASH = uploadFile.hash;
        uploadFile = {
          ...uploadFile,
          hash: `${HASH}`,
          originalSize: (file.size / 1024 / 1024).toFixed(4),
          userId: req.user?.sub,
        };
        console.log(uploadFile);
        const newUserFile = await userFileService.create(uploadFile);
        res.status(201).json({ newUserFile });
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
