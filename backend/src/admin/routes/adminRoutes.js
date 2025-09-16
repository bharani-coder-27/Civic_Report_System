import express from "express";
import { registerStaff, login, fetchZones, fetchWards, fetchDepartments } from "../controllers/adminController.js";

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/staff/register", registerStaff);

// Dropdown data
router.get("/zones", fetchZones);
router.get("/wards/:zoneId", fetchWards);
router.get("/departments", fetchDepartments);

export default router;
