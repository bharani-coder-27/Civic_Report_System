import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { logoutUser } from "../api/authApi";

export default function DrawerModal({ visible, onClose }: any) {
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logoutUser();
    onClose();
    if (success) {
      router.replace("/auth/login"); // ✅ navigate to login
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 bg-black/40"
        onPress={onClose}
      >
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 w-72 px-4 py-6">
          {/* Top User Info */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-black dark:text-white">
              👤 BHARANIDHARAN G
            </Text>
          </View>

          {/* Profile Item */}
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => {
              onClose();
              router.push("../../app/auth/profile"); // Example profile page
            }}
          >
            <Ionicons name="person-circle-outline" size={26} color="#2563EB" />
            <Text className="ml-3 text-xl text-black dark:text-white">Profile</Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View className="flex-1" />

          {/* Logout */}
          <TouchableOpacity
            className="flex-row items-center py-3"
            onPress={() => {
              onClose();
              handleLogout();
            }}
          >
            <Ionicons name="log-out-outline" size={26} color="red" />
            <Text className="ml-3 text-xl text-red-600">Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
}
