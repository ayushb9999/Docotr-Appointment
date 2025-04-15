import PopularDoctor from "@/components/PopularDoctor";
import colors from "@/constants/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import doctors from "@/data/doctors.json";
import DoctorFilter from "@/components/DoctorFilter";

export default function Doctorlist() {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (category: string) => {
    if (category === "All") {
      setFilteredDoctors(doctors);
    } else {
      setFilteredDoctors(
        doctors.filter((doc) => doc.specialization === category)
      );
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [3000]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading Doctors List...</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.filterWrapper}>
            <DoctorFilter onFilter={handleFilterChange} />
          </View>

          <PopularDoctor
            showPopularOnly={false}
            doctorsList={filteredDoctors}
          />
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    padding: 12,
    elevation: 6,
    marginTop: 15,
    marginInline: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#ffffff54",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    paddingBottom: 20,
  },
  filterWrapper: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  loadingText: {
    fontSize: 16,
    color: colors.mediumGray,
    marginTop: 10,
  },
});
