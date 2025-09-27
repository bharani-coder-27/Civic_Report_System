import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

interface JwtPayload {
  exp: number;
  user_id: string;
  role: string;
}

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<"/auth/login" | "/(tabs)/home" | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setRedirectTo("/auth/login");
      } else {
        try {
          const decoded: JwtPayload = jwtDecode(token);
          const now = Date.now() / 1000;
          if (decoded.exp < now) {
            await AsyncStorage.removeItem("token");
            setRedirectTo("/auth/login");
          } else {
            setRedirectTo("/(tabs)/home");
          }
        } catch {
          setRedirectTo("/auth/login");
        }
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={redirectTo || "/auth/login"} />;
}

