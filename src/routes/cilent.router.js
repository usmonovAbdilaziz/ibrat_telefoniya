import { Router } from "express";
import CilentController from "../controller/cilent.controller.js";

const router = Router();
const controller = new CilentController();

router
  .post("/", controller.createCilent)
  .get("/", controller.getClients)
  .get("/:id", controller.getClient)
  .patch("/:id", controller.updateClient)
  .delete("/:id", controller.deleteClient);

export default router;
