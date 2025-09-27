import express from "express";
import { registerStaff, login, fetchZones, fetchWards, fetchDepartments } from "../controllers/adminController.js";
import { getReportsForDashboard } from "../controllers/adminController.js";
import { assignWards } from "../controllers/reportController.js";

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/staff/register", registerStaff);

// Only staff/admin can access
router.get("/reports", getReportsForDashboard);
router.post("/assign-wards", assignWards);

// Dropdown data
router.get("/zones", fetchZones);
router.get("/wards/:zoneId", fetchWards);
router.get("/departments", fetchDepartments);

export default router;
