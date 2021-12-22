import { unauthorized } from "../utils/response.util";
import passport from "../../app/auth/passport.js";

const authenticate = function (req, res, next) {
  passport.authenticate("jwt", function (err, user, info) {
    if (err) {
      console.log("here");
      return next(err);
    }
    console.log('user =>' , user )

    if (!user) {
      return res.send(unauthorized());
    }
    console.log('here' )
    console.log('user =>',  user)
    req.user = user;
    return next();
  })(req, res, next);
};

export default authenticate;
