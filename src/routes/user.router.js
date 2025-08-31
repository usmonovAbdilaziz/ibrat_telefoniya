import { Router } from "express";
import UserController from "../controller/user.controller.js";
import { AuthGuard } from "../guard/auth.guard.js";
import { RolesGuard } from "../guard/roles.guard.js";

const router = Router();
const controller = new UserController();

router
  .post("/",AuthGuard,controller.createUser)
  .get("/", AuthGuard,controller.getUsers)
  .get("/:id",AuthGuard, controller.getUserById)
  .patch("/:id",AuthGuard, controller.updateUser)
  .delete("/:id",AuthGuard, RolesGuard(['admin']),controller.deleteUser);

export default router;
