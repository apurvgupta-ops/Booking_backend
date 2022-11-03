import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import hotelRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
// import roomsRoute from "./routes/rooms.js";

const app = express();
//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const connection_url =
  "mongodb+srv://appugupta:12appugupta@cluster0.8juehuz.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 5000;

//CUSTOM ERROR HANDLING
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});
app.use("/api/hotels", hotelRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
// app.use("/api/rooms", roomsRoute);

mongoose
  .connect(connection_url, { useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () =>
      console.log(`connection successfull at port ${port}`)
    )
  )
  .catch((error) => console.log(error.message));
