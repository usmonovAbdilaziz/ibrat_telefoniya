import {
  handleError,
  successMessage,
} from "../helpers/response.error-success.js";
import Client from "../models/cilent.schema.js";
import Lead from "../models/lead.schema.js";
import User from "../models/user.schema.js";
import { createClientValidator, updateClientValidator } from "../validation/cilent.validation.js";
import mongoose from "mongoose";

class ClientController {
  async createCilent(req, res) {
    try {
      const { value, error } = createClientValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const phone = await Client.findOne({ phone_number: value.phone_number });
      if (phone) {
        return handleError(res, "This phone number already exists !!!");
      }
       const lead = await Lead.findById(value.from_lead);
       if (!lead) {
         return handleError(res, 'Lead not found',404);
       }
        const assigned = await User.findById(value.assigned_to);
        if (!assigned) {
          return handleError(res, "User not found", 404);
        }
      const newCilent = await Client.create(value);
      return successMessage(res, newCilent, 201);
    } catch (error) {
      handleError(error);
    }
  }

  async getClients(req, res) {
    try {
      const clients = await Client.find();
      return successMessage(res, clients, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getClient(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid client id", 400);
      }
      const client = await Client.findById(id);
      if (!client) {
        return handleError(res, "Client not found", 404);
      }
      return successMessage(res, client, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid client id", 400);
      }
      const { value, error } = updateClientValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const updatedClient = await Client.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updatedClient) {
        return handleError(res, "Client not found", 404);
      }
      return successMessage(res, updatedClient, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteClient(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid client id", 400);
      }
      const deletedClient = await Client.findByIdAndDelete(id);
      if (!deletedClient) {
        return handleError(res, "Client not found", 404);
      }
      return successMessage(res, deletedClient, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default ClientController;
