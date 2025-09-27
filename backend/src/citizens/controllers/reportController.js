import { findWardByLocation } from "../../shared/utils/wardLocator.js";
import { saveReport } from "../models/reportModel.js";
import prisma from "../../shared/utils/prismaClient.js";

export const createReport = async (req, res) => {
  try {
    const { latitude, longitude, description, image_url } = req.body;
    console.log("Report Body:", req.body); // Debugging line

    console.log("User from req:", req.user); // Debugging line
    // Get user ID from auth middleware
    const userId = req.user?.user_id || null;
    const lat = 10.9781;  // Example coordinates, for testing
    const lon = 76.9555;

    // 1. Find ward by location
    const ward = await findWardByLocation(lat, lon);
    if (!ward) {
      return res.status(400).json({ success: false, error: "Ward not found" });
    }

    // 2. Get staff assigned to this ward
    const staffAssignment = await prisma.staffWards.findFirst({
      where: { ward_id: ward.ward_id },
      include: { staff: { include: { user: true } } },
    });

    // 3. Save report
    const report = await saveReport({
      user_id: userId,
      description,
      latitude: lat,
      longitude: lon,
      category: "General", // later replaced by AI classification
      status: "submitted",
      priority_score: 2,
      ward_id: ward.ward_id,
      mediaData: [{ file_url: image_url, file_type: "image" }],
    });

    // 4. Create notification for assigned staff
    if (staffAssignment) {
      await prisma.notification.create({
        data: {
          user_id: staffAssignment.staff.user_id,
          report_id: report.report_id,
          message: `New report assigned in ward ${ward.name}`,
        },
      });
    }

    res.status(201).json({
      success: true,
      report,
      assigned_to: staffAssignment
        ? staffAssignment.staff.user.name
        : "No staff assigned",
      ward: ward.name,
      zone: ward.zone.name,
    });
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(500).json({ success: false, error: "Failed to create report" });
  }
};


/**
 * Fetch reports created by the logged-in citizen
 */
export async function getMyReports(req, res) {
  try {
    const reports = await prisma.report.findMany({
      where: { user_id: req.user.user_id },
      include: {
        media: true,
        user: true,
        ward: { include: { zone: { include: { district: true } } } },
      },
      orderBy: { created_at: 'desc' },
    });

    // 🔹 Transform DB rows → frontend format
    const formattedReports = reports.map((r) => ({
      id: r.report_id,
      reportedBy: r.user?.name || 'Anonymous',
      location: `${r.ward?.name || 'Unknown'}, ${r.ward?.zone?.district?.name || ''}`.trim(),
      locationCoords: { lat: Number(r.latitude), lng: Number(r.longitude) },
      type: r.category,
      status: r.status,
      description: r.description,
      date: r.created_at.toISOString().split('T')[0],
      image: r.media.length > 0 ? r.media[0].file_url : null,
    }));

    return res.status(200).json(formattedReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return res.status(500).json({ error: 'Failed to fetch reports' });
  }
}
