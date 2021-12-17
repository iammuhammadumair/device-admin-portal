// import { request } from "express";
import {
  Setting,
  ActiveDevice,
  Device,
  ActiveCode,
  Sequelize,
  User,
} from "../models";

import {
  internalServerError,
  success,
  unprocessableEntity,
} from "../utils/response.util";

const { Op } = Sequelize;
const create = async (req, res) => {
  const { platform_id, username, password } = req.body;
  try {
    if (!platform_id || !username || !password) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }

    await User.update(
      { platform_id: platform_id },
      {
        where: { id: req.user.id },
      }
    );
    // await Setting.create({ platform_id, username, password, user_id: req.user.id });

    return res.send(success({ data: "Platform updated Successfully" }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

// Retrieve all ActiveCode from the database.
const findAll = async (req, res) => {
  try {
    const name = req.query.name;
    let condition = name ? { name: { [Op.like]: `%${name}%` } } : {};

    const devices = await Device.findAll({
      where: condition,
      order: [["created_at", "DESC"]],
    });
    return res.send(success({ data: devices }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

// Find a single ActiveCode with an id
const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const setting = await Setting.findOne({
      where: {
        id: id,
        user_id: req.user.id,
      },
    });

    return res.send(success({ data: setting || {} }));
  } catch (error) {
    return res.send(internalServerError());
  }
};

// Update a Device by the id in the request
const update = async (req, res) => {
  const { name, mac_code, serial_code } = req.body;
  const id = req.params.id;
  try {
    if (!name || !mac_code || !serial_code) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }

    await Device.update(
      { name, mac_code, serial_code },
      {
        where: { id: id },
      }
    );
    return res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};
// Delete a Device with the specified id in the request
const destroy = (req, res) => {
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
const destroyAll = (req, res) => {
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

const verifyStatus = (req, res) => {
  return res.json(success());
};

export { create, findAll, findOne, update, destroy, destroyAll, verifyStatus };
