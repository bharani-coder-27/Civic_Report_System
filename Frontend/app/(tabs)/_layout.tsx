import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme, TouchableOpacity } from "react-native";
import { useState } from "react";
import DrawerModal from "../../src/components/drawerModel"; // adjust path

export default function TabsLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            height: 100,
          },
          headerTintColor: isDark ? "#F9FAFB" : "#111827",
          tabBarStyle: {
            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
            borderTopColor: isDark ? "#374151" : "#E5E7EB",
            borderTopWidth: 0.5,
            elevation: 8,
          },
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#2563EB",
          tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }: any) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            headerLeft: () => (
              <Ionicons
                name="menu"
                size={28}
                color={isDark ? "#F9FAFB" : "#111827"}
                style={{ marginLeft: 15, marginRight: 10 }}
                onPress={() => setDrawerVisible(true)}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="documents"
          options={{
            title: "My Reports",
            tabBarIcon: ({ color, size }: any) => (
              <Ionicons name="document-text" size={size} color={color} />
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="arrow-back"
                  size={26}
                  color={isDark ? "#F9FAFB" : "#111827"}
                  style={{ marginLeft: 15, marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>

      {/* Drawer Modal */}
      <DrawerModal
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
}
