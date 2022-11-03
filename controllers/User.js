import User from "../models/User.js";
export const getUser = async (req, res) => {
  // const {id} = req.params
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deletion done" });
  } catch (err) {
    next(err);
  }
};
