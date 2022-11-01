import Express from "express";
const router = Express.Router();
import {
  getHotel,
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/Hotels.js";

router.post("/", createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
