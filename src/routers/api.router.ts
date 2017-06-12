import * as express from "express";
import * as homeController from "../controllers/home.controller";
export let router = express.Router();

// enable CORS
// router.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//   );
//   next();
// });

router.route("/index")
  .get(homeController.index);
