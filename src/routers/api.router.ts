import * as express from "express";
export let router = express.Router();

import { homeRouter } from "./api.home";
import { loginRouter } from "./api.login";
import { usersRouter } from "./api.users";

// enable CORS
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

// API for home
// Router for /api/home
router.use("/home", homeRouter);

// API for users
// Router for /api/users
router.use("/users", usersRouter);

// API for login
// Router for /api/login
router.use("/login", loginRouter);
