const db = require("../models");
const ActiveDevice = db.active_devices;
const Op = db.Sequelize.Op;

// Create and Save a new UserDevice
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.deviceId || !req.body.codeId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ActiveDevice
  const activeDevice = {
    deviceId: req.body.deviceId,
    codeId: req.body.codeId,
    activeDate: new Date(req.body.activeDate),
  };
  console.log("AAAAAAA", activeDevice);
  // Save ActiveDevice in the database
  await ActiveDevice.create(activeDevice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Active Device.",
      });
    });
};

// Retrieve all ActiveDevice from the database.
exports.findAll = (req, res) => {
  const deviceId = req.query.deviceId;
  var condition = deviceId
    ? { deviceId: { [Op.like]: `%${deviceId}%` } }
    : null;

  ActiveDevice.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Devices.",
      });
    });
};
// Find a single ActiveDevice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ActiveDevice.findByPk(id)
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
        message: "Error retrieving UserDevice with id=" + id,
      });
    });
};

// Update a UserDevice by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Create a ActiveDevice
  const activeDevice = {
    deviceId: req.body.deviceId,
    codeId: req.body.codeId,
    activeDate: new Date(req.body.activeDate),
  };

  ActiveDevice.update(activeDevice, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Active Device was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Active Device with id=${id}. Maybe ActiveDevice was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Active Device with id=" + id,
      });
    });
};
// Delete a ActiveDevice with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ActiveDevice.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Active Device was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ActiveDevice with id=${id}. Maybe ActiveDevice was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ActiveDevice with id=" + id,
      });
    });
};
// Delete all ActiveDevice from the database.
exports.deleteAll = (req, res) => {
  ActiveDevice.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Active Device were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Active Device.",
      });
    });
};
