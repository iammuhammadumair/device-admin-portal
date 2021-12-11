module.exports = (app) => {
  const multer = require("multer");
  const path = require("path");
  const uuid = require("uuid").v4;

  const {success} =  require('../utils/response.util')

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
    
    return res.send(success({data:{ path: `http://localhost:8000/${req.file.filename}` }}));
  });

  app.use("/api/file", router);
};
