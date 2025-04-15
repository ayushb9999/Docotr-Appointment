import PopularDoctor from "@/components/PopularDoctor";
import { Link, Stack } from "expo-router";
``;
import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import doctors from "@/data/doctors.json";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Color from "@/constants/Color";
import colors from "@/constants/Color";
import AppointmentList from "@/components/AppointmentList";

export default function appointment() {
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerTransparent: false,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <View>
                <Text style={styles.helloText}>Appointments</Text>
              </View>
            </View>
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.white, height: "100%" }}
      >
        <AppointmentList />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  helloText: {
    fontSize: 26,
    color: colors.primary,
    fontWeight: "600",
  },
  greetingText: {
    fontSize: 12,
    color: colors.mediumGray,
    fontWeight: "500",
  },
});
