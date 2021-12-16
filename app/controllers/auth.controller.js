import { User } from "../models";
import jwt from "jsonwebtoken";
import {
  unprocessableEntity,
  success,
  internalServerError,
} from "../utils/response.util";
import { encrypt, compare } from "../utils/bcrypt.util";

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
export {
    login,
    register
}