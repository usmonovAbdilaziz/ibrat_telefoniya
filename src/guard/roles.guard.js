import { handleError } from "../helpers/response.error-success.js";

// middlewares/roles.guard.js

export const RolesGuard = (includeRoles = []) => {
  return (req, res, next) => {
    console.log(req.user);
    
    if (!req.user) {
      return handleError(res, "Unauthorized", 401);
    }

    if (!includeRoles.includes(req.user.role)) {
      return handleError(res, "Forbidden user", 403);
    }

    next();
  };
};

