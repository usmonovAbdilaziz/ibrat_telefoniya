import mongoose from "mongoose";
import User from "../models/user.schema.js";
import { Crypto } from "../utils/hashed.pass.js";
import {
  handleError,
  successMessage,
} from "../helpers/response.error-success.js";
import {
  createUserValidator,
  signingValidator,
  updateUserValidator,
} from "../validation/user.validation.js";
import { Token } from "../utils/generate-token.js";
import config from "../config/config.js";

const token = new Token();

const crypto = new Crypto();

class UserController {
  async createUser(req, res) {
    try {
      const { value, error } = createUserValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      const existingUser = await User.findOne({ username: value.username }); //User usernamesini qidirmoqda
      if (existingUser) {
        return handleError(res, "Username already exists !!!", 409);
      }
      const hashedPass = await crypto.encrypt(value.password);
      const newUser = await User.create({
        ...value,
        password: hashedPass,
      });
      return successMessage(res, newUser, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }
  //login qismi
  async userSignin(req, res) {
    try {
      const { value, error } = signingValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const username = value.username;
      const user = await User.findOne({ username });
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      const pass = await crypto.compare(value.password, user.password);
      if (!pass) {
        return handleError(res, "User not found", 404);
      }
      const payload = { id: user._id, role: user.role };
      const accesToken = await token.generateAccesToken(payload);
      const refreshToken = await token.generateRefreshToken(payload);
      res.cookie("refreshTokenAdmin", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return successMessage(
        res,
        {
          data: user,
          token: accesToken,
        },
        200
      );
    } catch (error) {
      return handleError(res, error);
    }
  }
  async newAccesToken(req, res) {
    try {
      const refreshToken = req.cookies?.refreshTokenAdmin;
      if (!refreshToken) {
        return handleError(res, "Refresh token expired", 400);
      }
      const decodedToken = await token.verifyToken(
        refreshToken,
        config.TOKEN_REFRESH_KEY
      );
      if (!decodedToken) {
        return handleError(res, "Invalid token", 400);
      }
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return handleError(res, "User topilmadi", 404);
      }
      const payload = { id: user._id, role: user.role };
      const accessToken = await token.generateAccesToken(payload);
      return successMessage(res, { token: accessToken });
    } catch (error) {
      return handleError(res, error);
    }
  }
  async logOut(req, res) {
    try {
      const refreshToken = req.cookies?.refreshTokenAdmin;
      if (!refreshToken) {
        return handleError(res, "Refresh token epxired", 400);
      }
      const decodedToken = await token.verifyToken(
        refreshToken,
        config.TOKEN_REFRESH_KEY
      );
      if (!decodedToken) {
        return handleError(res, "Invalid token", 400);
      }
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      res.clearCookie("refreshTokenAdmin");
      return successMessage(res, {});
    } catch (error) {
      return handleError(res, error);
    }
  }
  //login qismi tugadi
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return successMessage(res, users);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid user id", 400);
      }
      const user = await User.findById(id);
      if (!user) {
        return handleError(res, "User not found", 404);
      }
      return successMessage(res, user);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid user id", 400);
      }
      const { value, error } = updateUserValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      if (value.password) {
        value.password = await crypto.encrypt(value.password);
      }
      const updatedUser = await User.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updatedUser) {
        return handleError(res, "User not found", 404);
      }
      return successMessage(res, updatedUser);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return handleError(res, "Invalid user id", 400);
      }
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return handleError(res, "User not found", 404);
      }
      return successMessage(res, deletedUser);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default UserController;
