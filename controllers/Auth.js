import cookieParser from "cookie-parser";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("user created successfully");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const oldUser = await User.findOne({ username: req.body.username });
    if (!oldUser) return next(createError("400", "user not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      oldUser.password
    );
    if (!isPasswordCorrect)
      return next(createError("400", "password and user not found"));

    const token = jwt.sign(
      { id: oldUser._id, isAdmin: oldUser.isAdmin },
      "test"
    );

    const { password, isAdmin, ...otherDetails } = oldUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true, // it helps to secure the token from the clients
      })
      .status(200)
      .json({ data: { ...otherDetails }, isAdmin });
    // res.status(200).send("user is created");
  } catch (err) {
    next(err);
  }
};
