import Hotel from "../models/Hotels.js";
export const getHotel = async (req, res) => {
  // const {id} = req.params
  try {
    const data = await Hotel.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getAllHotels = async (req, res) => {
  try {
    const data = await Hotel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const createHotel = async (req, res) => {
  // const hotel = req.body
  const newHotel = new Hotel(req.body);
  try {
    const createHotel = await newHotel.save();
    res.status(200).json(createHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updateHotel = async (req, res) => {
  try {
    const data = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deletion done" });
  } catch (err) {
    next(err);
  }
};
