import express from "express";
import { staffRegister, staffLogin, fetchZones, fetchWards, fetchDepartments } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.post("/register", staffRegister);
router.post("/login", staffLogin);


// Dropdown data
router.get("/zones", fetchZones);
router.get("/wards/:zoneId", fetchWards);
router.get("/departments", fetchDepartments);

export default router;
