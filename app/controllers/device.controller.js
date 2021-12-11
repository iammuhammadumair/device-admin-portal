const {
  Device,
  ActiveDevice,
  ActiveCode,
  Sequelize: { Op },
} = require("../models");
const {
  internalServerError,
  success,
  unprocessableEntity,
} = require("../utils/response.util");
// Create and Save a new UserDevice

exports.create = async (req, res) => {
  const { name, deviceImg } = req.body;
  try {
    if (!name || deviceImg) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }

    await Device.create({ name, deviceImg });
    return res.send(success({ data: "New Device Added Successfully" }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

// Retrieve all ActiveCode from the database.
exports.findAll = async (req, res) => {
  try {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : {};

    const devices = await Device.findAll({
      where: condition,
      order: [["createdAt", "DESC"]],
    });
    return res.send(success({ data: devices }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

// Find a single ActiveCode with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const device = await Device.findByPk(id);

    return res.send(success({ data: device }));
  } catch (error) {
    return res.send(internalServerError());
  }
};

// Update a Device by the id in the request
exports.update = async (req, res) => {
  const { name, deviceImg } = req.body;
  const id = req.params.id;
  try {
    if (!name || !deviceImg) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }

    await Device.update({name , deviceImg}, {
      where: { id: id },
    });
    return res.send(success());
  } catch (error) {
      console.log('error =>', error);
    return res.send(internalServerError());
  }
};
// Delete a Device with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Device.destroy({
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
// Delete all Device from the database.
exports.deleteAll = (req, res) => {
  Device.destroy({
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

exports.availables = async (req, res) => {
  try {
    const { id } = req.query;
    let activeDevice = new ActiveDevice();
    let deviceIdCheck = {};
    let codeIdCheck = {};
    if (id) {
      activeDevice = await ActiveDevice.findOne({ where: { id } });

      if (activeDevice) {
        deviceIdCheck = { id: activeDevice.deviceId };
        codeIdCheck = { id: activeDevice.codeId };
      }
    }

    const devices = await Device.findAll({
      attributes: [
        ["id", "value"],
        ["name", "label"],
      ],
      include: [
        {
          model: ActiveDevice,
          as: "active_device",
          required: false,
          attributes: [],
        },
      ],
      where: {
        [Op.or]: {
          ...deviceIdCheck,
          "$active_device.id$": { [Op.is]: null },
        },
      },
    });

    const codes = await ActiveCode.findAll({
      attributes: [
        ["id", "value"],
        ["codename", "label"],
      ],

      include: [
        {
          model: ActiveDevice,
          as: "active_device",
          required: false,
          attributes: [],
        },
      ],
      where: {
        [Op.or]: {
          ...codeIdCheck,
          "$active_device.id$": { [Op.is]: null },
        },
      },
    });

    return res.send(
      success({
        data: {
          devices,
          codes,
          activeDevice,
        },
      })
    );
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};
