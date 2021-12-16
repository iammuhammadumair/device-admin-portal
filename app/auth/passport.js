import passport from "passport";
import passportJwt from "passport-jwt";
import { User } from "../models";

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "meranamemohsinhai",
};
const verify = function (jwtPayload, done) {
    console.log('jwtPayload =>' , jwtPayload);
  return User.findOne({ where: { id: jwtPayload.id } })
    .then((user) => {
        console.log('user =>' , user);
      return done(null, user);
    })
    .catch((err) => {
      return done(err);
    });
};
passport.use(new StrategyJwt(options, verify));
export default passport;
