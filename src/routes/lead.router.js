import { Router } from "express";
import LeadController from "../controller/lead.controller.js";

const router = Router();
const controller = new LeadController();

router
  .post("/", controller.createLead)
  .get("/", controller.getLeads)
  .get("/:id", controller.getLead)
  .patch("/:id", controller.updateLead)
  .delete("/:id", controller.deleteLead);

export default router;
