import Express from "express";
const router = Express.Router();
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
