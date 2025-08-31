import { Router } from "express";
import CallController from "../controller/call.controller.js";

const router = Router();
const controller = new CallController();

router
  .post("/", controller.createCall)
  .get("/", controller.getCalls)
  .get("/:id", controller.getCall)
  .patch("/:id", controller.updateCall)
  .delete("/:id", controller.deleteCall);

export default router;
