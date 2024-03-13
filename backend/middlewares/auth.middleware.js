import jwt from "jsonwebtoken";

import AppError from "../utils/error.util.js";
import asyncHandler from "./asyncHandler.middleware.js";
import User from "../models/user.models.js";

const isLoggedIn = asyncHandler(async (req, _res, next) => {
 
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }


  const decoded = await jwt.verify(token, process.env.SECRET);

  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  req.user = decoded;

  next();
});

// Middleware to check if user is admin or not
const authorizedRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or no

const authorizedSubscriber = async (req, _res, next) =>{
  const user = await User.findById(req.user.id);
    if(user.role !== 'ADMIN' && user.subscription.status !== 'active' ){
        return next(
            new AppError('Please subscribe to access this route!', 403)
        )
    }

    next();
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}