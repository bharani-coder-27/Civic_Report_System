import axiosClient from "./axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerUser = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await axiosClient.post("/api/citizens/auth/register", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosClient.post("/api/citizens/auth/login", data);

  // Save token & user in AsyncStorage
  if (res.data?.token) {
    await AsyncStorage.setItem("token", res.data.token);
    if (res.data.user) {
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    }
  }

  return res.data;
};

export const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    return true;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token; // null if not found
  } catch (e) {
    console.error("Failed to fetch token:", e);
    return null;
  }
};
