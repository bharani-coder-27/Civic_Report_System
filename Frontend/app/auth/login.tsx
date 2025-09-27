import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import { loginUser } from "../../src/api/authApi";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      if (res.success) {
        Alert.alert("Success", "Logged in successfully");
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Login Failed", res.message || "Invalid credentials");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark px-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
        Citizen Login
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 mb-4"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 mb-6"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        className="bg-primary rounded-lg py-3"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </TouchableOpacity>
      <Link href="/auth/register" className="text-blue-600 text-center mt-5">
        Don’t have an account? Register
      </Link>
    </SafeAreaView>
  );
}
