import axios, { isAxiosError } from "axios";
import axiosClient from "./axiosClient";

// Cloudinary config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de9pm2ofe/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "civic_preset";

/**
 * Create report with optional image
 */
export const createReport = async ({
  imageUri,
  description,
  coords,
}: {
  imageUri?: string;
  description: string;
  coords: { latitude: number; longitude: number };
}) => {
  try {
    let imageUrl: string | null = null;

    // 🔹 Step 1: Upload image to Cloudinary
    if (imageUri) {
      const formData = new FormData();
      formData.append(
        "file",
        {
          uri: imageUri,
          type: "image/jpeg",
          name: "report.jpg",
        } as any
      );
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      imageUrl = cloudRes.data.secure_url;
    }

    // 🔹 Step 2: Send report to backend using axiosClient
    const res = await axiosClient.post("/api/citizens/report/url", {
      description,
      latitude: coords.latitude,
      longitude: coords.longitude,
      image_url: imageUrl,
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error creating report:", error.response?.data || error.message);
    } else {
      console.error("Error creating report:", (error as Error).message || error);
    }
    throw error;
  }
};

/**
 * Fetch all reports for logged-in user
 */
export const fetchReports = async () => {
  try {
    const res = await axiosClient.get("/api/citizens/my-reports");
    return res.data; // already formatted by backend
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error fetching reports:", error.response?.data || error.message);
    } else {
      console.error("Error fetching reports:", (error as Error).message || error);
    }
    throw error;
  }
};
