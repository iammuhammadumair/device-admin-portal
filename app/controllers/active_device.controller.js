
import {
  ActiveDevice,
  Sequelize,
  Device,
  ActiveCode,
} from "../models/index.js";

import {
  internalServerError,
  success,
  unprocessableEntity,
} from "../utils/response.util.js";

const {Op} = Sequelize;
// Create and Save a new UserDevice
const create = async (req, res) => {
  const { deviceId, codeId, activeDate } = req.body;
  try {
    if (!deviceId || !codeId || !activeDate) {
      return res.send(
        unprocessableEntity({ message: "Content can not be empty!" })
      );
    }

    const activeDevice = {
      deviceId: deviceId,
      codeId: codeId,
      activeDate: activeDate,
    };

    await ActiveDevice.create(activeDevice);
    return res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

// Retrieve all ActiveDevice from the database.
const findAll = async (req, res) => {
  try {
    const { deviceId, activation } = req.query;
    let condition = deviceId
      ? { deviceId: { [Op.like]: `%${deviceId}%` } }
      : {};
    condition =
      activation == 1
        ? {
            ...condition,
            activeDate: {
              [Op.gte]: new Date(),
            },
          }
        : condition;
    const devices = await ActiveDevice.findAll({
      where: condition,

      include: [
        {
          model: Device,
          as: "device",
          required: false,
        },
        {
          model: ActiveCode,
          as: "code",
          required: false,
        },
      ],
    });
    return res.send(success({ data: devices }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};
// Find a single ActiveDevice with an id
const findOne = (req, res) => {
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
const update = async (req, res) => {
  const id = req.params.id;
  const { deviceId, codeId, activeDate } = req.body;
  try {
    const activeDevice = {
      deviceId: deviceId,
      codeId: codeId,
      activeDate: activeDate,
    };
    await ActiveDevice.update(activeDevice, {
      where: { id: id },
    });
    return res.send(success({ message: "Active Device was updated successfully." }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};
// Delete a ActiveDevice with the specified id in the request
const destroy = (req, res) => {
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
const destroyAll = (req, res) => {
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

export {
    create,
    findAll,
    findOne,
    update,
    destroy,
    destroyAll
}