import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();
const controller = new UserController();

router
  .post("/signin", controller.userSignin)
  .post("/new-token", controller.newAccesToken)
  .post("/logout", controller.logOut);

export default router;
