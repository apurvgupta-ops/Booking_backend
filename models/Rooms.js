import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
    require: true,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  roomNumbers: [
    {
      number: Number,
      unavailableDates: { type: [Date] },
    },
  ],
});

export default mongoose.model("Room", roomSchema);
