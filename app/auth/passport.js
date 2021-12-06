const passport = require("passport");
const passportJwt = require("passport-jwt");
const db = require("../models");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const User = db.users;

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "meranamemohsinhai",
    },
    function (jwtPayload, done) {
      console.log("HEREEEE");
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          //console.log("fffff", user);
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

module.exports = passport;
