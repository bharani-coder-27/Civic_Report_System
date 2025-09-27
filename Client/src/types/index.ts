export type UserRole = "admin" | "staff";

export interface Report {
  id: string;
  reportedBy: string;
  location: string;
  locationCoords: { lat: number; lng: number };
  type: string;
  status: "submitted" | "acknowledged" | "in_progress" | "resolved" | "rejected";
  description: string;
  date: string; // ISO yyyy-mm-dd
  image: string | null;
}

export interface StaffRow {
  staff_id: string;
  name: string;
  email: string;
  phone?: string;
  dept_id?: string | null;
  wards?: { ward_id: string; name: string; ward_no: number }[];
}
