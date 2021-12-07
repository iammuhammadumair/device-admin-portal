const db = require("../models");
const FilePaths = db.file_paths;
const Op = db.Sequelize.Op;
const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({ dest: "uploads/" });
//Upload a new file
exports.upload = (req, res) => {
  // Validate request
  const { filePath } = req.body;
  upload.single(filePath);
  console.log("reques", req);
  //   if (!req.body.filePath) {
  //     res.status(400).send({
  //       message: "Content can not be empty!",
  //     });
  //     return;
  //   }

  const file = {
    filePath: filePath,
  };

  return res.json({ status: "ok" });

  // Save User in the database
  //   FilePaths.create(user)
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while creating the User.",
  //       });
  //     });
};
