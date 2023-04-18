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
const { checkRoles } = require('../middlewares/auth.handler');

router.get('/', checkRoles('admin'), async (req, res, next) => {
  try {
    const userFiles = await userFileService.find();
    res.json(userFiles);
  } catch (error) {
    next(error);
  }
});

router.get('/pacient', async (req, res, next) => {
  try {
    let userId = -1;
    console.log(req.user);

    if (req.user.role == 'pacient') {
      userId = req.user.sub;
    } else {
      userId = req.body.userId;
    }
    const userFiles = await userFileService.findByPacient(userId);
    res.json(userFiles);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  checkRoles('admin', 'doctor', 'pacient'),
  validatorHandler(getUserFileSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userFile = await userFileService.findOne(id);
      const { hash, name } = userFile;
      console.log(userFile);
      import('../utils/ipfs/uploadIPFSEncrypted.mjs').then((module) => {
        module.downloadIPFS(name, hash).then((path) => {
          console.log(process.cwd() + '/' + path);
          res.sendFile(process.cwd() + '/' + path);
        });
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkRoles('admin', 'doctor'),
  upload.single('doc'),
  async (req, res, next) => {
    try {
      const file = req.file;
      const { userId } = req.body;

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
            originalSize: file.size,
            userId,
          };
          const newUserFile = await userFileService.create(uploadFile);
          if (newUserFile.errors) {
            res.status(400).json({ ...newUserFile });
          }
          res.status(201).json({ newUserFile });
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
