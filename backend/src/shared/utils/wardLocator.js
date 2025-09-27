import fs from "fs";
import path from "path";
import * as turf from "@turf/turf";
import prisma from "./prismaClient.js";

const wardsPath = path.resolve("src/Data/wards.geojson");
const wards = JSON.parse(fs.readFileSync(wardsPath, "utf8"));

/**
 * Find ward from latitude/longitude using Turf.js
 * Returns ward DB row including zone
 */
export async function findWardByLocation(latitude, longitude) {
  const point = turf.point([Number(longitude), Number(latitude)]);

  console.log("Finding ward for point:", point); // Debugging line  

  for (const feature of wards.features) {
    if (turf.booleanPointInPolygon(point, feature)) {
      const props = feature.properties;

      // Extract ward_no
      const match = props.description.match(/New_Ward_No\s+(\d+)/);
      const ward_no = match ? parseInt(match[1], 10) : null;

      if (!ward_no) return null;
      
      console.log("Matched ward properties:", props); // Debugging line
      console.log("Point is in ward number:", ward_no); // Debugging line

      // ✅ Fetch ward from DB
      const ward = await prisma.ward.findUnique({
        where: { ward_no },
        include: { zone: true },
      });

      return ward;
    }
  }
  return null; // not found
}
