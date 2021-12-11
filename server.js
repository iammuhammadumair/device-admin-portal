const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static('uploads'))

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
const passport = require("./app/auth/passport");

// parse requests of content-type - application/json

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const db = require("./app/models");
require("./app/routes/index")(app);

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// app.get('/:path' , (req ,  res) => {
//     console.log('req=>',req.params);

//     // if (err) return console.log(err)
 
//     // res.contentType('image/png');
//     console.log('req.params.path' , req.params.path);
//     res.send(req.params.path)
// })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(err)
    }
  }
app.use(clientErrorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
