import express from "express";
import { citizenRegister, citizenLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", citizenRegister);
router.post("/login", citizenLogin);

export default router;
