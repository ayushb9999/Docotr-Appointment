import { Dimensions, Platform, useWindowDimensions } from "react-native";
import colors from "@/constants/Color";
import { CREDENTIALS } from "@/data/credentials";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-simple-toast";

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show("Please fill in all fields", Toast.SHORT);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://e6db-103-99-15-226.ngrok-free.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        const message = data?.message || "Invalid credentials";
        Toast.show(message, Toast.SHORT);
      }

      const { token, user } = data;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("token", token);

      Toast.show("Login successful!", Toast.LONG);
      setTimeout(() => {
        router.push("/(tabs)");
      });
    } catch (error) {
      console.error("Login error:", error);
      Toast.show("Something went wrong. Please try again.", Toast.SHORT);
    }

    setLoading(false);
  };

  return (
    <View style={[styles.container, { paddingHorizontal: isTablet ? 80 : 20 }]}>
      <View style={styles.heading__container}>
        <Text style={styles.headingMainText}>Hello,</Text>
        <Text style={styles.headingText}>Welcome Back</Text>
      </View>

      <View style={styles.form__container}>
        <View style={styles.input__container}>
          <Ionicons name="mail-outline" size={25} color={colors.primary} />
          <TextInput
            placeholder="Email"
            style={styles.textinput}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.input__container}>
          <MaterialIcons name="password" size={25} color={colors.primary} />
          <TextInput
            placeholder="Password"
            style={styles.textinput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButtonWrapper}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: isTablet ? 20 : 18,
              color: colors.white,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/Register")}>
          <Text style={styles.registerText}>
            Not registered yet?{" "}
            <Text style={styles.registerLink}>Register here</Text>
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: colors.mediumGray,
            fontSize: isTablet ? 18 : 16,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Or Continue With
        </Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
            }}
            style={{ width: isTablet ? 35 : 30, height: isTablet ? 35 : 30 }}
          />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  heading__container: { marginBottom: 24 },
  headingText: {
    fontSize: 32,
    color: colors.black,
    fontWeight: "600",
  },
  headingMainText: {
    fontSize: 36,
    color: colors.primary,
    fontWeight: "600",
  },
  form__container: {
    gap: 20,
  },
  input__container: {
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    gap: 10,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 16,
  },
  textinput: {
    padding: 10,
    flex: 1,
    fontSize: Platform.OS === "ios" ? 18 : 16,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginTop: 20,
    elevation: 4,
    paddingVertical: 15,
    alignItems: "center",
  },
  registerText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.mediumGray,
    marginVertical: 10,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  googleButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderColor: colors.lightGray,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
  },
  googleButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.black,
  },
});
