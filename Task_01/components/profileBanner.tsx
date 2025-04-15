import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import colors from "@/constants/Color";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function ProfileBanner() {
  const id = AsyncStorage.getItem("userId");
  const [userData, setUserData] = useState({
    name: "",
    gender: "",
    email: "",
    image: "",
    bloodGroup: "",
  });

  useEffect(() => {
    getProfileInformatin();
  }, []);

  const getProfileInformatin = async () => {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `https://e6db-103-99-15-226.ngrok-free.app/api/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
            }}
            style={styles.profileImage}
          />
        </View>
        {/* Patient Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.patientName}>Ayush</Text>
          <Text style={styles.infoText}>Male | 24 Years | A+</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Total Appointments</Text>
              <Text style={styles.value}>5</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 20,
    marginBlock: 20,

    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    elevation: 6,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: colors.primary,
    marginRight: 15,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
  },
  detailsContainer: {
    flex: 1,
  },
  patientName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.black,
  },
  infoText: {
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoBox: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.mediumGray,
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginTop: 4,
  },
});
