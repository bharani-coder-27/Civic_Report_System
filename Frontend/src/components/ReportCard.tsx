import { View, Text, Image } from "react-native";

export default function ReportCard({ report }: { report: any }) {
  // ✅ Status color mapping
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "in_progress":
      case "in progress":
        return "bg-blue-200 text-blue-800";
      case "resolved":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <View className="bg-white dark:bg-gray-800 p-4 mb-3 rounded-lg shadow">
      {report.image && (
        <Image source={{ uri: report.image }} className="w-full h-40 rounded mb-2" />
      )}
      <Text className="text-lg font-bold text-black dark:text-white">{report.type}</Text>
      <Text className="text-gray-700 dark:text-gray-300">{report.description}</Text>
      <Text className="text-sm text-gray-500 dark:text-gray-400">
        {report.location} • {report.date}
      </Text>

      {/* ✅ Status as badge */}
      <View
        className={`self-start px-3 py-1 mt-2 rounded-full ${getStatusStyle(
          report.status
        )}`}
      >
        <Text className="font-bold text-base capitalize">
          {report.status.replace("_", " ")}
        </Text>
      </View>
    </View>
  );
}
