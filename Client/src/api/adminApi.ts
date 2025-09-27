import axiosClient from "./axiosClient";
import type { Report, StaffRow } from "../types";

export const adminApi = {
  listStaff: async (): Promise<StaffRow[]> => {
    const { data } = await axiosClient.get("/admin/staff/list");
    return data;
  },

  createStaff: async (payload: {
    name: string;
    email: string;
    phone?: string;
    dept_id?: string | null;
    password?: string;
  }): Promise<StaffRow> => {
    const { data } = await axiosClient.post("/admin/staff/create", payload);
    return data;
  },

  assignWards: async (staffId: string, wardIds: string[] | string) => {
    const list = Array.isArray(wardIds) ? wardIds : [wardIds];
    const { data } = await axiosClient.post("/admin/assign-wards", {
      staffId,
      wardIds: list
    });
    return data;
  },

  listReports: async (): Promise<Report[]> => {
    const { data } = await axiosClient.get("/admin/reports");
    return data;
  }
};
