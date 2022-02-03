import multer from "multer";
// import path from "path";
// import uuid from "uuid";
// import {uuid} from "uuid"._v4
import {Router} from 'express';
import  {success} from  '../utils/response.util.js'
export default (app) => {


  var router = Router();

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
    //   const id = uuid();
      const id = time();
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
