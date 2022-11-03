import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
export const createRoom = async (req, res, next) => {
  const hotelid = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  // const {id} = req.params
  try {
    const data = await Room.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
export const getAllRooms = async (req, res, next) => {
  try {
    const data = await Room.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const data = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelid = req.params.hotelId;
  try {
     await Hotel.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: "Deletion done" });
  } catch (err) {
    next(err);
  }
};
