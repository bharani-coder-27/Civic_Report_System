import axiosClient from "./axiosClient";
import type { Report } from "../types";

export const staffApi = {
  myReports: async (): Promise<Report[]> => {
    const { data } = await axiosClient.get("/staff/reports");
    return data;
  }
};
