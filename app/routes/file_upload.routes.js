module.exports = (app) => {
  const db = require("../models");
  const FilePaths = db.file_paths;
  const Op = db.Sequelize.Op;
  const multer = require("multer");
  const path = require("path");
  const uuid = require("uuid").v4;

  var router = require("express").Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      const id = uuid();
      const { originalname } = file;
      var fileName = `${id}-${originalname}`;
      cb(null, fileName);
    },
  });

  const upload = multer({ storage });

  router.post("/", upload.single("filePath"), (req, res) => {
    console.log("upload", upload);
    return res.json({ status: "OK", fileName: req.file.filename });
  });

  app.use("/api/file", router);
};
