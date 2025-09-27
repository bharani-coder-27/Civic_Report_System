// src/utils/theme.ts
import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const scheme = useColorScheme(); // "light" | "dark"

  return scheme === "dark"
    ? {
        background: "#121212",
        text: "#ffffff",
        card: "#1E1E1E",
        primary: "#4F9DFF",
        accent: "#FFB84F",
      }
    : {
        background: "#f9f9f9",
        text: "#000000",
        card: "#ffffff",
        primary: "#2563EB",
        accent: "#F97316",
      };
};
