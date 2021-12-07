module.exports = (app) => {
  // const filePath = require("../controllers/file_upload.controller.js");
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
      const ext = path.extname(file.originalname);
      const id = uuid();
      const filePath = `images/${id}${ext}`;

      FilePaths.create(filePath)
        .then((data) => {
          cb(null, filePath);
          // res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
        });
    },
  });

  const upload = multer({ storage });
  // Create a new User Device
  router.post("/", upload.single("filePath"), (req, res) => {
    console.log("reques", req.file);
    return;
    //const { filePath } = req.body;
    // upload.single(filePath);
  });

  app.use("/api/file", router);
};
