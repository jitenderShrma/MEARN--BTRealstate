const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../modals/User');

let opts = {};
opts.secretOrKey = 'secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = function (passport) {
  passport.use(new JwtStrategy(
    opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    }
  ));

  // // serialize
  // passport.serializeUser((user, done) => {
  //   done(null, user);
  // });
  // // deserialize
  // passport.deserializeUser((id, done) => {
  //   User.findById(id)
  //     .then(user => {
  //       done(null, user);
  //     })
  // });

}