import express from "express";
import { createReport } from "../controllers/reportController.js";
import { authMiddleware } from "../../shared/middlewares/authMiddleware.js";
import { getMyReports } from "../controllers/reportController.js";

const router = express.Router();

// Citizen reports with image_url + description
router.post("/report/url", authMiddleware(['citizen']), createReport);
router.get('/my-reports', authMiddleware(['citizen']), getMyReports);

export default router;
