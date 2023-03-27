const express = require('express');
const multer = require('multer');

const upload = multer({ dest: process.cwd() + '/uploads' });
const router = express.Router();

router.get('/file', async (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/file.html');
});

router.get('/fileencrypted', async (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/fileencrypted.html');
});

router.post('/uploadfile', upload.single('doc'), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: 'No file is selected',
      });
    } else {
      let HASH = '';
      import('../utilities/ipfs/uploadIPFS.mjs').then(async (module) => {
        HASH = await module.uploadIPFS('../uploads/' + req.file.filename);
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
          },
          link: `https://ipfs.io/ipfs/${HASH}`,
        });
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

router.post('/uploadfileencrypted', upload.single('doc'), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: 'No file is selected',
      });
    } else {
      import('../utils/ipfs/uploadIPFSEncrypted.mjs').then(async (module) => {
        const uploadFifle = await module.uploadIPFS(
          process.cwd() + '/uploads/' + req.file.filename,
          Date.now() + req.file.originalname
        );
        console.log(req.file.filename);
        res.json(uploadFifle);
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

router.get('/downloadfile', async (req, res) => {
  try {
    const { cid, name } = req.body;
    console.log(req.body);
    import('../utils/ipfs/uploadIPFSEncrypted.mjs').then(async (module) => {
      const path = await module.downloadIPFS(name, cid);
      console.log(process.cwd() + '/' + path);
      res.sendFile(process.cwd() + '/' + path);
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

router.get('/seefile', async (req, res) => {
  console.log('a');
  console.log(process.cwd() + '/uploads/cat.pdf');
  res.sendFile(process.cwd() + '/uploads/cat.pdf');
});

module.exports = router;
