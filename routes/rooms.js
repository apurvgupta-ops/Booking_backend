import Express from "express";
const router = Express.Router();
import {
  createRoom,
  getAllRooms,
  getRoom,
  deleteRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/Rooms.js";
import { verifyAdmin } from "../utils/verify.js";

router.post("/:hotelId", verifyAdmin, createRoom);
router.patch("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoom);
router.put("/availability/:id", updateRoomAvailability);

export default router;
