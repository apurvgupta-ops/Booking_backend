import Express from "express";
const router = Express.Router();
import {
  getHotel,
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/Hotels.js";
import { verifyAdmin } from "../utils/verify.js";

router.post("/", verifyAdmin, createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotel);
router.patch("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
