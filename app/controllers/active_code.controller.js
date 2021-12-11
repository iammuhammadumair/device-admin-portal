const { response } = require("express");
const { ActiveCode, Sequelize } = require("../models");
const {
  internalServerError,
  success,
  unprocessableEntity,
} = require("../utils/response.util");
const Op = Sequelize.Op;

exports.create = async (req, res) => {
  const { codename } = req.body;
  try {
    // Validate request
    if (!codename) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }
    // Create a ActiveCode
    const activeCode = {
      stdate: new Date(),
      endate: new Date(),
      codename: codename,
      // device_Id: "",
    };

    await ActiveCode.create(activeCode);
    return res.send(success({ message: "New Access Code Added" }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }

  // Save ActiveCode in the database
};

// Retrieve all ActiveCode from the database.
exports.findAll = async (req, res) => {
  try {
    const { name } = req.query;
    const condition = name ? { codename: { [Op.like]: `%${name}%` } } : null;

    const codes = await ActiveCode.findAll({ where: condition });
    return res.send(success({ data: codes }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};
// Find a single ActiveCode with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const code = await ActiveCode.findByPk(id);
    return res.send(success({ data: code }));
  } catch (error) {
    console.log("error =>", error);
    return response.internalServerError();
  }
};

// Update a UserDevice by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    await ActiveCode.update({codename  : req.body.codename}, {
      where: { id: id },
    });

    return res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
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
