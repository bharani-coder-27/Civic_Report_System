import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList } from "react-native";
import ReportCard from "../../src/components/ReportCard";
import { fetchReports } from "../../src/api/reportApi";
import { useEffect, useState } from "react";

export default function HomeTab() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const reports = await fetchReports();
      setReports(reports);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark">
      <View className="flex-1 px-4">
        <Text className="text-2xl font-bold my-4 text-black dark:text-white">
          Reports in Your Area
        </Text>
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReportCard report={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
