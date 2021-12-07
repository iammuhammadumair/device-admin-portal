const db = require("../models");
const ActiveCode = db.active_codes;
const Op = db.Sequelize.Op;

// Create and Save a new UserDevice
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.codename) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a ActiveCode
  const activeCode = {
    stdate: new Date(req.body.stdate),
    endate: new Date(req.body.endate),
    codename: req.body.codename,
    device_Id: "",
  };

  // Save ActiveCode in the database
  await ActiveCode.create(activeCode)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ActiveCode.",
      });
    });
};

// Retrieve all ActiveCode from the database.
exports.findAll = (req, res) => {
  const name = req.query.codename;
  var condition = name ? { codename: { [Op.like]: `%${name}%` } } : null;

  ActiveCode.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userDevices.",
      });
    });
};
// Find a single ActiveCode with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ActiveCode.findByPk(id)
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

  ActiveCode.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Active Code was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ActiveCode with id=${id}. Maybe ActiveCode was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ActiveCode with id=" + id,
      });
    });
};
// Delete a ActiveCode with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ActiveCode.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ActiveCode was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ActiveCode with id=${id}. Maybe ActiveCode was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ActiveCode with id=" + id,
      });
    });
};
// Delete all ActiveCode from the database.
exports.deleteAll = (req, res) => {
  ActiveCode.destroy({
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
          err.message || "Some error occurred while removing all ActiveCode.",
      });
    });
};

