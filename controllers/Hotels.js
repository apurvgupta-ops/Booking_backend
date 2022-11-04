import Hotel from "../models/Hotels.js";
export const getHotel = async (req, res, next) => {
  // const {id} = req.params
  try {
    const data = await Hotel.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    // const data = await Hotel.find({
    //   ...others,
    //   cheapestPrice: { $gt: min || 1000, $lt: max || 10000 },
    // }).limit(req.query.limit);
    const data = await Hotel.find({ ...others }).limit(req.query.limit);
    res.status(200).json(data);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};
export const createHotel = async (req, res, next) => {
  // const hotel = req.body
  const newHotel = new Hotel(req.body);
  try {
    const createHotel = await newHotel.save();
    res.status(200).json(createHotel);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const data = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(data);
  } catch (err) {
    // res.status(500).json(err);
    next(err);
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

export const getCitiesCount = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  // console.log(cities);
  try {
    const data = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getHotelByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ accomdationType: "hotel" });
    const apartmentCount = await Hotel.countDocuments({
      accomdationType: "apartment",
    });
    const resortCount = await Hotel.countDocuments({
      accomdationType: "resort",
    });
    const villaCount = await Hotel.countDocuments({ accomdationType: "villa" });
    const cabinCount = await Hotel.countDocuments({ accomdationType: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};
