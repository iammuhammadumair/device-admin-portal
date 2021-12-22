import { User } from "../models";
import jwt from "jsonwebtoken";

import {
  unprocessableEntity,
  success,
  internalServerError,
} from "../utils/response.util";
import { encrypt, compare } from "../utils/bcrypt.util";
import sendEmail from "../utils/email.util";

import crypto from "crypto";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const emailExist = await User.findOne({
      where: { email },
    });
    if (emailExist)
      return await res.send(
        unprocessableEntity({ message: "Email already exist." })
      );
    const hashedPassword = await encrypt(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return await res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return await res.send(internalServerError());
  }
};

//LOGIN USER

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.send(
        unprocessableEntity({
          message: "Invalid user credentials",
        })
      );
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      return res.send(
        unprocessableEntity({
          message: "Invalid user credentials",
        })
      );
    }
    const jwtToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "meranamemohsinhai"
    );
    return res.send(
      success({
        data: {
          token: jwtToken,
        },
      })
    );
  } catch (error) {
    return res.send(
      internalServerError({
        message: "Some error occurred while Lgoin the User.",
      })
    );
  }
};

const requestForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.send(unprocessableEntity({ message: "User not found" }));
    }
    const token = crypto.randomBytes(80).toString("hex");
    await user.update({
      reset_token: token,
    });

    await sendEmail({
      template: "email",
      subject: "Forgot Password Request",
      context: {
        links: `http://localhost:3000/reset-password?token=${token}`,
      },
      email: email,
    });
    return res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query || {};
    const { password } = req.body;

    if (!token) {
      return res.send(
        unprocessableEntity({
          message: "Invalid reset password token",
        })
      );
    }

    const user = await User.findOne({
      where: {
        reset_token: token,
      },
    });

    if (!user) {
      return res.send(
        unprocessableEntity({
          message: "Invalid reset password request",
        })
      );
    }

    const hashedPassword = await encrypt(password);
    await user.update({
      reset_token: null,
      password: hashedPassword,
    });

    return res.send(success());
  } catch (error) {
    console.log("error =>", error);
    return res.send(internalServerError());
  }
};


export { login, register, requestForgotPassword, resetPassword  };
