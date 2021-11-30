const db = require("../models");
const DeviceCode = db.device_codes;
const Op = db.Sequelize.Op;

// Create and Save a new DeviceCode
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a DeviceCode
  const deviceCode = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save DeviceCode in the database
  DeviceCode.create(deviceCode)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DeviceCode.",
      });
    });
};

// Retrieve all DeviceCodes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    DeviceCode.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving deviceCodes."
        });
      });
  };
// Find a single DeviceCode with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    DeviceCode.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find DeviceCode with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving DeviceCode with id=" + id
        });
      });
  };

// Update a DeviceCode by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    DeviceCode.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "DeviceCode was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update DeviceCode with id=${id}. Maybe DeviceCode was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating DeviceCode with id=" + id
        });
      });
  };
// Delete a DeviceCode with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    DeviceCode.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "DeviceCode was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete DeviceCode with id=${id}. Maybe DeviceCode was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete DeviceCode with id=" + id
        });
      });
  };
// Delete all DeviceCodes from the database.
exports.deleteAll = (req, res) => {
    DeviceCode.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} DeviceCodes were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all deviceCodes."
        });
      });
  };
// Find all published DeviceCodes
exports.findAllPublished = (req, res) => {
    DeviceCode.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving deviceCodes."
        });
      });
  };
