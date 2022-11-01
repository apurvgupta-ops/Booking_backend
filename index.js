import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import hotelRoutes from "./routes/hotels.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import roomsRoutes from "./routes/rooms.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const connection_url =
  "mongodb+srv://appugupta:12appugupta@cluster0.8juehuz.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomsRoutes);

mongoose
  .connect(connection_url, { useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`connection successfull at port ${port}`)
    )
  )
  .catch((error) => console.log(error.message));
