import { unauthorized } from "../utils/response.util";
import passport from "../../app/auth/passport.js";

const authenticate = function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      console.log("here");
      return next(err);
    }

    if (!user) {
      return res.json(unauthorized());
    }
    req.user = user;
    return next();
  })(req, res, next);
};

export default authenticate;
