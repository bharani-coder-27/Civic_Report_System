import bcrypt from "bcryptjs";
import { createUser, findUserByEmailOrPhone } from "../../shared/models/userModel.js";
import { createStaffProfile, getZones, getWardsByZone, getDepartments } from "../models/adminModel.js";
import { generateToken } from "../../shared/utils/token.js";
import { getAllReports } from "../models/adminModel.js";


// ---------------- Register Staff ----------------
export const registerStaff = async (req, res) => {
  try {
    const { name, email, phone, password, deptId, wardId, position } = req.body;

    if (!deptId || !wardId || !position) {
      return res.status(400).json({ message: "Department, ward and position are required" });
    }

    // Create user
    const user = await createUser({
      name,
      email,
      phone,
      password,
      role: "staff"
    });

    // Create staff profile + mapping
    const staff = await createStaffProfile(user.user_id, deptId, wardId, position);

    res.status(201).json({
      message: "Staff registered successfully",
      user: { id: user.user_id, name: user.name, role: user.role },
      staff
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Staff registration failed" });
  }
};

// ---------------- Login ----------------
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await findUserByEmailOrPhone(identifier);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken({ id: user.user_id, role: user.role });

    // Send cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: { id: user.user_id, name: user.name, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

// ---------------- Fetch Dropdown Data ----------------
export const fetchZones = async (req, res) => {
  try {
    const zones = await getZones();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch zones" });
  }
};

export const fetchWards = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const wards = await getWardsByZone(zoneId);
    res.json(wards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wards" });
  }
};

export const fetchDepartments = async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

export const getReportsForDashboard = async (req, res) => {
  try {
    const reports = await getAllReports();

    const formatted = reports.map((r, idx) => ({
      id: `RPT${String(idx + 1).padStart(3, "0")}`, // RPT001, RPT002...
      reportedBy: r.user ? r.user.name : "Anonymous",
      location: r.ward ? r.ward.name : "Unknown Ward",
      locationCoords: {
        lat: parseFloat(r.latitude),
        lng: parseFloat(r.longitude),
      },
      type: r.category,
      status: r.status,
      description: r.description,
      date: r.created_at.toISOString().split("T")[0], // YYYY-MM-DD
      image: r.media.length > 0 ? r.media[0].file_url : null,
    }));

    res.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Error fetching reports for dashboard:", error);
    res.status(500).json({ success: false, error: "Failed to fetch reports" });
  }
};