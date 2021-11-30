const db = require("../models");
const UserDevice = db.user_devices;
const Op = db.Sequelize.Op;

// Create and Save a new UserDevice
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a UserDevice
  const userDevice = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save UserDevice in the database
  UserDevice.create(userDevice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserDevice.",
      });
    });
};

// Retrieve all UserDevices from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    UserDevice.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userDevices."
        });
      });
  };
// Find a single UserDevice with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    UserDevice.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find UserDevice with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving UserDevice with id=" + id
        });
      });
  };

// Update a UserDevice by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    UserDevice.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserDevice was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update UserDevice with id=${id}. Maybe UserDevice was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating UserDevice with id=" + id
        });
      });
  };
// Delete a UserDevice with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    UserDevice.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "UserDevice was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete UserDevice with id=${id}. Maybe UserDevice was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete UserDevice with id=" + id
        });
      });
  };
// Delete all UserDevices from the database.
exports.deleteAll = (req, res) => {
    UserDevice.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} UserDevices were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all userDevices."
        });
      });
  };
// Find all published UserDevices
exports.findAllPublished = (req, res) => {
    UserDevice.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userDevices."
        });
      });
  };
