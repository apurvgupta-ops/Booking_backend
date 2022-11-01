import Express from "express";
const router = Express.Router();
import { registerUser, login } from "../controllers/Auth.js";

router.post("/register", registerUser);
router.post("/login", login);

export default router;
