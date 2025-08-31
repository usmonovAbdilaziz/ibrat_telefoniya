import {
  handleError,
  successMessage,
} from "../helpers/response.error-success.js";
import Lead from "../models/lead.schema.js";
import User from "../models/user.schema.js";
import { createLeadValidator, updateLeadValidator } from "../validation/lead.validation.js";
import mongoose from "mongoose";

class LeadController {
  async createLead(req, res) {
    try {
      const { value, error } = createLeadValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const phone = await Lead.findOne({ phone_number: value.phone_number });
      if (phone) {
        return handleError(res, "This nomer already exists", 409);
      }
      const user = await User.findById(value.created_by);
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      const newNUmber = await Lead.create(value);
      return successMessage(res, newNUmber, 201);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getLeads(req, res) {
    try {
      const leads = await Lead.find();
      return successMessage(res, leads, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getLead(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid lead id", 400);
      }
      const lead = await Lead.findById(id);
      if (!lead) {
        return handleError(res, "Lead not found", 404);
      }
      return successMessage(res, lead, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateLead(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid lead id", 400);
      }
      // Agar validation kerak bo'lsa, createLeadValidator yoki alohida update validatordan foydalaning
      const { value, error } = updateLeadValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const updatedLead = await Lead.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updatedLead) {
        return handleError(res, "Lead not found", 404);
      }
      return successMessage(res, updatedLead, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteLead(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid lead id", 400);
      }
      const deletedLead = await Lead.findByIdAndDelete(id);
      if (!deletedLead) {
        return handleError(res, "Lead not found", 404);
      }
      return successMessage(res, deletedLead, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }
}
export default LeadController;
