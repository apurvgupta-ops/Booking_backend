import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //   console.log(req.cookies.access_token);
  if (!token) {
    return next(createError("401", "you are not authenticated"));
  }
  jwt.verify(token, "test", (err, user) => {
    if (err) return next(createError("401", "Token is not valid"));
    // console.log(user);
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      //   console.log(req.user.id);
      //   console.log(req.params.id);
      next();
    } else {
      return next(createError("403", "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      console.log(req.user.isAdmin);
      next();
    } else {
      return next(createError("403", "Sorry you are not a ADMIN"));
    }
  });
};
