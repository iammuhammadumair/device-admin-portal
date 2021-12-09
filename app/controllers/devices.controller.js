const db = require("../models");
const Devices = db.devices;
const Op = db.Sequelize.Op;

// Create and Save a new UserDevice
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Devices
  const devices = {
    name: req.body.name,
    deviceImg: req.body.deviceImg,
  };

  // Save devices in the database
  await Devices.create(devices)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the devices.",
      });
    });
};

// Retrieve all ActiveCode from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Devices.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving name.",
      });
    });
};
// Find a single ActiveCode with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Devices.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Active Code with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Device with id=" + id,
      });
    });
};

// Update a Device by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Devices.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Device was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Device with id=${id}. Maybe Device was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Device with ",
      });
    });
};
// Delete a Devices with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Devices.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Device was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Device . Maybe Device was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Device",
      });
    });
};
// Delete all Devices from the database.
exports.deleteAll = (req, res) => {
  Devices.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} ActiveCode were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Device.",
      });
    });
};
