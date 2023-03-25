const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "../uploads" });
const router = express.Router();

router.get("/file", async (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/index.html");
});

router.post("/filepath", upload.single("doc"), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected",
      });
    } else {
      let HASH = "";
      import("../utilities/ipfs/uploadIPFStwo.mjs").then(async (module) => {
        HASH = await module.uploadIPFS("../uploads/" + req.file.filename);
        res.send({
          status: true,
          message: "File is uploaded",
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

router.post("/filepathtwo", upload.single("doc"), async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;

    if (!file) {
      res.status(400).send({
        status: false,
        data: "No file is selected",
      });
    } else {
      let PATH = "";
      import("./utilities/ipfs/uploadIPFStwo.mjs").then(async (module) => {
        PATH = await module.uploadIPFS("uploads/" + req.file.filename);
        console.log(req.file.filename);
        res.sendFile(__dirname + `/uploads/${PATH}`);
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
});

router.get("/seefile", async (req, res) => {
  console.log("a");
  console.log(process.cwd() + "/uploads/cat.pdf");
  res.sendFile(process.cwd() + "/uploads/cat.pdf");
});

module.exports = router;
