import config from "../config/config.js";
import jwt from "jsonwebtoken";
export class Token {
  async generateAccesToken(payload) {
    return jwt.sign(payload, config.TOKEN_ACCESS_KEY, {
      expiresIn: config.TOKEN_ACCESS_TIME,
    });
  }
  async generateRefreshToken(payload) {
    return jwt.sign(payload, config.TOKEN_REFRESH_KEY, {
      expiresIn: config.TOKEN_REFRESH_TIME,
    });
  }

  async verifyToken(token, secretKey) {
  try {
    const data = jwt.verify(token, secretKey); // verifyToken emas
    return data;
  } catch (err) {
    console.error("Token xato yoki muddati tugagan:", err.message);
    return null;
  }
  }
}
