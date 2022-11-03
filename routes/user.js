import Express from "express";
const router = Express.Router();
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js";

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("you are loggedin");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("you are loggedin and you have now control your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin and you have now control ALL account");
// });
router.get("/", verifyAdmin, getAllUsers);
router.get("/:id", verifyUser, getUser);
router.patch("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

export default router;
