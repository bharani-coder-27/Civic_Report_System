import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import "./global.css"; // ✅ TailwindCSS

interface JwtPayload {
  exp: number;
  user_id: string;
  role: string;
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
        } else {
          const decoded: JwtPayload = jwtDecode(token);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            await AsyncStorage.removeItem("token");
            setIsLoggedIn(false);
          } else {
            setIsLoggedIn(true);
          }
        }
      } catch (err) {
        console.error("Token check failed:", err);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />

      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="reports/upload" />
          </>
        ) : (
          <>
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}
