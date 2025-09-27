import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { createReport } from "../../src/api/reportApi";

type CoordsProps = {
  latitude: number;
  longitude: number;
};

export default function UploadReportScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const [image, setImage] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState<CoordsProps | null>(null);

  // 👉 Capture image & fetch location
  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Camera permission is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);

      let { status: locStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locStatus !== "granted") {
        Alert.alert("Permission Required", "Location permission is needed.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCoords({ latitude, longitude });

      // Reverse geocode to get address

      const geo = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geo.length > 0) {
        const addr = `${geo[0].name || ""}, ${geo[0].street || ""}, ${
          geo[0].city || ""
        }, ${geo[0].region || ""}`;
        setAddress(addr);
      }
    }
  };

  const handleSubmit = async () => {
    if (!image || !description) {
      Alert.alert("Error", "Please capture image and fill description.");
      return;
    }

    try {
      if (!coords) {
        Alert.alert("Error", "Location not available. Please capture an image to fetch location.");
        return;
      }
      await createReport({ imageUri: image, description, coords });
      Alert.alert("Success", "Report submitted successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to submit report");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      {/* ✅ Header */}
      <View
        className={`flex-row items-center px-4 py-6 border-b 
        ${
          scheme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={26}
            color={scheme === "dark" ? "#F9FAFB" : "#111827"}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-black dark:text-white flex-1">
          Create New Report
        </Text>
      </View>

      {/* ✅ Content */}
      <View className="flex-1 px-6 py-4">
        {/* Image preview above button */}
        {image && (
          <Image
            source={{ uri: image }}
            className="w-full h-48 rounded-lg mb-4"
          />
        )}

        {/* Capture Image button */}
        <TouchableOpacity
          onPress={captureImage}
          className="bg-blue-600 rounded-lg py-3 mb-6"
        >
          <Text className="text-center text-white font-semibold">
            Capture Image
          </Text>
        </TouchableOpacity>

        {/* Address */}
        <Text className="text-lg font-semibold mb-1 text-black dark:text-white">
          Address
        </Text>
        <Text className="text-gray-700 dark:text-gray-300 mb-6">
          {address ? address : "📍 Location will appear after capturing image"}
        </Text>

        {/* Description */}
        <Text className="text-lg font-semibold mb-1 text-black dark:text-white">
          Description
        </Text>
        <TextInput
          placeholder="Enter description..."
          placeholderTextColor="#9ca3af"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 h-40 text-top"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Submit button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-600 rounded-lg py-3 mt-8"
        >
          <Text className="text-white text-center font-semibold">
            Submit Report
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

