// import { request } from "express";
import { User } from "../models";
import { encrypt } from "../utils/bcrypt.util";

import {
  internalServerError,
  success,
  unprocessableEntity,
} from "../utils/response.util";

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

const password = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await encrypt(password);
    await User.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );
    return res.send(success({ message: "Password Updated Successfully" }));
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

const verifyStatus = (req, res) => {
  return res.json(success());
};


const profile = async (req, res) => {
    try {
        console.log('req.user.id =>' ,  req.user)
      const user = await User.findOne({
        where: req.user.id,
      });

      return res.send(success({
        data: user,
      }));
    } catch (error) {
      console.log("error =>", error);
      return res.send(internalServerError({
          message: error.message
      }));
    }
  };

export { create, verifyStatus, password , profile };
