import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, Link } from "expo-router";
import { useState } from "react";
import { registerUser } from "../../src/api/authApi";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await registerUser({ name, email, phone, password });
      if (res.success) {
        Alert.alert("Success", "Account created successfully");
        router.replace("/auth/login");
      } else {
        Alert.alert("Register Failed", res.message || "Could not create account");
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundLight dark:bg-backgroundDark px-6 justify-center">
      <Text className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
        Create Account
      </Text>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#9ca3af"
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 mb-4"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 mb-4"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Phone"
        placeholderTextColor="#9ca3af"
        className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg px-4 py-3 mb-4"
        value={phone}
        onChangeText={setPhone}
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
        className="bg-green-600 rounded-lg py-3"
        onPress={handleRegister}
      >
        <Text className="text-white text-center font-semibold">Register</Text>
      </TouchableOpacity>
      <Link href="/auth/login" className="text-blue-600 text-center mt-5">
        Already have an account? Login
      </Link>
    </SafeAreaView>
  );
}
