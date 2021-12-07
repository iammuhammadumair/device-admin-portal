const { use } = require("passport");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

//REgister NEw USEr
exports.register = async (req, res) => {
  // Validate request

  if (!req.body.userName || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const reqName = req.body.userName;
  const reqemail = req.body.email;
  const { userName, email, password } = req.body;

  const userAlreadyExist = await User.findOne({
    where: { email },
  }).catch((err) => {
    console.log("Error", err);
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  });

  if (userAlreadyExist != null) {
    res.status(400).send({
      message: "Duplicate  Email.",
    });
    return;
  }

  // Create a User
  const user = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

//LOGIN USER

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log("AAAAA", email, password);
  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while Lgoin the User.",
      });
    }
  );

  if (!userWithEmail) {
    res.status(400).send({
      message: "Email or Password does not match",
    });
    return;
  }

  // console.log("BBBb", userWithEmail);
  if (userWithEmail.password !== password) {
    res.status(400).send({
      message: "Email or Password does not match",
    });
    return;
  }
  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      email: userWithEmail.email,
    },
    "meranamemohsinhai"
  );
  console.log("jwtToken", jwtToken);
  res.status(200).send({
    message: "Welcome Back",
    token: jwtToken,
  });
  return;
};

// Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   User.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     });
// };
// // Find a single User with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   User.findByPk(id)
//     .then((data) => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find User with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + id,
//       });
//     });
// };

// // Update a User by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   User.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id,
//       });
//     });
// };
// // Delete a User with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   User.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id,
//       });
//     });
// };
// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all users.",
//       });
//     });
// };
// Find all published Users
// exports.findAllPublished = (req, res) => {
//   User.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving users.",
//       });
//     });
// };
