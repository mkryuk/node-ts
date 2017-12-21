import jwt = require("jsonwebtoken");
import passport = require("passport");
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { Strategy as LocalStrategy } from "passport-local";
import { config } from "../../config";
import { userService } from "./../../services/user.service/user.service";

const secretTokenKey = config.SECRET_TOKEN_KEY;
const localStrategy = new LocalStrategy({
  passwordField: "email",
  usernameField: "username",
}, (username, password, cb) => {
  const user = userService.getUserByUsername(username);
  if (!user || user.email !== password) {
    return cb(new Error("user not found"));
  }
  return cb(null, user);
});

const bearerStrategy = new BearerStrategy(
  (token, cb) => {
    // token comes from header "Authorization: Bearer 123456789"
    // or access_token parameter
    // TODO: could this function be called without token?
    if (token) {
      // check if token is valid and not expired
      jwt.verify(token, secretTokenKey, (err: any, decoded: any) => {
        if (err) {
          return cb(err);
        }
        if (!decoded) {
          return cb(null, false);
        }
        const user = userService.getUserById(decoded.id);
        if (!user) {
          return cb(new Error("user not found"));
        }
        return cb(null, user);
      });
    } else {
      return cb("No token provided");
    }
  });

passport.use(localStrategy);
passport.use(bearerStrategy);

export const passportObj = passport;
