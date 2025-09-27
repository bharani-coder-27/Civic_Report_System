import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ReportCard from "../../src/components/ReportCard";
import { fetchReports } from "../../src/api/reportApi";
import { useEffect, useState } from "react";

export default function DocumentsTab() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchReports();
      setReports(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <View className="flex-1 px-4">
        {/* ✅ Reports list */}
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReportCard report={item} />}
        />

        {/* ✅ Floating Add Button */}
        <TouchableOpacity
          onPress={() => router.push("/reports/upload")}
          className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-5 shadow-lg"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
