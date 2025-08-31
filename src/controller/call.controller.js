import {
  handleError,
  successMessage,
} from "../helpers/response.error-success.js";
import Call from "../models/call.schema.js";
import Cilent from "../models/cilent.schema.js";
import User from "../models/user.schema.js";
import {
  createCallValidator,
  updateCallValidator,
} from "../validation/call.validation.js";
import mongoose from "mongoose";

class CallController {
  async createCall(req, res) {
    try {
      const { value, error } = createCallValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      if (
        !mongoose.Types.ObjectId.isValid(value.client) ||
        !mongoose.Types.ObjectId.isValid(value.operator)
      ) {
        return handleError(res, "Invalid client or operator id", 400);
      }
      const cilent = await Cilent.findById(value.client)
      if(!cilent)return handleError(res,'Cilent not found',404)
        
      const user = await User.findById(value.operator);
      if (!cilent) return handleError(res, "Cilent not found",404);
      const newCall = await Call.create(value);
      return successMessage(res, newCall, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getCalls(_, res) {
    try {
      const calls = await Call.find();
      return successMessage(res, calls, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getCall(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid call id", 400);
      }
      const call = await Call.findById(id);
      if (!call) {
        return handleError(res, "Call not found", 404);
      }
      return successMessage(res, call, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateCall(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid call id", 400);
      }
      const { value, error } = updateCallValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const updatedCall = await Call.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updatedCall) {
        return handleError(res, "Call not found", 404);
      }
      return successMessage(res, updatedCall, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteCall(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid call id", 400);
      }
      const deletedCall = await Call.findByIdAndDelete(id);
      if (!deletedCall) {
        return handleError(res, "Call not found", 404);
      }
      return successMessage(res, deletedCall, 200);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default CallController;
